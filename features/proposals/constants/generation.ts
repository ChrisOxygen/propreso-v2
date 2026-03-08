// ─────────────────────────────────────────────────────────────────────────────
// Proposal generation option metadata
// ─────────────────────────────────────────────────────────────────────────────

export const FORMULAS = [
  {
    value: "AIDA",
    label: "AIDA",
    desc: "Attention → Interest → Desire → Action",
  },
  { value: "PAS", label: "PAS", desc: "Problem → Agitate → Solution" },
  { value: "BAB", label: "BAB", desc: "Before → After → Bridge" },
  { value: "STAR", label: "STAR", desc: "Situation → Task → Action → Result" },
  { value: "DIRECT", label: "Direct", desc: "No-fluff, straight to the point" },
] as const;

export const TONES = [
  { value: "PROFESSIONAL", label: "Professional" },
  { value: "CONVERSATIONAL", label: "Conversational" },
  { value: "CONFIDENT", label: "Confident" },
  { value: "FRIENDLY", label: "Friendly" },
] as const;

export const LENGTHS = [
  { value: "SHORT", label: "Short", sub: "~150–220 words" },
  { value: "MEDIUM", label: "Medium", sub: "~250–350 words" },
  { value: "LONG", label: "Long", sub: "~380–500 words" },
] as const;

export const UPWORK_CHAR_LIMIT = 5000;

// AI models used in the two-step generation pipeline
export const ANALYZER_MODEL = "anthropic/claude-haiku-4-5";
export const GENERATOR_MODEL = "anthropic/claude-sonnet-4.6";
