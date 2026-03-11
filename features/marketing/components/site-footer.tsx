import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface SiteFooterProps {
  showCta?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const PRODUCT_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/changelog", label: "Changelog" },
  { href: "/blog", label: "Blog" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CTA section — no background, floats across the footer boundary
//
// Geometry (md+):
//   wrapper: fixed h-[440px]  ← reliable h-full reference for the image
//   image:   absolute, bottom-0, h-full  → spans all 440px; top is 160px above
//            the section above's bottom (from the footer -mt-40)
//   card:    absolute, top-[120px] to bottom-0  → 320px tall, top sits 40px
//            inside the section above
//   FooterBar -mt-24 pulls its dark bg up 96px behind the card's bottom
//
// Mobile: card is normal flow, no fixed height, no image.
// ─────────────────────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <div className="relative z-20 md:mx-auto md:max-w-2xl lg:max-w-5xl md:px-6">
      {/*
       * Fixed height on md+ so the image's h-full resolves to a known px value.
       * Mobile: no height — card sizes to content naturally.
       */}
      <div className="relative md:h-[520px]">
        {/* ── Freelancer image (md+) — absolute, spans full 440px ── */}
        <div
          className="hidden lg:block absolute bottom-0 left-4 lg:left-6 w-72 lg:w-80 h-[calc(100%+5rem)] z-30 pointer-events-none"
          aria-hidden="true"
        >
          <Image
            src="/assets/happ-freelancer.webp"
            alt="Happy freelancer celebrating with arms raised"
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 1024px) 256px, 288px"
          />
        </div>

        {/*
         * CTA card
         * md+: absolute, starts at top-[120px] (= 120px below wrapper top = 40px
         *      inside the section above), fills to wrapper bottom (320px tall).
         * mobile: normal flow with standard padding.
         */}
        <div className="relative md:absolute md:inset-x-0 md:top-[120px] md:bottom-0 bg-primary md:rounded-3xl overflow-hidden">
          {/* Dot grid texture */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.85) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />

          {/* Warm bloom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 65% 50%, rgba(255,220,170,0.18) 0%, rgba(255,160,80,0.10) 45%, transparent 75%)",
            }}
          />

          {/* Ambient glows */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/8 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 right-1/3 w-52 h-52 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          {/* Decorative boxes — right cluster */}
          <div className="absolute top-4 right-[8%] w-7 h-7 rounded-[4px] border border-white/20 pointer-events-none" />
          <div className="absolute top-10 right-[3%] w-4 h-4 rounded-[3px] bg-white/15 border border-white/20 pointer-events-none" />
          <div className="absolute top-20 right-[12%] w-5 h-5 rounded-[3px] border border-white/15 pointer-events-none" />
          <div className="absolute bottom-6 right-[5%] w-6 h-6 rounded-[4px] border border-white/18 pointer-events-none" />
          <div className="absolute bottom-14 right-[16%] w-3 h-3 rounded-[2px] bg-white/18 pointer-events-none" />

          {/* Content — centred vertically on md+ via flex; left-padded for image */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left lg:pl-72 xl:pl-80 px-8 py-12 md:py-14">
            {/* Eyebrow */}
            <p
              className="text-[10.5px] tracking-[0.14em] uppercase text-white/50 mb-5"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              For Upwork Freelancers
            </p>

            {/* Headline */}
            <h2
              className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-extrabold text-white tracking-[-0.035em] leading-[1.1] mb-5 max-w-sm md:max-w-none"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Stop writing proposals.{" "}
              <span
                className="italic font-normal text-white/85"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                Start winning jobs.
              </span>
            </h2>

            {/* Subtext */}
            <p
              className="text-[14.5px] text-white/68 leading-[1.8] mb-10 max-w-xs md:max-w-sm lg:max-w-md"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Propreso reads the job post and writes a personalized proposal
              in your voice — in under 60 seconds.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full lg:w-auto">
              <Button
                asChild
                className="w-full sm:w-auto bg-white text-primary hover:bg-background border-0 h-12 px-8 text-[14.5px] font-semibold tracking-[-0.01em] shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.22)] transition-all duration-200 rounded-xl gap-2 whitespace-nowrap"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <Link href="/sign-up">
                  Get My First Proposal Free
                  <ArrowRight size={15} />
                </Link>
              </Button>

              <p
                className="text-[11px] text-white/45 tracking-[0.06em]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Free to start&nbsp;&nbsp;·&nbsp;&nbsp;No credit
                card&nbsp;&nbsp;·&nbsp;&nbsp;10 proposals included
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer bar — bg-accent, light theme, two-zone layout
//
// Spacing:
//   withCtaOverlap (md+): -mt-16 so accent bg peeks behind card bottom;
//     pt-24 gives 80px breathing room between card and nav columns.
//   no CTA / mobile: pt-16 with a top border to signal a new section.
// ─────────────────────────────────────────────────────────────────────────────

interface FooterBarProps {
  withCtaOverlap: boolean;
}

function FooterBar({ withCtaOverlap }: FooterBarProps) {
  return (
    <div
      className={cn(
        "bg-card relative z-10 overflow-hidden",
        withCtaOverlap ? "md:-mt-16" : "border-t border-border",
      )}
    >
      {/* ── Decorative background shapes ─────────────────────── */}

      {/* Dot-grid — very subtle, fades toward centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(200,84,56,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, black 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, black 100%)",
        }}
      />

      {/* Large ring — bottom-right anchor */}
      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full border border-primary/8 pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-[260px] h-[260px] rounded-full border border-primary/6 pointer-events-none" />

      {/* Large ring — top-left echo */}
      <div className="absolute -top-28 -left-28 w-[360px] h-[360px] rounded-full border border-primary/6 pointer-events-none" />

      {/* Small floating squares */}
      <div className="absolute top-8 right-[18%] w-5 h-5 rounded-[4px] border border-primary/12 pointer-events-none" />
      <div className="absolute top-16 right-[8%] w-3 h-3 rounded-[3px] bg-primary/6 pointer-events-none" />
      <div className="absolute bottom-10 left-[12%] w-4 h-4 rounded-[3px] border border-primary/10 pointer-events-none" />
      <div className="absolute bottom-6 left-[22%] w-2.5 h-2.5 rounded-[2px] bg-primary/8 pointer-events-none" />
      <div className="absolute top-1/2 left-[6%] w-3 h-3 rounded-[2px] border border-primary/10 pointer-events-none" />
      <div className="absolute top-1/3 right-[4%] w-4 h-4 rounded-[3px] border border-primary/8 pointer-events-none" />
      {/* ── Zone 1: nav columns ───────────────────────────────── */}
      <div
        className={cn(
          "mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-5xl px-6",
          withCtaOverlap ? "pt-14 md:pt-24" : "pt-14",
        )}
      >
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-10 lg:gap-20">
          {/* ── Brand column ── */}
          <div className="flex flex-col gap-5 max-w-[220px]">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="relative w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(200,84,56,0.25)] group-hover:shadow-[0_0_18px_rgba(200,84,56,0.45)] transition-shadow duration-300">
                <Image
                  src="/assets/site-icon-white.svg"
                  alt="Propreso"
                  width={10}
                  height={13}
                  className="shrink-0"
                />
              </div>
              <span
                className="font-semibold text-[15px] text-foreground tracking-[-0.3px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Propreso
              </span>
            </Link>

            <p
              className="text-[13px] text-text-secondary leading-[1.75]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              AI-powered proposals for freelancers who want to win more clients,
              faster.
            </p>
          </div>

          {/* ── Product column ── */}
          <div>
            <p
              className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground font-medium mb-5"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Product
            </p>
            <ul className="flex flex-col gap-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-text-secondary hover:text-foreground transition-colors duration-150"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company column ── */}
          <div>
            <p
              className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground font-medium mb-5"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Company
            </p>
            <ul className="flex flex-col gap-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-text-secondary hover:text-foreground transition-colors duration-150"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Zone 2: bottom bar ────────────────────────────────── */}
      <div className="mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-5xl px-6 mt-12">
        <div className="border-t border-border py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p
            className="text-[12px] text-muted-foreground"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © 2025 Propreso. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <a
              href="https://twitter.com/propreso"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Propreso on X (Twitter)"
              className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border-strong hover:shadow-[0_2px_8px_rgba(26,20,18,0.08)] transition-all duration-200"
            >
              <Twitter size={13} />
            </a>
            <a
              href="https://linkedin.com/company/propreso"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Propreso on LinkedIn"
              className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border-strong hover:shadow-[0_2px_8px_rgba(26,20,18,0.08)] transition-all duration-200"
            >
              <Linkedin size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────

export function SiteFooter({ showCta = true }: SiteFooterProps) {
  return (
    // Card = 400px tall (h-[520px] wrapper − top-[120px] offset).
    // 80% in section above = 320px. Footer must pull up: 120 + 320 = 440px.
    <footer className={cn("relative z-20", showCta && "md:-mt-[440px]")}>
      {showCta && <CtaSection />}
      <FooterBar withCtaOverlap={showCta} />
    </footer>
  );
}
