import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FileText } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { prisma } from "@/shared/lib/prisma";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  WON: {
    label: "Won",
    className: "bg-emerald-50 border-emerald-200 text-emerald-700",
  },
  REPLIED: {
    label: "Replied",
    className: "bg-blue-50 border-blue-200 text-blue-700",
  },
  NO_RESPONSE: {
    label: "No Response",
    className: "bg-muted border-border text-muted-foreground",
  },
  PENDING: {
    label: "Pending",
    className: "bg-background border-border text-muted-foreground",
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
      <div className="rounded-xl px-6 py-10 flex flex-col items-center gap-3 text-center bg-card border border-dashed border-border">
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-muted">
          <FileText size={16} className="text-muted-foreground" />
        </div>
        <p className="text-[13px] text-muted-foreground">
          No proposals yet. Generate your first one.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border">
      {proposals.map((proposal, index) => {
        const statusCfg =
          STATUS_CONFIG[proposal.status ?? "PENDING"] ?? STATUS_CONFIG.PENDING;
        const isLast = index === proposals.length - 1;

        return (
          <Link
            key={proposal.id}
            href={`/proposals/${proposal.id}`}
            className={cn(
              "flex items-center justify-between gap-4 px-4 py-3 transition-colors duration-100 hover:bg-accent",
              !isLast && "border-b border-border",
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium truncate text-foreground font-heading">
                {proposal.jobTitle}
              </p>
              <p className="text-[11.5px] mt-0.5 text-muted-foreground">
                {proposal.profile.name} ·{" "}
                {formatDistanceToNow(new Date(proposal.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <span
              className={cn(
                "shrink-0 inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border",
                statusCfg.className,
              )}
            >
              {statusCfg.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
