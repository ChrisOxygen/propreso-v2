// ─────────────────────────────────────────────────────────────────────────────
// Proposal display mappings — labels, status styling, table columns
// ─────────────────────────────────────────────────────────────────────────────

export const TONE_LABELS: Record<string, string> = {
  PROFESSIONAL: "Professional",
  CONVERSATIONAL: "Conversational",
  CONFIDENT: "Confident",
  FRIENDLY: "Friendly",
};

export const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  WON: {
    label: "Won",
    className: "bg-emerald-50 border-emerald-200 text-emerald-700",
  },
  REPLIED: {
    label: "Replied",
    className: "bg-blue-50 border-blue-200 text-blue-700",
  },
  NO_RESPONSE: {
    label: "No Response",
    className: "bg-muted border-border text-muted-foreground",
  },
  PENDING: {
    label: "Pending",
    className: "bg-background border-border text-muted-foreground",
  },
};

export const STATUS_OPTIONS = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "REPLIED", label: "Replied" },
  { value: "WON", label: "Won" },
  { value: "NO_RESPONSE", label: "No Response" },
] as const;

export const PROPOSAL_TABLE_COLUMNS = [
  { label: "Job Post", width: "42%" },
  { label: "Profile", width: "18%" },
  { label: "Tone", width: "15%" },
  { label: "Status", width: "14%" },
  { label: "Date", width: "11%" },
] as const;
