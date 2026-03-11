import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle2, Zap, TrendingUp, Clock } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// CtaSection
// ─────────────────────────────────────────────────────────────────────────────

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-36">
      {/* ── Background layers ──────────────────────────────────────── */}

      {/* Radial warm bloom from bottom-center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 110%, rgba(200,84,56,0.13) 0%, rgba(200,84,56,0.05) 55%, transparent 100%)",
        }}
      />

      {/* Very subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(26,20,18,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Edge glow rings */}
      <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full border border-primary/6 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] rounded-full border border-primary/5 pointer-events-none" />
      <div className="absolute -top-36 -right-36 w-[440px] h-[440px] rounded-full border border-primary/5 pointer-events-none" />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 flex flex-col items-center text-center">
        {/* Eyebrow badge */}
        <Badge
          variant="outline"
          className="border-primary/20 bg-accent text-primary px-4 py-1.5 text-[11px] tracking-widest uppercase rounded-full mb-7"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Start for free today
        </Badge>

        {/* Headline */}
        <div className="flex flex-col items-center gap-1 mb-6">
          <h2
            className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold text-foreground tracking-[-0.04em] leading-[1.05]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Write Proposals That
          </h2>
          <h2
            className="text-[clamp(2.4rem,5.5vw,4.2rem)] tracking-[-0.025em] leading-[1.1] italic"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              background:
                "linear-gradient(135deg, #C85438 0%, #D96B32 40%, #F0A558 80%, #F5BA72 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Actually Win Clients.
          </h2>
        </div>

        {/* Subtitle */}
        <p
          className="max-w-lg text-[15px] md:text-[16px] text-muted-foreground leading-[1.8] mb-10"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          10 free proposals on sign-up. No credit card required.
          Cancel&nbsp;anytime.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white border-0 h-11 px-8 text-[14.5px] font-semibold tracking-[-0.01em] shadow-[0_4px_20px_rgba(200,84,56,0.3)] hover:shadow-[0_6px_28px_rgba(200,84,56,0.45)] transition-all duration-200 rounded-lg"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <Link href="/sign-up">Get Started Free &nbsp;→</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 px-8 text-[14.5px] font-semibold tracking-[-0.01em] border-border-strong text-foreground hover:bg-accent hover:border-primary/30 transition-all duration-200 rounded-lg"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <Link href="/pricing">See Pricing</Link>
          </Button>
        </div>

        {/* ── Product mockup ──────────────────────────────────────── */}
        {/* pb-0 + overflow-hidden so the bottom fade clips the mockup cleanly */}
        <div className="relative mt-16 w-full max-w-3xl mx-auto overflow-hidden pb-0">
          {/* ── Floating stat cards ─────────────────────────── */}

          {/* Left card — proposals sent */}
          <div className="absolute -left-4 sm:-left-10 top-[22%] z-20 bg-card border border-border shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-xl px-4 py-3 flex items-center gap-3 w-[160px]">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className="text-[11px] text-muted-foreground leading-none mb-0.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Proposals sent
              </span>
              <span
                className="text-[15px] font-bold text-foreground tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                3,241
              </span>
            </div>
          </div>

          {/* Left card — time */}
          <div className="absolute -left-4 sm:-left-10 top-[48%] z-20 bg-card border border-border shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-xl px-4 py-3 flex items-center gap-3 w-[160px]">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className="text-[11px] text-muted-foreground leading-none mb-0.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Written in
              </span>
              <span
                className="text-[15px] font-bold text-foreground tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                &lt; 60 sec
              </span>
            </div>
          </div>

          {/* Right card — win rate */}
          <div className="absolute -right-4 sm:-right-10 top-[22%] z-20 bg-card border border-border shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-xl px-4 py-3 flex items-center gap-3 w-[160px]">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className="text-[11px] text-muted-foreground leading-none mb-0.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Response rate
              </span>
              <span
                className="text-[15px] font-bold text-foreground tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                +47%
              </span>
            </div>
          </div>

          {/* Right card — AI */}
          <div className="absolute -right-4 sm:-right-10 top-[48%] z-20 bg-card border border-border shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-xl px-4 py-3 flex items-center gap-3 w-[160px]">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(200,84,56,0.35)]">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className="text-[11px] text-muted-foreground leading-none mb-0.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                AI drafting
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span
                  className="text-[12px] font-semibold text-primary tracking-tight"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Live
                </span>
              </div>
            </div>
          </div>

          {/* ── Dashboard image ──────────────────────────── */}
          <Image
            src="/assets/propreso-dashboard-faded-down.png"
            alt="Propreso dashboard — generate a proposal in under 60 seconds"
            width={1200}
            height={800}
            className="relative w-full rounded-2xl border border-border-strong shadow-[0_24px_80px_rgba(0,0,0,0.13),0_4px_16px_rgba(0,0,0,0.06)]"
            priority
          />

        </div>
      </div>
    </section>
  );
}
