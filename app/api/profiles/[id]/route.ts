import { createClient } from "@/shared/lib/supabase/server";
import { _deleteProfile } from "@/features/profiles/server/_delete-profile";
import { _updateProfile } from "@/features/profiles/server/_update-profile";
import { ZUpdateProfileSchema } from "@/features/profiles/schemas/profile-schemas";
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
  const parsed = ZUpdateProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  try {
    const profile = await _updateProfile(id, user.id, parsed.data);
    return NextResponse.json(profile);
  } catch (err) {
    if (err instanceof Error && err.message === "not_found") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
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
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await _deleteProfile(id, user.id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    if (err instanceof Error && err.message === "not_found") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
