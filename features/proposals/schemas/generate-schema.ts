import { z } from "zod";

export const ZGenerateProposalSchema = z.object({
  profileId: z.string().min(1, "Select a profile"),
  jobTitle: z.string().min(2, "Job title is required").max(200),
  jobUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  jobDescription: z
    .string()
    .min(50, "Please paste at least 50 characters of the job description")
    .max(8000, "Job description is too long"),
  tone: z.enum(["PROFESSIONAL", "CONVERSATIONAL", "CONFIDENT", "FRIENDLY"]),
  formula: z.enum(["AIDA", "PAS", "BAB", "STAR", "DIRECT"]),
  proposalLength: z.enum(["SHORT", "MEDIUM", "LONG"]),
  upworkOpener: z.boolean(),
});

export type ZGenerateProposal = z.infer<typeof ZGenerateProposalSchema>;
