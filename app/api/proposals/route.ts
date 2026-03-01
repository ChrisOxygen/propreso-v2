import { createClient } from "@/shared/lib/supabase/server";
import { _getProposals } from "@/features/proposals/server/_get-proposals";
import { _saveProposal } from "@/features/proposals/server/_save-proposal";
import { NextResponse, type NextRequest } from "next/server";
import type {
  Tone,
  ProposalFormula,
  ProposalLength,
} from "@/shared/lib/generated/prisma/enums";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const status = searchParams.get("status");
  const search = searchParams.get("q");

  try {
    const data = await _getProposals(user.id, { page, status, search });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    profileId,
    jobTitle,
    jobUrl,
    jobDescription,
    tone,
    formula,
    proposalLength,
    upworkOpener,
    generatedContent,
  }: {
    profileId: string;
    jobTitle: string;
    jobUrl?: string;
    jobDescription: string;
    tone: Tone;
    formula: ProposalFormula;
    proposalLength: ProposalLength;
    upworkOpener: boolean;
    generatedContent: string;
  } = body;

  try {
    const proposal = await _saveProposal(user.id, {
      profileId,
      jobTitle,
      jobUrl,
      jobDescription,
      tone,
      formula,
      proposalLength,
      upworkOpener,
      generatedContent,
    });
    return NextResponse.json(proposal, { status: 201 });
  } catch (err) {
    const e = err as Error & { status?: number };
    if (e.message === "proposal_limit_reached") {
      return NextResponse.json(
        { error: "proposal_limit_reached" },
        { status: 403 }
      );
    }
    if (e.status === 404) {
      return NextResponse.json({ error: e.message }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
