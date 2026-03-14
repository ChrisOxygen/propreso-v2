// ─────────────────────────────────────────────────────────────────────────────
// Proposal generation option metadata
// ─────────────────────────────────────────────────────────────────────────────

export const TONES = [
  { value: "PROFESSIONAL", label: "Professional" },
  { value: "CONVERSATIONAL", label: "Conversational" },
  { value: "CONFIDENT", label: "Confident" },
  { value: "FRIENDLY", label: "Friendly" },
] as const;

export const UPWORK_CHAR_LIMIT = 5000;

// AI models used in the two-step generation pipeline
export const ANALYZER_MODEL = "anthropic/claude-haiku-4-5";
export const GENERATOR_MODEL = "anthropic/claude-sonnet-4.6";
