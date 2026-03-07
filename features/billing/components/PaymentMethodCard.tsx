"use client";

import { CreditCard, ExternalLink, Loader2 } from "lucide-react";
import { SectionCard, SectionHeader } from "./shared";
import { useOpenPortal } from "@/features/billing/hooks/use-open-portal";
import type { BillingData } from "@/features/billing/types";

type Props = Pick<
  BillingData,
  | "paymentMethodLast4"
  | "paymentMethodBrand"
  | "paymentMethodExpMonth"
  | "paymentMethodExpYear"
>;

const BRAND_LABELS: Record<string, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  discover: "Discover",
  jcb: "JCB",
  unionpay: "UnionPay",
  diners: "Diners Club",
};

export function PaymentMethodCard({
  paymentMethodLast4,
  paymentMethodBrand,
  paymentMethodExpMonth,
  paymentMethodExpYear,
}: Props) {
  const { mutate: openPortal, isPending } = useOpenPortal();
  const hasCard = !!paymentMethodLast4;
  const brandLabel = paymentMethodBrand
    ? (BRAND_LABELS[paymentMethodBrand.toLowerCase()] ?? paymentMethodBrand)
    : null;

  const expDisplay =
    paymentMethodExpMonth && paymentMethodExpYear
      ? `${String(paymentMethodExpMonth).padStart(2, "0")} / ${String(paymentMethodExpYear).slice(-2)}`
      : null;

  return (
    <SectionCard>
      <SectionHeader
        title="Payment Method"
        description="Manage your card and billing details via the Stripe portal."
      />
      <div className="p-5 flex items-center justify-between gap-4">
        {hasCard ? (
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0 bg-muted border border-border">
              <CreditCard size={15} className="text-text-secondary" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium font-heading truncate text-foreground">
                {brandLabel ? `${brandLabel} ` : ""}
                <span className="tabular-nums">•••• {paymentMethodLast4}</span>
              </p>
              {expDisplay && (
                <p className="text-[12px] text-muted-foreground">Expires {expDisplay}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0 bg-muted border border-border">
              <CreditCard size={15} className="text-muted-foreground" />
            </div>
            <p className="text-[13px] text-muted-foreground">No payment method on file</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => openPortal()}
          disabled={isPending}
          className="shrink-0 inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-[12px] font-medium font-heading transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed bg-muted border border-border text-text-secondary hover:bg-muted/80"
        >
          {isPending ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <ExternalLink size={12} />
          )}
          {isPending ? "Opening…" : "Manage"}
        </button>
      </div>
    </SectionCard>
  );
}
