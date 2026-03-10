import { TESTIMONIALS } from "../constants/testimonials";
import { TestimonialCard } from "./testimonial-card";
import { TestimonialsSlider } from "./testimonials-slider";

// ─── Data ─────────────────────────────────────────────────────────────────────

const p1 = TESTIMONIALS.find((t) => t.priority === "p1")!;
const p2 = TESTIMONIALS.find((t) => t.priority === "p2")!;
const p3s = TESTIMONIALS.filter((t) => t.priority === "p3");
const sliderA = p3s.slice(0, 5);
const sliderB = p3s.slice(5, 10);

// ─── Section ──────────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  return (
    <section className="relative bg-background/5 py-20 md:py-28 overflow-hidden">
      {/* ── Background decorations ────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(26,20,18,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Scattered boxes — top-left */}
        <div className="absolute top-10 left-[4%] w-8 h-8 rounded-[5px] border border-border-strong/40" />
        <div className="absolute top-6 left-[10%] w-4 h-4 rounded-[3px] bg-border/60" />
        <div className="absolute top-20 left-[2%] w-5 h-5 rounded-[3px] border border-border-strong/30" />
        <div className="absolute top-36 left-[7%] w-3 h-3 rounded-[2px] bg-border/50" />
        <div className="absolute top-52 left-[12%] w-6 h-6 rounded-[4px] border border-border/50" />

        {/* Scattered boxes — top-right */}
        <div className="absolute top-8 right-[5%] w-7 h-7 rounded-[4px] border border-border-strong/35" />
        <div className="absolute top-16 right-[2%] w-10 h-10 rounded-[6px] border border-border/30" />
        <div className="absolute top-4 right-[13%] w-3.5 h-3.5 rounded-[3px] bg-border/55" />
        <div className="absolute top-28 right-[8%] w-5 h-5 rounded-[3px] border border-border-strong/30" />
        <div className="absolute top-44 right-[15%] w-2.5 h-2.5 rounded-[2px] bg-border/45" />

        {/* Bottom boxes */}
        <div className="absolute bottom-14 left-[5%] w-6 h-6 rounded-[4px] border border-border/40" />
        <div className="absolute bottom-6 left-[13%] w-3.5 h-3.5 rounded-[2px] bg-border/50" />
        <div className="absolute bottom-10 right-[11%] w-4.5 h-4.5 rounded-[3px] bg-border/45" />
        <div className="absolute bottom-4 right-[6%] w-2.5 h-2.5 rounded-[2px] border border-border-strong/30" />

        {/* Rings */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full border border-border/30" />
        <div className="absolute -top-8 -left-8 w-36 h-36 rounded-full border border-border/25" />
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border border-border/25" />
        <div className="absolute -bottom-16 left-1/3 w-56 h-56 rounded-full border border-border/20" />
        <div className="absolute -bottom-6 left-[42%] w-32 h-32 rounded-full border border-border/25" />
        <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full border border-border/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-border/15" />
      </div>

      <div className="relative mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-5xl px-6">
        {/* ── Header ────────────────────────────────────────── */}
        <div className="text-center mb-12 md:mb-16">
          {/* Pill */}

          <p
            className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground/40 mb-5"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Testimonials
          </p>

          {/* Title */}

          <h2
            className="text-[clamp(1.85rem,4vw,3rem)] font-extrabold text-foreground tracking-[-0.035em] leading-[1.08] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Real freelancers.{" "}
            <span
              className="italic font-normal text-primary"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Real results.
            </span>
          </h2>

          {/* Description */}
          <p
            className="text-[14px] text-muted-foreground max-w-md mx-auto leading-[1.75]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Find out how our happy clients are raving about us.
          </p>
        </div>

        {/* ── Grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:items-stretch">
          {/* Left — p1, spans both rows */}
          <div className="lg:row-span-2">
            <TestimonialCard
              testimonial={p1}
              showTitle
              variant="light"
              className="h-full min-h-[440px]"
            />
          </div>

          {/* Right top — p2 */}
          <TestimonialCard
            testimonial={p2}
            showTitle
            variant="light"
            className="min-h-[210px]"
          />

          {/* Right bottom — sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[210px]">
            <TestimonialsSlider
              testimonials={sliderA}
              direction="vertical"
              startingBackground="light"
              className="h-full"
            />
            <TestimonialsSlider
              testimonials={sliderB}
              direction="horizontal"
              startingBackground="dark"
              className="h-full"
            />
          </div>
        </div>

        {/* ── Social proof bar ──────────────────────────────── */}
        <p
          className="text-center text-[12px] text-muted-foreground/50 mt-10 tracking-wide"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          50+ downloads on the Chrome Web Store &nbsp;·&nbsp; Used on 1,000+
          Upwork proposals
        </p>
      </div>
    </section>
  );
}
