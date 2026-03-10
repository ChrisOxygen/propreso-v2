"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ProposalsData, ProposalsQueryParams } from "@/features/proposals/types";

async function fetchProposals(params: ProposalsQueryParams): Promise<ProposalsData> {
  const url = new URL("/api/v1/proposals", window.location.origin);
  if (params.page && params.page > 1) url.searchParams.set("page", String(params.page));
  if (params.status && params.status !== "ALL") url.searchParams.set("status", params.status);
  if (params.search?.trim()) url.searchParams.set("q", params.search.trim());

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch proposals");
  return res.json();
}

export function useProposals(params: ProposalsQueryParams = {}) {
  return useQuery({
    queryKey: ["proposals", params],
    queryFn: () => fetchProposals(params),
    // Keep previous page data visible while next page/filter loads
    placeholderData: keepPreviousData,
  });
}
