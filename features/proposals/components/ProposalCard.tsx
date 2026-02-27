"use client";

import { formatDistanceToNow } from "date-fns";
import { ExternalLink } from "lucide-react";
import type { ProposalListItem } from "@/features/proposals/server/_get-proposals";
import { ProposalStatusBar } from "./ProposalStatusBar";
import { useUpdateProposalStatus } from "@/features/proposals/hooks/use-update-proposal-status";
import type { ZProposalStatus } from "@/features/proposals/schemas/proposal-schemas";

const FORMULA_LABELS: Record<string, string> = {
  AIDA: "AIDA",
  PAS: "PAS",
  BAB: "BAB",
  STAR: "STAR",
  DIRECT: "Direct",
};

const LENGTH_LABELS: Record<string, string> = {
  SHORT: "Short",
  MEDIUM: "Medium",
  LONG: "Long",
};

interface ProposalCardProps {
  proposal: ProposalListItem;
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  const { mutate, isPending } = useUpdateProposalStatus();

  const handleStatusSelect = (status: ZProposalStatus | null) => {
    mutate({ proposalId: proposal.id, status });
  };

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Title + external link */}
      <div className="flex items-start justify-between gap-2">
        <p
          className="text-[14px] font-semibold leading-snug tracking-[-0.01em] line-clamp-2"
          style={{
            color: "#FBF7F3",
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          {proposal.jobTitle}
        </p>
        {proposal.jobUrl && (
          <a
            href={proposal.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 mt-0.5 transition-colors duration-150"
            style={{ color: "rgba(251,247,243,0.2)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(251,247,243,0.5)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(251,247,243,0.2)")
            }
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>

      {/* Profile name + relative date */}
      <div className="flex items-center gap-2 mt-1.5">
        <span
          className="text-[11.5px]"
          style={{
            color: "rgba(251,247,243,0.38)",
            fontFamily: "var(--font-inter)",
          }}
        >
          {proposal.profile.name}
        </span>
        <span style={{ color: "rgba(255,255,255,0.12)", fontSize: "11px" }}>
          ·
        </span>
        <span
          className="text-[11.5px]"
          style={{
            color: "rgba(251,247,243,0.25)",
            fontFamily: "var(--font-inter)",
          }}
        >
          {formatDistanceToNow(new Date(proposal.createdAt), {
            addSuffix: true,
          })}
        </span>
      </div>

      {/* Formula + length badges */}
      <div className="flex items-center gap-1.5 mt-2.5">
        <span
          className="px-2 py-0.5 rounded text-[10.5px] font-semibold uppercase tracking-wide"
          style={{
            background: "rgba(200,73,26,0.12)",
            border: "1px solid rgba(200,73,26,0.22)",
            color: "rgba(200,73,26,0.75)",
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          {FORMULA_LABELS[proposal.formula] ?? proposal.formula}
        </span>
        <span
          className="px-2 py-0.5 rounded text-[10.5px] font-medium"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(251,247,243,0.38)",
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          {LENGTH_LABELS[proposal.proposalLength] ?? proposal.proposalLength}
        </span>
      </div>

      <ProposalStatusBar
        status={proposal.status ?? null}
        onSelect={handleStatusSelect}
        isPending={isPending}
      />
    </div>
  );
}
