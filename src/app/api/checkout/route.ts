import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { normalizeCart, type CartItem } from "@/lib/cart";
import {
  getProduct,
  isHalloweenStickerFree,
  isPurchasable,
  productImage,
  productPriceYen,
} from "@/lib/products";
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

function normalizeEmail(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sessionClaimedHalloween(session: Stripe.Checkout.Session) {
  if (session.status !== "complete") return false;
  return (session.metadata?.cart ?? "").includes("sticker-halloween");
}

async function emailAlreadyClaimedHalloween(stripe: Stripe, email: string) {
  const customers = await stripe.customers.list({ email, limit: 10 });
  for (const customer of customers.data) {
    const sessions = await stripe.checkout.sessions.list({
      customer: customer.id,
      limit: 40,
    });
    if (sessions.data.some(sessionClaimedHalloween)) return true;
  }
  return false;
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
      email?: string;
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
          unit_amount: productPriceYen(product),
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

    const amountTotal = lineItems.reduce(
      (sum, line) => sum + line.price_data.unit_amount * line.quantity,
      0,
    );

    const stripe = getStripe();
    const claimingHalloween =
      isHalloweenStickerFree() &&
      items.some((item) => item.productId === "sticker-halloween");
    const email = normalizeEmail(body.email);

    if (claimingHalloween) {
      if (!isEmail(email)) {
        return NextResponse.json(
          { error: "email_required" },
          { status: 400, headers },
        );
      }
      if (await emailAlreadyClaimedHalloween(stripe, email)) {
        return NextResponse.json(
          { error: "already_claimed" },
          { status: 400, headers },
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ...(amountTotal > 0 ? { payment_method_types: ["card"] as const } : {}),
      ...(claimingHalloween ? { customer_email: email } : {}),
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
        ...(claimingHalloween ? { claim_email: email } : {}),
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
