import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { HeroNav } from "./_components/hero-nav";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0F0A05" }}>
      <HeroNav />

      <main>
        {/* ═══════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center overflow-hidden pt-22">

          {/* ── Background layers ─────────────────────────── */}

          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(251,247,243,0.55) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.028] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "160px 160px",
            }}
          />

          {/* Primary radial bloom — warm orange behind headline */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "8%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "860px",
              height: "520px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(200,73,26,0.13) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Secondary amber accent bloom */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "4%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "480px",
              height: "280px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(245,160,96,0.07) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* ── Hero copy ─────────────────────────────────── */}
          <div className="relative z-10 mx-auto w-full max-w-5xl px-6 flex flex-col items-center text-center pt-20 md:pt-28 gap-5 md:gap-6">

            {/* Eyebrow badge */}
            <div className="animate-fade-up delay-100">
              <Badge
                variant="outline"
                className="border-[#C8491A]/35 bg-[#C8491A]/8 text-[#F5C9A8] px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase rounded-full backdrop-blur-sm"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                ✦&nbsp;&nbsp;AI-Powered Proposals
              </Badge>
            </div>

            {/* Headline */}
            <div className="animate-fade-up delay-200 flex flex-col items-center gap-0.5 md:gap-1">
              <h1
                className="text-[clamp(2.6rem,7vw,5.25rem)] font-extrabold text-[#FBF7F3] tracking-[-0.035em] leading-none whitespace-nowrap"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Craft Winning Proposals
              </h1>
              <h2
                className="text-[clamp(2.4rem,6.6vw,5rem)] text-[#E06030] tracking-[-0.015em] leading-[1.1] italic"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                in Minutes, Every Time
              </h2>
            </div>

            {/* Subheading */}
            <p
              className="animate-fade-up delay-300 max-w-130 text-[15px] md:text-[16.5px] text-[#FBF7F3]/45 leading-[1.75]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Propreso reads the job post, knows your niche, and streams a
              tailored Upwork proposal in seconds. Stop copy-pasting.
              Start winning.
            </p>

            {/* CTA buttons */}
            <div className="animate-fade-up delay-400 flex flex-col sm:flex-row items-center gap-3 mt-1">
              <Button
                size="lg"
                className="bg-[#C8491A] hover:bg-[#E06030] active:bg-[#9E3610] text-white border-0 h-12 px-8 text-[14.5px] font-semibold tracking-[-0.01em] shadow-[0_0_32px_rgba(200,73,26,0.38)] hover:shadow-[0_0_44px_rgba(200,73,26,0.55)] transition-all duration-200 rounded-full"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#FBF7F3]/14 bg-white/4 hover:bg-white/8 text-[#FBF7F3]/65 hover:text-[#FBF7F3] h-12 px-8 text-[14.5px] font-medium tracking-[-0.01em] transition-all duration-200 rounded-full backdrop-blur-sm"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Sign In
              </Button>
            </div>

            {/* Social proof micro-text */}
            <p
              className="animate-fade-up delay-500 text-[11px] tracking-[0.06em]"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                color: "rgba(251,247,243,0.22)",
              }}
            >
              No credit card required &nbsp;·&nbsp; 10 free proposals to start
            </p>
          </div>

          {/* ── Browser mockup ────────────────────────────── */}
          <div className="animate-fade-up delay-700 relative z-10 mt-16 md:mt-20 w-full max-w-250 mx-auto px-4 md:px-6 pb-0">

            {/* Glow halo behind mockup */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: "0 8% -20px",
                background: "radial-gradient(ellipse, rgba(200,73,26,0.16) 0%, transparent 70%)",
                filter: "blur(64px)",
                borderRadius: "50%",
                zIndex: -1,
              }}
            />

            {/* Browser chrome frame */}
            <div className="rounded-[14px] overflow-hidden border border-white/7.5 shadow-[0_40px_100px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.04)]">

              {/* Chrome top bar */}
              <div className="flex items-center gap-3 px-4 py-2.75 bg-[#150D08] border-b border-white/6.5">

                {/* Traffic lights */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-2.75 h-2.75 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.75 h-2.75 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.75 h-2.75 rounded-full bg-[#27C93F]" />
                </div>

                {/* Divider */}
                <div className="w-px h-4 bg-white/10 shrink-0" />

                {/* Tab — active */}
                <div
                  className="flex items-center gap-1.5 bg-[#1E1208] rounded-t-md px-3 py-1 text-[11.5px] text-[#FBF7F3]/55 shrink-0"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-60">
                    <rect x="1" y="1" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1 4h10" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  Propreso — Dashboard
                </div>

                {/* Address bar */}
                <div className="flex-1 flex items-center gap-1.5 bg-[#0F0A05]/70 rounded-md px-3 py-1.25 max-w-70">
                  {/* Lock icon */}
                  <svg
                    width="9"
                    height="11"
                    viewBox="0 0 9 11"
                    fill="none"
                    className="shrink-0 opacity-30"
                  >
                    <rect x="0.5" y="4.5" width="8" height="6" rx="1.5" fill="white" />
                    <path
                      d="M2.5 4.5V3A2 2 0 0 1 6.5 3v1.5"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className="text-[10.5px] text-white/28 select-none truncate"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    app.propreso.ai/dashboard
                  </span>
                </div>
              </div>

              {/* Dashboard screenshot */}
              <div className="relative bg-[#1A100A]">
                <Image
                  src="/assets/propreso-dashboard.png"
                  alt="Propreso dashboard — AI proposal generator interface"
                  width={1280}
                  height={800}
                  className="w-full h-auto block"
                  priority
                />

                {/* Bottom fade — melts into page bg */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[45%] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, #0F0A05 0%, rgba(15,10,5,0.7) 50%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
