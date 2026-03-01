"use client";

import { Download, Receipt } from "lucide-react";
import { format } from "date-fns";
import { SectionCard, SectionHeader } from "./shared";
import type { BillingInvoice } from "@/features/billing/types";

const STATUS_STYLES: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  paid: {
    label: "Paid",
    color: "rgba(34,197,94,0.85)",
    bg: "rgba(34,197,94,0.1)",
  },
  open: {
    label: "Open",
    color: "rgba(234,179,8,0.9)",
    bg: "rgba(234,179,8,0.1)",
  },
  void: {
    label: "Void",
    color: "rgba(251,247,243,0.35)",
    bg: "rgba(255,255,255,0.05)",
  },
  uncollectible: {
    label: "Uncollectible",
    color: "rgba(239,68,68,0.8)",
    bg: "rgba(239,68,68,0.1)",
  },
  draft: {
    label: "Draft",
    color: "rgba(251,247,243,0.35)",
    bg: "rgba(255,255,255,0.05)",
  },
};

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

export function InvoiceHistorySection({ invoices }: { invoices: BillingInvoice[] }) {
  return (
    <SectionCard>
      <SectionHeader
        title="Billing History"
        description="Your past invoices. Click the download icon to get a PDF."
      />

      {invoices.length === 0 ? (
        <div className="p-8 flex flex-col items-center gap-2 text-center">
          <Receipt
            size={28}
            style={{ color: "rgba(251,247,243,0.15)" }}
          />
          <p className="text-[13px]" style={{ color: "rgba(251,247,243,0.35)" }}>
            No invoices yet
          </p>
          <p className="text-[12px]" style={{ color: "rgba(251,247,243,0.22)" }}>
            Your billing history will appear here after your first payment.
          </p>
        </div>
      ) : (
        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          {invoices.map((inv) => {
            const st =
              STATUS_STYLES[inv.status] ?? STATUS_STYLES.void;
            return (
              <div
                key={inv.id}
                className="px-5 py-3.5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex flex-col min-w-0">
                    <p
                      className="text-[12.5px] font-medium truncate"
                      style={{
                        color: "rgba(251,247,243,0.75)",
                        fontFamily: "var(--font-space-grotesk)",
                      }}
                    >
                      {inv.description ?? inv.number ?? inv.id.slice(0, 12)}
                    </p>
                    <p
                      className="text-[11.5px] tabular-nums"
                      style={{ color: "rgba(251,247,243,0.35)" }}
                    >
                      {format(new Date(inv.date), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Amount */}
                  <span
                    className="text-[12.5px] font-medium tabular-nums"
                    style={{
                      color: "rgba(251,247,243,0.75)",
                      fontFamily: "var(--font-space-grotesk)",
                    }}
                  >
                    {formatAmount(inv.amount, inv.currency)}
                  </span>

                  {/* Status badge */}
                  <span
                    className="hidden sm:inline-flex items-center h-5 px-2 rounded-full text-[10.5px] font-semibold"
                    style={{
                      background: st.bg,
                      color: st.color,
                      fontFamily: "var(--font-space-grotesk)",
                    }}
                  >
                    {st.label}
                  </span>

                  {/* PDF download */}
                  {inv.pdfUrl ? (
                    <a
                      href={inv.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors duration-150"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(251,247,243,0.45)",
                      }}
                      aria-label="Download invoice PDF"
                    >
                      <Download size={12} />
                    </a>
                  ) : (
                    <div className="w-7 h-7" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
}
