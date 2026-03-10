import { NextResponse } from "next/server";
const gone = () => NextResponse.json({ error: { code: "gone", message: "This endpoint has moved to /api/v1/" } }, { status: 410 });
export const GET = gone;
export const POST = gone;
export const PUT = gone;
export const PATCH = gone;
export const DELETE = gone;
