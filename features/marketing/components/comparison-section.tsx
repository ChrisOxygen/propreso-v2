import Link from "next/link";
import { Check, Minus, X, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

// ─── Types & Data ─────────────────────────────────────────────────────────────

type CheckState = "yes" | "no" | "partial";

interface Tool {
  name: string;
  detail?: string;
  isPrimary?: boolean;
  price: string;
  proposals: string;
  proposalFootnote?: boolean;
  profileBased: CheckState;
  profileDetail?: string;
  worksInUpwork: CheckState;
  upworkDetail?: string;
}

const TOOLS: Tool[] = [
  {
    name: "Propreso",
    detail: "Pro",
    isPrimary: true,
    price: "$6 / mo",
    proposals: "200",
    profileBased: "yes",
    worksInUpwork: "yes",
    upworkDetail: "Chrome ext",
  },
  {
    name: "Upwex",
    detail: "entry",
    price: "$4.99 / mo",
    proposals: "50",
    profileBased: "no",
    worksInUpwork: "partial",
  },
  {
    name: "Proposal Genie",
    price: "Undisclosed",
    proposals: "20 free",
    profileBased: "partial",
    profileDetail: "Minimal",
    worksInUpwork: "no",
  },
  {
    name: "BrandWell",
    price: "~$16.58 / mo",
    proposals: "Bundled",
    profileBased: "no",
    worksInUpwork: "no",
  },
  {
    name: "ChatGPT",
    price: "$20+ / mo",
    proposals: "Unlimited",
    proposalFootnote: true,
    profileBased: "no",
    worksInUpwork: "no",
  },
];

// ─── StatusCell ───────────────────────────────────────────────────────────────

function StatusCell({
  state,
  label,
  isPrimary,
}: {
  state: CheckState;
  label?: string;
  isPrimary?: boolean;
}) {
  if (state === "yes") {
    return (
      <div className="flex items-center justify-center gap-2">
        <span
          className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded-full flex-shrink-0 ${
            isPrimary ? "bg-white/25" : "bg-emerald-100"
          }`}
        >
          <Check
            className={`w-2.5 h-2.5 ${isPrimary ? "text-white" : "text-emerald-600"}`}
            strokeWidth={3}
          />
        </span>
        {label && (
          <span
            className={`text-[12px] font-medium ${
              isPrimary ? "text-white/80" : "text-text-secondary"
            }`}
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {label}
          </span>
        )}
      </div>
    );
  }

  if (state === "partial") {
    return (
      <div className="flex items-center justify-center gap-2">
        <span
          className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded-full flex-shrink-0 ${
            isPrimary ? "bg-white/15" : "bg-amber-100"
          }`}
        >
          <Minus
            className={`w-2.5 h-2.5 ${isPrimary ? "text-white/60" : "text-amber-600"}`}
            strokeWidth={3}
          />
        </span>
        {label ? (
          <span
            className={`text-[12px] ${
              isPrimary ? "text-white/60" : "text-muted-foreground"
            }`}
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {label}
          </span>
        ) : (
          <span
            className="text-[12px] text-muted-foreground"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Partial
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <span
        className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded-full flex-shrink-0 ${
          isPrimary ? "bg-white/10" : "bg-border/60"
        }`}
      >
        <X
          className={`w-2.5 h-2.5 ${isPrimary ? "text-white/40" : "text-muted-foreground"}`}
          strokeWidth={3}
        />
      </span>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function ComparisonSection() {
  return (
    <section className="bg-gradient-to-b from-white to-background pt-20 md:pt-28 pb-20 md:pb-28">
      <div className="mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-5xl px-6">
        {/* ── Comparison header ───────────────────────────────── */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground/40 mb-5"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Competitive Comparison
          </p>

          <h2
            className="text-[clamp(1.85rem,4vw,3rem)] font-extrabold text-foreground tracking-[-0.035em] leading-[1.08] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            More proposals. {<br />} More personalization.{" "}
            <span
              className="italic font-normal text-primary"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Less money.
            </span>
          </h2>

          <p
            className="text-[14px] text-muted-foreground max-w-sm mx-auto leading-[1.75]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Here&apos;s how Propreso compares to the other tools freelancers
            use.
          </p>
        </div>

        {/* ── Table ───────────────────────────────────────────── */}
        <div className="-mx-6 px-6 overflow-x-auto">
          <div className="min-w-[600px] bg-card rounded-2xl border border-border overflow-hidden shadow-[0_2px_16px_rgba(26,20,18,0.06)]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3.5 px-5 text-left w-[200px]">
                    <span
                      className="text-[10.5px] tracking-[0.12em] uppercase text-muted-foreground/50"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      Tool
                    </span>
                  </th>
                  {[
                    "Price",
                    "Proposals / mo",
                    "Profile-based?",
                    "Works in Upwork?",
                  ].map((col) => (
                    <th key={col} className="py-3.5 px-4 text-center">
                      <span
                        className="text-[10.5px] tracking-[0.12em] uppercase text-muted-foreground/50"
                        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                      >
                        {col}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {TOOLS.map((tool, i) => {
                  const isLast = i === TOOLS.length - 1;
                  const rowBase = tool.isPrimary
                    ? "bg-primary"
                    : `${!isLast ? "border-b border-border/50" : ""} hover:bg-accent/40 transition-colors duration-150`;

                  return (
                    <tr key={tool.name} className={rowBase}>
                      {/* Tool name */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          {tool.isPrimary && (
                            <span
                              className="inline-flex items-center px-2 py-0.5 rounded text-[9.5px] font-bold tracking-[0.06em] uppercase bg-white/20 text-white"
                              style={{
                                fontFamily: "var(--font-jetbrains-mono)",
                              }}
                            >
                              ★ Best
                            </span>
                          )}
                          <span
                            className={`text-[14px] font-semibold tracking-[-0.01em] ${
                              tool.isPrimary ? "text-white" : "text-foreground"
                            }`}
                            style={{ fontFamily: "var(--font-space-grotesk)" }}
                          >
                            {tool.name}
                          </span>
                          {tool.detail && (
                            <span
                              className={`text-[11px] ${
                                tool.isPrimary
                                  ? "text-white/55"
                                  : "text-muted-foreground"
                              }`}
                              style={{
                                fontFamily: "var(--font-jetbrains-mono)",
                              }}
                            >
                              ({tool.detail})
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`text-[13.5px] font-semibold tracking-[-0.01em] ${
                            tool.isPrimary ? "text-white" : "text-foreground"
                          }`}
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {tool.price}
                        </span>
                      </td>

                      {/* Proposals/mo */}
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`text-[13.5px] font-medium ${
                            tool.isPrimary
                              ? "text-white"
                              : "text-text-secondary"
                          }`}
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {tool.proposals}
                          {tool.proposalFootnote && (
                            <sup
                              className={`text-[10px] ml-0.5 ${
                                tool.isPrimary
                                  ? "text-white/60"
                                  : "text-muted-foreground"
                              }`}
                            >
                              *
                            </sup>
                          )}
                        </span>
                      </td>

                      {/* Profile-based */}
                      <td className="py-4 px-4">
                        <StatusCell
                          state={tool.profileBased}
                          label={tool.profileDetail}
                          isPrimary={tool.isPrimary}
                        />
                      </td>

                      {/* Works in Upwork */}
                      <td className="py-4 px-4">
                        <StatusCell
                          state={tool.worksInUpwork}
                          label={tool.upworkDetail}
                          isPrimary={tool.isPrimary}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Footnote ────────────────────────────────────────── */}
        <p
          className="mt-5 text-[12px] text-muted-foreground leading-[1.75] max-w-xl"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <sup className="mr-0.5">*</sup>ChatGPT has no Upwork context, no
          profile personalization, and no copywriting formulas — it&apos;s a
          blank canvas, not a proposal tool.
        </p>

        {/* ── Pricing teaser box ──────────────────────────────── */}
        <div className="mt-16 md:mt-20 rounded-2xl border border-primary px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-20 items-center">
            {/* Left — copy */}
            <div>
              <p
                className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground/40 mb-5"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Pricing
              </p>

              <h3
                className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold text-foreground tracking-[-0.035em] leading-[1.08] mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Start free.{" "}
                <span
                  className="italic font-normal text-primary"
                  style={{ fontFamily: "var(--font-instrument-serif)" }}
                >
                  Upgrade when you&apos;re ready.
                </span>
              </h3>

              <p
                className="text-[14px] text-text-secondary leading-[1.85] max-w-lg"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                10 free proposals to get started — no credit card, no time
                limit. Upgrade to Pro for{" "}
                <span className="text-foreground font-medium">$6 / month</span>{" "}
                when you&apos;re ready to go full-time.
              </p>
            </div>

            {/* Right — CTA */}
            <div className="flex flex-col items-start lg:items-end gap-3">
              <Button
                asChild
                className="bg-primary hover:bg-primary-hover text-white h-11 px-7 text-[14px] font-semibold tracking-[-0.01em] shadow-none transition-all duration-200 rounded-lg gap-2 whitespace-nowrap border-0"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <Link href="/pricing">
                  See full pricing
                  <ArrowRight size={14} />
                </Link>
              </Button>

              <p
                className="text-[11px] text-muted-foreground/50 tracking-[0.05em]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
