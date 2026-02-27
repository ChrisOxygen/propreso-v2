"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProposalListItem } from "@/features/proposals/server/_get-proposals";
import type { ZProposalStatus } from "@/features/proposals/schemas/proposal-schemas";

interface UpdateStatusPayload {
  proposalId: string;
  status: ZProposalStatus | null;
}

export function useUpdateProposalStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposalId, status }: UpdateStatusPayload) => {
      const res = await fetch(`/api/proposals/${proposalId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to update status");
      }
      return res.json();
    },

    onMutate: async ({ proposalId, status }) => {
      await queryClient.cancelQueries({ queryKey: ["proposals"] });

      const previousProposals = queryClient.getQueryData<ProposalListItem[]>([
        "proposals",
      ]);

      if (previousProposals) {
        queryClient.setQueryData<ProposalListItem[]>(
          ["proposals"],
          previousProposals.map((p) =>
            p.id === proposalId ? { ...p, status } : p
          )
        );
      }

      return { previousProposals };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousProposals) {
        queryClient.setQueryData(["proposals"], context.previousProposals);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });
}
