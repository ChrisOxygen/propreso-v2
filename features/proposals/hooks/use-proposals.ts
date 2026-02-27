"use client";

import { useQuery } from "@tanstack/react-query";
import type { ProposalListItem } from "@/features/proposals/server/_get-proposals";

async function fetchProposals(): Promise<ProposalListItem[]> {
  const res = await fetch("/api/proposals");
  if (!res.ok) throw new Error("Failed to fetch proposals");
  return res.json();
}

export function useProposals() {
  return useQuery({
    queryKey: ["proposals"],
    queryFn: fetchProposals,
  });
}
