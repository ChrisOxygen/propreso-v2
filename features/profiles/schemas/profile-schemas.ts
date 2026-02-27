import { z } from "zod";

export const ZCreateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Profile name must be at least 2 characters")
    .max(80, "Profile name is too long"),
  skillsSummary: z
    .string()
    .min(20, "Please describe your skills (at least 20 characters)")
    .max(1000, "Skills summary is too long"),
  experienceSummary: z
    .string()
    .min(20, "Please describe your experience (at least 20 characters)")
    .max(1000, "Experience summary is too long"),
  tone: z.enum(["PROFESSIONAL", "CONVERSATIONAL", "CONFIDENT", "FRIENDLY"]),
  portfolioLinks: z.array(z.url({ message: "Invalid URL" })).optional(),
});

export type ZCreateProfile = z.infer<typeof ZCreateProfileSchema>;
