// ─────────────────────────────────────────────────────────────────────────────
// Profile form constants — steps, popular roles, skill limits
// ─────────────────────────────────────────────────────────────────────────────

import {
  Briefcase,
  Sparkles,
  BookOpen,
  FolderOpen,
  Code2,
  Monitor,
  Server,
  Smartphone,
  Layers,
  PenTool,
  Target,
  BarChart2,
  GitBranch,
  FileText,
  Search,
  Film,
} from "lucide-react";

export const STEPS = [
  { id: 1, label: "Role", Icon: Briefcase },
  { id: 2, label: "Skills", Icon: Sparkles },
  { id: 3, label: "About", Icon: BookOpen },
  { id: 4, label: "Portfolio", Icon: FolderOpen },
];

export const POPULAR_ROLES = [
  { label: "Full Stack Developer", Icon: Code2 },
  { label: "Frontend Developer", Icon: Monitor },
  { label: "Backend Developer", Icon: Server },
  { label: "Mobile Developer", Icon: Smartphone },
  { label: "UI/UX Designer", Icon: Layers },
  { label: "Graphic Designer", Icon: PenTool },
  { label: "Product Manager", Icon: Target },
  { label: "Data Analyst", Icon: BarChart2 },
  { label: "DevOps Engineer", Icon: GitBranch },
  { label: "Content Writer", Icon: FileText },
  { label: "SEO Specialist", Icon: Search },
  { label: "Video Editor", Icon: Film },
];

// Deterministic widths for skeleton badges (avoids re-render jitter)
export const SKELETON_WIDTHS = [72, 90, 64, 96, 80, 106, 76, 88, 68, 92, 74, 84, 98, 66, 80, 88, 72, 94];

export const MAX_SKILLS = 10;

export const MAX_VISIBLE_SKILLS = 5;
