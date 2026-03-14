import { ScrollReveal } from "@/shared/components/scroll-reveal";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const PROBLEMS = [
  {
    number: "01",
    title: "Your opener is forgettable.",
    description:
      "'Hi, I'm a developer with 5 years of experience...' — that's every other proposal.",
  },
  {
    number: "02",
    title: "You're writing from your perspective, not theirs.",
    description:
      "Clients don't care about your credentials. They care about their problem.",
  },
  {
    number: "03",
    title: "The tone is off.",
    description:
      "Every job post has a personality. A startup's casual tone isn't the same as an enterprise's formal one.",
  },
  {
    number: "04",
    title: "You're sending the same generic proposal to every job.",
    description: "They can tell.",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function PainPointSection() {
  return (
    <section className="bg-white border-t border-border py-24 md:py-32">
      <div className="mx-auto sm:max-w-lg lg:max-w-5xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-24 items-start">
          {/* ── Left: headline + emotional copy ─────── */}
          <ScrollReveal className="lg:sticky lg:top-32">
            {/* Eyebrow */}
            <p
              className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground/40 mb-8"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              The Problem
            </p>

            {/* Headline — two lines, two tones */}
            <div className="mb-7">
              <h2
                className="text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold text-foreground tracking-[-0.035em] leading-[1.06]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                You write
                <br />
                the proposal.
              </h2>
              <h2
                className="text-[clamp(2rem,4.2vw,3.25rem)] tracking-[-0.025em] leading-[1.1] italic text-primary"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                They hire someone else.
              </h2>
            </div>

            {/* Emotional paragraph */}
            <p
              className="text-[15px] leading-[1.85] text-text-secondary"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              You spend 30 minutes on a proposal. You make it personal. You try
              to stand out. And then&nbsp;—&nbsp;nothing. No reply. No view.
              The job closes.
            </p>

            {/* Bridge */}
            <p
              className="mt-7 text-[13.5px] font-medium text-foreground/60 italic"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Sound familiar? Here&rsquo;s what&rsquo;s actually going wrong:
            </p>
          </ScrollReveal>

          {/* ── Right: problems list ──────────────────── */}
          <ScrollReveal delay={120}>
            <div className="divide-y divide-border">
              {PROBLEMS.map(({ number, title, description }) => (
                <div
                  key={number}
                  className="flex gap-7 py-8 -mx-4 px-4 hover:bg-accent/50 transition-colors duration-200 group"
                >
                  {/* Number */}
                  <span
                    className="text-[11px] tabular-nums text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors shrink-0 pt-0.5 w-6"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {number}
                  </span>

                  {/* Content */}
                  <div>
                    <p
                      className="text-[15px] font-semibold text-foreground leading-snug tracking-[-0.015em] mb-2"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {title}
                    </p>
                    <p
                      className="text-[14px] text-text-secondary leading-[1.78]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Solution statement */}
            <div className="mt-8 pt-8 border-t border-border flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-[7px] shrink-0" />
              <p
                className="text-[15px] font-semibold text-foreground leading-relaxed tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Propreso fixes all of this automatically&nbsp;—&nbsp;
                <span className="text-primary">before you hit send.</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
