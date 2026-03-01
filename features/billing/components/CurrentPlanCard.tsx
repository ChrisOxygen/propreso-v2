"use client";

import { Zap, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { SectionCard, SectionHeader } from "./shared";
import type { BillingData } from "@/features/billing/types";
import { FREE_PROPOSAL_LIMIT, FREE_PROFILE_LIMIT } from "@/features/billing/types";

type Props = Pick<
  BillingData,
  "user" | "proposalCount" | "profileCount"
>;

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; icon: typeof CheckCircle2 }
> = {
  active: {
    label: "Active",
    color: "rgba(34,197,94,0.9)",
    bg: "rgba(34,197,94,0.1)",
    icon: CheckCircle2,
  },
  trialing: {
    label: "Trial",
    color: "rgba(234,179,8,0.9)",
    bg: "rgba(234,179,8,0.1)",
    icon: Clock,
  },
  past_due: {
    label: "Past due",
    color: "rgba(239,68,68,0.9)",
    bg: "rgba(239,68,68,0.1)",
    icon: AlertCircle,
  },
  canceled: {
    label: "Canceled",
    color: "rgba(251,247,243,0.4)",
    bg: "rgba(255,255,255,0.05)",
    icon: AlertCircle,
  },
};

export function CurrentPlanCard({ user, proposalCount, profileCount }: Props) {
  const isPro = user.plan === "PRO";
  const status = user.subscriptionStatus
    ? STATUS_CONFIG[user.subscriptionStatus] ?? STATUS_CONFIG.active
    : null;
  const StatusIcon = status?.icon;

  const proposalPct = Math.min((proposalCount / FREE_PROPOSAL_LIMIT) * 100, 100);
  const profilePct = Math.min((profileCount / FREE_PROFILE_LIMIT) * 100, 100);

  return (
    <SectionCard>
      <SectionHeader
        title="Current Plan"
        description={
          isPro
            ? "You have full access to all Pro features."
            : "Free plan · limits reset on the 1st of each month."
        }
      />
      <div className="p-5 flex flex-col gap-5">
        {/* Plan row */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
              style={{
                background: isPro
                  ? "rgba(200,73,26,0.12)"
                  : "rgba(255,255,255,0.05)",
                border: isPro
                  ? "1px solid rgba(200,73,26,0.25)"
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Zap
                size={15}
                fill={isPro ? "#C8491A" : "transparent"}
                style={{ color: isPro ? "#C8491A" : "rgba(251,247,243,0.35)" }}
              />
            </div>
            <div>
              <p
                className="text-[14px] font-semibold"
                style={{
                  color: "#FBF7F3",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                {isPro ? "Pro" : "Free"}
              </p>
              <p className="text-[12px]" style={{ color: "rgba(251,247,243,0.38)" }}>
                {isPro
                  ? "Unlimited proposals & profiles"
                  : `${FREE_PROFILE_LIMIT} profiles · ${FREE_PROPOSAL_LIMIT} proposals/month`}
              </p>
            </div>
          </div>

          {/* Status badge — Pro only */}
          {isPro && status && StatusIcon && (
            <span
              className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[11px] font-semibold shrink-0"
              style={{
                background: status.bg,
                color: status.color,
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              <StatusIcon size={10} />
              {status.label}
            </span>
          )}
        </div>

        {/* Renewal info — Pro only */}
        {isPro && user.currentPeriodEnd && (
          <div
            className="rounded-lg px-4 py-3 flex items-center justify-between gap-2"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span className="text-[12px]" style={{ color: "rgba(251,247,243,0.45)" }}>
              {user.subscriptionStatus === "canceled"
                ? "Access until"
                : "Next renewal"}
            </span>
            <span
              className="text-[12.5px] font-medium tabular-nums"
              style={{ color: "rgba(251,247,243,0.75)" }}
            >
              {format(new Date(user.currentPeriodEnd), "MMM d, yyyy")}
            </span>
          </div>
        )}

        {/* Usage bars — Free only */}
        {!isPro && (
          <div className="flex flex-col gap-3.5">
            <UsageBar
              label="Proposals this month"
              used={proposalCount}
              limit={FREE_PROPOSAL_LIMIT}
              pct={proposalPct}
            />
            <UsageBar
              label="Profiles"
              used={profileCount}
              limit={FREE_PROFILE_LIMIT}
              pct={profilePct}
            />
          </div>
        )}
      </div>
    </SectionCard>
  );
}

function UsageBar({
  label,
  used,
  limit,
  pct,
}: {
  label: string;
  used: number;
  limit: number;
  pct: number;
}) {
  const isAtLimit = pct >= 100;
  const isNear = pct >= 80 && !isAtLimit;
  const fillColor = isAtLimit
    ? "rgba(239,68,68,0.85)"
    : isNear
    ? "rgba(234,179,8,0.85)"
    : "linear-gradient(90deg, #C8491A 0%, #D45820 100%)";

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-[12px] font-medium"
          style={{ color: "rgba(251,247,243,0.5)" }}
        >
          {label}
        </span>
        <span
          className="text-[11.5px] tabular-nums"
          style={{
            color: isAtLimit
              ? "rgba(239,68,68,0.9)"
              : isNear
              ? "rgba(234,179,8,0.9)"
              : "rgba(251,247,243,0.35)",
          }}
        >
          {used} / {limit}
        </span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: "4px", background: "rgba(255,255,255,0.07)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: fillColor }}
        />
      </div>
    </div>
  );
}
