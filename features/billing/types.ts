export interface BillingInvoice {
  id: string;
  number: string | null;
  date: string; // ISO string
  amount: number; // cents
  currency: string;
  status: string; // "paid" | "open" | "void" | "uncollectible" | "draft"
  pdfUrl: string | null;
  description: string | null;
}

export interface BillingData {
  user: {
    id: string;
    email: string;
    plan: "FREE" | "PRO";
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    subscriptionStatus: string | null;
    currentPeriodEnd: string | null; // ISO string
    stripePriceId: string | null;
  };
  proposalCount: number;
  profileCount: number;
  invoices: BillingInvoice[];
  paymentMethodLast4: string | null;
  paymentMethodBrand: string | null;
  paymentMethodExpMonth: number | null;
  paymentMethodExpYear: number | null;
  showSuccessBanner: boolean;
}
