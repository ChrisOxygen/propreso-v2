import { Badge } from "@/shared/components/ui/badge";

// ─── About Hero Section ────────────────────────────────────────────────────────
// Editorial-style page header with a large warmed gradient background and
// a centred bold headline. Mirrors the HeroSection background treatment.

export function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-20 md:pt-40 md:pb-28">
      {/* ── Background ─────────────────────────────────────── */}

      {/* Warm radial bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(200,84,56,0.14) 0%, rgba(200,84,56,0.06) 55%, transparent 100%)",
        }}
      />

      {/* Faint dot grid */}
      <div
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(26,20,18,0.55) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Faint large decorative ring */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border pointer-events-none"
        style={{ borderColor: "rgba(200,84,56,0.07)" }}
      />

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 flex flex-col items-center text-center gap-5">
        {/* Eyebrow */}
        <Badge
          variant="outline"
          className="animate-fade-up border-primary/20 bg-accent text-primary px-4 py-1.5 text-[11px] tracking-widest uppercase rounded-full"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Our Story
        </Badge>

        {/* Headline */}
        <h1
          className="animate-fade-up delay-100 text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold text-foreground tracking-[-0.04em] leading-[1.05]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Built by a freelancer,{" "}
          <span
            className="italic font-normal"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              background:
                "linear-gradient(135deg, #C85438 0%, #D96B32 40%, #F0A558 80%, #F5BA72 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            for freelancers.
          </span>
        </h1>

        {/* Sub-copy */}
        <p
          className="max-w-lg text-[16px] text-muted-foreground leading-[1.8]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Not by a growth-hacking agency trying to chase a market. We felt the
          pain too — and built the tool we couldn&apos;t find.
        </p>

        {/* Decorative divider */}
        <div className="animate-fade-in delay-300 mt-2 flex items-center gap-3">
          <div className="w-12 h-px bg-border-strong" />
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="w-12 h-px bg-border-strong" />
        </div>
      </div>
    </section>
  );
}
