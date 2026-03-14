import { z } from "zod";

export const ZGenerateProposalSchema = z.object({
  profileId: z.string().min(1, "Select a profile"),
  rawPost: z
    .string()
    .min(50, "Please paste at least 50 characters of the job post")
    .max(8000, "Job post is too long"),
  tone: z.enum(["PROFESSIONAL", "CONVERSATIONAL", "CONFIDENT", "FRIENDLY"]),
});

export type ZGenerateProposal = z.infer<typeof ZGenerateProposalSchema>;
