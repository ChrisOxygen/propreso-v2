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
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  active: {
    label: "Active",
    className: "bg-green-50 text-green-700 border border-green-200",
    icon: CheckCircle2,
  },
  trialing: {
    label: "Trial",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
    icon: Clock,
  },
  past_due: {
    label: "Past due",
    className: "bg-error-subtle text-destructive border border-destructive/20",
    icon: AlertCircle,
  },
  canceled: {
    label: "Canceled",
    className: "bg-muted text-muted-foreground border border-border",
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
              className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${
                isPro
                  ? "bg-primary/10 border border-primary/25"
                  : "bg-muted border border-border"
              }`}
            >
              <Zap
                size={15}
                fill={isPro ? "currentColor" : "none"}
                className={isPro ? "text-primary" : "text-muted-foreground"}
              />
            </div>
            <div>
              <p className="text-[14px] font-semibold font-heading text-foreground">
                {isPro ? "Pro" : "Free"}
              </p>
              <p className="text-[12px] text-muted-foreground">
                {isPro
                  ? "Unlimited proposals & profiles"
                  : `${FREE_PROFILE_LIMIT} profiles · ${FREE_PROPOSAL_LIMIT} proposals/month`}
              </p>
            </div>
          </div>

          {/* Status badge — Pro only */}
          {isPro && status && StatusIcon && (
            <span
              className={`inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[11px] font-semibold font-heading shrink-0 ${status.className}`}
            >
              <StatusIcon size={10} />
              {status.label}
            </span>
          )}
        </div>

        {/* Renewal info — Pro only */}
        {isPro && user.currentPeriodEnd && (
          <div className="rounded-lg px-4 py-3 flex items-center justify-between gap-2 bg-muted border border-border">
            <span className="text-[12px] text-muted-foreground">
              {user.subscriptionStatus === "canceled" ? "Access until" : "Next renewal"}
            </span>
            <span className="text-[12.5px] font-medium tabular-nums text-text-secondary">
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

  const fillClass = isAtLimit ? "bg-destructive" : isNear ? "bg-amber-500" : "bg-primary";
  const countClass = isAtLimit ? "text-destructive" : isNear ? "text-amber-600" : "text-muted-foreground";

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[12px] font-medium text-text-secondary">{label}</span>
        <span className={`text-[11.5px] tabular-nums ${countClass}`}>
          {used} / {limit}
        </span>
      </div>
      <div className="w-full h-1 rounded-full overflow-hidden bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-500 ${fillClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
