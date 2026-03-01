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
          <div
            className="flex items-center rounded-lg p-0.5 gap-0.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {(["monthly", "annual"] as const).map((iv) => (
              <button
                key={iv}
                type="button"
                onClick={() => setInterval(iv)}
                className="h-7 px-3 rounded-md text-[12px] font-medium transition-all duration-150"
                style={
                  interval === iv
                    ? {
                        background: "rgba(255,255,255,0.09)",
                        color: "#FBF7F3",
                        fontFamily: "var(--font-space-grotesk)",
                      }
                    : {
                        color: "rgba(251,247,243,0.4)",
                        fontFamily: "var(--font-space-grotesk)",
                      }
                }
              >
                {iv === "monthly" ? "Monthly" : "Annual"}
              </button>
            ))}
          </div>
          {interval === "annual" && (
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(200,73,26,0.12)",
                color: "#E06030",
                border: "1px solid rgba(200,73,26,0.2)",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              Save 20%
            </span>
          )}
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Free card */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div>
              <p
                className="text-[12px] font-medium"
                style={{
                  color: "rgba(251,247,243,0.4)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                Free
              </p>
              <p
                className="text-[22px] font-bold tracking-[-0.03em] mt-0.5"
                style={{ color: "#FBF7F3", fontFamily: "var(--font-space-grotesk)" }}
              >
                $0
                <span
                  className="text-[13px] font-normal ml-1"
                  style={{ color: "rgba(251,247,243,0.35)" }}
                >
                  /mo
                </span>
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check
                    size={12}
                    className="mt-0.5 shrink-0"
                    style={{ color: "rgba(251,247,243,0.3)" }}
                  />
                  <span
                    className="text-[12px]"
                    style={{ color: "rgba(251,247,243,0.4)" }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <div
              className="mt-auto h-8 rounded-lg flex items-center justify-center text-[12px] font-medium"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "rgba(251,247,243,0.35)",
                border: "1px solid rgba(255,255,255,0.07)",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              Current plan
            </div>
          </div>

          {/* Pro card */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden"
            style={{
              background: "rgba(200,73,26,0.06)",
              border: "1px solid rgba(200,73,26,0.22)",
            }}
          >
            {/* Subtle glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top right, rgba(200,73,26,0.08) 0%, transparent 70%)",
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-2">
                <p
                  className="text-[12px] font-medium"
                  style={{
                    color: "#E06030",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  Pro
                </p>
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{
                    background: "rgba(200,73,26,0.15)",
                    color: "#E06030",
                    border: "1px solid rgba(200,73,26,0.25)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  Recommended
                </span>
              </div>
              <p
                className="text-[22px] font-bold tracking-[-0.03em] mt-0.5"
                style={{ color: "#FBF7F3", fontFamily: "var(--font-space-grotesk)" }}
              >
                ${interval === "monthly" ? PRO_MONTHLY_PRICE_USD : PRO_ANNUAL_MONTHLY_USD}
                <span
                  className="text-[13px] font-normal ml-1"
                  style={{ color: "rgba(251,247,243,0.5)" }}
                >
                  /mo
                </span>
              </p>
              {interval === "annual" && (
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(251,247,243,0.35)" }}>
                  Billed ${PRO_ANNUAL_TOTAL_USD}/year
                </p>
              )}
            </div>
            <ul className="flex flex-col gap-2 relative">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check
                    size={12}
                    className="mt-0.5 shrink-0"
                    style={{ color: "#E06030" }}
                  />
                  <span className="text-[12px]" style={{ color: "rgba(251,247,243,0.7)" }}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleUpgrade}
              disabled={isPending || !activePriceId}
              className="relative mt-auto h-8 rounded-lg flex items-center justify-center gap-1.5 text-[12.5px] font-semibold transition-opacity duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #C8491A 0%, #D45820 100%)",
                color: "#fff",
                fontFamily: "var(--font-space-grotesk)",
              }}
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
