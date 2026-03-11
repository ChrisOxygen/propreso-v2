import { Check, X } from "lucide-react";

// ─── Types & Data ─────────────────────────────────────────────────────────────

type CellValue =
  | { type: "check" }
  | { type: "x" }
  | { type: "check-label"; label: string }
  | { type: "text"; value: string };

interface ComparisonRow {
  feature: string;
  free: CellValue;
  pro: CellValue;
}

const ROWS: ComparisonRow[] = [
  {
    feature: "Generation tokens",
    free: { type: "text", value: "10 lifetime" },
    pro: { type: "text", value: "200 / month" },
  },
  {
    feature: "Token rollover (yearly)",
    free: { type: "x" },
    pro: { type: "check-label", label: "no cap" },
  },
  {
    feature: "Freelancer profiles",
    free: { type: "text", value: "2" },
    pro: { type: "text", value: "Unlimited" },
  },
  {
    feature: "Tones (4)",
    free: { type: "check" },
    pro: { type: "check" },
  },
  {
    feature: "Copywriting formulas (5)",
    free: { type: "check" },
    pro: { type: "check" },
  },
  {
    feature: "Proposal lengths (3)",
    free: { type: "check" },
    pro: { type: "check" },
  },
  {
    feature: "Upwork Opener toggle",
    free: { type: "check" },
    pro: { type: "check" },
  },
  {
    feature: "Save & edit proposals",
    free: { type: "check-label", label: "free" },
    pro: { type: "check-label", label: "free" },
  },
  {
    feature: "Outcome tracking",
    free: { type: "check" },
    pro: { type: "check" },
  },
  {
    feature: "Proposal history",
    free: { type: "text", value: "Basic" },
    pro: { type: "check-label", label: "filter & search" },
  },
  {
    feature: "Chrome extension",
    free: { type: "check" },
    pro: { type: "check" },
  },
  {
    feature: "Billing portal",
    free: { type: "x" },
    pro: { type: "check" },
  },
];

// ─── Cell ─────────────────────────────────────────────────────────────────────

function Cell({
  value,
  isProCol = false,
}: {
  value: CellValue;
  isProCol?: boolean;
}) {
  if (value.type === "check") {
    return (
      <span
        className={`inline-flex items-center justify-center w-[20px] h-[20px] rounded-full ${
          isProCol
            ? "bg-primary/15"
            : "bg-emerald-50 border border-emerald-200"
        }`}
      >
        <Check
          className={`w-3 h-3 ${isProCol ? "text-primary" : "text-emerald-600"}`}
          strokeWidth={3}
        />
      </span>
    );
  }

  if (value.type === "x") {
    return (
      <span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full bg-border/60">
        <X className="w-3 h-3 text-muted-foreground" strokeWidth={3} />
      </span>
    );
  }

  if (value.type === "check-label") {
    return (
      <div className="flex items-center justify-center gap-1.5">
        <span
          className={`inline-flex items-center justify-center w-[20px] h-[20px] rounded-full ${
            isProCol
              ? "bg-primary/15"
              : "bg-emerald-50 border border-emerald-200"
          }`}
        >
          <Check
            className={`w-3 h-3 ${isProCol ? "text-primary" : "text-emerald-600"}`}
            strokeWidth={3}
          />
        </span>
        <span
          className={`text-[11.5px] font-medium ${isProCol ? "text-primary" : "text-emerald-700"}`}
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {value.label}
        </span>
      </div>
    );
  }

  // text
  return (
    <span
      className={`text-[13px] font-semibold ${isProCol ? "text-primary" : "text-text-secondary"}`}
      style={{ fontFamily: "var(--font-space-grotesk)" }}
    >
      {value.value}
    </span>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function PricingComparisonSection() {
  return (
    <section className="bg-gradient-to-b from-background to-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-10 md:mb-14">
          <p
            className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground/40 mb-5"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Side by side
          </p>

          <h2
            className="text-[clamp(1.85rem,4vw,2.75rem)] font-extrabold text-foreground tracking-[-0.035em] leading-[1.08]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Full{" "}
            <span
              className="italic font-normal text-primary"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              comparison
            </span>
          </h2>
        </div>

        {/* ── Table ───────────────────────────────────────────────── */}
        <div className="-mx-6 px-6 overflow-x-auto">
          <div className="min-w-[480px] bg-card rounded-2xl border border-border overflow-hidden shadow-[0_2px_16px_rgba(26,20,18,0.06)]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  {/* Feature col */}
                  <th className="py-4 px-5 text-left w-[56%]">
                    <span
                      className="text-[10.5px] tracking-[0.12em] uppercase text-muted-foreground/50"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      Feature
                    </span>
                  </th>

                  {/* Free col */}
                  <th className="py-4 px-4 text-center w-[22%]">
                    <span
                      className="text-[10.5px] tracking-[0.12em] uppercase text-muted-foreground/50"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      Free
                    </span>
                  </th>

                  {/* Pro col — highlighted */}
                  <th className="py-4 px-4 text-center w-[22%] bg-accent/50 border-l border-primary/10">
                    <span
                      className="text-[10.5px] tracking-[0.12em] uppercase text-primary font-bold"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      Pro
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`${
                      i !== ROWS.length - 1 ? "border-b border-border/50" : ""
                    } hover:bg-accent/20 transition-colors duration-150`}
                  >
                    {/* Feature name */}
                    <td className="py-3.5 px-5">
                      <span
                        className="text-[13.5px] text-foreground"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {row.feature}
                      </span>
                    </td>

                    {/* Free value */}
                    <td className="py-3.5 px-4 text-center">
                      <Cell value={row.free} />
                    </td>

                    {/* Pro value — highlighted column */}
                    <td className="py-3.5 px-4 text-center bg-accent/30 border-l border-primary/10">
                      <Cell value={row.pro} isProCol />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
