import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { ScrollReveal } from "@/shared/components/scroll-reveal";

// ─────────────────────────────────────────────────────────────────────────────
// CtaSection
// ─────────────────────────────────────────────────────────────────────────────

const AVATARS = [
  { initials: "JK", hue: "rgba(255,255,255,0.30)" },
  { initials: "ML", hue: "rgba(255,255,255,0.22)" },
  { initials: "SR", hue: "rgba(255,255,255,0.16)" },
  { initials: "TP", hue: "rgba(255,255,255,0.24)" },
  { initials: "AK", hue: "rgba(255,255,255,0.18)" },
];

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-36">
      {/* ── Decorative layers ──────────────────────────────────────── */}

      {/* Radial highlight — top center */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Radial shadow — bottom center */}
      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Dashboard screenshot — subtle image overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/helping-freelancers.webp"
          alt=""
          fill
          className="object-cover object-top opacity-[0.20] mix-blend-luminosity"
          priority
          aria-hidden="true"
        />
      </div>

      {/* Dot grid — white, very faint */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Large decorative ring — top right */}
      <div
        className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full border pointer-events-none"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      />
      <div
        className="absolute -top-10 -right-10 w-[320px] h-[320px] rounded-full border pointer-events-none"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      />

      {/* Large decorative ring — bottom left */}
      <div
        className="absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full border pointer-events-none"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      />

      {/* ── Content ────────────────────────────────────────────────── */}
      <ScrollReveal className="relative z-10 mx-auto max-w-3xl px-6 flex flex-col items-center text-center">
        {/* Logo lockup */}
        <div className="flex items-center gap-2 mb-10">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(4px)",
            }}
          >
            <Image
              src="/assets/site-icon-white.svg"
              alt="Propreso"
              width={11}
              height={14}
            />
          </div>
          <span
            className="text-[13px] font-semibold text-white/70 tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Propreso
          </span>
        </div>

        {/* Headline */}
        <h2
          className="text-[clamp(2.6rem,6.5vw,5rem)] font-extrabold tracking-[-0.045em] leading-[0.97] text-white mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Proposals that{" "}
          <span
            className="italic font-normal"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            actually get replies.
          </span>
        </h2>

        {/* Sub-copy */}
        <p
          className="text-[15px] md:text-[16px] leading-[1.75] mb-10 max-w-[36ch]"
          style={{
            fontFamily: "var(--font-inter)",
            color: "rgba(255,255,255,0.60)",
          }}
        >
          AI-drafted proposals tailored to your niche. Start free — no credit
          card required.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Primary — white */}
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
              Get Started Free
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Button>

          {/* Secondary — ghost */}
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-[14.5px] font-semibold rounded-xl text-white/80 hover:text-white transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            <Link href="/pricing">See Pricing</Link>
          </Button>
        </div>

        {/* Trust micro-line */}
        <div className="flex items-center gap-2 mt-5">
          <span
            className="text-[10.5px] tracking-[0.12em] uppercase"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            No credit card
          </span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.2)" }}
          />
          <span
            className="text-[10.5px] tracking-[0.12em] uppercase"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Cancel anytime
          </span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.2)" }}
          />
          <span
            className="text-[10.5px] tracking-[0.12em] uppercase"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            10 free proposals
          </span>
        </div>

        {/* Divider */}
        <div
          className="w-full mt-14 mb-8 h-px"
          style={{ background: "rgba(255,255,255,0.10)" }}
        />

        {/* Social proof — avatars + stars */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex -space-x-2.5">
            {AVATARS.map((a, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                style={{
                  borderColor: "rgba(200,84,56,0.6)",
                  background: a.hue,
                  zIndex: AVATARS.length - i,
                  backdropFilter: "blur(4px)",
                }}
              >
                {a.initials}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5"
                  style={{
                    fill: "rgba(255,255,255,0.9)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                />
              ))}
            </div>
            <span
              className="text-[12px] leading-none"
              style={{
                fontFamily: "var(--font-inter)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Trusted by{" "}
              <span
                style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}
              >
                2,400+ Upwork freelancers
              </span>
            </span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
