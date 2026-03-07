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
    <div className="px-2">
      <AccountView {...accountData} />
    </div>
  );
}
