import { createClient } from "@/shared/lib/supabase/server";
import { _updateProposalStatus } from "@/features/proposals/server/_update-proposal-status";
import { ZUpdateProposalStatusSchema } from "@/features/proposals/schemas/proposal-schemas";
import { NextResponse } from "next/server";

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
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = ZUpdateProposalStatusSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const result = await _updateProposalStatus(user.id, id, parsed.data);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof Error && err.message === "not_found") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
