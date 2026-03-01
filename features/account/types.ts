export const FREE_PROPOSAL_LIMIT = 10;
export const FREE_PROFILE_LIMIT = 2;

export interface AccountData {
  user: {
    id: string;
    email: string;
    fullName: string | null;
    plan: "FREE" | "PRO";
    createdAt: string; // ISO string — safe to pass from Server → Client
  };
  proposalCount: number; // this calendar month
  profileCount: number;
}
