import type { Tone, ProposalFormula, ProposalLength } from "@/shared/lib/generated/prisma/enums";

export interface PromptContext {
  profile: {
    name: string;
    bio: string;
    skills: string[];
    portfolioItems: Array<{ url: string; description: string }>;
  };
  tone: Tone;
  formula: ProposalFormula;
  proposalLength: ProposalLength;
  upworkOpener: boolean;
  jobTitle: string;
}

const TONE_INSTRUCTIONS: Record<Tone, string> = {
  PROFESSIONAL:
    "Write in a polished, formal tone. Use precise language, avoid contractions, and project authority and expertise.",
  CONVERSATIONAL:
    "Write in a warm, natural tone — as if speaking directly to the client. Use contractions, keep sentences varied, and sound approachable.",
  CONFIDENT:
    "Write with assertive, direct confidence. Make bold, declarative statements. Avoid hedging language like 'I think' or 'I hope'. Project certainty.",
  FRIENDLY:
    "Write in an upbeat, personable tone. Show genuine enthusiasm for the project. Be warm and relatable without being unprofessional.",
};

const FORMULA_INSTRUCTIONS: Record<ProposalFormula, string> = {
  AIDA: `Structure the proposal using the AIDA framework:
1. Attention – Open with a hook that immediately captures the client's interest (reference their specific problem or goal).
2. Interest – Build interest by demonstrating understanding of their challenge and your relevant expertise.
3. Desire – Create desire by painting a picture of the outcome and briefly showcasing relevant experience or results.
4. Action – Close with a clear, low-friction call to action (invite them to chat, ask a clarifying question, etc.).`,

  PAS: `Structure the proposal using the PAS framework:
1. Problem – Clearly articulate the client's core problem or pain point (show you truly understand their situation).
2. Agitate – Amplify the cost or urgency of that problem if left unsolved.
3. Solution – Present yourself as the specific solution, explaining how you'll solve it and why you're the right fit.`,

  BAB: `Structure the proposal using the BAB framework:
1. Before – Describe the client's current situation and what they're struggling with.
2. After – Paint a vivid picture of where they'll be once the project is complete.
3. Bridge – Position yourself as the bridge between those two states, outlining your approach.`,

  STAR: `Structure the proposal using the STAR framework:
1. Situation – Briefly acknowledge the client's current situation or context.
2. Task – Identify the key task or challenge they need solved.
3. Action – Describe the specific actions and approach you'll take.
4. Result – Convey the expected result or outcome the client will achieve.`,

  DIRECT: `Write a direct, no-fluff proposal. Skip elaborate frameworks. Lead immediately with why you're the right hire, concisely state your approach, and end with a clear next step. Efficiency and clarity over storytelling.`,
};

const LENGTH_INSTRUCTIONS: Record<ProposalLength, string> = {
  SHORT:
    "Keep the proposal concise — aim for 150–220 words. Every sentence must earn its place.",
  MEDIUM:
    "Write a well-developed proposal — aim for 250–350 words. Balance depth with brevity.",
  LONG: "Write a comprehensive proposal — aim for 380–500 words. Go deeper on approach, relevant experience, and outcomes.",
};

const UPWORK_OPENER_INSTRUCTION = `Begin the proposal with the Upwork 'opener' line — a single line that directly answers or acknowledges the client's job post before the main proposal body. This line appears at the very top and is typically 1 sentence that hooks the reader immediately (e.g. referencing a specific detail from the job post). The opener counts toward word count.`;

export function buildSystemPrompt(ctx: PromptContext): string {
  const { profile, tone, formula, proposalLength, upworkOpener, jobTitle } =
    ctx;

  const portfolioSection =
    profile.portfolioItems.length > 0
      ? `\nPortfolio / past work:\n${profile.portfolioItems
          .map((p) => `- ${p.description} (${p.url})`)
          .join("\n")}`
      : "";

  const profileBlock = `## Freelancer Profile
Role: ${profile.name}
Skills: ${profile.skills.join(", ")}
Bio: ${profile.bio}${portfolioSection}`;

  const toneBlock = `## Tone Instruction\n${TONE_INSTRUCTIONS[tone]}`;
  const formulaBlock = `## Proposal Structure\n${FORMULA_INSTRUCTIONS[formula]}`;
  const lengthBlock = `## Length\n${LENGTH_INSTRUCTIONS[proposalLength]}`;
  const openerBlock = upworkOpener
    ? `## Upwork Opener\n${UPWORK_OPENER_INSTRUCTION}`
    : "";

  return [
    `You are an expert Upwork proposal writer. Your job is to write a compelling, personalized cover letter for the job titled: "${jobTitle}".`,
    `The proposal must be written in first person from the freelancer's perspective, using their profile information below.`,
    `Do NOT include a subject line, greeting like "Dear Hiring Manager", or sign-off. Start directly with the proposal content.`,
    `Do NOT use placeholder text like [Your Name] or [Client Name]. Write a complete, ready-to-send proposal.`,
    profileBlock,
    toneBlock,
    formulaBlock,
    lengthBlock,
    openerBlock,
  ]
    .filter(Boolean)
    .join("\n\n");
}
