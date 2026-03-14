import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow, format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/shared/lib/supabase/server";
import { _getProposal } from "@/features/proposals/server/_get-proposal";
import { ProposalDetailStatus } from "@/features/proposals/components/ProposalDetailStatus";
import type { ZProposalStatus } from "@/features/proposals/schemas/proposal-schemas";

const TONE_LABELS: Record<string, string> = {
  PROFESSIONAL: "Professional",
  CONVERSATIONAL: "Conversational",
  CONFIDENT: "Confident",
  FRIENDLY: "Friendly",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProposalDetailPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) notFound();

  const proposal = await _getProposal(user.id, id);

  if (!proposal) notFound();

  const content = proposal.editedContent ?? proposal.generatedContent;
  const snippet = proposal.jobDescription.slice(0, 80).trim() +
    (proposal.jobDescription.length > 80 ? "…" : "");

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl">
      {/* Back link */}
      <Link
        href="/proposals"
        className="inline-flex items-center gap-1.5 text-[12.5px] mb-5 transition-colors duration-150 text-muted-foreground hover:text-text-secondary"
      >
        <ArrowLeft size={13} />
        Back to proposals
      </Link>

      {/* Snippet heading */}
      <h1 className="text-[1.35rem] font-bold tracking-[-0.03em] leading-snug flex-1 text-foreground font-heading mb-1">
        {snippet}
      </h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-5 text-[12px] text-muted-foreground">
        <span>{proposal.profile.name}</span>
        <span className="text-border-strong">·</span>
        <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold uppercase tracking-wide bg-accent border border-primary/20 text-primary font-heading">
          {TONE_LABELS[proposal.tone] ?? proposal.tone}
        </span>
        <span className="text-border-strong">·</span>
        <span title={format(new Date(proposal.createdAt), "PPpp")}>
          {formatDistanceToNow(new Date(proposal.createdAt), { addSuffix: true })}
        </span>
      </div>

      {/* Status bar */}
      <ProposalDetailStatus
        proposalId={proposal.id}
        status={(proposal.status as ZProposalStatus) ?? null}
      />

      {/* Proposal content */}
      <div className="mt-5 rounded-xl p-5 sm:p-6 bg-card border border-border">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-4 text-muted-foreground font-heading">
          Proposal Content
        </p>
        <div className="text-[14px] leading-relaxed whitespace-pre-wrap text-foreground">
          {content}
        </div>
      </div>
    </div>
  );
}
