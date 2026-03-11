"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

// ─────────────────────────────────────────────────────────────────────────────
// FooterV2 — simple single-row footer, white bg, no CTA
// Layout:
//   Top row:  logo  ·  nav links (centred)  ·  social icons
//   Divider
//   Bottom:   copyright  ·  legal links
// ─────────────────────────────────────────────────────────────────────────────

export function FooterV2() {
  const pathname = usePathname();
  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* ── Background decorations ───────────────────────────── */}

      {/* Dot-grid — fades toward centre */}
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

      {/* Large rings — bottom-right */}
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

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* ── Top row ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-6 py-9">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative w-6 h-6 rounded-md bg-primary flex items-center justify-center shadow-[0_0_8px_rgba(200,84,56,0.2)] group-hover:shadow-[0_0_14px_rgba(200,84,56,0.38)] transition-shadow duration-300">
              <Image
                src="/assets/site-icon-white.svg"
                alt="Propreso"
                width={9}
                height={12}
                className="shrink-0"
              />
            </div>
            <span
              className="font-semibold text-[14px] text-foreground tracking-[-0.3px]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Propreso
            </span>
          </Link>

          {/* Nav links — hidden on mobile, visible md+ */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = link.href.startsWith("/#")
                ? pathname === "/"
                : pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? "text-[13px] text-foreground font-medium transition-colors duration-150"
                      : "text-[13px] text-text-secondary hover:text-foreground transition-colors duration-150"
                  }
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href="https://twitter.com/propreso"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Propreso on X (Twitter)"
              className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border-strong transition-all duration-150"
            >
              {/* X (Twitter) solid logo */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/propreso"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Propreso on LinkedIn"
              className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border-strong transition-all duration-150"
            >
              {/* LinkedIn solid logo */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────── */}
        <div className="border-t border-border py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p
            className="text-[11.5px] text-muted-foreground"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Propreso © {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11.5px] text-muted-foreground hover:text-text-secondary transition-colors duration-150"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

