import { createClient } from "@/shared/lib/supabase/server";
import { _createProfile } from "@/features/profiles/server/_create-profile";
import { _getProfilesByUserId } from "@/features/profiles/server/_get-profiles";
import { ZCreateProfileSchema } from "@/features/profiles/schemas/profile-schemas";
import { NextResponse } from "next/server";
import { apiError, apiValidationError, AppError } from "@/shared/lib/api-error";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return apiError("unauthorized", "Unauthorized", 401);
  }

  const profiles = await _getProfilesByUserId(user.id);
  return NextResponse.json(profiles);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return apiError("unauthorized", "Unauthorized", 401);
  }

  const body = await request.json();
  const parsed = ZCreateProfileSchema.safeParse(body);

  if (!parsed.success) {
    return apiValidationError(parsed.error);
  }

  try {
    const profile = await _createProfile(user.id, parsed.data);
    return NextResponse.json(profile, { status: 201 });
  } catch (err) {
    if (err instanceof AppError) {
      return apiError(err.code, err.message, 403);
    }
    return apiError("internal_error", "Internal server error", 500);
  }
}
