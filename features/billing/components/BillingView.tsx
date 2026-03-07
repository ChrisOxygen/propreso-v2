"use client";

import { CheckCircle2, X } from "lucide-react";
import { useState } from "react";
import { CurrentPlanCard } from "./CurrentPlanCard";
import { PlanComparisonCard } from "./PlanComparisonCard";
import { PaymentMethodCard } from "./PaymentMethodCard";
import { InvoiceHistorySection } from "./InvoiceHistorySection";
import { CancelSubscriptionSection } from "./CancelSubscriptionSection";
import type { BillingData } from "@/features/billing/types";

export function BillingView(data: BillingData) {
  const { user, showSuccessBanner } = data;
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const isPro = user.plan === "PRO";
  const isActiveSubscription =
    isPro &&
    (user.subscriptionStatus === "active" || user.subscriptionStatus === "trialing");

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      {/* Success banner */}
      {showSuccessBanner && !bannerDismissed && (
        <div className="rounded-xl px-5 py-4 flex items-start justify-between gap-3 bg-green-50 border border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <div>
              <p className="text-[13px] font-semibold font-heading text-green-800">
                You&apos;re now on Pro!
              </p>
              <p className="text-[12px] mt-0.5 text-green-700">
                Unlimited proposals and profiles are now unlocked.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            className="shrink-0 mt-0.5 text-green-600 hover:text-green-800"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Current plan */}
      <CurrentPlanCard
        user={data.user}
        proposalCount={data.proposalCount}
        profileCount={data.profileCount}
      />

      {/* Upgrade section — Free users only */}
      {!isPro && <PlanComparisonCard />}

      {/* Payment method — Pro users only */}
      {isPro && (
        <PaymentMethodCard
          paymentMethodLast4={data.paymentMethodLast4}
          paymentMethodBrand={data.paymentMethodBrand}
          paymentMethodExpMonth={data.paymentMethodExpMonth}
          paymentMethodExpYear={data.paymentMethodExpYear}
        />
      )}

      {/* Invoice history — always visible, shows empty state for Free */}
      <InvoiceHistorySection invoices={data.invoices} />

      {/* Cancel subscription — only for active Pro subscriptions */}
      {isActiveSubscription && <CancelSubscriptionSection />}
    </div>
  );
}
