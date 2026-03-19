import { stripe } from "@/shared/lib/stripe";
import { prisma } from "@/shared/lib/prisma";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import type { Plan, BillingInterval } from "@/shared/lib/generated/prisma/enums";
import type Stripe from "stripe";
import { PRO_MONTHLY_TOKENS } from "@/features/billing/constants/plans";
import { apiError } from "@/shared/lib/api-error";
import { captureServerEvent } from "@/shared/lib/posthog-server";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// POST /api/v1/billing/webhook — handle Stripe webhook events
export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return apiError("missing_signature", "Missing stripe-signature header", 400);
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return apiError("invalid_signature", "Invalid signature", 400);
  }

  // Idempotency: skip events already processed (Stripe retries for up to 3 days)
  if (redis) {
    const key = `stripe:webhook:${event.id}`;
    const already = await redis.set(key, "1", { nx: true, ex: 60 * 60 * 24 * 7 });
    if (already === null) {
      return NextResponse.json({ received: true });
    }
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription" || !session.subscription) break;

        const userId =
          (session.client_reference_id as string | null) ??
          (await getUserIdFromCustomer(session.customer as string));

        if (!userId) break;

        await syncSubscription(session.subscription as string, userId);
        void captureServerEvent(userId, "plan_upgraded", { source: "checkout" });
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const userId =
          (sub.metadata?.userId as string | undefined) ??
          (await getUserIdFromCustomer(sub.customer as string));
        if (!userId) break;
        await syncSubscription(sub.id, userId);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId =
          (sub.metadata?.userId as string | undefined) ??
          (await getUserIdFromCustomer(sub.customer as string));
        if (!userId) break;
        await prisma.user.updateMany({
          where: { id: userId },
          data: {
            plan: "FREE" as Plan,
            billingInterval: null,
            stripeSubscriptionId: null,
            stripePriceId: null,
            subscriptionStatus: "canceled",
            currentPeriodEnd: null,
            // tokenBalance intentionally not reset — user keeps remaining tokens
          },
        });
        void captureServerEvent(userId, "subscription_cancelled");
        break;
      }

      case "invoice.paid": {
        const inv = event.data.object as Stripe.Invoice;
        // Only handle subscription invoices
        const billingReason = inv.billing_reason;
        if (
          billingReason !== "subscription_create" &&
          billingReason !== "subscription_cycle"
        ) break;

        const userId = await getUserIdFromCustomer(inv.customer as string);
        if (!userId) break;

        if (billingReason === "subscription_create") {
          // First payment on upgrade: keep existing tokens and add 200
          await prisma.user.update({
            where: { id: userId },
            data: { tokenBalance: { increment: PRO_MONTHLY_TOKENS } },
          });
        } else if (billingReason === "subscription_cycle") {
          // Monthly renewal: reset to 200. Yearly renewal: add 200 (rollover).
          const dbUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { billingInterval: true },
          });
          if (!dbUser) break;

          if (dbUser.billingInterval === "YEARLY") {
            await prisma.user.update({
              where: { id: userId },
              data: { tokenBalance: { increment: PRO_MONTHLY_TOKENS } },
            });
          } else {
            await prisma.user.update({
              where: { id: userId },
              data: { tokenBalance: PRO_MONTHLY_TOKENS },
            });
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const inv = event.data.object as Stripe.Invoice;
        const userId = await getUserIdFromCustomer(inv.customer as string);
        if (!userId) break;
        await prisma.user.updateMany({
          where: { id: userId },
          data: { subscriptionStatus: "past_due" },
        });
        void captureServerEvent(userId, "billing_failed");
        break;
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return apiError("handler_error", "Webhook handler error", 500);
  }

  return NextResponse.json({ received: true });
}

async function getUserIdFromCustomer(customerId: string): Promise<string | null> {
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
    select: { id: true },
  });
  return user?.id ?? null;
}

async function getUserIdFromSubscription(subscriptionId: string): Promise<string | null> {
  const user = await prisma.user.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
    select: { id: true },
  });
  return user?.id ?? null;
}

async function syncSubscription(subscriptionId: string, userId: string) {
  const sub = await stripe.subscriptions.retrieve(subscriptionId);
  const priceId = sub.items.data[0]?.price?.id ?? null;
  const isActive = sub.status === "active" || sub.status === "trialing";
  const interval = sub.items.data[0]?.price?.recurring?.interval;
  const billingInterval: BillingInterval | null =
    interval === "year" ? "YEARLY" : interval === "month" ? "MONTHLY" : null;

  await prisma.user.update({
    where: { id: userId },
    data: {
      plan: (isActive ? "PRO" : "FREE") as Plan,
      billingInterval,
      stripeSubscriptionId: sub.id,
      stripePriceId: priceId,
      subscriptionStatus: sub.status,
      currentPeriodEnd: sub.items.data[0]?.current_period_end
        ? new Date(sub.items.data[0].current_period_end * 1000)
        : null,
    },
  });
}
