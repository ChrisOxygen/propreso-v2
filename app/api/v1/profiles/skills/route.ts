import { createClient } from "@/shared/lib/supabase/server";
import { openrouter } from "@/shared/lib/openrouter";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { apiError } from "@/shared/lib/api-error";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return apiError("unauthorized", "Unauthorized", 401);
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  if (!role || role.trim().length < 2) {
    return apiError("validation_error", "role is required (min 2 characters)", 422);
  }

  try {
    const { text } = await generateText({
      model: openrouter.chat("openai/gpt-4o-mini"),
      prompt: `You are a skills advisor for freelancers on Upwork.
Given the role "${role.trim()}", return a JSON array of exactly 18 relevant skills that a freelancer in this role would commonly offer.
Rules:
- Return ONLY a raw JSON array of strings, no markdown, no code fences, no explanation
- Skills should be specific tools, technologies, or expertise areas (not soft skills like "communication")
- Order from most to least commonly expected for this role
- Keep each skill short (1-4 words max)
Example format: ["React", "TypeScript", "Node.js", "REST APIs", "PostgreSQL"]`,
    });

    const clean = text
      .trim()
      .replace(/^```json?\s*/i, "")
      .replace(/\s*```$/, "");

    const skills: unknown = JSON.parse(clean);

    if (!Array.isArray(skills) || !skills.every((s) => typeof s === "string")) {
      throw new Error("Invalid response format from AI");
    }

    return NextResponse.json({ skills: (skills as string[]).slice(0, 20) });
  } catch (err) {
    console.error("[skills] generation failed:", err);
    return apiError("internal_error", "Failed to generate skills", 500);
  }
}
