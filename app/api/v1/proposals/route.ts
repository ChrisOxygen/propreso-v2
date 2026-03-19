import { createClient } from "@/shared/lib/supabase/server";
import { _getProposals } from "@/features/proposals/server/_get-proposals";
import { _saveProposal } from "@/features/proposals/server/_save-proposal";
import { ZSaveProposalSchema } from "@/features/proposals/schemas/proposal-schemas";
import { NextResponse, type NextRequest } from "next/server";
import { apiError, apiValidationError, NotFoundError } from "@/shared/lib/api-error";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return apiError("unauthorized", "Unauthorized", 401);
  }

  const { searchParams } = request.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const status = searchParams.get("status");
  const search = searchParams.get("q");

  try {
    const data = await _getProposals(user.id, { page, status, search });
    return NextResponse.json(data);
  } catch {
    return apiError("internal_error", "Internal server error", 500);
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return apiError("unauthorized", "Unauthorized", 401);
  }

  const body = await request.json().catch(() => null);
  const parsed = ZSaveProposalSchema.safeParse(body);
  if (!parsed.success) {
    return apiValidationError(parsed.error);
  }

  try {
    const proposal = await _saveProposal(user.id, parsed.data);
    return NextResponse.json(proposal, { status: 201 });
  } catch (err) {
    if (err instanceof NotFoundError) return apiError("not_found", err.message, 404);
    return apiError("internal_error", "Internal server error", 500);
  }
}
