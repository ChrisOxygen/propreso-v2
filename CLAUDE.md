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

IMPORTANT: Never hardcode brand hex values in components. Always use the semantic Tailwind tokens defined in `globals.css`:
- `bg-primary` / `text-primary` / `border-primary` → Deep Ember `#C85438`
- `hover:bg-primary-hover` / `hover:text-primary-hover` → Char Ember `#AE4529`
- `active:bg-primary-active` → Smoldering `#964020`
- `bg-accent` → Ember Tint `#FDF0EC` (subtle primary tint, used for page backgrounds)
- `bg-background` → Warm Canvas `#FDF8F6` (root page background)
- `bg-card` → Pure White `#FFFFFF` (inputs, cards, surfaces)
- `text-foreground` → Rich Ink `#1A1412`
- `text-text-secondary` → Warm Slate `#5A4E4A`
- `text-muted-foreground` → Dusty Ash `#9C8E8A`
- `border-border` → Warm Stroke `#EDE7E4`
- `border-border-strong` → Defined Stroke `#C9BCB8`
- `text-destructive` / `bg-error-subtle` → Cinnabar / Blush Fade
- The auth brand panel (`auth-brand-panel.tsx`) is the only exception — its dark overlay colors (`#160A04`, flame gradient, `#FBF7F3`) have no light-theme token equivalents and stay hardcoded.

## API Layer

All API routes live under `app/api/v1/` — every endpoint is versioned under `v1/` from the start.

### Route Tree

```
app/api/v1/
├── auth/sync/route.ts              POST  — upsert Prisma user on first sign-in
├── account/route.ts                PUT, DELETE — update/delete account
├── profiles/
│   ├── route.ts                    GET, POST
│   ├── [id]/route.ts               PATCH, DELETE
│   ├── [id]/default/route.ts       POST — set default profile
│   └── skills/route.ts             GET, POST
├── proposals/
│   ├── route.ts                    GET, POST
│   └── [id]/status/route.ts        PATCH
├── generations/route.ts            POST — streaming AI generation
├── billing/
│   ├── checkout/route.ts           POST — Stripe checkout session
│   ├── portal/route.ts             POST — Stripe billing portal
│   └── webhook/route.ts            POST — Stripe webhook (idempotent via Redis)
├── contact/route.ts                POST
└── seed/route.ts                   POST — dev-only seed
```

### Route Handler Pattern

Every route handler follows the same four-step sequence:

1. **Auth** — call `createClient()` from `@/shared/lib/supabase/server` and `getUser()`. Return `apiError("unauthorized", ..., 401)` if missing.
2. **Validate** — parse the request body with a `Z`-prefixed Zod schema using `.safeParse()`. Return `apiValidationError(parsed.error)` on failure (422).
3. **Delegate** — call the `_prefixed` server function from `features/<domain>/server/`. Pass `user.id` extracted from the session — never from the request body.
4. **Respond** — return `NextResponse.json(result)` on success, or catch errors and map to `apiError(...)`.

```typescript
export async function POST(request: Request) {
  // 1. Auth
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return apiError("unauthorized", "Unauthorized", 401);

  // 2. Validate
  const body = await request.json();
  const parsed = ZCreateProfileSchema.safeParse(body);
  if (!parsed.success) return apiValidationError(parsed.error);

  // 3. Delegate + 4. Respond
  try {
    const result = await _createProfile(user.id, parsed.data);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    if (err instanceof AppError) return apiError(err.code, err.message, 403);
    return apiError("internal_error", "Internal server error", 500);
  }
}
```

Long-running routes (e.g. `/generations`) also export `export const maxDuration = 60` for Vercel's function timeout.

## Error Handling

All error responses use a single shape defined in `shared/lib/api-error.ts`:

```typescript
{ error: { code: string; message: string; details?: unknown } }
```

### Helpers

| Helper | Usage |
|--------|-------|
| `apiError(code, message, status)` | Generic error — returns `NextResponse` with the shape above |
| `apiValidationError(zodError)` | Zod parse failure — status 422, includes `details: err.flatten()` |

### Error Classes (thrown from server functions)

| Class | Code | When to throw |
|-------|------|---------------|
| `AppError` | custom | Base class — throw with any `code` string for domain errors |
| `NotFoundError` | `not_found` | Resource doesn't exist or doesn't belong to the user |

### Standard Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| `unauthorized` | 401 | No valid Supabase session |
| `validation_error` | 422 | Zod schema parse failed |
| `not_found` | 404 | Resource not found |
| `bad_request` | 400 | Malformed request (e.g. invalid JSON) |
| `rate_limited` | 429 | Rate limit exceeded (Upstash Redis) |
| `token_limit_reached` | 403 | User token balance depleted |
| `requires_confirmation` | 422 | Job post classification uncertain |
| `suspicious_post` | 422 | Post detected as scam/spam |
| `internal_error` | 500 | Unexpected server error |

### Rate Limiting

Defined in `shared/lib/rate-limit.ts` using Upstash Redis. Applied inline in routes that need it — not global middleware. Degrades gracefully if Upstash env vars are absent.

- `contactRatelimit` — 5 requests / 10 min, keyed by IP
- `generationRatelimit` — 5 requests / min, keyed by user ID

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
