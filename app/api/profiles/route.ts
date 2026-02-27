import { createClient } from "@/shared/lib/supabase/server";
import { _createProfile } from "@/features/profiles/server/_create-profile";
import { ZCreateProfileSchema } from "@/features/profiles/schemas/profile-schemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = ZCreateProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const profile = await _createProfile(user.id, parsed.data);
    return NextResponse.json(profile, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === "profile_limit_reached") {
      return NextResponse.json(
        { error: "profile_limit_reached" },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}