import { createClient } from "@/shared/lib/supabase/server";
import { _setDefaultProfile } from "@/features/profiles/server/_set-default-profile";
import { NextResponse } from "next/server";

export async function PATCH(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await _setDefaultProfile(id, user.id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    if (err instanceof Error && err.message === "not_found") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
