import Image from "next/image";

// ─── About Founder Section ─────────────────────────────────────────────────────
// Two-column editorial layout: left = long-form prose story, right = founder
// identity card. Pull quotes are highlighted in the ember accent colour.

export function AboutFounderSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* ── Section label ───────────────────────────────────── */}
        <p
          className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50 mb-12"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Founder Story
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14 lg:gap-20 items-start">
          {/* ── Left: prose ───────────────────────────────────── */}
          <div className="flex flex-col gap-0">
            {/* Large drop cap heading */}
            <h2
              className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-foreground tracking-[-0.035em] leading-[1.1] mb-8"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              The story.
            </h2>

            {/* Body copy — spaced paragraphs */}
            <div
              className="flex flex-col gap-5 text-[15.5px] text-text-secondary leading-[1.82]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <p>
                I spent years building software for clients on Upwork — landing
                pages, SaaS products, Chrome extensions, full-stack apps. The
                work was good. The proposals were exhausting.
              </p>

              <p>
                Every application started the same: stare at the job post, try
                to figure out what they <span className="italic">really</span>{" "}
                want, write something that sounds personal but doesn&apos;t take
                forever, send it off, and wait. Sometimes it worked. Most times,
                it didn&apos;t.
              </p>

              {/* Pull quote — amber highlighted */}
              <blockquote className="relative pl-5 border-l-2 border-primary my-2">
                <p
                  className="text-foreground text-[17px] leading-[1.65]"
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontStyle: "italic",
                  }}
                >
                  I started using AI to help. ChatGPT was okay — but it
                  didn&apos;t know me. It didn&apos;t know my niche, my stack,
                  my experience.
                </p>
              </blockquote>

              <p>
                Every time, I&apos;d have to feed it context and then rewrite
                whatever it spat out to actually sound like me. It saved a
                little time. It didn&apos;t solve the problem.
              </p>

              <p>
                So I built something that{" "}
                <span className="text-foreground font-medium">did</span> know
                me. Something that stored my profile, understood the job post
                before writing, and let me pick the exact tone and formula that
                fit the client. Something that worked{" "}
                <span className="text-foreground font-medium">
                  inside Upwork
                </span>
                , not alongside it.
              </p>

              <p
                className="text-foreground text-[16.5px] font-medium"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                That&apos;s Propreso. It&apos;s the proposal tool I needed and
                couldn&apos;t find.
              </p>
            </div>
          </div>

          {/* ── Right: founder card ───────────────────────────── */}
          <div className="lg:sticky lg:top-32 flex flex-col gap-4">
            {/* Founder photo */}
            <div className="relative rounded-2xl overflow-hidden border border-border aspect-[3/4]">
              <Image
                src="/assets/founders-chris-and-juliet.webp"
                alt="Christopher Okafor — Founder of Propreso"
                fill
                className="object-cover object-top scale-200"
              />

              {/* Bottom name tag */}
              <div
                className="absolute bottom-0 left-0 right-0 z-10 px-5 py-5"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,20,18,0.65) 0%, transparent 100%)",
                }}
              >
                <p
                  className="text-white text-[15px] font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Christopher Okafor
                </p>
                <p
                  className="text-white/60 text-[11.5px] mt-0.5 tracking-[0.06em] uppercase"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  Founder · Propreso
                </p>
              </div>
            </div>

            {/* Caption card */}
            <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-1.5">
              <p
                className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground/50"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                About the founder
              </p>
              <p
                className="text-[13.5px] text-text-secondary leading-[1.7]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Christopher is a full-stack freelancer who spent years on Upwork
                before building the tool he couldn&apos;t find anywhere else.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
