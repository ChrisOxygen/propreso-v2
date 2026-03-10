import { createClient } from "@/shared/lib/supabase/server";
import { _updateProposalStatus } from "@/features/proposals/server/_update-proposal-status";
import { ZUpdateProposalStatusSchema } from "@/features/proposals/schemas/proposal-schemas";
import { NextResponse } from "next/server";
import { apiError, apiValidationError, NotFoundError } from "@/shared/lib/api-error";

export async function PATCH(
  request: Request,
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

  const body = await request.json();
  const parsed = ZUpdateProposalStatusSchema.safeParse(body);

  if (!parsed.success) {
    return apiValidationError(parsed.error);
  }

  try {
    const result = await _updateProposalStatus(user.id, id, parsed.data);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof NotFoundError) return apiError("not_found", "Not found", 404);
    return apiError("internal_error", "Internal server error", 500);
  }
}
