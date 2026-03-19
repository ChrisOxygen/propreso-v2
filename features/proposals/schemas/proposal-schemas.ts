import { z } from "zod";

export const ZSaveProposalSchema = z.object({
  profileId: z.string().min(1),
  rawPost: z.string().min(1).max(8000),
  tone: z.enum(["PROFESSIONAL", "CONVERSATIONAL", "CONFIDENT", "FRIENDLY"]),
  generatedContent: z.string().min(1),
});
export type ZSaveProposal = z.infer<typeof ZSaveProposalSchema>;

export const ZProposalStatusSchema = z.enum(["REPLIED", "WON", "NO_RESPONSE"]);
export type ZProposalStatus = z.infer<typeof ZProposalStatusSchema>;

export const ZUpdateProposalStatusSchema = z.object({
  status: ZProposalStatusSchema.nullable(),
});
export type ZUpdateProposalStatus = z.infer<typeof ZUpdateProposalStatusSchema>;
