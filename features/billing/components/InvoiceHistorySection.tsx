"use client";

import { Download, Receipt } from "lucide-react";
import { format } from "date-fns";
import { SectionCard, SectionHeader } from "./shared";
import type { BillingInvoice } from "@/features/billing/types";

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  paid: {
    label: "Paid",
    className: "bg-green-50 text-green-700",
  },
  open: {
    label: "Open",
    className: "bg-amber-50 text-amber-700",
  },
  void: {
    label: "Void",
    className: "bg-muted text-muted-foreground",
  },
  uncollectible: {
    label: "Uncollectible",
    className: "bg-error-subtle text-destructive",
  },
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground",
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
          <Receipt size={28} className="text-border-strong" />
          <p className="text-[13px] text-muted-foreground">No invoices yet</p>
          <p className="text-[12px] text-muted-foreground/60">
            Your billing history will appear here after your first payment.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {invoices.map((inv) => {
            const st = STATUS_STYLES[inv.status] ?? STATUS_STYLES.void;
            return (
              <div
                key={inv.id}
                className="px-5 py-3.5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex flex-col min-w-0">
                    <p className="text-[12.5px] font-medium font-heading truncate text-text-secondary">
                      {inv.description ?? inv.number ?? inv.id.slice(0, 12)}
                    </p>
                    <p className="text-[11.5px] tabular-nums text-muted-foreground">
                      {format(new Date(inv.date), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[12.5px] font-medium font-heading tabular-nums text-text-secondary">
                    {formatAmount(inv.amount, inv.currency)}
                  </span>

                  <span
                    className={`hidden sm:inline-flex items-center h-5 px-2 rounded-full text-[10.5px] font-semibold font-heading ${st.className}`}
                  >
                    {st.label}
                  </span>

                  {inv.pdfUrl ? (
                    <a
                      href={inv.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors duration-150 bg-muted border border-border text-muted-foreground hover:bg-muted/80"
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
