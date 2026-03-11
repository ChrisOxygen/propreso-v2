"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What's a generation token?",
    a: "Every time you click Generate or Regenerate, 1 token is used. That's it. Saving, editing, and viewing proposals are always free — tokens only count when you ask the AI to write.",
  },
  {
    q: "What happens when I run out of tokens?",
    a: "Free users can upgrade to Pro to unlock 200 tokens per month. Pro users are automatically refilled on each billing cycle. You'll never get cut off mid-job-search.",
  },
  {
    q: "Do unused tokens roll over?",
    a: "On the yearly plan, yes — unused tokens carry forward every month with no cap. On the monthly plan, your balance resets to 200 on renewal.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Always. You keep your remaining token balance and all your saved proposals. No lock-ins, no cancellation fees, no awkward cancellation flows.",
  },
  {
    q: "What's a freelancer profile?",
    a: "A profile stores your niche, skills, bio, and portfolio links. Propreso uses this context to personalize every proposal it writes — so it sounds like you wrote it, not a generic AI template. You can create different profiles for different niches.",
  },
  {
    q: "How is this different from ChatGPT?",
    a: "ChatGPT writes generic text. Propreso is purpose-built for Upwork — it understands copywriting formulas (AIDA, PAS, STAR), injects your profile context, mirrors the client's communication tone, and optionally opens with an Upwork-specific hook that grabs attention in the first line.",
  },
  {
    q: "Is the Chrome extension included in all plans?",
    a: "Yes. The Chrome extension works with both Free and Pro accounts. Generate proposals directly inside any Upwork job page without switching tabs.",
  },
  {
    q: "What if a generation fails?",
    a: "If a proposal fails due to a server error on our end, your token is automatically refunded. We don't charge for our mistakes.",
  },
];

// ─── PricingFaqSection ────────────────────────────────────────────────────────

export function PricingFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground/40 mb-5"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Got questions?
          </p>

          <h2
            className="text-[clamp(1.85rem,4vw,2.75rem)] font-extrabold text-foreground tracking-[-0.035em] leading-[1.08]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Frequently asked{" "}
            <span
              className="italic font-normal text-primary"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              questions.
            </span>
          </h2>
        </div>

        {/* ── Accordion ───────────────────────────────────────────── */}
        <div className="divide-y divide-border">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 py-5 text-left group cursor-pointer"
              >
                <span
                  className={`text-[15px] font-semibold tracking-[-0.01em] leading-[1.5] transition-colors duration-150 ${
                    openIndex === i
                      ? "text-primary"
                      : "text-foreground group-hover:text-primary"
                  }`}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 mt-0.5 transition-all duration-300 ${
                    openIndex === i
                      ? "rotate-180 text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? "max-h-[400px] pb-5" : "max-h-0"
                }`}
              >
                <p
                  className="text-[14px] text-text-secondary leading-[1.9]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ──────────────────────────────────────────── */}
        <div className="mt-20 md:mt-24 text-center">
          {/* Subtle top divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-border" />
            <span
              className="text-[10.5px] tracking-[0.12em] uppercase text-muted-foreground/40 whitespace-nowrap"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Still deciding?
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <h3
            className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold text-foreground tracking-[-0.04em] leading-[1.1] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Still on the fence?{" "}
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
              Start free.
            </span>
          </h3>

          <p
            className="text-[15px] text-muted-foreground leading-[1.8] max-w-sm mx-auto mb-8"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            10 proposals. No credit card. No time limit. You&apos;ll know
            within the first one if Propreso is worth it.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white border-0 h-11 px-8 text-[14.5px] font-semibold tracking-[-0.01em] shadow-[0_4px_20px_rgba(200,84,56,0.3)] hover:shadow-[0_6px_28px_rgba(200,84,56,0.45)] transition-all duration-200 rounded-lg gap-2"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <Link href="/sign-up">
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
