"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { FREE_PROPOSAL_LIMIT, FREE_PROFILE_LIMIT } from "@/features/billing/constants/plans";
import { SectionCard, SectionHeader } from "./shared";

interface UsageSectionProps {
  plan: "FREE" | "PRO";
  proposalCount: number;
  profileCount: number;
}

function UsageBar({
  label,
  used,
  limit,
}: {
  label: string;
  used: number;
  limit: number;
}) {
  const pct = Math.min((used / limit) * 100, 100);
  const isNearLimit = pct >= 80;
  const isAtLimit = pct >= 100;

  const fillClass = isAtLimit
    ? "bg-destructive"
    : isNearLimit
    ? "bg-amber-500"
    : "bg-primary";

  const countClass = isAtLimit
    ? "text-destructive"
    : isNearLimit
    ? "text-amber-600"
    : "text-muted-foreground";

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12.5px] font-medium text-text-secondary">{label}</span>
        <span className={`text-[12px] tabular-nums font-medium ${countClass}`}>
          {used} / {limit}
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-500 ${fillClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function UsageSection({ plan, proposalCount, profileCount }: UsageSectionProps) {
  const isPro = plan === "PRO";

  return (
    <SectionCard>
      <SectionHeader
        title="Plan & Usage"
        description={
          isPro
            ? "You're on Pro — enjoy unlimited access."
            : "Free plan · resets on the 1st of each month."
        }
      />
      <div className="p-5 flex flex-col gap-5">
        {/* Plan badge row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[11px] font-semibold font-heading ${
                isPro
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-muted text-muted-foreground border border-border"
              }`}
            >
              {isPro && <Zap size={10} fill="currentColor" />}
              {isPro ? "Pro" : "Free"}
            </span>
            <span className="text-[12px] text-muted-foreground">
              {isPro ? "Unlimited proposals & profiles" : "2 profiles · 10 proposals/month"}
            </span>
          </div>
        </div>

        {/* Usage bars — only on FREE */}
        {!isPro && (
          <div className="flex flex-col gap-4">
            <UsageBar
              label="Proposals this month"
              used={proposalCount}
              limit={FREE_PROPOSAL_LIMIT}
            />
            <UsageBar
              label="Profiles"
              used={profileCount}
              limit={FREE_PROFILE_LIMIT}
            />
          </div>
        )}

        {/* Upgrade CTA — FREE only */}
        {!isPro && (
          <div className="rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-accent border border-primary/20">
            <div>
              <p className="text-[13px] font-semibold font-heading text-foreground">
                Upgrade to Pro
              </p>
              <p className="text-[12px] mt-0.5 text-muted-foreground">
                Unlimited proposals, unlimited profiles, priority AI.
              </p>
            </div>
            <Link
              href="/billing"
              className="shrink-0 inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-[12.5px] font-semibold font-heading bg-primary text-primary-foreground hover:bg-primary-hover transition-colors duration-150"
            >
              <Zap size={12} fill="currentColor" />
              Upgrade to Pro
            </Link>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
