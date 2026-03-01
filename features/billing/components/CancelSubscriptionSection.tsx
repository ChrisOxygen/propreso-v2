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
          <p className="text-[13px]" style={{ color: "rgba(251,247,243,0.55)" }}>
            You can cancel your subscription at any time. You&apos;ll retain Pro
            access until your current billing period ends.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openPortal()}
          disabled={isPending}
          className="shrink-0 inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-[12px] font-medium transition-opacity duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "rgba(239,68,68,0.75)",
            fontFamily: "var(--font-space-grotesk)",
          }}
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
