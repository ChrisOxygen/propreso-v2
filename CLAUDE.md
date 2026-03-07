# Propreso v2

AI-powered proposal generation SaaS for Upwork freelancers. Users create niche-based freelancer profiles, configure generation options (tone, style, Upwork opener), and get streaming AI-drafted proposals. Includes a Chrome extension (WXT) that injects directly into Upwork job pages.

## Tech Stack

- **Next.js 16.1** · App Router · TypeScript strict mode
- **Tailwind CSS v4** · shadcn/ui (CLI v3.8.5)
- **Prisma ORM 7.x** → Supabase PostgreSQL
- **Supabase Auth** + Supabase SSR (auth only — all data queries go through Prisma)
- **Vercel AI SDK v6** (`ai`) + `@ai-sdk/openai` · GPT-4o-mini · streaming
- **TanStack Query v5** · React Hook Form · Zod
- **WXT** + React (Chrome extension — separate project in `propreso-extension/`)

## Commands

```bash
npm run dev                                   # start dev server
npm run build                                 # production build
npx tsc --noEmit                              # type check
npm run lint                                  # lint
npx prisma migrate dev --name <name>          # create + apply migration
npx prisma generate                           # regenerate client after schema changes
npx prisma studio                             # visual DB browser
npx shadcn@latest add <component>             # add shadcn component
```

## Naming Conventions

- **Zod schemas + inferred types** → prefix with capital `Z`
  - e.g. `ZCreateProfileSchema`, `ZCreateProfile`
- **Server-only functions** (API handlers, Prisma queries, server actions) → prefix with `_`
  - e.g. `_getProfilesByUserId`, `_createProfile`, `_generateProposal`
- **Components** → PascalCase
- **Hooks** → camelCase prefixed with `use`
- **TanStack Query keys** → `['resource', identifier]` e.g. `['profiles', userId]`

## Folder Structure

Feature-based. No `src/` directory. All app code lives at the project root. Cross-feature code goes in `shared/`. New features go in `features/<feature>/` with sub-folders: `components/`, `hooks/`, `schemas/`, `server/`, `types.ts`.

```
/
├── app/                          # Next.js App Router (no pages/ directory)
│   ├── (auth)/                   # sign-in, sign-up
│   ├── (dashboard)/              # protected routes: dashboard, profiles, proposals, history
│   ├── (marketing)/              # public landing page
│   ├── api/                      # route handlers: auth/, profiles/, proposals/, billing/
│   ├── auth/callback/            # Supabase OAuth callback
│   └── layout.tsx                # root layout
│
├── features/                     # feature modules
│   ├── profiles/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── server/               # _prefixed server functions
│   │   └── types.ts
│   ├── proposals/
│   └── auth/
│
├── shared/                       # cross-feature shared code
│   ├── components/
│   │   └── ui/                   # shadcn/ui — DO NOT edit manually
│   ├── lib/
│   │   ├── prisma.ts             # Prisma singleton client
│   │   ├── supabase/             # client.ts, server.ts, middleware.ts (proxy helper)
│   │   ├── prompt-builder.ts     # AI prompt assembly
│   │   └── utils.ts              # cn() and shared utilities
│   └── types/                    # global shared types
│
├── providers/
│   └── query-provider.tsx        # TanStack QueryClientProvider (wraps root layout)
├── proxy.ts                      # protects all /(dashboard) routes (Next.js 16: middleware → proxy)
├── prisma/
│   └── schema.prisma
└── prisma.config.ts              # Prisma 7 config (replaces datasource in schema.prisma)
```

## Version-Specific Notes

### Next.js 16.1
- `params` and `searchParams` in layouts and pages are now **async** — always `await props.params`
- Turbopack is the default bundler — no extra config needed
- **`middleware.ts` is deprecated** — renamed to `proxy.ts`. The exported function is also renamed from `middleware` to `proxy`. Use `proxy.ts` at the project root. `middleware.ts` still works but emits a deprecation warning.
- Use `npx @next/codemod@canary upgrade latest` to upgrade between versions

### Prisma 7.x
- Ships as **ES module** — imports use `import` not `require`
- Database config moves to **`prisma.config.ts`** (project root) instead of inline in `schema.prisma`
- Run `npx prisma generate` after every schema or config change
- MongoDB not supported in v7 — not relevant for this project (PostgreSQL only)

### Vercel AI SDK v6
- Install: `npm install ai @ai-sdk/openai`
- Use `streamText()` from `ai` and `openai()` from `@ai-sdk/openai`
- Client hook is `useChat()` from `@ai-sdk/react` — returns `toDataStreamResponse()` on server
- `useCompletion()` is deprecated in v6 — use `useChat()` instead

### shadcn/ui
- Use `npx shadcn@latest add <component>` (NOT the old `npx shadcn-ui`)
- Tailwind v4 is the default in new projects — config is in `globals.css` not `tailwind.config.ts`
- Components live in `shared/components/ui/` — never edit them directly

### TanStack Query v5
- Single object argument only: `useQuery({ queryKey: [...], queryFn: ... })`
- `cacheTime` renamed to `gcTime`
- `QueryProvider` lives in `providers/query-provider.tsx` and wraps the root layout
- **Always create a custom hook** for every query or mutation — never call `useQuery`/`useMutation` directly in a component
  - Query hooks → `features/<feature>/hooks/use-<resource>.ts` e.g. `useProfiles`
  - Mutation hooks → `features/<feature>/hooks/use-<verb>-<resource>.ts` e.g. `useCreateProfile`
- **Loading states** — always use `isPending` (not `isLoading`) as the loading indicator for both queries and mutations. Render an inline skeleton when `isPending` is true — never return `null` or rely solely on `loading.tsx`.

## Critical Rules

IMPORTANT: Run `npx prisma generate` after every schema change — the client will silently be out of sync otherwise.

IMPORTANT: Never edit files in `shared/components/ui/` directly. Add components with `npx shadcn@latest add <component>`.

IMPORTANT: Never use the Supabase JS client for data queries. Supabase is auth-only. All DB reads/writes go through Prisma via `@/shared/lib/prisma`.

IMPORTANT: Never trust `userId` from a request body. Always extract it from the Supabase session in the API route.

IMPORTANT: Use `useChat()` from `@ai-sdk/react` — NOT `useCompletion()` which is deprecated in AI SDK v6. Streaming UI must be in a Client Component.

IMPORTANT: All styling must be done with Tailwind utility classes in the `className` prop — never use the `style` prop.

## Architecture

### Auth Flow
Supabase manages sessions. `middleware.ts` protects `/(dashboard)` routes. On first sign-in, `POST /api/auth/sync` upserts a Prisma `User` from the Supabase Auth `uid` and email. All API routes get `userId` from the session, never from the request.

### AI Generation
Route: `POST /api/proposals/generate`. Prompt is assembled in `shared/lib/prompt-builder.ts` from four blocks: profile context → tone instruction → proposal style instruction → optional Upwork opener block. Uses `streamText()` from `ai`, `openai()` from `@ai-sdk/openai`, returns `toDataStreamResponse()`. Proposal is saved to DB after stream completes.

### Freemium Limits
- Free: 2 profiles, 10 proposals/month
- Enforced server-side in `_createProfile` and `_generateProposal` before any write
- Return 403 `{ error: "profile_limit_reached" }` or `{ error: "proposal_limit_reached" }`
- Monthly count: `createdAt >= startOfMonth(new Date())`

## Workflow

- **Before any task**: check available skills (via the Skill tool) — if a skill matches the task, invoke it before doing anything else. Current skills:
  - `frontend-design` — building or styling UI components, pages, layouts, or any web interface work
  - `vercel-react-best-practices` — writing, reviewing, or refactoring React/Next.js code
  - `keybindings-help` — customizing keyboard shortcuts or keybindings
  - `tanstack-query-best-practices` — writing or reviewing TanStack Query hooks
- **Before writing code**: check if there's an existing pattern in `features/` to follow
- **After schema changes**: run `prisma generate` then `tsc --noEmit` to verify types
- **After building a feature**: run `tsc --noEmit` and `npm run lint` before considering it done
- **New shadcn component needed**: `npx shadcn@latest add <component>`, never hand-write
- **UI icons**: always use `lucide-react` — never inline SVG, never other icon libraries
- **Brand icons**: always use the actual assets, never hand-write inline SVG replacements
  - `public/assets/site-icon-white.svg` — white flame, use on dark/orange backgrounds (e.g. inside the orange icon box)
  - `public/assets/propreso-icon-accent-primary.svg` — burnt-orange flame, use on light backgrounds
  - Import with `next/image`: `<Image src="/assets/site-icon-white.svg" alt="Propreso" width={11} height={14} />`

## Environment Variables

```
DATABASE_URL=                         # Supabase pooler (for queries)
DIRECT_URL=                           # Supabase direct (for migrations)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## When Compacting

Preserve: list of modified files, any pending migrations, current feature being built, and any unresolved type errors.
