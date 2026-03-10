import { createClient } from "@/shared/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/dashboard";

  // Guard against open redirect — only allow relative paths
  const redirectTo = next.startsWith("/") ? next : "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Password recovery — skip user sync and go straight to reset page
      if (type === "recovery") {
        return NextResponse.redirect(`${origin}/reset-password`);
      }

      // Sync the Supabase user into the Prisma User table.
      // The Postgres trigger handles the initial INSERT, but this upsert
      // picks up OAuth metadata (fullName) that the trigger cannot access.
      await fetch(`${origin}/api/v1/auth/sync`, {
        method: "POST",
        headers: { Cookie: request.headers.get("cookie") ?? "" },
      });

      return NextResponse.redirect(`${origin}${redirectTo}`);
    }
  }

  return NextResponse.redirect(`${origin}/sign-in?error=auth_callback_failed`);
}
