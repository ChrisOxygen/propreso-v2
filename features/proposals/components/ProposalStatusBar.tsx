"use client";

import { MessageCircle, Trophy, Clock } from "lucide-react";
import type { ZProposalStatus } from "@/features/proposals/schemas/proposal-schemas";

interface StatusOption {
  value: ZProposalStatus;
  label: string;
  Icon: React.ElementType;
  activeColor: string;
  activeBorder: string;
  activeBg: string;
  activeGlow: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  {
    value: "REPLIED",
    label: "Replied",
    Icon: MessageCircle,
    activeColor: "#60A5FA",
    activeBorder: "rgba(96,165,250,0.45)",
    activeBg: "rgba(96,165,250,0.12)",
    activeGlow: "0 0 10px rgba(96,165,250,0.18)",
  },
  {
    value: "WON",
    label: "Won",
    Icon: Trophy,
    activeColor: "#34D399",
    activeBorder: "rgba(52,211,153,0.45)",
    activeBg: "rgba(52,211,153,0.12)",
    activeGlow: "0 0 10px rgba(52,211,153,0.18)",
  },
  {
    value: "NO_RESPONSE",
    label: "No Response",
    Icon: Clock,
    activeColor: "rgba(251,247,243,0.5)",
    activeBorder: "rgba(255,255,255,0.2)",
    activeBg: "rgba(255,255,255,0.06)",
    activeGlow: "none",
  },
];

interface ProposalStatusBarProps {
  status: ZProposalStatus | null;
  onSelect: (status: ZProposalStatus | null) => void;
  isPending?: boolean;
}

export function ProposalStatusBar({
  status,
  onSelect,
  isPending = false,
}: ProposalStatusBarProps) {
  return (
    <div
      className="flex gap-1.5 mt-3 pt-3"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {STATUS_OPTIONS.map(
        ({ value, label, Icon, activeColor, activeBorder, activeBg, activeGlow }) => {
          const isActive = status === value;
          return (
            <button
              key={value}
              type="button"
              disabled={isPending}
              onClick={() => onSelect(isActive ? null : value)}
              className="flex-1 flex items-center justify-center gap-1.5 h-7 rounded-md text-[11px] font-medium transition-all duration-150"
              style={{
                background: isActive ? activeBg : "rgba(255,255,255,0.03)",
                border: `1px solid ${isActive ? activeBorder : "rgba(255,255,255,0.07)"}`,
                color: isActive ? activeColor : "rgba(251,247,243,0.3)",
                boxShadow: isActive ? activeGlow : "none",
                cursor: isPending ? "not-allowed" : "pointer",
                opacity: isPending ? 0.6 : 1,
                fontFamily: "var(--font-inter)",
              }}
            >
              <Icon size={11} />
              {label}
            </button>
          );
        }
      )}
    </div>
  );
}
