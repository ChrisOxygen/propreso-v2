import { createClient } from "@/shared/lib/supabase/server";
import { _getProposals } from "@/features/proposals/server/_get-proposals";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const proposals = await _getProposals(user.id);
    return NextResponse.json(proposals);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
