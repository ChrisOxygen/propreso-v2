import Link from "next/link";
import { HeroNav } from "@/features/marketing/components/hero-nav";

// ─────────────────────────────────────────────────────────────────────────────
// LegalSection
// ─────────────────────────────────────────────────────────────────────────────

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-28">
      <div className="flex items-baseline gap-2.5 mb-5">
        <span className="font-heading font-bold text-[13px] text-primary tabular-nums shrink-0 select-none">
          {number}.
        </span>
        <h2 className="font-heading font-semibold text-[18px] text-foreground leading-snug">
          {title}
        </h2>
      </div>
      <div className="font-sans text-[14.5px] leading-[1.9] text-text-secondary space-y-4 pl-6">
        {children}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LegalSubSection
// ─────────────────────────────────────────────────────────────────────────────

export function LegalSubSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 mb-2">
      <h3 className="font-heading font-semibold text-[14.5px] text-foreground mb-3">
        <span className="text-primary/70 mr-2">{number}</span>
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LegalList
// ─────────────────────────────────────────────────────────────────────────────

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[9px] w-1 h-1 rounded-full bg-primary/40 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LegalDisclaimer — for ALL-CAPS legal blocks
// ─────────────────────────────────────────────────────────────────────────────

export function LegalDisclaimer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-accent border border-primary/15 rounded-xl p-5 text-[13.5px] leading-[1.85] text-text-secondary font-sans">
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LegalPageWrapper
// ─────────────────────────────────────────────────────────────────────────────

interface TocEntry {
  id: string;
  number: string;
  title: string;
}

interface LegalPageWrapperProps {
  title: string;
  dateLabel: "Last Updated" | "Effective Date";
  date: string;
  toc: TocEntry[];
  sibling: { href: string; label: string };
  children: React.ReactNode;
}

export function LegalPageWrapper({
  title,
  dateLabel,
  date,
  toc,
  sibling,
  children,
}: LegalPageWrapperProps) {
  return (
    <div className="min-h-screen bg-background">
      <HeroNav />

      <main className="pt-28 pb-24">
        <div className="max-w-[720px] mx-auto px-6">
          {/* ── Page header ─────────────────────────────────────────────── */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent border border-primary/20 text-primary text-[11px] font-heading font-bold uppercase tracking-widest mb-6">
              Legal
            </div>

            <h1 className="font-display text-[2.75rem] leading-[1.15] text-foreground mb-4">
              {title}
            </h1>

            <p className="font-heading text-[13.5px] text-muted-foreground">
              {dateLabel}:{" "}
              <time className="text-text-secondary font-medium">{date}</time>
            </p>
          </div>

          {/* ── Table of contents ────────────────────────────────────────── */}
          <div className="bg-card border border-border rounded-xl p-6 mb-14">
            <p className="font-heading text-[10.5px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
              Contents
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-8">
              {toc.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-baseline gap-2 font-heading text-[13px] text-text-secondary hover:text-primary transition-colors duration-150 group"
                  >
                    <span className="text-muted-foreground group-hover:text-primary text-[11px] font-semibold w-5 shrink-0 tabular-nums">
                      {s.number}.
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Sections ─────────────────────────────────────────────────── */}
          <div>{children}</div>

          {/* ── Page footer ──────────────────────────────────────────────── */}
          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
            <p className="font-heading text-[12px] text-muted-foreground">
              © 2026 Chris Okafor. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href={sibling.href}
                className="font-heading text-[12px] text-muted-foreground hover:text-primary transition-colors"
              >
                {sibling.label}
              </Link>
              <Link
                href="/"
                className="font-heading text-[12px] text-muted-foreground hover:text-primary transition-colors"
              >
                propreso.com
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
