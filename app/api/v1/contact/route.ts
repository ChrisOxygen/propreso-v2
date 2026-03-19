import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ZContactSchema } from "@/features/contact/schemas/contact-schema";
import { ContactNotificationEmail } from "@/features/contact/emails/contact-notification-email";
import { ContactConfirmationEmail } from "@/features/contact/emails/contact-confirmation-email";
import { apiError, apiValidationError } from "@/shared/lib/api-error";
import { contactRatelimit } from "@/shared/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_TO = "femi.support@propreso.com";
const FROM = "Propreso <femi.support@propreso.com>";

const MIN_FILL_MS = 3_000; // submissions faster than this are bots

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return apiError("bad_request", "Invalid JSON body", 400);
  }

  // ── Honeypot check ───────────────────────────────────────────────────────
  // Bots fill every field; humans never see this input. Return 200 to fool
  // the bot into thinking it succeeded.
  if (body._honeypot) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // ── Timing check ─────────────────────────────────────────────────────────
  // Real users take at least a few seconds to read and fill out a form.
  const formLoadedAt = body._formLoadedAt;
  if (typeof formLoadedAt === "number" && Date.now() - formLoadedAt < MIN_FILL_MS) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // ── Rate limiting ─────────────────────────────────────────────────────────
  // 5 submissions per 10 minutes per IP. Skipped if Upstash env vars are absent.
  if (contactRatelimit) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const { success } = await contactRatelimit.limit(ip);
    if (!success) {
      return apiError("rate_limited", "Too many requests. Please try again later.", 429);
    }
  }

  // ── Schema validation ─────────────────────────────────────────────────────
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
