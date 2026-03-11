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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ value, label }, i) => (
            <div
              key={value}
              className={cn(
                "relative rounded-2xl p-6 flex flex-col gap-2 overflow-hidden border",
                i === 0
                  ? "bg-primary border-primary"
                  : "bg-card border-border hover:border-border-strong transition-colors duration-200",
              )}
            >
              {/* Faint dot grid on accent card */}
              {i === 0 && (
                <div
                  className="absolute inset-0 opacity-[0.08] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
              )}

              <span
                className={cn(
                  "text-[clamp(2rem,4.5vw,2.8rem)] font-extrabold tracking-[-0.04em] leading-none",
                  i === 0 ? "text-white" : "text-foreground",
                )}
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {value}
              </span>
              <span
                className={cn(
                  "text-[13px] leading-snug",
                  i === 0 ? "text-white/65" : "text-muted-foreground",
                )}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Update nudge */}
        <p
          className="mt-5 text-center text-[11px] text-muted-foreground/40 tracking-[0.06em]"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Numbers updated monthly
        </p>
      </div>
    </section>
  );
}
