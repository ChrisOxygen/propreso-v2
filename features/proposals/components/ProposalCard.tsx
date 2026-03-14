"use client";

import { formatDistanceToNow } from "date-fns";
import type { ProposalListItem } from "@/features/proposals/server/_get-proposals";
import { ProposalStatusBar } from "./ProposalStatusBar";
import { useUpdateProposalStatus } from "@/features/proposals/hooks/use-update-proposal-status";
import type { ZProposalStatus } from "@/features/proposals/schemas/proposal-schemas";

const TONE_LABELS: Record<string, string> = {
  PROFESSIONAL: "Professional",
  CONVERSATIONAL: "Conversational",
  CONFIDENT: "Confident",
  FRIENDLY: "Friendly",
};

interface ProposalCardProps {
  proposal: ProposalListItem;
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  const { mutate, isPending } = useUpdateProposalStatus();

  const handleStatusSelect = (status: ZProposalStatus | null) => {
    mutate({ proposalId: proposal.id, status });
  };

  const snippet = proposal.jobDescription
    ? proposal.jobDescription.slice(0, 80).trim() + (proposal.jobDescription.length > 80 ? "…" : "")
    : "No description";

  return (
    <div className="rounded-xl p-4 bg-card border border-border">
      {/* Job post snippet */}
      <p className="text-[13.5px] font-medium leading-snug tracking-[-0.01em] line-clamp-2 text-foreground">
        {snippet}
      </p>

      {/* Profile name + relative date */}
      <div className="flex items-center gap-2 mt-1.5">
        <span className="text-[11.5px] text-muted-foreground">
          {proposal.profile.name}
        </span>
        <span className="text-border-strong text-[11px]">·</span>
        <span className="text-[11.5px] text-muted-foreground">
          {formatDistanceToNow(new Date(proposal.createdAt), {
            addSuffix: true,
          })}
        </span>
      </div>

      {/* Tone badge */}
      <div className="flex items-center gap-1.5 mt-2.5">
        <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold uppercase tracking-wide bg-accent border border-primary/20 text-primary font-heading">
          {TONE_LABELS[proposal.tone] ?? proposal.tone}
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
