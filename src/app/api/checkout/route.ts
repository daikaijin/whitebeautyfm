import { NextResponse } from "next/server";
import { normalizeCart, type CartItem } from "@/lib/cart";
import { getProduct, isPurchasable, productImage } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { getStripe } from "@/lib/stripe";

const allowedOrigins = new Set([
  siteConfig.url,
  "https://www.whitebeautyfm.com",
  "https://whitebeautyfm.com",
  "https://whitebeautyfm.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

function corsHeaders(origin: string | null) {
  const headers = new Headers();
  if (origin && allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  return headers;
}

function parseItems(body: {
  items?: CartItem[];
  productId?: string;
  quantity?: number;
}): CartItem[] {
  if (Array.isArray(body.items) && body.items.length) {
    return normalizeCart(body.items);
  }
  if (body.productId) {
    return normalizeCart([
      {
        productId: body.productId,
        quantity: body.quantity ?? 1,
      },
    ]);
  }
  return [];
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request.headers.get("origin")),
  });
}

export async function POST(request: Request) {
  const requestOrigin = request.headers.get("origin");
  const headers = corsHeaders(requestOrigin);

  try {
    const body = (await request.json()) as {
      items?: CartItem[];
      productId?: string;
      quantity?: number;
    };

    const items = parseItems(body);
    if (!items.length) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400, headers },
      );
    }

    const lineItems = [];
    const metaParts: string[] = [];

    for (const item of items) {
      const product = getProduct(item.productId);
      if (!product || !isPurchasable(product)) {
        return NextResponse.json(
          { error: `Product unavailable: ${item.productId}` },
          { status: 400, headers },
        );
      }

      metaParts.push(`${product.id}x${item.quantity}`);
      lineItems.push({
        quantity: item.quantity,
        price_data: {
          currency: "jpy" as const,
          unit_amount: product.priceYen,
          product_data: {
            name:
              product.status === "pre_order"
                ? `${product.name} (Pre-Order)`
                : product.name,
            description: product.description,
            images: [`${siteConfig.url}${productImage(product)}`],
          },
        },
      });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: [
          "JP",
          "US",
          "GB",
          "AU",
          "CA",
          "KR",
          "SG",
          "TH",
          "TW",
          "HK",
        ],
      },
      line_items: lineItems,
      success_url: `${siteConfig.url}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteConfig.url}/#shop`,
      metadata: {
        cart: metaParts.join(",").slice(0, 500),
      },
    });

    return NextResponse.json({ url: session.url }, { headers });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Unable to start checkout" },
      { status: 500, headers },
    );
  }
}
