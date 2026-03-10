import { createClient } from "@/shared/lib/supabase/server";
import { prisma } from "@/shared/lib/prisma";
import { NextResponse } from "next/server";
import { apiError } from "@/shared/lib/api-error";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return apiError("unauthorized", "Unauthorized", 401);
  }

  const fullName =
    (user.user_metadata?.full_name as string | undefined) ?? null;

  await prisma.user.upsert({
    where: { id: user.id },
    create: {
      id: user.id,
      email: user.email!,
      fullName,
    },
    update: {
      email: user.email!,
      fullName,
    },
  });

  return NextResponse.json({ ok: true });
}
