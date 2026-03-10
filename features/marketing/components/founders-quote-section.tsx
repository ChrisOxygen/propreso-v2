// ─── Founder's Quote Section ──────────────────────────────────────────────────
// Full-viewport parallax section with a fixed background image and a
// centred founder quote. Background attachment is intentionally inline
// (same exception as auth-brand-panel — no light-theme token equivalents).

export function FoundersQuoteSection() {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/founder-q-bg.webp')" }}
    >
      {/* ── Layered scrim ─────────────────────────────────────────────── */}
      {/* Base dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Bottom-up vignette so page transitions feel grounded */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%), linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 45%)",
        }}
      />

      {/* ── Quote ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-12 py-32 text-center">
        {/* Decorative opening mark */}
        <div
          className="leading-none text-primary/90 select-none mb-6"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(7rem, 14vw, 11rem)",
            lineHeight: 0.85,
          }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* The quote */}
        <blockquote>
          <p
            className="text-white leading-[1.25] tracking-[-0.015em]"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(1.65rem, 3.6vw, 3rem)",
              fontStyle: "italic",
            }}
          >
            Most people are waiting to see what AI becomes.{" "}
            <span className="text-white/75">
              A rare few are using it today to become who they were always meant
              to be.
            </span>
          </p>
        </blockquote>

        {/* Attribution */}
        <footer className="mt-12 flex flex-col items-center gap-4">
          <div className="w-10 h-px bg-white/25" />
          <p
            className="text-[11px] tracking-[0.18em] uppercase text-white/40"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Christopher Okafor
          </p>
        </footer>
      </div>
    </section>
  );
}
