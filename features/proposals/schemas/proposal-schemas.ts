import { z } from "zod";

export const ZProposalStatusSchema = z.enum(["REPLIED", "WON", "NO_RESPONSE"]);
export type ZProposalStatus = z.infer<typeof ZProposalStatusSchema>;

export const ZUpdateProposalStatusSchema = z.object({
  status: ZProposalStatusSchema.nullable(),
});
export type ZUpdateProposalStatus = z.infer<typeof ZUpdateProposalStatusSchema>;
