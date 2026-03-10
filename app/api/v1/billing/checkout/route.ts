import { createClient } from "@/shared/lib/supabase/server";
import { prisma } from "@/shared/lib/prisma";
import { stripe } from "@/shared/lib/stripe";
import { NextResponse } from "next/server";
import { apiError } from "@/shared/lib/api-error";

// POST /api/v1/billing/checkout — create a Stripe Checkout Session for upgrade
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return apiError("unauthorized", "Unauthorized", 401);
  }

  const body = await request.json();
  const { priceId } = body as { priceId: string };

  if (!priceId || typeof priceId !== "string") {
    return apiError("validation_error", "priceId is required", 422);
  }

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) {
    return apiError("not_found", "User not found", 404);
  }

  // Get or create Stripe customer
  let customerId = dbUser.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: dbUser.email,
      name: dbUser.fullName ?? undefined,
      metadata: { userId: dbUser.id },
    });
    customerId = customer.id;
    await prisma.user.update({
      where: { id: dbUser.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/billing?success=true`,
    cancel_url: `${appUrl}/billing`,
    subscription_data: {
      metadata: { userId: dbUser.id },
    },
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}
