import { redirect } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/server";
import { _getBillingData } from "@/features/billing/server/_get-billing-data";
import { BillingView } from "@/features/billing/components/BillingView";

interface BillingPageProps {
  searchParams: Promise<{ success?: string }>;
}

export default async function BillingPage({ searchParams }: BillingPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const params = await searchParams;
  const showSuccessBanner = params.success === "true";

  const billingData = await _getBillingData(user.id, showSuccessBanner);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-6">
        <h1
          className="text-[1.35rem] font-bold tracking-[-0.03em]"
          style={{
            color: "#FBF7F3",
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          Billing
        </h1>
        <p
          className="mt-0.5 text-[13px]"
          style={{
            color: "rgba(251,247,243,0.38)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Manage your plan, payment method, and invoices.
        </p>
      </div>

      <BillingView {...billingData} />
    </div>
  );
}
