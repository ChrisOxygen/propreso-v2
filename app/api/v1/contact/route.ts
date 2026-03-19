import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ZContactSchema } from "@/features/contact/schemas/contact-schema";
import { ContactNotificationEmail } from "@/features/contact/emails/contact-notification-email";
import { ContactConfirmationEmail } from "@/features/contact/emails/contact-confirmation-email";
import { apiError, apiValidationError } from "@/shared/lib/api-error";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_TO = "femi@propreso.com";
const FROM = "Propreso <femi@propreso.com>";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return apiError("bad_request", "Invalid JSON body", 400);
  }

  const parsed = ZContactSchema.safeParse(body);

  if (!parsed.success) {
    return apiValidationError(parsed.error);
  }

  const { firstName, lastName, email, subject, message } = parsed.data;

  try {
    await Promise.all([
      // Notification to us
      resend.emails.send({
        from: FROM,
        to: NOTIFY_TO,
        replyTo: email,
        subject: `[Contact] ${subject}`,
        react: ContactNotificationEmail({
          firstName,
          lastName,
          email,
          subject,
          message,
        }),
      }),
      // Confirmation to sender
      resend.emails.send({
        from: FROM,
        to: email,
        subject: "We received your message — Propreso",
        react: ContactConfirmationEmail({ firstName }),
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[api/v1/contact] resend error:", err);
    return apiError("email_failed", "Failed to send message", 500);
  }
}
