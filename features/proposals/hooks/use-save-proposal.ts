"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ZGenerateProposal } from "@/features/proposals/schemas/generate-schema";

export interface SaveProposalPayload extends ZGenerateProposal {
  generatedContent: string;
}

async function saveProposal(payload: SaveProposalPayload): Promise<{ id: string }> {
  const res = await fetch("/api/v1/proposals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message ?? "Failed to save proposal");
  }

  return res.json();
}

export function useSaveProposal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveProposal,
    onSuccess: () => {
      // Invalidate proposals list so it shows the new entry
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });
}
