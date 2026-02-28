import { z } from "zod";

export const ZPortfolioItemSchema = z.object({
  url: z.url({ error: "Please enter a valid URL" }),
  description: z.string().max(200, "Description is too long"),
});

export const ZCreateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Role must be at least 2 characters")
    .max(80, "Role name is too long"),
  skills: z
    .array(z.string())
    .min(1, "Select at least 1 skill")
    .max(10, "Maximum 10 skills"),
  bio: z
    .string()
    .min(50, "Please write at least 50 characters")
    .max(600, "Bio is too long"),
  portfolioItems: z
    .array(ZPortfolioItemSchema)
    .max(5, "Maximum 5 portfolio items"),
});

export type ZCreateProfile = z.infer<typeof ZCreateProfileSchema>;
export type ZPortfolioItem = z.infer<typeof ZPortfolioItemSchema>;

export const ZUpdateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Role must be at least 2 characters")
    .max(80, "Role name is too long")
    .optional(),
  skills: z
    .array(z.string())
    .min(1, "Select at least 1 skill")
    .max(10, "Maximum 10 skills")
    .optional(),
  bio: z
    .string()
    .min(50, "Please write at least 50 characters")
    .max(600, "Bio is too long")
    .optional(),
  portfolioItems: z
    .array(ZPortfolioItemSchema)
    .max(5, "Maximum 5 portfolio items")
    .optional(),
});

export type ZUpdateProfile = z.infer<typeof ZUpdateProfileSchema>;
