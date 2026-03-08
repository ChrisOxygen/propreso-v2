"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Spinner } from "@/shared/components/Spinner";
import type { ProposalListItem } from "@/features/proposals/types";
import {
  FORMULA_LABELS,
  LENGTH_LABELS,
  STATUS_CONFIG,
  PROPOSAL_TABLE_COLUMNS,
} from "@/features/proposals/constants/display";

interface ProposalsTableProps {
  proposals: ProposalListItem[];
  isFetching?: boolean;
}

export function ProposalsTable({
  proposals,
  isFetching = false,
}: ProposalsTableProps) {
  const router = useRouter();

  return (
    <div className="rounded-xl overflow-hidden relative bg-card border border-border">
      {/* Spinner shown while a page/filter transition is in-flight */}
      {isFetching && (
        <div className="absolute top-3 right-3 z-10">
          <Spinner size={14} />
        </div>
      )}

      {/* overflow-x-auto enables horizontal scroll on narrow viewports */}
      <div className="overflow-x-auto">
        <table
          className={cn(
            "w-full border-collapse min-w-170 table-fixed transition-opacity duration-150",
            isFetching && "opacity-60",
          )}
        >
          <colgroup>
            {PROPOSAL_TABLE_COLUMNS.map(({ label, width }) => (
              <col key={label} style={{ width }} />
            ))}
          </colgroup>

          <thead>
            <tr className="bg-accent border-b border-border">
              {PROPOSAL_TABLE_COLUMNS.map(({ label }) => (
                <th key={label} className="px-4 py-2.5 text-left">
                  <span className="text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap text-muted-foreground font-heading">
                    {label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {proposals.map((proposal, index) => {
              const statusCfg =
                STATUS_CONFIG[proposal.status ?? "PENDING"] ??
                STATUS_CONFIG.PENDING;
              const isLast = index === proposals.length - 1;

              return (
                <tr
                  key={proposal.id}
                  onClick={() => router.push(`/proposals/${proposal.id}`)}
                  className={cn(
                    "cursor-pointer transition-colors duration-100 hover:bg-accent",
                    !isLast && "border-b border-border",
                  )}
                >
                  {/* Job Title — max-w-0 forces truncation within the fixed column */}
                  <td className="px-4 py-3 max-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-medium truncate text-foreground font-heading">
                        {proposal.jobTitle}
                      </span>
                      {proposal.jobUrl && (
                        <a
                          href={proposal.jobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0 transition-colors duration-100 text-muted-foreground hover:text-text-secondary"
                        >
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </td>

                  {/* Profile */}
                  <td className="px-4 py-3 max-w-0">
                    <span className="text-[12.5px] truncate block whitespace-nowrap text-text-secondary">
                      {proposal.profile.name}
                    </span>
                  </td>

                  {/* Formula */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded text-[10.5px] font-semibold uppercase tracking-wide bg-accent border border-primary/20 text-primary font-heading">
                      {FORMULA_LABELS[proposal.formula] ?? proposal.formula}
                    </span>
                  </td>

                  {/* Length */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-[12px] text-muted-foreground">
                      {LENGTH_LABELS[proposal.proposalLength] ??
                        proposal.proposalLength}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border",
                        statusCfg.className,
                      )}
                    >
                      {statusCfg.label}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-[11.5px] text-muted-foreground">
                      {formatDistanceToNow(new Date(proposal.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
