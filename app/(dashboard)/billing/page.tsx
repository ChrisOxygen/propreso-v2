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
    <div className="px-2">
      <BillingView {...billingData} />
    </div>
  );
}
