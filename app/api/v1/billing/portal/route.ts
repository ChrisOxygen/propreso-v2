import { createClient } from "@/shared/lib/supabase/server";
import { prisma } from "@/shared/lib/prisma";
import { stripe } from "@/shared/lib/stripe";
import { NextResponse } from "next/server";
import { apiError } from "@/shared/lib/api-error";

// POST /api/v1/billing/portal — open Stripe Customer Portal
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return apiError("unauthorized", "Unauthorized", 401);
  }

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser?.stripeCustomerId) {
    return apiError("not_found", "No billing account found", 404);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.billingPortal.sessions.create({
    customer: dbUser.stripeCustomerId,
    return_url: `${appUrl}/billing`,
  });

  return NextResponse.json({ url: session.url });
}
