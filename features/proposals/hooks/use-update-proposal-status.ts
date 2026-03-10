"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProposalsData } from "@/features/proposals/types";
import type { ZProposalStatus } from "@/features/proposals/schemas/proposal-schemas";

interface UpdateStatusPayload {
  proposalId: string;
  status: ZProposalStatus | null;
}

export function useUpdateProposalStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposalId, status }: UpdateStatusPayload) => {
      const res = await fetch(`/api/v1/proposals/${proposalId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message ?? "Failed to update status");
      }
      return res.json();
    },

    onMutate: async ({ proposalId, status }) => {
      await queryClient.cancelQueries({ queryKey: ["proposals"] });

      // Snapshot all ["proposals", ...] cache entries for rollback
      const previousEntries = queryClient.getQueriesData<ProposalsData>({
        queryKey: ["proposals"],
      });

      // Optimistically update each cached page/filter combination
      previousEntries.forEach(([queryKey, data]) => {
        if (!data) return;
        queryClient.setQueryData<ProposalsData>(queryKey, {
          ...data,
          proposals: data.proposals.map((p) =>
            p.id === proposalId ? { ...p, status } : p
          ),
        });
      });

      return { previousEntries };
    },

    onError: (_err, _variables, context) => {
      context?.previousEntries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });
}
