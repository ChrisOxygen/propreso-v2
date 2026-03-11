import { cn } from "@/shared/lib/utils";

// ─── About Stats Section ───────────────────────────────────────────────────────
// Large bold stat tiles in a row — mirrors the HeroSection stats treatment
// but uses a distinct two-tone card layout for more visual weight.

const STATS = [
  { value: "1,000+", label: "Chrome extension downloads" },
  { value: "10,000+", label: "Proposals generated" },
  { value: "5", label: "Copywriting formulas" },
  { value: "$6/mo", label: "Starting price — really" },
] as const;

export function AboutStatsSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="mb-14 text-center flex flex-col items-center gap-2">
          <p
            className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            By the Numbers
          </p>
          <h2
            className="text-[clamp(1.7rem,3.8vw,2.6rem)] font-extrabold text-foreground tracking-[-0.035em]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Real numbers, no fluff.
          </h2>
        </div>

        {/* ── Stat tiles ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center">
          {STATS.map(({ value, label }, i) => (
            <div
              key={value}
              className={cn(
                "flex flex-col items-center gap-1 px-8 py-6 sm:py-0 border-border",
                // Mobile: cross pattern
                i === 0 && "border-r border-b",
                i === 1 && "border-b",
                i === 2 && "border-r",
                // Desktop: vertical dividers between items
                i < STATS.length - 1 && "sm:border-r sm:border-b-0",
                i === STATS.length - 1 && "sm:border-0",
              )}
            >
              <span
                className="text-[2.25rem] font-extrabold text-foreground tracking-[-0.04em] leading-none"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {value}
              </span>
              <span
                className="text-[12px] text-muted-foreground text-center leading-snug max-w-28"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
