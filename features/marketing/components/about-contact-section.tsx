import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

// ─── About Contact Section ─────────────────────────────────────────────────────
// Clean CTA block with email contact + primary action button.
// Uses the primary bg treatment consistent with CtaSection.

export function AboutContactSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      {/* ── Decorative layers ──────────────────────────────── */}

      {/* Top radial highlight */}
      <div
        className="absolute -top-28 left-1/2 -translate-x-1/2 w-[600px] h-[360px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative rings */}
      <div
        className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full border pointer-events-none"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-[440px] h-[440px] rounded-full border pointer-events-none"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      />

      {/* ── Content ────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 flex flex-col items-center text-center gap-6">
        {/* Eyebrow */}
        <p
          className="text-[11px] tracking-[0.18em] uppercase"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            color: "rgba(255,255,255,0.40)",
          }}
        >
          Get in Touch
        </p>

        {/* Headline */}
        <h2
          className="text-[clamp(2rem,5vw,3.6rem)] font-extrabold tracking-[-0.04em] leading-[1.05] text-white"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Questions?{" "}
          <span
            className="italic font-normal"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            We&apos;re around.
          </span>
        </h2>

        {/* Sub-copy */}
        <p
          className="text-[15px] leading-[1.75] max-w-[38ch]"
          style={{
            fontFamily: "var(--font-inter)",
            color: "rgba(255,255,255,0.58)",
          }}
        >
          Found a bug? Have a feature request? Just want to share what&apos;s
          working? We read every message.
        </p>

        {/* Email link */}
        <a
          href="mailto:hello@propreso.com"
          className="flex items-center gap-2 group"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          <Mail
            className="w-4 h-4 shrink-0"
            style={{ color: "rgba(255,255,255,0.5)" }}
          />
          <span
            className="text-[15px] font-medium underline underline-offset-4 decoration-white/25 group-hover:decoration-white/60 transition-all duration-150"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            hello@propreso.com
          </span>
        </a>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{ background: "rgba(255,255,255,0.12)" }}
        />

        {/* CTA */}
        <Button
          asChild
          size="lg"
          className="group h-12 px-8 text-[14.5px] font-semibold rounded-xl border-0 text-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.99]"
          style={{
            background: "rgba(255,255,255,1)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          <Link href="/sign-up" className="flex items-center gap-2">
            Try Propreso for free
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Button>

        {/* Micro trust text */}
        <p
          className="text-[11px] tracking-[0.10em] uppercase"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            color: "rgba(255,255,255,0.30)",
          }}
        >
          No credit card · 10 free proposals included
        </p>
      </div>
    </section>
  );
}
