import { prisma } from "@/shared/lib/prisma";
import { stripe } from "@/shared/lib/stripe";
import { startOfMonth } from "date-fns";
import type { BillingData, BillingInvoice } from "@/features/billing/types";

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

  let invoices: BillingInvoice[] = [];
  let paymentMethodLast4: string | null = null;
  let paymentMethodBrand: string | null = null;
  let paymentMethodExpMonth: number | null = null;
  let paymentMethodExpYear: number | null = null;

  if (user.stripeCustomerId) {
    try {
      const [stripeInvoices, customer] = await Promise.all([
        stripe.invoices.list({ customer: user.stripeCustomerId, limit: 12 }),
        stripe.customers.retrieve(user.stripeCustomerId, {
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
      id: user.id,
      email: user.email,
      plan: user.plan,
      stripeCustomerId: user.stripeCustomerId ?? null,
      stripeSubscriptionId: user.stripeSubscriptionId ?? null,
      subscriptionStatus: user.subscriptionStatus ?? null,
      currentPeriodEnd: user.currentPeriodEnd?.toISOString() ?? null,
      stripePriceId: user.stripePriceId ?? null,
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
