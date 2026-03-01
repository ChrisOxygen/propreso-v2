"use client";

import { Zap } from "lucide-react";
import { FREE_PROPOSAL_LIMIT, FREE_PROFILE_LIMIT } from "@/features/account/types";
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

  const fillColor = isAtLimit
    ? "rgba(239,68,68,0.85)"
    : isNearLimit
    ? "rgba(234,179,8,0.85)"
    : "linear-gradient(90deg, #C8491A 0%, #D45820 100%)";

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12.5px] font-medium" style={{ color: "rgba(251,247,243,0.6)" }}>
          {label}
        </span>
        <span
          className="text-[12px] tabular-nums font-medium"
          style={{
            color: isAtLimit
              ? "rgba(239,68,68,0.9)"
              : isNearLimit
              ? "rgba(234,179,8,0.9)"
              : "rgba(251,247,243,0.4)",
          }}
        >
          {used} / {limit}
        </span>
      </div>
      {/* Track */}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: "5px", background: "rgba(255,255,255,0.07)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: fillColor }}
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
              className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[11px] font-semibold"
              style={
                isPro
                  ? {
                      background: "rgba(200,73,26,0.15)",
                      border: "1px solid rgba(200,73,26,0.3)",
                      color: "#E06030",
                      fontFamily: "var(--font-space-grotesk)",
                    }
                  : {
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(251,247,243,0.5)",
                      fontFamily: "var(--font-space-grotesk)",
                    }
              }
            >
              {isPro && <Zap size={10} fill="currentColor" />}
              {isPro ? "Pro" : "Free"}
            </span>
            <span className="text-[12px]" style={{ color: "rgba(251,247,243,0.3)" }}>
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
          <div
            className="rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{
              background: "rgba(200,73,26,0.07)",
              border: "1px solid rgba(200,73,26,0.18)",
            }}
          >
            <div>
              <p
                className="text-[13px] font-semibold"
                style={{ color: "#FBF7F3", fontFamily: "var(--font-space-grotesk)" }}
              >
                Upgrade to Pro
              </p>
              <p className="text-[12px] mt-0.5" style={{ color: "rgba(251,247,243,0.4)" }}>
                Unlimited proposals, unlimited profiles, priority AI.
              </p>
            </div>
            <button
              type="button"
              disabled
              className="shrink-0 inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-[12.5px] font-semibold opacity-60 cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #C8491A 0%, #D45820 100%)",
                color: "#fff",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              <Zap size={12} fill="currentColor" />
              Coming soon
            </button>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
