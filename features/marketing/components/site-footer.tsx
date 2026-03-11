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
// ─────────────────────────────────────────────────────────────────────────────
//
// Layout geometry (when showCta=true):
//   • <footer> has -mt-28 (112px) → entire footer overlaps into the section above
//   • pt-16 wrapper above the card = image overflow zone (64px)
//   • Card top is therefore at: 64px from footer top = 112-64 = 48px inside section above ✓
//   • Image (absolute, bottom-0, h-full) spans from footer top → card bottom
//     meaning it overflows 112px into the section above (purely visual, no bg behind it)
//   • FooterBar -mt-24 (96px) → dark bg starts 96px before the CTA wrapper ends
//     = the dark bg shows behind the bottom ~32px of the card ✓
//
// ─────────────────────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    // No background — the card floats transparently over the section above
    <div className="relative z-20 mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-5xl px-6">
      {/*
       * pt-16 creates the "above the card" zone.
       * The image is absolute bottom-0 h-full — it spans this entire wrapper
       * (pt zone + card height), overflowing above the card into the section above.
       */}
      <div className="relative pt-16">
        {/* ── Freelancer image — overflows above the CTA card ── */}
        <div
          className="absolute left-4 md:left-8 bottom-0 w-44 md:w-56 lg:w-60 h-full z-30 pointer-events-none hidden md:block"
          aria-hidden="true"
        >
          <Image
            src="/assets/happ-freelancer.webp"
            alt="Happy freelancer celebrating with arms raised"
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 0px, (max-width: 1024px) 224px, 240px"
          />
        </div>

        {/* ── CTA card ─────────────────────────────────────────── */}
        <div className="relative bg-primary rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.30),0_8px_32px_rgba(0,0,0,0.18)]">
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

          {/* Scattered decorative boxes — right cluster */}
          <div className="absolute top-4 right-[8%] w-7 h-7 rounded-[4px] border border-white/20 pointer-events-none" />
          <div className="absolute top-10 right-[3%] w-4 h-4 rounded-[3px] bg-white/15 border border-white/20 pointer-events-none" />
          <div className="absolute top-20 right-[12%] w-5 h-5 rounded-[3px] border border-white/15 pointer-events-none" />
          <div className="absolute bottom-6 right-[5%] w-6 h-6 rounded-[4px] border border-white/18 pointer-events-none" />
          <div className="absolute bottom-14 right-[16%] w-3 h-3 rounded-[2px] bg-white/18 pointer-events-none" />

          {/*
           * Content — on md+ screens the left portion is occupied by the
           * overflowing image, so we apply left padding there.
           */}
          <div className="relative z-10 md:pl-52 lg:pl-64 px-8 py-14 md:py-16 lg:py-20">
            {/* Eyebrow */}
            <p
              className="text-[10.5px] tracking-[0.14em] uppercase text-white/50 mb-5"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Start today
            </p>

            {/* Headline */}
            <h2
              className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-extrabold text-white tracking-[-0.035em] leading-[1.1] mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Your next client is{" "}
              <span
                className="italic font-normal text-white/85"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                one proposal away.
              </span>
            </h2>

            {/* Subtext */}
            <p
              className="text-[14.5px] text-white/68 leading-[1.8] mb-10 max-w-md"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Every job post is a door. Propreso gives you the right words to
              open it.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Button
                asChild
                className="bg-white text-primary hover:bg-background border-0 h-12 px-8 text-[14.5px] font-semibold tracking-[-0.01em] shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.22)] transition-all duration-200 rounded-xl gap-2 whitespace-nowrap"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <Link href="/sign-up">
                  Start Writing Better Proposals
                  <ArrowRight size={15} />
                </Link>
              </Button>

              <p
                className="text-[11px] text-white/45 tracking-[0.06em]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Free forever&nbsp;&nbsp;·&nbsp;&nbsp;No credit
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
// Footer bar — dark background starts partway up, behind the CTA card bottom
// ─────────────────────────────────────────────────────────────────────────────

interface FooterBarProps {
  withCtaOverlap: boolean;
}

function FooterBar({ withCtaOverlap }: FooterBarProps) {
  return (
    <div
      className={cn(
        "bg-foreground relative z-10",
        // Pull the dark bg up by 96px so it shows behind the card's bottom portion.
        // pt-28 (112px) then pushes the actual footer content below the card.
        withCtaOverlap && "-mt-24 pt-28"
      )}
    >
      <div
        className={cn(
          "mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-5xl px-6 pb-10",
          !withCtaOverlap && "pt-14"
        )}
      >
        {/* ── Main row ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_1fr_1fr] gap-10 lg:gap-16">
          {/* Logo + tagline + social */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="relative w-7 h-7 rounded-lg bg-primary flex items-center justify-center transition-all duration-300 shadow-[0_0_12px_rgba(200,84,56,0.3)] group-hover:shadow-[0_0_20px_rgba(200,84,56,0.5)]">
                <Image
                  src="/assets/site-icon-white.svg"
                  alt="Propreso"
                  width={10}
                  height={13}
                  className="shrink-0"
                />
              </div>
              <span
                className="font-semibold text-[15px] text-white tracking-[-0.3px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Propreso
              </span>
            </Link>

            <p
              className="text-[12.5px] text-white/38 leading-[1.75] max-w-[180px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              AI-powered proposals for Upwork freelancers.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://twitter.com/propreso"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Propreso on X (Twitter)"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <Twitter size={13} />
              </a>
              <a
                href="https://linkedin.com/company/propreso"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Propreso on LinkedIn"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <Linkedin size={13} />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <p
              className="text-[10.5px] tracking-[0.12em] uppercase text-white/30 mb-5"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Product
            </p>
            <ul className="flex flex-col gap-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/50 hover:text-white/85 transition-colors duration-150"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <p
              className="text-[10.5px] tracking-[0.12em] uppercase text-white/30 mb-5"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Company
            </p>
            <ul className="flex flex-col gap-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/50 hover:text-white/85 transition-colors duration-150"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider + copyright ──────────────────────────────── */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p
            className="text-[11.5px] text-white/28"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © 2025 Propreso. All rights reserved.
          </p>
          <p
            className="text-[10.5px] text-white/20 tracking-[0.05em]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Made for freelancers who ship
          </p>
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
    // -mt-28: the entire footer component overlaps 112px into the section above.
    // z-10: ensure the footer paints on top of the preceding section.
    <footer className={cn("relative z-10", showCta && "-mt-28")}>
      {showCta && <CtaSection />}
      <FooterBar withCtaOverlap={showCta} />
    </footer>
  );
}
