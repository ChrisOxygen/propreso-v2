import { createClient } from "@/shared/lib/supabase/server";
import { prisma } from "@/shared/lib/prisma";
import { ZUpdateDisplayNameSchema } from "@/features/account/schemas/account-schema";
import { NextResponse } from "next/server";

async function getAuthenticatedUserId() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user.id;
}

// PUT /api/account — update display name
export async function PUT(request: Request) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = ZUpdateDisplayNameSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { fullName: parsed.data.fullName },
  });

  return NextResponse.json({ ok: true });
}

// DELETE /api/account — delete account (cascades profiles + proposals)
export async function DELETE() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Delete Prisma user — cascade handles profiles and proposals
  await prisma.user.delete({ where: { id: user.id } });

  // Sign out the current session server-side
  await supabase.auth.signOut();

  return NextResponse.json({ ok: true });
}
