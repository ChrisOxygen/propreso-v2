import type { ProposalListItem } from "./server/_get-proposals";

export type { ProposalListItem };

export interface ProposalsPagination {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface ProposalsStats {
  total: number;
  won: number;
  replied: number;
}

export interface ProposalsData {
  proposals: ProposalListItem[];
  pagination: ProposalsPagination;
  stats: ProposalsStats;
}

export interface ProposalsQueryParams {
  status?: string;
  search?: string;
  page?: number;
}
