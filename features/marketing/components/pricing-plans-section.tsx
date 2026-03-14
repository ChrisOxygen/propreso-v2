"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type Billing = "monthly" | "yearly";

// ─── Feature data ─────────────────────────────────────────────────────────────

const FREE_FEATURES = [
  "10 lifetime generation tokens — enough to see if Propreso works for you",
  "2 freelancer profiles",
  "All 4 tones: Professional, Conversational, Confident, Friendly",
  "All 5 copywriting formulas: AIDA, PAS, BAB, STAR, Direct",
  "All 3 proposal lengths: Short, Medium, Long",
  "Upwork Opener toggle",
  "Save proposals to history",
  "Proposal outcome tracking: Won / Replied / No Response",
];

const PRO_EXTRA_FEATURES = [
  "200 generation tokens per month — automatically refilled",
  "Rollover on yearly plan — unused tokens carry forward, no cap",
  "Unlimited freelancer profiles — one for every niche, service, and client type",
  "Full proposal history with filtering and search",
  "Billing portal — manage payment, download invoices, cancel anytime",
];

// ─── FeatureItem ─────────────────────────────────────────────────────────────

function FeatureItem({
  text,
  isPro = false,
}: {
  text: string;
  isPro?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 inline-flex items-center justify-center w-[18px] h-[18px] rounded-full shrink-0 ${
          isPro
            ? "bg-primary/15"
            : "bg-emerald-50 border border-emerald-200"
        }`}
      >
        <Check
          className={`w-2.5 h-2.5 ${isPro ? "text-primary" : "text-emerald-600"}`}
          strokeWidth={3}
        />
      </span>
      <span
        className="text-[13.5px] text-text-secondary leading-[1.65]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {text}
      </span>
    </li>
  );
}

// ─── PricingPlansSection ──────────────────────────────────────────────────────

export function PricingPlansSection() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-24 md:pt-28 md:pb-32">
      {/* ── Background layers ─────────────────────────────────────────── */}

      {/* Warm bloom from top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(200,84,56,0.09) 0%, transparent 70%)",
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(26,20,18,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative rings */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full border border-primary/5 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full border border-primary/5 pointer-events-none" />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* ── Hero text ─────────────────────────────────────────────── */}
        <div className="animate-fade-up text-center mb-12 md:mb-16">
          <p
            className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground/40 mb-5"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Pricing
          </p>

          <h1
            className="text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold text-foreground tracking-[-0.04em] leading-[1.06] mb-5"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Simple pricing.{" "}
            <span
              className="italic font-normal"
              style={{
                fontFamily: "var(--font-instrument-serif)",
                background:
                  "linear-gradient(135deg, #C85438 0%, #D96B32 50%, #F0A558 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              No surprises.
            </span>
          </h1>

          <p
            className="text-[15px] md:text-[16px] text-muted-foreground leading-[1.8] max-w-md mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Start free. Upgrade when Propreso is making you money — not before.
          </p>
        </div>

        {/* ── Billing toggle ────────────────────────────────────────── */}
        <div className="animate-fade-in delay-200 flex justify-center mb-12 md:mb-16">
          <div className="flex items-center bg-muted rounded-full p-1 gap-0.5">
            <button
              onClick={() => setBilling("monthly")}
              className={`flex items-center rounded-full px-5 py-2 text-[13.5px] font-medium transition-all duration-200 cursor-pointer ${
                billing === "monthly"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-[13.5px] font-medium transition-all duration-200 cursor-pointer ${
                billing === "yearly"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Yearly
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold tracking-[0.04em] transition-all duration-200 ${
                  billing === "yearly"
                    ? "bg-primary text-white"
                    : "bg-primary/15 text-primary"
                }`}
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Save 33%
              </span>
            </button>
          </div>
        </div>

        {/* ── Plan cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* ─ Free card ─────────────────────────────────────────── */}
          <div className="animate-fade-up delay-300 flex flex-col bg-card border border-border rounded-2xl p-7 shadow-[0_2px_12px_rgba(26,20,18,0.05)]">
            {/* Plan label */}
            <span
              className="text-[10.5px] tracking-[0.14em] uppercase text-muted-foreground mb-3 block"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Free
            </span>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-2">
              <span
                className="text-[3.5rem] font-extrabold text-foreground tracking-[-0.045em] leading-none"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                $0
              </span>
              <span
                className="text-[15px] text-muted-foreground font-medium mb-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                /month
              </span>
            </div>

            {/* Tagline */}
            <p
              className="text-[15px] text-muted-foreground italic mb-7"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Get a feel for it
            </p>

            {/* Divider */}
            <div className="h-px bg-border mb-6" />

            {/* Features */}
            <ul className="flex-1 space-y-3.5 mb-8">
              {FREE_FEATURES.map((feature) => (
                <FeatureItem key={feature} text={feature} />
              ))}
            </ul>

            {/* CTA */}
            <div>
              <Button
                asChild
                variant="outline"
                className="w-full h-11 text-[14px] font-semibold tracking-[-0.01em] border-border-strong hover:bg-accent hover:border-primary/30 transition-all duration-200 rounded-xl gap-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <Link href="/sign-up">
                  Start for free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <p
                className="text-center text-[11.5px] text-muted-foreground mt-2.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                no credit card required
              </p>
            </div>
          </div>

          {/* ─ Pro card ──────────────────────────────────────────── */}
          <div className="animate-fade-up delay-400 relative flex flex-col bg-accent border-2 border-primary rounded-2xl p-7 shadow-[0_8px_32px_rgba(200,84,56,0.12),0_2px_8px_rgba(200,84,56,0.06)]">
            {/* Most Popular badge */}
            <span
              className="absolute top-5 right-5 bg-primary text-white text-[10.5px] font-bold tracking-[0.05em] uppercase px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(200,84,56,0.3)]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Most Popular
            </span>

            {/* Plan label */}
            <span
              className="text-[10.5px] tracking-[0.14em] uppercase text-primary font-semibold mb-3 block"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Pro
            </span>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-1">
              <span
                className="text-[3.5rem] font-extrabold text-foreground tracking-[-0.045em] leading-none"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {billing === "monthly" ? "$6" : "$4"}
              </span>
              <span
                className="text-[15px] text-text-secondary font-medium mb-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                /mo
              </span>
            </div>

            {/* Billing note */}
            {billing === "yearly" ? (
              <p
                className="text-[12px] text-primary font-semibold mb-2"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Billed $48/year
              </p>
            ) : (
              <p
                className="text-[12px] text-muted-foreground mb-2"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                or $4/mo billed yearly
              </p>
            )}

            {/* Tagline */}
            <p
              className="text-[15px] text-text-secondary italic mb-7"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Win more jobs
            </p>

            {/* "Everything in Free, plus" separator */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="h-px flex-1 bg-border-strong/35" />
              <span
                className="text-[11px] text-muted-foreground whitespace-nowrap"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Everything in Free, plus:
              </span>
              <div className="h-px flex-1 bg-border-strong/35" />
            </div>

            {/* Pro extra features */}
            <ul className="flex-1 space-y-3.5 mb-8">
              {PRO_EXTRA_FEATURES.map((feature) => (
                <FeatureItem key={feature} text={feature} isPro />
              ))}
            </ul>

            {/* CTA */}
            <div>
              <Button
                asChild
                className="w-full h-11 bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-[14px] font-semibold tracking-[-0.01em] border-0 shadow-[0_4px_16px_rgba(200,84,56,0.3)] hover:shadow-[0_6px_24px_rgba(200,84,56,0.4)] transition-all duration-200 rounded-xl gap-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <Link href="/sign-up?plan=pro">
                  Get Pro
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <p
                className="text-center text-[11.5px] text-muted-foreground mt-2.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Start with 10 free proposals first if you want
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
