import { createClient } from "@/shared/lib/supabase/server";
import { prisma } from "@/shared/lib/prisma";
import { DUMMY_PROPOSALS } from "@/shared/constants/dummy-proposals";
import { NextResponse } from "next/server";
import { apiError } from "@/shared/lib/api-error";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return apiError("forbidden", "Not available in production", 403);
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return apiError("unauthorized", "Unauthorized", 401);
  }

  const profiles = await prisma.freelancerProfile.findMany({
    where: { userId: user.id },
    select: { id: true },
  });

  if (profiles.length === 0) {
    return apiError("precondition_failed", "No profiles found. Create a profile first.", 400);
  }

  // ── Wipe all existing user data before seeding ──────────────────────────
  await prisma.generationEvent.deleteMany({ where: { userId: user.id } });
  await prisma.proposal.deleteMany({ where: { userId: user.id } });

  // ── Insert fresh seed data ───────────────────────────────────────────────
  const data = DUMMY_PROPOSALS.map((p, i) => ({
    userId: user.id,
    profileId: profiles[i % profiles.length].id,
    jobDescription: p.jobDescription,
    generatedContent: p.generatedContent,
    tone: p.tone,
    status: p.status ?? null,
  }));

  await prisma.proposal.createMany({ data });

  return NextResponse.json({ deleted: true, created: data.length });
}
