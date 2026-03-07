"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { ProposalsPagination as PaginationData } from "@/features/proposals/types";

function getPageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

interface ProposalsPaginationProps {
  pagination: PaginationData;
}

export function ProposalsPagination({ pagination }: ProposalsPaginationProps) {
  const { total, page, totalPages, limit } = pagination;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (p === 1) {
      params.delete("page");
    } else {
      params.set("page", String(p));
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  if (total === 0) return null;

  const pages = getPageRange(page, totalPages);

  return (
    <div className="flex items-center justify-between gap-4 pt-2">
      {/* Count */}
      <span className="text-[12px] shrink-0 text-muted-foreground">
        {from}–{to} of {total}
      </span>

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          type="button"
          disabled={page === 1}
          onClick={() => goToPage(page - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-100 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-accent text-text-secondary"
        >
          <ChevronLeft size={15} />
        </button>

        {/* Pages */}
        {pages.map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}`}
              className="w-8 h-8 flex items-center justify-center text-[12px] text-muted-foreground"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => goToPage(p)}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-lg text-[12px] font-medium transition-colors duration-100",
                p === page
                  ? "bg-accent border border-primary/30 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-text-secondary",
              )}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => goToPage(page + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-100 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-accent text-text-secondary"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
