import { createClient } from "@/shared/lib/supabase/server";
import { _setDefaultProfile } from "@/features/profiles/server/_set-default-profile";
import { NextResponse } from "next/server";
import { apiError, NotFoundError } from "@/shared/lib/api-error";

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
    return apiError("unauthorized", "Unauthorized", 401);
  }

  try {
    await _setDefaultProfile(id, user.id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    if (err instanceof NotFoundError) return apiError("not_found", "Not found", 404);
    return apiError("internal_error", "Internal server error", 500);
  }
}
