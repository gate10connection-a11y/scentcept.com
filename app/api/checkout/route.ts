import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { CartItem } from "@/lib/types";

export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to .env.local" },
      { status: 400 }
    );
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const { items, email }: { items: CartItem[]; email: string } = await req.json();

    const lineItems = items.map((item: CartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          description: `Size: ${item.size}`,
          images: [item.product.images[0]],
        },
        unit_amount: item.product.price,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: email,
      success_url: `${req.nextUrl.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cart`,
      shipping_address_collection: {
        allowed_countries: ["KR", "US", "GB", "JP"],
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
