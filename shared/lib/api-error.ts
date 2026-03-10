import { NextResponse } from "next/server";
import type { ZodError } from "zod";

// ─── Error body shape ─────────────────────────────────────────────────────────

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// ─── Response helpers ─────────────────────────────────────────────────────────

export function apiError(
  code: string,
  message: string,
  status: number
): NextResponse<ApiErrorBody> {
  return NextResponse.json({ error: { code, message } }, { status });
}

export function apiValidationError(err: ZodError): NextResponse<ApiErrorBody> {
  return NextResponse.json(
    {
      error: {
        code: "validation_error",
        message: "Validation failed",
        details: err.flatten(),
      },
    },
    { status: 422 }
  );
}

// ─── Typed error classes ──────────────────────────────────────────────────────

export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super("not_found", message);
    this.name = "NotFoundError";
  }
}
