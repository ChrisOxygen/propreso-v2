"use client";

import { ExternalLink, Loader2 } from "lucide-react";
import { SectionCard, SectionHeader } from "./shared";
import { useOpenPortal } from "@/features/billing/hooks/use-open-portal";

export function CancelSubscriptionSection() {
  const { mutate: openPortal, isPending } = useOpenPortal();

  return (
    <SectionCard>
      <SectionHeader
        title="Manage Subscription"
        description="Cancel or modify your plan via the Stripe portal. Changes take effect at the end of your current period."
      />
      <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-[13px] text-muted-foreground">
            You can cancel your subscription at any time. You&apos;ll retain Pro
            access until your current billing period ends.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openPortal()}
          disabled={isPending}
          className="shrink-0 inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-[12px] font-medium font-heading transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed bg-error-subtle border border-destructive/20 text-destructive hover:bg-destructive/10"
        >
          {isPending ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <ExternalLink size={12} />
          )}
          {isPending ? "Opening…" : "Cancel subscription"}
        </button>
      </div>
    </SectionCard>
  );
}
