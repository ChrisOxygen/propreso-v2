import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FileText } from "lucide-react";
import { prisma } from "@/shared/lib/prisma";

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  WON: {
    label: "Won",
    color: "#34D399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.25)",
  },
  REPLIED: {
    label: "Replied",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.1)",
    border: "rgba(96,165,250,0.25)",
  },
  NO_RESPONSE: {
    label: "No Response",
    color: "rgba(251,247,243,0.42)",
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.1)",
  },
  PENDING: {
    label: "Pending",
    color: "rgba(251,247,243,0.3)",
    bg: "rgba(255,255,255,0.025)",
    border: "rgba(255,255,255,0.07)",
  },
};

interface Props {
  userId: string;
}

export async function DashboardRecentProposals({ userId }: Props) {
  const proposals = await prisma.proposal.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      jobTitle: true,
      status: true,
      createdAt: true,
      profile: { select: { name: true } },
    },
  });

  if (proposals.length === 0) {
    return (
      <div
        className="rounded-xl px-6 py-10 flex flex-col items-center gap-3 text-center"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px dashed rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <FileText size={16} style={{ color: "rgba(251,247,243,0.22)" }} />
        </div>
        <p
          className="text-[13px]"
          style={{
            color: "rgba(251,247,243,0.35)",
            fontFamily: "var(--font-inter)",
          }}
        >
          No proposals yet. Generate your first one.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {proposals.map((proposal, index) => {
        const statusCfg =
          STATUS_CONFIG[proposal.status ?? "PENDING"] ?? STATUS_CONFIG.PENDING;
        const isLast = index === proposals.length - 1;

        return (
          <Link
            key={proposal.id}
            href={`/proposals/${proposal.id}`}
            className="flex items-center justify-between gap-4 px-4 py-3 transition-colors duration-100 hover:bg-[rgba(255,255,255,0.025)]"
            style={{
              borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="min-w-0 flex-1">
              <p
                className="text-[13px] font-medium truncate"
                style={{
                  color: "#FBF7F3",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                {proposal.jobTitle}
              </p>
              <p
                className="text-[11.5px] mt-0.5"
                style={{
                  color: "rgba(251,247,243,0.35)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {proposal.profile.name} ·{" "}
                {formatDistanceToNow(new Date(proposal.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <span
              className="shrink-0 inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium"
              style={{
                background: statusCfg.bg,
                border: `1px solid ${statusCfg.border}`,
                color: statusCfg.color,
                fontFamily: "var(--font-inter)",
              }}
            >
              {statusCfg.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
