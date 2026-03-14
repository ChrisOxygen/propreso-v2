import { createClient } from "@/shared/lib/supabase/server";
import { _getProposals } from "@/features/proposals/server/_get-proposals";
import { _saveProposal } from "@/features/proposals/server/_save-proposal";
import { NextResponse, type NextRequest } from "next/server";
import { apiError, NotFoundError } from "@/shared/lib/api-error";
import type { Tone } from "@/shared/lib/generated/prisma/enums";

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
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
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

  const body = await request.json();
  const {
    profileId,
    rawPost,
    tone,
    generatedContent,
  }: {
    profileId: string;
    rawPost: string;
    tone: Tone;
    generatedContent: string;
  } = body;

  try {
    const proposal = await _saveProposal(user.id, {
      profileId,
      rawPost,
      tone,
      generatedContent,
    });
    return NextResponse.json(proposal, { status: 201 });
  } catch (err) {
    if (err instanceof NotFoundError) return apiError("not_found", err.message, 404);
    return apiError("internal_error", "Internal server error", 500);
  }
}
