"use client";

import { useState } from "react";
import { Check, Zap, Loader2 } from "lucide-react";
import { SectionCard, SectionHeader } from "./shared";
import { useCreateCheckout } from "@/features/billing/hooks/use-create-checkout";
import {
  PRO_MONTHLY_PRICE_USD,
  PRO_ANNUAL_MONTHLY_USD,
  PRO_ANNUAL_TOTAL_USD,
} from "@/features/billing/types";

const FREE_FEATURES = [
  "10 proposals per month",
  "2 freelancer profiles",
  "All 5 AI writing formulas",
  "All tone options",
];

const PRO_FEATURES = [
  "Unlimited proposals",
  "Unlimited profiles",
  "All 5 AI writing formulas",
  "All tone options",
  "Priority support",
];

type Interval = "monthly" | "annual";

export function PlanComparisonCard() {
  const [interval, setInterval] = useState<Interval>("monthly");
  const { mutate: createCheckout, isPending } = useCreateCheckout();

  const monthlyPriceId = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID ?? "";
  const annualPriceId = process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID ?? "";
  const activePriceId = interval === "monthly" ? monthlyPriceId : annualPriceId;

  function handleUpgrade() {
    if (!activePriceId) return;
    createCheckout(activePriceId);
  }

  return (
    <SectionCard>
      <SectionHeader
        title="Upgrade to Pro"
        description="Unlock unlimited proposals and profiles."
      />
      <div className="p-5 flex flex-col gap-5">
        {/* Billing interval toggle */}
        <div className="flex items-center gap-1 self-start">
          <div className="flex items-center rounded-lg p-0.5 gap-0.5 bg-muted border border-border">
            {(["monthly", "annual"] as const).map((iv) => (
              <button
                key={iv}
                type="button"
                onClick={() => setInterval(iv)}
                className={`h-7 px-3 rounded-md text-[12px] font-medium font-heading transition-all duration-150 ${
                  interval === iv
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-text-secondary"
                }`}
              >
                {iv === "monthly" ? "Monthly" : "Annual"}
              </button>
            ))}
          </div>
          {interval === "annual" && (
            <span className="text-[11px] font-semibold font-heading px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Save 20%
            </span>
          )}
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Free card */}
          <div className="rounded-xl p-4 flex flex-col gap-3 bg-muted border border-border">
            <div>
              <p className="text-[12px] font-medium font-heading text-muted-foreground">Free</p>
              <p className="text-[22px] font-bold tracking-[-0.03em] mt-0.5 font-heading text-foreground">
                $0
                <span className="text-[13px] font-normal ml-1 text-muted-foreground">/mo</span>
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={12} className="mt-0.5 shrink-0 text-muted-foreground" />
                  <span className="text-[12px] text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto h-8 rounded-lg flex items-center justify-center text-[12px] font-medium font-heading bg-background border border-border text-muted-foreground">
              Current plan
            </div>
          </div>

          {/* Pro card */}
          <div className="rounded-xl p-4 flex flex-col gap-3 bg-accent border border-primary/20">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[12px] font-medium font-heading text-primary">Pro</p>
                <span className="text-[10px] font-semibold font-heading px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Recommended
                </span>
              </div>
              <p className="text-[22px] font-bold tracking-[-0.03em] mt-0.5 font-heading text-foreground">
                ${interval === "monthly" ? PRO_MONTHLY_PRICE_USD : PRO_ANNUAL_MONTHLY_USD}
                <span className="text-[13px] font-normal ml-1 text-muted-foreground">/mo</span>
              </p>
              {interval === "annual" && (
                <p className="text-[11px] mt-0.5 text-muted-foreground">
                  Billed ${PRO_ANNUAL_TOTAL_USD}/year
                </p>
              )}
            </div>
            <ul className="flex flex-col gap-2">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={12} className="mt-0.5 shrink-0 text-primary" />
                  <span className="text-[12px] text-text-secondary">{f}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleUpgrade}
              disabled={isPending || !activePriceId}
              className="mt-auto h-8 rounded-lg flex items-center justify-center gap-1.5 text-[12.5px] font-semibold font-heading transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary-hover"
            >
              {isPending ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Zap size={12} fill="currentColor" />
              )}
              {isPending ? "Redirecting…" : "Upgrade to Pro"}
            </button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
