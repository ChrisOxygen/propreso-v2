import { Target, MessageSquare, DollarSign } from "lucide-react";

// ─── About Values Section ──────────────────────────────────────────────────────
// Three value cards with icon, title, and description.
// Alternating card accent border treatment for visual rhythm.

const VALUES = [
  {
    icon: Target,
    label: "01",
    title: "Freelancers deserve better tools",
    body: "Most freelance tools are built for agencies or enterprises. Propreso is built for the independent freelancer grinding through proposals alone — and it's priced that way too.",
    accent: true,
  },
  {
    icon: MessageSquare,
    label: "02",
    title: "Your voice should come through",
    body: "AI should amplify who you are, not replace you with a generic template. Every Propreso proposal starts from your profile — your niche, your skills, your words.",
    accent: false,
  },
  {
    icon: DollarSign,
    label: "03",
    title: "Honest pricing, always",
    body: "We charge $6/month. That's it. No upsells, no confusing credit bundles, no per-generation pricing that makes you anxious. You know what you're getting.",
    accent: false,
  },
] as const;

export function AboutValuesSection() {
  return (
    <section className="bg-accent/40 border-y border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p
              className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50 mb-3"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Mission &amp; Values
            </p>
            <h2
              className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-foreground tracking-[-0.035em] leading-[1.1]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              What we{" "}
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
                believe.
              </span>
            </h2>
          </div>

          {/* Faint decorative line */}
          <div className="hidden sm:block flex-1 max-w-[120px] h-px bg-border-strong/50 mb-2" />
        </div>

        {/* ── Cards grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VALUES.map(({ icon: Icon, label, title, body, accent }) => (
            <div
              key={label}
              className="relative rounded-2xl bg-card border border-border p-6 flex flex-col gap-4 overflow-hidden transition-shadow duration-200 hover:shadow-[0_4px_24px_rgba(200,84,56,0.08)]"
            >
              {/* Top accent bar on first card */}
              {accent && (
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                  style={{
                    background:
                      "linear-gradient(90deg, #C85438 0%, #F0A558 100%)",
                  }}
                />
              )}

              {/* Number label */}
              <span
                className="text-[11px] tracking-[0.18em] text-muted-foreground/40 uppercase"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {label}
              </span>

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-accent border border-primary/15 flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.75} />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3
                  className="text-[15.5px] font-semibold text-foreground tracking-[-0.02em] leading-snug"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-[13.5px] text-text-secondary leading-[1.75]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
