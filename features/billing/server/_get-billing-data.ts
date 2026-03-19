import { prisma } from "@/shared/lib/prisma";
import { stripe } from "@/shared/lib/stripe";
import { startOfMonth } from "date-fns";
import type { BillingData, BillingInvoice } from "@/features/billing/types";
import type { Plan, BillingInterval, SubscriptionStatus } from "@/shared/lib/generated/prisma/enums";

export async function _getBillingData(
  userId: string,
  showSuccessBanner = false
): Promise<BillingData> {
  const [user, proposalCount, profileCount] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.proposal.count({
      where: { userId, createdAt: { gte: startOfMonth(new Date()) } },
    }),
    prisma.freelancerProfile.count({ where: { userId } }),
  ]);

  if (!user) throw new Error("User not found");

  // Race condition guard: user just returned from Stripe Checkout but the
  // webhook hasn't been processed yet — proactively sync their subscription.
  let resolvedUser = user;
  if (showSuccessBanner && user.plan === "FREE" && user.stripeCustomerId) {
    try {
      const subs = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: "active",
        limit: 1,
      });
      const activeSub = subs.data[0];
      if (activeSub) {
        const priceId = activeSub.items.data[0]?.price?.id ?? null;
        const interval = activeSub.items.data[0]?.price?.recurring?.interval;
        const billingInterval: BillingInterval | null =
          interval === "year" ? "YEARLY" : interval === "month" ? "MONTHLY" : null;
        resolvedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            plan: "PRO" as Plan,
            billingInterval,
            stripeSubscriptionId: activeSub.id,
            stripePriceId: priceId,
            subscriptionStatus: activeSub.status as SubscriptionStatus,
            currentPeriodEnd: activeSub.items.data[0]?.current_period_end
              ? new Date(activeSub.items.data[0].current_period_end * 1000)
              : null,
          },
        });
      }
    } catch {
      // Stripe unavailable — fall through with existing DB data
    }
  }

  let invoices: BillingInvoice[] = [];
  let paymentMethodLast4: string | null = null;
  let paymentMethodBrand: string | null = null;
  let paymentMethodExpMonth: number | null = null;
  let paymentMethodExpYear: number | null = null;

  if (resolvedUser.stripeCustomerId) {
    try {
      const [stripeInvoices, customer] = await Promise.all([
        stripe.invoices.list({ customer: resolvedUser.stripeCustomerId!, limit: 12 }),
        stripe.customers.retrieve(resolvedUser.stripeCustomerId!, {
          expand: ["invoice_settings.default_payment_method"],
        }),
      ]);

      invoices = stripeInvoices.data.map((inv) => ({
        id: inv.id,
        number: inv.number ?? null,
        date: new Date(inv.created * 1000).toISOString(),
        amount: inv.amount_due,
        currency: inv.currency,
        status: inv.status ?? "unknown",
        pdfUrl: inv.invoice_pdf ?? null,
        description: inv.description ?? null,
      }));

      if (!customer.deleted) {
        const pm = customer.invoice_settings?.default_payment_method;
        if (pm && typeof pm !== "string" && pm.card) {
          paymentMethodLast4 = pm.card.last4 ?? null;
          paymentMethodBrand = pm.card.brand ?? null;
          paymentMethodExpMonth = pm.card.exp_month ?? null;
          paymentMethodExpYear = pm.card.exp_year ?? null;
        }
      }
    } catch {
      // Stripe unavailable — return empty, page still renders
    }
  }

  return {
    user: {
      id: resolvedUser.id,
      email: resolvedUser.email,
      plan: resolvedUser.plan,
      stripeCustomerId: resolvedUser.stripeCustomerId ?? null,
      stripeSubscriptionId: resolvedUser.stripeSubscriptionId ?? null,
      subscriptionStatus: resolvedUser.subscriptionStatus ?? null,
      currentPeriodEnd: resolvedUser.currentPeriodEnd?.toISOString() ?? null,
      stripePriceId: resolvedUser.stripePriceId ?? null,
    },
    proposalCount,
    profileCount,
    invoices,
    paymentMethodLast4,
    paymentMethodBrand,
    paymentMethodExpMonth,
    paymentMethodExpYear,
    showSuccessBanner,
  };
}
