import { z } from "zod";

export const ZSignUpSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password is too long"),
  terms: z.literal(true, "You must agree to the Terms & Conditions"),
});

export type ZSignUp = z.infer<typeof ZSignUpSchema>;

export const ZSignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type ZSignIn = z.infer<typeof ZSignInSchema>;
