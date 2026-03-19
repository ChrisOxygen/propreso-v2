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

  const body = await request.json().catch(() => null);
  const priceId = typeof body?.priceId === "string" ? body.priceId : null;

  if (!priceId) {
    return apiError("validation_error", "priceId is required", 422);
  }

  // Whitelist: only accept known price IDs configured in env
  const validPriceIds = [
    process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID,
  ].filter((id): id is string => Boolean(id));

  if (validPriceIds.length > 0 && !validPriceIds.includes(priceId)) {
    return apiError("validation_error", "Invalid price ID", 422);
  }

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) {
    return apiError("not_found", "User not found", 404);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl && process.env.NODE_ENV === "production") {
    console.error("[billing/checkout] NEXT_PUBLIC_APP_URL is not set");
    return apiError("configuration_error", "Server misconfiguration", 500);
  }
  const resolvedAppUrl = appUrl ?? "http://localhost:3000";

  try {
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

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      client_reference_id: dbUser.id,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${resolvedAppUrl}/billing?success=true`,
      cancel_url: `${resolvedAppUrl}/billing`,
      subscription_data: {
        metadata: { userId: dbUser.id },
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[billing/checkout] Stripe error:", err);
    return apiError("stripe_error", "Failed to create checkout session", 500);
  }
}
