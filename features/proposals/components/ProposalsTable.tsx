"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Spinner } from "@/shared/components/Spinner";
import type { ProposalListItem } from "@/features/proposals/types";

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

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  WON: {
    label: "Won",
    color: "#34D399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.28)",
  },
  REPLIED: {
    label: "Replied",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.1)",
    border: "rgba(96,165,250,0.28)",
  },
  NO_RESPONSE: {
    label: "No Response",
    color: "rgba(251,247,243,0.45)",
    bg: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.12)",
  },
  PENDING: {
    label: "Pending",
    color: "rgba(251,247,243,0.32)",
    bg: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.07)",
  },
};

const COLUMNS = [
  { label: "Job Title", width: "40%" },
  { label: "Profile", width: "17%" },
  { label: "Formula", width: "10%" },
  { label: "Length", width: "9%" },
  { label: "Status", width: "13%" },
  { label: "Date", width: "11%" },
] as const;

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
    <div
      className="rounded-xl overflow-hidden relative"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
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
            "w-full border-collapse min-w-170  transition-opacity duration-150",
            isFetching && "opacity-60",
          )}
          style={{ tableLayout: "fixed" }}
        >
          <colgroup>
            {COLUMNS.map(({ label, width }) => (
              <col key={label} style={{ width }} />
            ))}
          </colgroup>

          <thead>
            <tr
              style={{
                background: "rgba(255,255,255,0.025)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {COLUMNS.map(({ label }) => (
                <th key={label} className="px-4 py-2.5 text-left">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                    style={{
                      color: "rgba(251,247,243,0.28)",
                      fontFamily: "var(--font-space-grotesk)",
                    }}
                  >
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
                  className="cursor-pointer transition-colors duration-100 hover:bg-[rgba(255,255,255,0.025)]"
                  style={{
                    borderBottom: isLast
                      ? "none"
                      : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Job Title — max-w-0 forces truncation within the fixed column */}
                  <td className="px-4 py-3 max-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[13px] font-medium truncate"
                        style={{
                          color: "#FBF7F3",
                          fontFamily: "var(--font-space-grotesk)",
                        }}
                      >
                        {proposal.jobTitle}
                      </span>
                      {proposal.jobUrl && (
                        <a
                          href={proposal.jobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0 transition-colors duration-100"
                          style={{ color: "rgba(251,247,243,0.2)" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color =
                              "rgba(251,247,243,0.55)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color =
                              "rgba(251,247,243,0.2)")
                          }
                        >
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </td>

                  {/* Profile */}
                  <td className="px-4 py-3 max-w-0">
                    <span
                      className="text-[12.5px] truncate block whitespace-nowrap"
                      style={{
                        color: "rgba(251,247,243,0.48)",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {proposal.profile.name}
                    </span>
                  </td>

                  {/* Formula */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className="inline-block px-2 py-0.5 rounded text-[10.5px] font-semibold uppercase tracking-wide"
                      style={{
                        background: "rgba(200,73,26,0.1)",
                        border: "1px solid rgba(200,73,26,0.22)",
                        color: "rgba(200,73,26,0.85)",
                        fontFamily: "var(--font-space-grotesk)",
                      }}
                    >
                      {FORMULA_LABELS[proposal.formula] ?? proposal.formula}
                    </span>
                  </td>

                  {/* Length */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className="text-[12px]"
                      style={{
                        color: "rgba(251,247,243,0.42)",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {LENGTH_LABELS[proposal.proposalLength] ??
                        proposal.proposalLength}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium"
                      style={{
                        background: statusCfg.bg,
                        border: `1px solid ${statusCfg.border}`,
                        color: statusCfg.color,
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {statusCfg.label}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 whitespace-nowrap">
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
