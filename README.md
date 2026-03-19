# Propreso

> AI-powered proposal generation for freelancers.

**[propreso.com](https://propreso.com/)** — Create a niche-based freelancer profile, configure your tone and style, and get streaming AI-drafted proposals injected directly into Upwork job pages via the Chrome extension.

---

## Features

- **Profile-based generation** — Build niche profiles that capture your expertise, voice, and positioning
- **Configurable output** — Control tone, proposal style, and Upwork-specific openers per generation
- **Streaming proposals** — Real-time AI output powered by GPT-4o-mini via the Vercel AI SDK
- **Chrome extension** — WXT-based extension that injects the proposal generator directly into Upwork job pages
- **Proposal history** — Browse and revisit previously generated proposals
- **Freemium limits** — Free tier includes 2 profiles and 10 proposals/month; enforced server-side

---

## Tech Stack

| Layer             | Technology                                 |
| ----------------- | ------------------------------------------ |
| Framework         | Next.js 16.1 (App Router)                  |
| Language          | TypeScript (strict)                        |
| Styling           | Tailwind CSS v4 + shadcn/ui                |
| Database          | Supabase PostgreSQL via Prisma ORM 7.x     |
| Auth              | Supabase Auth + Supabase SSR               |
| AI                | Vercel AI SDK v6 · GPT-4o-mini · streaming |
| Data fetching     | TanStack Query v5                          |
| Forms             | React Hook Form + Zod                      |
| Browser extension | WXT + React (Chrome)                       |

---

## Project Structure

```
/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Sign-in, sign-up
│   ├── (dashboard)/        # Protected routes
│   ├── (marketing)/        # Public landing page
│   └── api/                # Route handlers
├── features/               # Feature modules (profiles, proposals, auth)
├── shared/                 # Cross-feature utilities, components, lib
├── providers/              # TanStack QueryClientProvider
├── proxy.ts                # Route protection (replaces middleware.ts in Next.js 16)
└── prisma/                 # Schema + migrations
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase project (for auth + database)
- An OpenAI API key
- A Stripe account (for billing)

### Installation

```bash
git clone https://github.com/ChrisOxygen/propreso-v2
cd propreso-v2
npm install
```

### Environment Variables

Create a `.env.local` file at the project root:

```env
DATABASE_URL=                         # Supabase pooler URL (for queries)
DIRECT_URL=                           # Supabase direct URL (for migrations)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Database Setup

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

```bash
npm run dev                              # Start dev server (Turbopack)
npm run build                            # Production build
npm run lint                             # Lint
npx tsc --noEmit                         # Type check
npx prisma migrate dev --name <name>     # Create + apply migration
npx prisma generate                      # Regenerate Prisma client
npx prisma studio                        # Visual DB browser
```

---

## Chrome Extension

The Upwork injector lives in `propreso-extension/` as a separate WXT project.

```bash
cd propreso-extension
npm install
npm run dev        # Watch mode (Chrome)
npm run build      # Production build
```

Load the output from `propreso-extension/.output/chrome-mv3/` in Chrome via `chrome://extensions` → Load unpacked.

---

## Architecture Notes

- **Auth** — Supabase manages sessions. `proxy.ts` protects all `/(dashboard)` routes. On first sign-in, `POST /api/auth/sync` upserts a Prisma `User` from the Supabase Auth UID.
- **Data** — All DB reads/writes go through Prisma. The Supabase JS client is used for auth only.
- **AI generation** — `POST /api/proposals/generate` assembles a prompt from four blocks (profile context → tone → style → opener) and streams the response via `streamText()`.
- **Freemium enforcement** — Profile and proposal limits are checked server-side before any write. Returns `403` with `profile_limit_reached` or `proposal_limit_reached`.

---

## License

MIT
