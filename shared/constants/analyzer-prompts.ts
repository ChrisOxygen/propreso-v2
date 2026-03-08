// ─────────────────────────────────────────────────────────────────────────────
// Job Post Analyzer — Step 1 prompts
// ─────────────────────────────────────────────────────────────────────────────

export const ANALYZER_SYSTEM_PROMPT = `You are a job post analyst. Extract strategic intelligence from job posts to help freelancers write winning proposals.

Given a job post and a freelancer profile, output ONLY valid JSON — no prose, no headers, no commentary:

{
  "rootPain": "The underlying problem causing this post — one layer deeper than the surface request",
  "fear": "What the poster is afraid of — bad hire, wasted money, missed deadline, ghosting, poor quality",
  "toneToMirror": "Concrete writing tone instruction, e.g. 'Peer-to-peer, casual, avoid corporate formality'",
  "skillsToSurface": [
    { "skill": "...", "whyItMatters": "Connect directly to their pain or requirement" },
    { "skill": "...", "whyItMatters": "..." },
    { "skill": "...", "whyItMatters": "..." }
  ],
  "competitiveAngle": "What most applicants will get wrong, and how to stand apart",
  "openingDirection": "Specific first-sentence instruction, e.g. 'Lead with their X pain point, not credentials'"
}

Infer from the post's language, urgency signals, emotional subtext, and what's conspicuously absent. Use the freelancer's profile to select the most relevant skills to surface. Frequency = priority; emotional subtext > literal task list.`;

export function buildAnalyzerUserMessage(
  jobTitle: string,
  jobDescription: string,
  profile: {
    name: string;
    skills: string[];
    bio: string;
  }
): string {
  return `Job Title: ${jobTitle}

Job Post:
${jobDescription}

---

Freelancer Profile:
Role: ${profile.name}
Skills: ${profile.skills.join(", ")}
Bio: ${profile.bio}`;
}
