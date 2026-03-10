export type TestimonialPriority = "p1" | "p2" | "p3";

export interface TestimonialUserDetails {
  fullName: string;
  position: string;
  company: string;
}

export interface Testimonial {
  title: string;
  summary: string;
  priority: TestimonialPriority;
  userDetails: TestimonialUserDetails;
}

export const TESTIMONIALS: Testimonial[] = [
  // ─── p1 ──────────────────────────────────────────────────────────────────
  {
    title: "Landed a $4,800 contract on my first week",
    summary:
      "I'd been sending proposals for three months with zero replies. The first proposal Propreso helped me write landed a $4,800 contract two days later. It actually read the job post the way I would have — but faster and sharper.",
    priority: "p1",
    userDetails: {
      fullName: "Marcus Delgado",
      position: "Senior Full-Stack Developer",
      company: "Freelance via Upwork",
    },
  },

  // ─── p2 ──────────────────────────────────────────────────────────────────
  {
    title: "My reply rate went from 8% to 31% in one month",
    summary:
      "I tested Propreso against my own templates for 30 days and tracked every reply. My reply rate jumped from 8% to 31%. The difference is that the proposals sound like me — not like every other AI-generated pitch flooding client inboxes.",
    priority: "p2",
    userDetails: {
      fullName: "Priya Nair",
      position: "UX/UI Designer & Brand Strategist",
      company: "Studio Nair",
    },
  },

  // ─── p3 ──────────────────────────────────────────────────────────────────
  {
    title: "Finally stopped wasting hours on proposals",
    summary:
      "Writing a solid proposal used to take me 40 minutes. Now it takes five. Propreso nails the opener every time and I just refine from there.",
    priority: "p3",
    userDetails: {
      fullName: "James Okafor",
      position: "Copywriter & Content Strategist",
      company: "Freelance via Upwork",
    },
  },
  {
    title: "The tone controls are a game-changer",
    summary:
      "Different clients want different energy. The ability to switch from Confident to Conversational in one click has made my proposals feel personal, not templated.",
    priority: "p3",
    userDetails: {
      fullName: "Sofia Reinholt",
      position: "B2B Email Marketing Specialist",
      company: "Reinholt Consulting",
    },
  },
  {
    title: "Chrome extension saves me so much friction",
    summary:
      "Not having to copy-paste job descriptions into another tab is bigger than it sounds. I generate directly on the Upwork page and submit in under three minutes.",
    priority: "p3",
    userDetails: {
      fullName: "Luca Ferrara",
      position: "WordPress Developer",
      company: "Freelance via Upwork",
    },
  },
  {
    title: "Multi-profile support fits my hybrid niche perfectly",
    summary:
      "I do both data analysis and technical writing. Having a separate profile for each means every proposal speaks directly to that client type. No more watered-down pitches.",
    priority: "p3",
    userDetails: {
      fullName: "Aisha Mbeki",
      position: "Data Analyst & Technical Writer",
      company: "Freelance via Upwork",
    },
  },
  {
    title: "PAS formula turned my proposals around overnight",
    summary:
      "I switched to the PAS formula and applied it through Propreso on a slow week. Booked two discovery calls within 48 hours. The formula makes clients feel understood immediately.",
    priority: "p3",
    userDetails: {
      fullName: "Daniel Cho",
      position: "SaaS Growth Consultant",
      company: "Cho Growth Partners",
    },
  },
  {
    title: "Worth every token on the yearly plan",
    summary:
      "The rollover tokens alone sold me on the yearly plan. My balance only grows, so I never feel like I'm racing against a monthly reset. Total peace of mind.",
    priority: "p3",
    userDetails: {
      fullName: "Fiona McAllister",
      position: "Virtual CFO & Bookkeeper",
      company: "McAllister Financial Services",
    },
  },
  {
    title: "My clients say my proposals feel genuinely tailored",
    summary:
      "Three clients in a row mentioned that my proposal stood out because it felt specific to their problem. That's exactly what Propreso delivers — specificity at speed.",
    priority: "p3",
    userDetails: {
      fullName: "Ravi Subramaniam",
      position: "DevOps & Cloud Infrastructure Engineer",
      company: "Freelance via Upwork",
    },
  },
  {
    title: "Best tool investment I've made as a freelancer",
    summary:
      "I've tried three other AI proposal tools. Propreso is the only one that actually factors in my profile, not just the job post. Night and day difference in quality.",
    priority: "p3",
    userDetails: {
      fullName: "Elena Vasquez",
      position: "Social Media & Community Manager",
      company: "Vasquez Digital",
    },
  },
  {
    title: "Analytics helped me ditch what wasn't working",
    summary:
      "After 30 proposals I could see that AIDA outperformed Direct in my niche by a wide margin. That data alone was worth the subscription. I stopped guessing.",
    priority: "p3",
    userDetails: {
      fullName: "Noah Bergström",
      position: "Conversion Rate Optimisation Specialist",
      company: "Freelance via Upwork",
    },
  },
  {
    title: "Onboarding took ten minutes and I was sending proposals",
    summary:
      "Set up my profile, picked my tone, and generated my first proposal in under ten minutes. No learning curve, no configuration headaches. Just results from day one.",
    priority: "p3",
    userDetails: {
      fullName: "Chloe Adeyemi",
      position: "Motion Graphic Designer",
      company: "Studio Chloe",
    },
  },
] as const;
