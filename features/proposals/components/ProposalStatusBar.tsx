"use client";

import { MessageCircle, Trophy, Clock } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { ZProposalStatus } from "@/features/proposals/schemas/proposal-schemas";

interface StatusOption {
  value: ZProposalStatus;
  label: string;
  Icon: React.ElementType;
  activeClass: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  {
    value: "REPLIED",
    label: "Replied",
    Icon: MessageCircle,
    activeClass: "bg-blue-50 border-blue-200 text-blue-600",
  },
  {
    value: "WON",
    label: "Won",
    Icon: Trophy,
    activeClass: "bg-emerald-50 border-emerald-200 text-emerald-600",
  },
  {
    value: "NO_RESPONSE",
    label: "No Response",
    Icon: Clock,
    activeClass: "bg-muted border-border-strong text-text-secondary",
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
    <div className="flex gap-1.5 mt-3 pt-3 border-t border-border">
      {STATUS_OPTIONS.map(({ value, label, Icon, activeClass }) => {
        const isActive = status === value;
        return (
          <button
            key={value}
            type="button"
            disabled={isPending}
            onClick={() => onSelect(isActive ? null : value)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 h-7 rounded-md text-[11px] font-medium border transition-all duration-150",
              isActive
                ? activeClass
                : "bg-background border-border text-muted-foreground hover:bg-accent hover:text-text-secondary",
              isPending && "opacity-60 cursor-not-allowed",
            )}
          >
            <Icon size={11} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
