import { redirect } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/server";
import { _getAccountData } from "@/features/account/server/_get-account-data";
import { AccountView } from "@/features/account/components/AccountView";
import type { AccountData } from "@/features/account/types";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { user: dbUser, proposalCount, profileCount } = await _getAccountData(user.id);

  if (!dbUser) redirect("/sign-in");

  const accountData: AccountData = {
    user: {
      id: dbUser.id,
      email: dbUser.email,
      fullName: dbUser.fullName,
      plan: dbUser.plan,
      createdAt: dbUser.createdAt.toISOString(),
    },
    proposalCount,
    profileCount,
  };

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
          Account
        </h1>
        <p
          className="mt-0.5 text-[13px]"
          style={{
            color: "rgba(251,247,243,0.38)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Manage your profile, plan, and account settings.
        </p>
      </div>

      <AccountView {...accountData} />
    </div>
  );
}
