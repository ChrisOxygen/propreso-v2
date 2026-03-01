import { z } from "zod";

export const ZUpdateDisplayNameSchema = z.object({
  fullName: z
    .string()
    .min(1, "Name is required")
    .max(80, "Name is too long"),
});

export const ZChangePasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ZUpdateDisplayName = z.infer<typeof ZUpdateDisplayNameSchema>;
export type ZChangePassword = z.infer<typeof ZChangePasswordSchema>;
