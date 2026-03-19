import { NextResponse } from "next/server";

const gone = () =>
  NextResponse.json(
    { error: { code: "gone", message: "This endpoint has moved to /api/v1/contact" } },
    { status: 410 },
  );

export const POST = gone;
