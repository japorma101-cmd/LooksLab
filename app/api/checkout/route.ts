import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ONE_TIME!,
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/account",
    cancel_url: "http://localhost:3000/pricing",
    customer_email: user.email,
  });

  return NextResponse.json({ url: session.url });
}