"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Twitter, Clock, CalendarDays, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { ZContactSchema, type ZContact } from "@/features/contact/schemas/contact-schema";
import { useSubmitContact } from "@/features/contact/hooks/use-submit-contact";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@propreso.com",
    sub: "We read every message",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    value: "@propreso",
    sub: "Quickest for public questions",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    sub: "Usually much faster",
  },
  {
    icon: CalendarDays,
    label: "Support Hours",
    value: "Mon – Fri",
    sub: "9:00 AM – 6:00 PM (GMT+1)",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function inputCn(hasError: boolean) {
  return cn(
    "h-10 px-3.5 rounded-lg border bg-background text-[13.5px] text-foreground",
    "placeholder:text-muted-foreground/50 outline-none transition-all duration-150",
    hasError
      ? "border-destructive/50 ring-2 ring-destructive/10"
      : "border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10",
  );
}

function textareaCn(hasError: boolean) {
  return cn(
    "px-3.5 py-3 rounded-lg border bg-background text-[13.5px] text-foreground",
    "placeholder:text-muted-foreground/50 outline-none transition-all duration-150 resize-none leading-relaxed",
    hasError
      ? "border-destructive/50 ring-2 ring-destructive/10"
      : "border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10",
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ZContact>({
    resolver: zodResolver(ZContactSchema),
  });

  const mutation = useSubmitContact({ onSuccess: () => {} });

  function onSubmit(data: ZContact) {
    mutation.mutate(data);
  }

  function handleSendAnother() {
    mutation.reset();
    reset();
  }

  return (
    <section className="relative min-h-screen bg-background overflow-hidden pt-28 pb-32">
      {/* ── Subtle warm radial bloom ─────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(200,84,56,0.10) 0%, rgba(200,84,56,0.04) 55%, transparent 100%)",
        }}
      />

      {/* ── Faint dot grid ───────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.09] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(26,20,18,0.65) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* ── Page header ──────────────────────────────────────── */}
        <div className="text-center mb-14">
          <p
            className="inline-block text-[10.5px] tracking-[0.16em] uppercase text-primary mb-4 px-3.5 py-1 rounded-full bg-accent border border-primary/20"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Contact
          </p>
          <h1
            className="text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold text-foreground tracking-[-0.04em] leading-[1.08] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Get in Touch{" "}
            <span
              className="italic font-normal"
              style={{
                fontFamily: "var(--font-instrument-serif)",
                background:
                  "linear-gradient(135deg, #C85438 0%, #D96B32 45%, #F0A558 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              with Us
            </span>
          </h1>
          <p
            className="text-[15px] text-muted-foreground leading-[1.8] max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Have a question about Propreso, need help with your account, or
            just want to say hi? We&apos;d love to hear from you.
          </p>
        </div>

        {/* ── Two-column grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* ── Left: Form card ───────────────────────────────── */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-[0_4px_32px_rgba(26,20,18,0.06)]">
            <h2
              className="text-[19px] font-bold text-foreground tracking-[-0.02em] mb-1.5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Send us a message
            </h2>
            <p
              className="text-[13.5px] text-muted-foreground mb-8 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Fill out the form and we&apos;ll get back to you shortly.
            </p>

            {mutation.isSuccess ? (
              /* ── Success state ──────────────────────────────── */
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-accent border border-primary/20 flex items-center justify-center">
                  <CheckCircle2 size={26} className="text-primary" />
                </div>
                <div>
                  <p
                    className="text-[17px] font-semibold text-foreground tracking-[-0.02em] mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Message received!
                  </p>
                  <p
                    className="text-[13.5px] text-muted-foreground leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={handleSendAnother}
                  className="mt-2 text-[12.5px] text-primary underline underline-offset-2 hover:text-primary-hover transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="firstName"
                      className="text-[12px] font-medium text-text-secondary tracking-[0.02em]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      className={inputCn(!!errors.firstName)}
                      style={{ fontFamily: "var(--font-inter)" }}
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-[11.5px] text-destructive" style={{ fontFamily: "var(--font-inter)" }}>
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="lastName"
                      className="text-[12px] font-medium text-text-secondary tracking-[0.02em]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Last name"
                      className={inputCn(!!errors.lastName)}
                      style={{ fontFamily: "var(--font-inter)" }}
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-[11.5px] text-destructive" style={{ fontFamily: "var(--font-inter)" }}>
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-[12px] font-medium text-text-secondary tracking-[0.02em]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={inputCn(!!errors.email)}
                    style={{ fontFamily: "var(--font-inter)" }}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-[11.5px] text-destructive" style={{ fontFamily: "var(--font-inter)" }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="subject"
                    className="text-[12px] font-medium text-text-secondary tracking-[0.02em]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="What's this about?"
                    className={inputCn(!!errors.subject)}
                    style={{ fontFamily: "var(--font-inter)" }}
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-[11.5px] text-destructive" style={{ fontFamily: "var(--font-inter)" }}>
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-[12px] font-medium text-text-secondary tracking-[0.02em]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Leave us a message..."
                    className={textareaCn(!!errors.message)}
                    style={{ fontFamily: "var(--font-inter)" }}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-[11.5px] text-destructive" style={{ fontFamily: "var(--font-inter)" }}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* API-level error */}
                {mutation.isError && (
                  <p
                    className="text-[12.5px] text-destructive bg-error-subtle border border-destructive/20 rounded-lg px-3.5 py-2.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Something went wrong. Please try again or email us directly at hello@propreso.com.
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white border-0 h-11 px-7 text-[14px] font-semibold tracking-[-0.01em] rounded-xl shadow-[0_4px_20px_rgba(200,84,56,0.28)] hover:shadow-[0_6px_28px_rgba(200,84,56,0.42)] transition-all duration-200 gap-2 self-start disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {mutation.isPending ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={15} />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* ── Right: Image hero card ──────────────────────────── */}
          <div className="relative bg-primary rounded-2xl overflow-hidden min-h-[420px] lg:min-h-0 lg:h-full shadow-[0_8px_40px_rgba(200,84,56,0.28)]">
            {/* Dot grid texture */}
            <div
              className="absolute inset-0 opacity-[0.13] pointer-events-none z-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Warm bloom */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "radial-gradient(ellipse 75% 60% at 60% 40%, rgba(255,210,150,0.20) 0%, rgba(255,140,60,0.10) 50%, transparent 75%)",
              }}
            />

            {/* Decorative corner accents */}
            <div className="absolute top-5 right-5 w-6 h-6 rounded-[4px] border border-white/22 z-20 pointer-events-none" />
            <div className="absolute top-10 right-10 w-3.5 h-3.5 rounded-[3px] bg-white/15 border border-white/20 z-20 pointer-events-none" />
            <div className="absolute bottom-24 right-6 w-4 h-4 rounded-[3px] border border-white/18 z-20 pointer-events-none" />

            {/* Freelancer image — anchored to bottom */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/helping-freelancers.webp"
                alt="Freelancer working on proposals"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Gradient overlay so text at bottom reads clearly */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(174,69,41,0.88) 0%, rgba(174,69,41,0.45) 35%, rgba(174,69,41,0.10) 65%, transparent 100%)",
                }}
              />
            </div>

            {/* Text content pinned to bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
              <p
                className="text-[10px] tracking-[0.18em] uppercase text-white/50 mb-2"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Our mission
              </p>
              <p
                className="text-[1.55rem] font-extrabold text-white tracking-[-0.03em] leading-[1.2]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                We help freelancers{" "}
                <span
                  className="italic font-normal text-white/85"
                  style={{ fontFamily: "var(--font-instrument-serif)" }}
                >
                  win every bid.
                </span>
              </p>
              <p
                className="text-[13px] text-white/60 mt-2 leading-relaxed max-w-xs"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Questions, feedback, or just want to talk proposals — we&apos;re
                always here.
              </p>
            </div>
          </div>
        </div>

        {/* ── Contact info cards ────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {CONTACT_CARDS.map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="bg-card border border-border rounded-xl p-5 flex items-start gap-4 hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(200,84,56,0.08)] transition-all duration-200 group"
            >
              <div className="shrink-0 w-9 h-9 rounded-lg bg-accent border border-primary/15 flex items-center justify-center mt-0.5 group-hover:bg-primary/8 transition-colors duration-200">
                <Icon size={16} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p
                  className="text-[11px] text-muted-foreground tracking-[0.05em] uppercase mb-0.5"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {label}
                </p>
                <p
                  className="text-[13.5px] font-semibold text-foreground tracking-[-0.01em] truncate"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {value}
                </p>
                <p
                  className="text-[12px] text-muted-foreground mt-0.5 leading-snug"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
