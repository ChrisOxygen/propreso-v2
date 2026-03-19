import { z } from "zod";

export const ZContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ZContact = z.infer<typeof ZContactSchema>;

// Extended payload sent to the API — includes anti-spam fields not part of form validation
export type ZContactPayload = ZContact & {
  _honeypot?: string;
  _formLoadedAt?: number;
};
