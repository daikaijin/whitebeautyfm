import { NextResponse } from "next/server";
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
      productId?: string;
      quantity?: number;
    };
    const productId = body.productId;
    const quantity = Math.min(Math.max(Number(body.quantity) || 1, 1), 10);

    if (!productId) {
      return NextResponse.json(
        { error: "Missing productId" },
        { status: 400, headers },
      );
    }

    const product = getProduct(productId);
    if (!product || !isPurchasable(product)) {
      return NextResponse.json(
        { error: "Product unavailable" },
        { status: 400, headers },
      );
    }

    // Always use the canonical site URL for Stripe redirects + product images.
    const origin = siteConfig.url;

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
      line_items: [
        {
          quantity,
          price_data: {
            currency: "jpy",
            unit_amount: product.priceYen,
            product_data: {
              name:
                product.status === "pre_order"
                  ? `${product.name} (Pre-Order)`
                  : product.name,
              description: product.description,
              images: [`${origin}${productImage(product)}`],
            },
          },
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#shop`,
      metadata: {
        productId: product.id,
        status: product.status,
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
