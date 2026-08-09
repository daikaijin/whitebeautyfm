import { NextResponse } from "next/server";
import { getProduct, isPurchasable, productImage } from "@/lib/products";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { productId?: string; quantity?: number };
    const productId = body.productId;
    const quantity = Math.min(Math.max(Number(body.quantity) || 1, 1), 10);

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const product = getProduct(productId);
    if (!product || !isPurchasable(product)) {
      return NextResponse.json({ error: "Product unavailable" }, { status: 400 });
    }

    const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;
    if (!origin) {
      return NextResponse.json({ error: "Missing site origin" }, { status: 500 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["JP", "US", "GB", "AU", "CA", "KR", "SG", "TH", "TW", "HK"],
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

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Unable to start checkout" }, { status: 500 });
  }
}
