import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow, format } from "date-fns";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { createClient } from "@/shared/lib/supabase/server";
import { _getProposal } from "@/features/proposals/server/_get-proposal";
import { ProposalDetailStatus } from "@/features/proposals/components/ProposalDetailStatus";
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

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl">
      {/* Back link */}
      <Link
        href="/proposals"
        className="inline-flex items-center gap-1.5 text-[12.5px] mb-5 transition-colors duration-150"
        style={{
          color: "rgba(251,247,243,0.38)",
          fontFamily: "var(--font-inter)",
        }}
        onMouseEnter={undefined}
      >
        <ArrowLeft size={13} />
        Back to proposals
      </Link>

      {/* Title + link */}
      <div className="flex items-start gap-3 mb-1">
        <h1
          className="text-[1.35rem] font-bold tracking-[-0.03em] leading-snug flex-1"
          style={{ color: "#FBF7F3", fontFamily: "var(--font-space-grotesk)" }}
        >
          {proposal.jobTitle}
        </h1>
        {proposal.jobUrl && (
          <a
            href={proposal.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 shrink-0 transition-colors duration-150"
            style={{ color: "rgba(251,247,243,0.25)" }}
          >
            <ExternalLink size={15} />
          </a>
        )}
      </div>

      {/* Meta row */}
      <div
        className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-5 text-[12px]"
        style={{ color: "rgba(251,247,243,0.38)", fontFamily: "var(--font-inter)" }}
      >
        <span>{proposal.profile.name}</span>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
        <span
          className="px-2 py-0.5 rounded text-[10.5px] font-semibold uppercase tracking-wide"
          style={{
            background: "rgba(200,73,26,0.1)",
            border: "1px solid rgba(200,73,26,0.22)",
            color: "rgba(200,73,26,0.85)",
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
        <span
          className="px-2 py-0.5 rounded text-[10.5px] font-medium"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(251,247,243,0.38)",
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          {TONE_LABELS[proposal.tone] ?? proposal.tone}
        </span>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
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
      <div
        className="mt-5 rounded-xl p-5 sm:p-6"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p
          className="text-[11px] font-semibold uppercase tracking-widest mb-4"
          style={{
            color: "rgba(251,247,243,0.28)",
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          Proposal Content
        </p>
        <div
          className="text-[14px] leading-relaxed whitespace-pre-wrap"
          style={{
            color: "rgba(251,247,243,0.82)",
            fontFamily: "var(--font-inter)",
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
