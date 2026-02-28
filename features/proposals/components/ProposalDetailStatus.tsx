"use client";

import { ProposalStatusBar } from "./ProposalStatusBar";
import { useUpdateProposalStatus } from "@/features/proposals/hooks/use-update-proposal-status";
import type { ZProposalStatus } from "@/features/proposals/schemas/proposal-schemas";

interface ProposalDetailStatusProps {
  proposalId: string;
  status: ZProposalStatus | null;
}

export function ProposalDetailStatus({
  proposalId,
  status,
}: ProposalDetailStatusProps) {
  const { mutate, isPending } = useUpdateProposalStatus();

  const handleStatusSelect = (newStatus: ZProposalStatus | null) => {
    mutate({ proposalId, status: newStatus });
  };

  return (
    <ProposalStatusBar
      status={status}
      onSelect={handleStatusSelect}
      isPending={isPending}
    />
  );
}
