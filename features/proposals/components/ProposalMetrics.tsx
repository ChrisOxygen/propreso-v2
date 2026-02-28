"use client";

import { FileText, Trophy, MessageCircle } from "lucide-react";
import type { ProposalListItem } from "@/features/proposals/server/_get-proposals";

interface ProposalMetricsProps {
  proposals: ProposalListItem[];
}

export function ProposalMetrics({ proposals }: ProposalMetricsProps) {
  const total = proposals.length;
  const won = proposals.filter((p) => p.status === "WON").length;
  const replied = proposals.filter((p) => p.status === "REPLIED").length;
  const responseRate =
    total > 0 ? Math.round(((won + replied) / total) * 100) : 0;

  const cards = [
    {
      label: "Total Proposals",
      value: total,
      icon: FileText,
      iconColor: "rgba(251,247,243,0.6)",
      iconBg: "rgba(255,255,255,0.06)",
      valueColor: "#FBF7F3",
    },
    {
      label: "Won",
      value: won,
      icon: Trophy,
      iconColor: "#34D399",
      iconBg: "rgba(52,211,153,0.1)",
      valueColor: "#34D399",
    },
    {
      label: "Response Rate",
      value: `${responseRate}%`,
      icon: MessageCircle,
      iconColor: "#60A5FA",
      iconBg: "rgba(96,165,250,0.1)",
      valueColor: "#FBF7F3",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {cards.map(({ label, value, icon: Icon, iconColor, iconBg, valueColor }) => (
        <div
          key={label}
          className="rounded-xl p-4 flex items-start gap-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: iconBg }}
          >
            <Icon size={15} style={{ color: iconColor }} />
          </div>
          <div className="min-w-0">
            <p
              className="text-[22px] sm:text-[26px] font-bold tracking-tight leading-none"
              style={{
                color: valueColor,
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              {value}
            </p>
            <p
              className="text-[11px] sm:text-[12px] mt-1.5 leading-tight"
              style={{
                color: "rgba(251,247,243,0.35)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
