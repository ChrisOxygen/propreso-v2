export interface DummyProposal {
  jobDescription: string; // full raw job post as pasted by the user
  generatedContent: string;
  tone: "PROFESSIONAL" | "CONVERSATIONAL" | "CONFIDENT" | "FRIENDLY";
  status: "REPLIED" | "WON" | "NO_RESPONSE" | null;
}

export const DUMMY_PROPOSALS: DummyProposal[] = [
  {
    jobDescription: `Looking for an experienced React developer to build an admin dashboard for our SaaS product.

The dashboard needs charts (revenue, churn, active users), a user management table with search/filter, and role-based access control. We use a REST API already — you'd be connecting to it.

Budget: $800–1,200 fixed
Timeline: 2 weeks
Stack: React, TypeScript, any charting library you prefer`,
    generatedContent: `Your admin dashboard is missing the visibility your team actually needs — revenue trends buried in spreadsheets, user management still done manually.

I've built 10+ SaaS dashboards with React and Recharts. The pattern you're describing — charts, user tables, RBAC — is exactly my wheelhouse.

Here's how I'd approach it:
• Week 1 — Connect to your API, build the chart components and data layer
• Week 2 — User management table with search/filter, RBAC, polish and handoff

Can start Monday. Want to do a quick 15-min call to confirm the API contract?`,
    tone: "PROFESSIONAL",
    status: "WON",
  },
  {
    jobDescription: `Our Node.js REST API is getting slow under load. Response times are 2–4 seconds on some endpoints. We need someone to profile it, find the bottlenecks, and fix them.

We're using Express, PostgreSQL (via Knex), and deploying on Railway.

Budget: $400–600
This is urgent — we have a product demo in 10 days.`,
    generatedContent: `2–4 second API responses with a demo in 10 days — that's the kind of problem that needs a diagnosis before a fix, not the other way around.

I've solved this exact situation before. Usually it's N+1 queries or missing indexes in Knex — both are fixable without touching your schema.

My approach:
• Day 1–2 — Profile your slowest endpoints with clinic.js, identify root causes
• Day 3–5 — Fix queries, add indexes, verify with load testing
• Day 6 — Document findings so your team knows what to watch

I can start today. What does your Railway setup look like — are logs accessible?`,
    tone: "PROFESSIONAL",
    status: "REPLIED",
  },
  {
    jobDescription: `We need a marketing landing page for our B2B SaaS product. We have Figma designs ready.

The site needs to be fast, SEO-optimized, and easy for our non-technical team to update later. We're thinking Next.js or similar.

Budget: $600–900
We're not in a rush — quality over speed here.`,
    generatedContent: `You've already done the hard part — the designs are done. Now it's just about building it right the first time.

I built a very similar B2B landing last month — here's the Loom walkthrough. Lighthouse score of 97, full CMS integration so your marketing team can edit copy without touching code.

Here's the plan:
• Week 1 — Next.js scaffold, component build from Figma, CMS setup
• Week 2 — SEO metadata, OG images, performance audit, deploy

No rush is actually better — gives us time to do the CMS integration properly. What's your update frequency like?`,
    tone: "CONVERSATIONAL",
    status: null,
  },
  {
    jobDescription: `Need to add Stripe subscriptions to our existing Express/Node app. We currently have one-time payments working. We want to add monthly and annual plans with a proper billing portal.

Users should be able to upgrade, downgrade, and cancel. Webhooks need to handle plan changes and failed payments.

Budget: $500–700 fixed`,
    generatedContent: `Subscription billing is where most developers cut corners — and where most support tickets come from later.

I've integrated Stripe Billing end-to-end on 6 projects, including the webhook handling that most implementations get wrong (idempotency keys, retry logic, failed payment flows).

Here's how I'd structure this:
• Days 1–2 — Stripe product/price setup, subscription endpoints, billing portal
• Days 3–4 — Webhook handler with signature verification and idempotency
• Day 5 — Upgrade/downgrade/cancel flows, testing across plan states

I have a battle-tested setup I can adapt to your codebase. Want to see the webhook pattern I use?`,
    tone: "PROFESSIONAL",
    status: "WON",
  },
  {
    jobDescription: `We're building a multi-tenant SaaS and need help designing the PostgreSQL schema from scratch.

Requirements: tenant isolation, row-level security, shared infrastructure (no separate DBs per tenant), support for 10k+ tenants eventually.

This is an architecture/design job first — we'd want a detailed ERD and written explanation before any implementation.

Budget: $300–500 for the design phase`,
    generatedContent: `Multi-tenant schema design is where most SaaS projects either get it right early or spend 18 months paying for the mistake.

RLS with shared infrastructure is the right call for 10k+ tenants. The tricky part is getting the policy structure right so it doesn't kill query performance at scale.

Here's my approach:
• Phase 1 — Review your domain model, draft ERD with tenant isolation strategy
• Phase 2 — Written architecture doc covering RLS policies, index strategy, migration path
• Phase 3 — Walkthrough call + Q&A before you build

I can share an ERD from a similar SaaS I designed last quarter. Want to start with that?`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `Looking for a React Native developer to build a cross-platform mobile app for iOS and Android.

The app is a marketplace — users can list items, browse, message each other, and complete purchases. We have a backend API already built in Rails.

Budget: $3,000–5,000
Timeline: 6–8 weeks`,
    generatedContent: `A Rails API already built is a great starting point — that means we can focus entirely on the mobile experience.

I've shipped 4 React Native apps to production, including a marketplace with listings, messaging, and in-app payments. Expo or bare workflow — comfortable with both depending on your push notification and native module needs.

Here's the plan:
• Weeks 1–2 — Auth, navigation shell, listings browse + detail screens
• Weeks 3–4 — Messaging, user profiles, search/filter
• Weeks 5–6 — Checkout flow, push notifications, QA across iOS and Android

Can we do a 20-minute call to walk through the API docs?`,
    tone: "FRIENDLY",
    status: "NO_RESPONSE",
  },
  {
    jobDescription: `We have a large JavaScript codebase (~60k lines) that we want to migrate to TypeScript strict mode. No rewrites — just migration with proper types.

The codebase is React + Node.js. We want it done incrementally so the team can keep shipping features during the migration.

Budget: $2,000–3,000
Timeline: 4–6 weeks`,
    generatedContent: `Migrating 60k lines to TypeScript strict mode without breaking feature velocity is a sequencing problem as much as a technical one.

I migrated an 80k-line React + Node codebase to TS strict mode last year — incrementally, over 5 weeks, with zero blocked sprints. The key is file-by-file with a strict tsconfig from day one, not the loose mode shortcut.

Here's the approach:
• Week 1 — tsconfig setup, tooling, migrate shared utilities and types first
• Weeks 2–4 — Component by component, server routes, shared interfaces
• Weeks 5–6 — Strict mode cleanup, any remaining type assertions

I can share the migration playbook I used. Want to start with an audit of your current codebase?`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `Need a GraphQL API built from scratch for our e-commerce platform. We have a PostgreSQL database with the schema already defined.

Requirements: queries and mutations for products, orders, users, and inventory. Subscriptions for real-time order updates. Authentication middleware.

Budget: $1,500–2,500`,
    generatedContent: `A defined PostgreSQL schema is the perfect starting point — that means the hard domain modeling is already done.

Apollo + Prisma is my default GraphQL stack and it maps cleanly onto Postgres schemas. The real complexity here is the real-time subscriptions for order updates — that's where I'd focus the architecture conversation.

Here's the plan:
• Days 1–3 — Apollo Server setup, schema design, resolvers for products and users
• Days 4–6 — Orders, inventory mutations, DataLoader for N+1 prevention
• Days 7–8 — WebSocket subscriptions for real-time updates, auth middleware

I can deliver a schema draft within 24 hours of our kickoff call. What's your subscription volume expectation?`,
    tone: "PROFESSIONAL",
    status: "REPLIED",
  },
  {
    jobDescription: `We need a developer to customize our Shopify Liquid theme. Several layout issues on mobile, some section customizations, and a custom product page template.

We're not technical — we just need it to look good and work on all devices. Budget is flexible for the right person.

Timeline: This week if possible.`,
    generatedContent: `Mobile layout issues on Shopify usually come down to three things: missing responsive breakpoints, hardcoded widths in section CSS, or conflicting theme and app styles.

I've been working in Liquid for 4 years — custom product templates, section schemas, metafield integrations. I can fix what's breaking and build the custom template without touching the parts that work.

Here's the plan:
• Day 1 — Audit all reported issues, identify root causes
• Day 2 — Mobile fixes + custom product page template
• Day 3 — Cross-device QA, any revisions

I can start today. Can you share the theme and a list of the specific pages that are broken?`,
    tone: "CONVERSATIONAL",
    status: null,
  },
  {
    jobDescription: `Looking for a serverless developer to build Lambda functions for a data processing pipeline on AWS.

The pipeline ingests CSV files from S3, transforms the data, and writes results to RDS PostgreSQL. Needs error handling, retry logic, and CloudWatch alerting.

Budget: $800–1,200
Must have AWS experience.`,
    generatedContent: `S3 trigger → Lambda → RDS is a standard pipeline pattern, but the retry logic and error visibility are where most implementations fall short.

Lambda + SQS dead-letter queues for retries, CloudWatch Embedded Metrics for alerting — this is the stack I use daily for data pipelines. The SQS buffer between S3 and Lambda also gives you backpressure handling if the CSV files come in bursts.

Here's the plan:
• Days 1–2 — Lambda scaffold, S3 trigger, CSV parsing and transformation logic
• Days 3–4 — RDS write layer, connection pooling with RDS Proxy
• Day 5 — DLQ retry setup, CloudWatch alarms, load test with sample files

I can scope this more precisely after a 15-minute call about your CSV volume and RDS schema.`,
    tone: "PROFESSIONAL",
    status: "WON",
  },
  {
    jobDescription: `We have a React app with several UI bugs that showed up after a recent deployment. Things like dropdowns not closing, a form that resets on blur, and a broken modal on iOS Safari.

Just need someone to go through the bug list and fix them. We can give repo access.

Budget: $200–400. Small job, fast turnaround preferred.`,
    generatedContent: `iOS Safari modal issues and dropdowns not closing are usually event propagation problems — fixable once you see the component tree.

Send me the repo link and a numbered list of the bugs. I'll go through the code, give you a fix estimate within 2 hours, and have a PR up the same day.

I've worked through bug lists like this many times — the form-resets-on-blur one is almost always a missing key prop or an uncontrolled/controlled input conflict.`,
    tone: "CONVERSATIONAL",
    status: "REPLIED",
  },
  {
    jobDescription: `We need to set up a CI/CD pipeline for our Node.js API using GitHub Actions.

Requirements: lint, test, and build on every PR. Auto-deploy to staging on merge to main. Manual approval gate before production deploy. We use Railway for hosting.

Budget: $300–500`,
    generatedContent: `A proper CI/CD pipeline pays for itself in the first week of not manually deploying to staging.

I've built GitHub Actions pipelines for 15+ Node.js teams — lint + test + build on PR, staging auto-deploy on merge, production with manual approval is a straightforward setup with Railway's deploy hooks.

Here's the plan:
• Day 1 — PR workflow: lint, test, build with caching for fast runs
• Day 2 — Staging deploy workflow with Railway, production gate with required approval
• Day 3 — Test the full flow end-to-end, document the runbook

I can have this running in a day. Do you have Railway deploy hooks set up already?`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `Need a WooCommerce store built for a small skincare brand. We have product photos and copy ready. Want a clean, premium feel — nothing template-looking.

The site needs to handle 30–50 products, a subscription option for one product, and integration with our existing email platform (Klaviyo).

Budget: $1,500–2,500
Timeline: 3–4 weeks`,
    generatedContent: `A premium skincare brand deserves a site that doesn't look like every other WooCommerce store — and that starts with the theme choice and customization depth.

I've built WooCommerce stores for similar brands. The Klaviyo integration is straightforward with their official plugin, and WooCommerce Subscriptions handles your one recurring product cleanly.

Here's the plan:
• Week 1 — Theme selection + customization to match your brand, product catalog setup
• Week 2 — Subscription product, Klaviyo integration, checkout flow
• Week 3 — Cross-device QA, page speed optimization, handoff with documentation

Can you share any brand references or competitors whose design direction you like?`,
    tone: "FRIENDLY",
    status: "NO_RESPONSE",
  },
  {
    jobDescription: `Looking for a D3.js developer to build custom data visualizations for our analytics platform.

We need: a time-series line chart with zoom/pan, a network graph showing user connections, and a heatmap calendar. All need to be responsive and export to PNG.

Stack: React + TypeScript
Budget: $1,200–1,800`,
    generatedContent: `Custom D3 visualizations inside React require a careful approach to the DOM boundary — most implementations that "just work" in dev fall apart on resize or re-render.

D3 and Observable are my daily tools. I use a pattern where D3 handles the math and React handles the DOM, which keeps everything predictable and avoids the ref-vs-state mess.

Here's the plan:
• Days 1–3 — Time-series chart with zoom/pan, responsive container
• Days 4–5 — Network graph with force simulation, collision detection
• Days 6–7 — Heatmap calendar, PNG export via canvas, final polish

I can prototype the time-series chart this week to validate the approach before we commit to the full scope.`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We need to implement OAuth2 + JWT authentication in our Express API. Currently we have no auth at all.

Requirements: email/password signup, Google OAuth, JWT access tokens with refresh token rotation, and password reset via email.

Budget: $600–900`,
    generatedContent: `Authentication done wrong is the most expensive technical debt a product can have — it's almost impossible to retrofit properly once users are in production.

I write auth from scratch rather than copy-pasting solutions, because the edge cases (refresh token rotation, concurrent requests during token refresh, secure password reset flows) are where the vulnerabilities live.

Here's the plan:
• Days 1–2 — Email/password signup, JWT access + refresh token issuance
• Days 3–4 — Google OAuth with passport.js, token rotation on refresh
• Day 5 — Password reset with secure time-limited tokens, rate limiting on auth endpoints

I can share the security spec I work from before starting. Want to review it first?`,
    tone: "PROFESSIONAL",
    status: "WON",
  },
  {
    jobDescription: `We're building a design system and need a reusable Tailwind component library — buttons, inputs, modals, cards, badges, dropdowns. About 20–25 components.

Must be accessible (WCAG AA), documented with Storybook, and TypeScript typed.

Budget: $1,000–1,500`,
    generatedContent: `A component library is only valuable if it actually gets used — which means the API design matters as much as the components themselves.

I shipped a 40-component Tailwind library last quarter with Storybook docs and full TypeScript types. The repo is private but I can share the Storybook hosted version.

Here's the plan:
• Week 1 — Core primitives: buttons, inputs, badges, cards with variant/size APIs
• Week 2 — Compound components: modals, dropdowns, form patterns
• Throughout — Storybook stories, accessibility testing with axe, TypeScript generics

Can you share your brand tokens? I'll set up the Tailwind config first so everything cascades correctly.`,
    tone: "CONVERSATIONAL",
    status: null,
  },
  {
    jobDescription: `Our Next.js marketing site has some technical SEO issues we need fixed. Screaming Frog audit is attached.

Main issues: missing canonical tags, slow LCP on mobile (4.2s), duplicate meta descriptions, and broken internal links.

Budget: $400–600
We'd like a written report at the end too.`,
    generatedContent: `A 4.2s LCP on mobile is the most urgent issue here — that's a Core Web Vital failure that affects both rankings and conversion.

I run SEO audits with Lighthouse and Screaming Frog regularly. LCP at that level on Next.js is almost always image optimization or a blocking render resource — both fixable without a redesign.

Here's the plan:
• Day 1 — LCP root cause analysis, image audit, canonical and meta fixes
• Day 2 — Broken link cleanup, structured data review, redirect mapping
• Day 3 — Final Lighthouse run, written report with prioritized fix list

I'll send you the report structure before I start so you know what you're getting.`,
    tone: "PROFESSIONAL",
    status: "REPLIED",
  },
  {
    jobDescription: `We want to build an MVP freelance marketplace — job listings, freelancer profiles, messaging, and a simple escrow payment flow.

This is a 4-week build. We have wireframes. Looking for a full-stack developer who can own the whole thing.

Stack preference: Next.js + PostgreSQL
Budget: $4,000–6,000`,
    generatedContent: `A marketplace MVP in 4 weeks is achievable if the scope is disciplined — and your wireframes being ready is a strong start.

I've built 2 marketplace MVPs. The escrow payment flow is the part most teams underestimate — Stripe Connect (not just Stripe Payments) handles the money movement, and the legal/compliance layer matters even at MVP.

Here's the plan:
• Week 1 — Auth, profiles, job listing CRUD
• Week 2 — Search + filter, messaging foundation
• Week 3 — Stripe Connect, escrow hold + release flows
• Week 4 — QA, edge case handling, deploy

Can I see the wireframes? I'll put together a scoping doc with the risks flagged before we start.`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We need Redis caching added to our Node.js API to reduce database load. Our PostgreSQL DB is getting hit too hard on high-traffic endpoints.

Looking for someone to identify which queries to cache, implement Redis, and document the TTL strategy.

Budget: $400–700`,
    generatedContent: `High DB load from repeated queries is a caching problem, but the real question is which queries to cache — not all of them deserve Redis.

I added Redis caching to a Node.js API last month and cut DB queries by 70% on the heavy endpoints. The key is profiling first: cache the expensive, frequently-hit, slowly-changing queries — not everything.

Here's the plan:
• Day 1 — Profile your endpoints, identify cache candidates and appropriate TTLs
• Day 2 — Redis setup, cache-aside pattern on target queries, invalidation strategy
• Day 3 — Load test before/after, documentation of TTL decisions

Which endpoints are getting hit hardest — do you have query metrics or just application logs?`,
    tone: "PROFESSIONAL",
    status: "NO_RESPONSE",
  },
  {
    jobDescription: `We have Figma designs for our web app and need a developer to convert them to pixel-perfect React components.

About 15 screens, responsive. We use Tailwind. The designs are clean and well-organized with proper components in Figma.

Budget: $800–1,200
Timeline: 2 weeks`,
    generatedContent: `Clean, well-organized Figma with proper components makes this a translation job, not a guessing game — and that's the best possible starting point.

I work directly in Figma before writing a line of code — checking spacing tokens, understanding the component variants, flagging anything that won't translate cleanly to Tailwind. Zero back-and-forth surprises mid-build.

Here's the plan:
• Week 1 — Design review, shared component extraction, first 8 screens
• Week 2 — Remaining screens, responsive breakpoints, Figma annotation handoff

Can you share the Figma file link? I'll do a quick review and flag any questions before we kick off.`,
    tone: "CONVERSATIONAL",
    status: "WON",
  },
  {
    jobDescription: `Need a Python developer to build a web scraper that collects product data (name, price, description, images) from 3 e-commerce sites.

The sites use JavaScript rendering. Output should go to a PostgreSQL database. Needs to run on a schedule (daily).

Budget: $500–800`,
    generatedContent: `JavaScript-rendered e-commerce sites mean Playwright, not requests — and the daily schedule means you need proper error handling and retry logic, not just a script.

Playwright + BeautifulSoup for the parsing layer, pg for Postgres writes, and APScheduler or a simple cron for scheduling is my standard scraping stack. Anti-bot measures? I've worked around Cloudflare, Akamai, and DataDome before.

Here's the plan:
• Days 1–2 — Scrapers for all 3 sites, handling pagination and JS rendering
• Days 3–4 — Postgres schema and write layer, deduplication logic
• Day 5 — Scheduling, error alerting, deployment

Can you share the 3 target sites? I'll check their anti-bot setup before quoting a final number.`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `Looking for a developer to build a real-time chat application with Socket.io.

Features: chat rooms, direct messages, online presence indicators, typing indicators, message history (last 50 messages per room). Backend in Node.js, frontend in React.

Budget: $1,200–1,800`,
    generatedContent: `Real-time chat sounds simple until you hit the edge cases — reconnection handling, message ordering under network lag, presence at scale.

I built a 10k-user chat system with Socket.io last year. Rooms, DMs, typing indicators, presence — all in production. The history query (last 50 per room) is the part worth designing carefully so it doesn't become a scaling problem later.

Here's the plan:
• Days 1–3 — Socket.io server, room and DM architecture, presence tracking
• Days 4–5 — React chat UI, typing indicators, message history with virtual scroll
• Days 6–7 — Reconnection handling, rate limiting, QA

Want to see the architecture doc from my last chat project?`,
    tone: "FRIENDLY",
    status: "REPLIED",
  },
  {
    jobDescription: `We need to migrate our raw SQL queries in a Node.js app to Prisma ORM. The app has about 80 queries across 15 files.

Goal is full type safety and cleaner code — not a rewrite, just ORM adoption with the existing schema.

Budget: $600–900`,
    generatedContent: `80 queries across 15 files is a well-scoped migration — large enough to need a plan, small enough to do cleanly without a rewrite.

I've migrated 3 codebases from raw SQL to Prisma. The critical step is introspecting your existing schema first (prisma db pull) so the generated client matches exactly — no data model surprises.

Here's the plan:
• Day 1 — Prisma setup, schema introspection, generate client
• Days 2–4 — Migrate queries file by file, type-check each batch before moving on
• Day 5 — Remove raw SQL client dependency, final type audit

Zero data loss — it's a code migration, not a schema migration. Can you share the current schema file?`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `Need to containerize our full-stack app (Next.js frontend + Express API + PostgreSQL) with Docker Compose.

Two environments: development with hot reload, production with optimized builds. Includes nginx reverse proxy for production.

Budget: $300–500`,
    generatedContent: `Two-environment Docker Compose is the right call — dev and prod containers should be meaningfully different, not just the same image with a different env var.

I do this setup regularly: one compose file for dev with volume mounts and hot reload, a separate production compose with multi-stage builds and nginx config. The Next.js production image especially benefits from the standalone output mode.

Here's the plan:
• Day 1 — Dev compose: Next.js, Express, Postgres with volume mounts, health checks
• Day 2 — Production compose: multi-stage builds, nginx reverse proxy, env var management
• Day 3 — Test both environments end-to-end, write the runbook

Can do this today. Do you have any existing Dockerfiles I should work from, or starting from scratch?`,
    tone: "PROFESSIONAL",
    status: "WON",
  },
  {
    jobDescription: `We need Firebase Cloud Messaging push notifications integrated into our React Native app (Expo).

Both iOS and Android. Notifications should work in foreground, background, and killed state. We also need a backend endpoint to send targeted notifications by user ID.

Budget: $400–600`,
    generatedContent: `Push notifications in Expo are straightforward in foreground — it's the background and killed-state handling that catches most implementations off guard, especially on iOS.

I've integrated Expo Notifications + FCM 4 times. The killed-state handling on iOS requires specific entitlements and background modes that Expo's bare workflow handles better than managed for your use case.

Here's the plan:
• Days 1–2 — Expo Notifications setup, FCM credentials, iOS + Android config
• Days 3–4 — Foreground, background, and killed-state handlers with navigation
• Day 5 — Backend endpoint to store push tokens and send targeted notifications

Are you on managed or bare Expo? That changes one part of the approach.`,
    tone: "CONVERSATIONAL",
    status: "NO_RESPONSE",
  },
  {
    jobDescription: `We want to add an AI chat assistant to our existing web app. The assistant should have context about the user's data and respond in a conversational way.

Using OpenAI. We want streaming responses. The app is built in Next.js.

Budget: $800–1,200`,
    generatedContent: `Streaming AI chat in Next.js with user context is exactly what I shipped 3 weeks ago — same stack, similar scope.

The interesting part here isn't the OpenAI integration (that's straightforward with the Vercel AI SDK), it's how you inject user context into the system prompt without hitting token limits on users with large data sets.

Here's the plan:
• Days 1–2 — Vercel AI SDK setup, streaming route, basic chat UI
• Days 3–4 — User context injection strategy, conversation history management
• Day 5 — Rate limiting, error handling, token usage monitoring

I can show you the context injection pattern I use before we start — it's worth aligning on that architecture first.`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We rebuilt our Webflow marketing site in-house and it's slow — Lighthouse score of 58 on mobile. We want to move it to Next.js for performance.

We have the Webflow export. About 12 pages, mostly static content with a contact form and newsletter signup.

Budget: $1,500–2,000`,
    generatedContent: `A Lighthouse score of 58 on mobile from Webflow is typical — the exported code is bloated and the CDN optimization only goes so far.

I've migrated 5 Webflow sites to Next.js. The typical outcome is a 30–40 point Lighthouse improvement and a 60–70% reduction in page weight. 12 mostly-static pages is a clean scope.

Here's the plan:
• Week 1 — Next.js scaffold, static pages from Webflow export, image optimization
• Week 2 — Contact form, newsletter signup, final SEO metadata, deploy

The contact form and newsletter depend on your existing integrations — what are you using? (Formspree, Mailchimp, etc.)`,
    tone: "PROFESSIONAL",
    status: "REPLIED",
  },
  {
    jobDescription: `We need an internal admin panel built for our operations team to manage orders, users, and product inventory.

Backend is Django REST Framework. Frontend should be React. Our ops team is non-technical — it needs to be intuitive without training.

Budget: $2,000–3,000
Timeline: 4 weeks`,
    generatedContent: `An admin panel for non-technical ops teams is a UX problem as much as a technical one — the right architecture matters less than whether your team can actually use it without a manual.

Django REST + React is a stack I know well. The key is designing the workflows around how your ops team actually thinks, not how the data model is structured.

Here's the plan:
• Week 1 — Auth, user management, order list + detail views
• Week 2 — Inventory management, bulk actions, search/filter
• Week 3 — Order status workflows, export to CSV, audit log
• Week 4 — UAT with your ops team, revisions, deploy

Can I talk to one person on your ops team before I start? 30 minutes on their current workflow saves us weeks of revisions.`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We have a React component library with very low test coverage (~12%). We need Jest + Testing Library tests written for our core components.

About 30 components. Priority on the form components, modals, and table.

Budget: $700–1,000`,
    generatedContent: `12% coverage on a component library means the riskiest code is untested — form components and modals are exactly where bugs hide.

Testing Library + Jest is my primary testing stack. I focus on behavior tests over implementation tests — what the user sees and does, not internal state. That's what actually catches regressions.

Here's the plan:
• Days 1–2 — Form components: input, select, checkbox, validation states
• Days 3–4 — Modals: open/close, focus trap, keyboard navigation
• Days 5–6 — Table: sorting, pagination, empty states, loading

I'll target 80%+ coverage on the prioritized components. Can you share the component repo?`,
    tone: "PROFESSIONAL",
    status: "WON",
  },
  {
    jobDescription: `We're migrating from Firebase to Supabase and need help with the data migration and auth transition.

About 15k users, Firestore collections, Firebase Storage files, and Firebase Auth. We want to keep the same user emails/passwords if possible.

Budget: $1,000–1,500`,
    generatedContent: `Firebase to Supabase is a migration I know well — and the auth transition is the part that needs the most care. Firebase Auth passwords are hashed with bcrypt but the hash format isn't directly importable to Supabase Auth.

The cleanest path is a soft migration: import users to Supabase, trigger a password reset for all on first login after cutover. Zero password exposure, seamless from the user's perspective.

Here's the plan:
• Week 1 — Firestore → PostgreSQL schema mapping and data migration
• Week 2 — Firebase Storage → Supabase Storage, auth user import strategy
• Week 3 — Cutover plan, rollback procedure, post-migration audit

I wrote a detailed migration guide that got 200 bookmarks — happy to share it as a starting framework.`,
    tone: "CONVERSATIONAL",
    status: null,
  },
  {
    jobDescription: `Need transactional emails set up for our SaaS using SendGrid. We need: welcome email, onboarding sequence (3 emails over 7 days), password reset, and churn prevention (triggered when user hasn't logged in for 14 days).

Backend is Node.js.

Budget: $400–600`,
    generatedContent: `Transactional email is one of those things that looks simple until you need to debug why the churn trigger fired twice, or why the onboarding sequence skipped step 2.

I've built welcome, onboarding, and churn sequences on SendGrid for 4 SaaS products. The churn trigger especially needs idempotency — you don't want multiple jobs competing to send the same "we miss you" email.

Here's the plan:
• Days 1–2 — SendGrid setup, welcome and password reset templates + delivery
• Day 3 — Onboarding sequence with scheduling logic and unsubscribe handling
• Day 4 — Churn trigger with idempotency, 14-day inactivity detection

What's your current job queue setup? (Bull, Agenda, cron?) That affects the scheduling approach.`,
    tone: "PROFESSIONAL",
    status: "NO_RESPONSE",
  },
  {
    jobDescription: `Our React app feels sluggish — interactions are slow and the initial load takes 6 seconds. We need a performance audit and fixes.

The app is a medium-sized SaaS with a lot of data-heavy tables and charts.

Budget: $600–900`,
    generatedContent: `6 seconds on initial load for a SaaS app is a conversion killer — and data-heavy tables with charts are a well-known React performance trap.

React DevTools Profiler + Webpack Bundle Analyzer is my first move on a job like this. The culprit is almost always one of three things: unoptimized re-renders, bundle size from heavy dependencies, or blocking data fetches.

Here's the plan:
• Day 1 — Bundle analysis, render profiling, identify the top 3 bottlenecks
• Day 2 — Code-split heavy routes, virtualize large tables, memo where it matters
• Day 3 — Chart rendering optimization, verify improvements with Lighthouse

I'll find the culprit within an hour of getting repo access. What does your current bundle size look like?`,
    tone: "PROFESSIONAL",
    status: "REPLIED",
  },
  {
    jobDescription: `We want to migrate our CSS from Bootstrap 4 to Tailwind CSS. Large React app, about 40 components.

We want it done incrementally — ship it one component group at a time, not a big bang.

Budget: $1,200–1,800
Timeline: 4–5 weeks`,
    generatedContent: `Bootstrap to Tailwind incrementally is the right call — big bang CSS migrations are how you ship subtle visual regressions nobody catches until a client complains.

I've done this exact migration for 6 projects. The pattern I use: Tailwind runs alongside Bootstrap, one component group migrated per PR, Bootstrap removed only after the last component is done. Zero visual regressions when you keep the scope tight.

Here's the plan:
• Weeks 1–2 — Shared primitives first: buttons, inputs, badges, typography
• Weeks 3–4 — Layout components: nav, sidebar, cards, modals
• Week 5 — Data components: tables, charts wrappers; Bootstrap removal

I can share the class-by-class migration guide I use before we start.`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We use Cloudinary for image uploads in our Node.js + React app but we haven't optimized the pipeline at all.

Need: signed uploads from the frontend (not exposing API keys), automatic format conversion to WebP, responsive image variants, and lazy loading on the frontend.

Budget: $400–600`,
    generatedContent: `Unsigned Cloudinary uploads from the frontend is a security issue that's easy to miss until someone starts abusing your account. Signed uploads with server-generated signatures is the right fix.

Cloudinary transformations + signed uploads is a setup I've done on 3 projects. The responsive variants and WebP conversion are free once the upload pipeline is right — Cloudinary handles it at delivery time.

Here's the plan:
• Day 1 — Server-side signature endpoint, update frontend to use signed uploads
• Day 2 — Cloudinary transformation presets: WebP, responsive breakpoints, quality auto
• Day 3 — React lazy loading with blur-up placeholders, CDN URL generation

Can start today. Do you have an existing upload component I can work from?`,
    tone: "CONVERSATIONAL",
    status: "WON",
  },
  {
    jobDescription: `Need a custom WordPress plugin built for a membership site. Members should be able to access gated content, track their progress through a course, and download resources.

No existing plugins — built from scratch to match our exact requirements.

Budget: $1,500–2,500`,
    generatedContent: `Custom membership plugins are where most developers reach for MemberPress and call it a day — but if your requirements are specific, off-the-shelf plugins create more problems than they solve.

I've shipped 10+ WordPress plugins from scratch. Hooks, shortcodes, REST API endpoints, custom post types — the full toolkit. Content gating + progress tracking + downloads is well-defined scope.

Here's the plan:
• Week 1 — Plugin scaffold, user role system, content gating with shortcodes
• Week 2 — Course progress tracking with CPTs, resource download management
• Week 3 — Admin UI for managing members, progress reports, testing

Can you share a detailed spec or examples of the gated content structure you have in mind?`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We need rate limiting added to our Express API. We're getting hammered by bots on a few public endpoints.

Need per-IP rate limiting on public routes, per-user rate limiting on authenticated routes, and a Redis-backed store so it works across multiple instances.

Budget: $200–400`,
    generatedContent: `Per-IP on public routes, per-user on authenticated routes, Redis-backed — that's the correct architecture. Most express-rate-limit setups miss the Redis part and don't work once you scale past one instance.

express-rate-limit + ioredis + a sliding window algorithm gives you accurate limiting that survives restarts and scales horizontally. Thirty-minute job once the Redis connection is set up.

Here's the plan:
• Day 1 — express-rate-limit setup with Redis store, configure limits per route group
• Day 2 — Custom key generator for authenticated routes (userId instead of IP), test with load tool

Do you already have Redis in your stack, or does that need to be added too?`,
    tone: "PROFESSIONAL",
    status: "NO_RESPONSE",
  },
  {
    jobDescription: `We want Zod validation added throughout our Express + TypeScript API. Currently we have no runtime validation — just TypeScript types.

All request bodies, query params, and responses should be validated. We want a clean pattern the team can follow for new endpoints.

Budget: $400–600`,
    generatedContent: `TypeScript types give you compile-time safety, but at runtime your API trusts whatever arrives in the request body. That trust is where most injection and corruption bugs come from.

Zod end-to-end — request schemas, response schemas, shared types between client and server — is a pattern I've set up on 5 projects. The key is getting the validation middleware right so every new endpoint just uses the schema and doesn't repeat the try/catch logic.

Here's the plan:
• Day 1 — Zod middleware setup, error formatting, validation on 3 sample endpoints
• Day 2 — Schema library structure, inferred types replacing manual interfaces
• Day 3 — Apply to all remaining endpoints, document the pattern for the team

I'll write the pattern guide as part of the deliverable so new endpoints are consistent.`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We need Mapbox GL integrated into our React real estate app. Users should be able to browse property listings on an interactive map.

Features: clustered markers, popup cards on click, filter by price range (updates map markers), and draw-to-search (user draws a polygon to filter listings).

Budget: $1,000–1,500`,
    generatedContent: `Draw-to-search is the part that separates this from a basic Mapbox implementation — polygon filtering requires Turf.js for the geometry calculations and a specific layer order in the map instance.

Mapbox GL + React is my go-to for property apps. I built a very similar listing map last quarter — clustered markers, popups, and a bounding box filter (slightly simpler than polygon, but the architecture is the same).

Here's the plan:
• Days 1–2 — Mapbox setup, clustered markers, popup cards
• Days 3–4 — Price range filter synced to map markers, URL state for shareable filters
• Days 5–6 — Draw-to-search with Turf.js polygon containment, edge case handling

Happy to show a demo of the listing map I built — the architecture will transfer directly.`,
    tone: "CONVERSATIONAL",
    status: "REPLIED",
  },
  {
    jobDescription: `We need invoice PDF generation added to our Node.js SaaS. Users should be able to generate a PDF from their invoice data and download it or have it emailed.

Design is already done in Figma. Pixel-perfect output matters.

Budget: $400–700`,
    generatedContent: `Pixel-perfect PDFs from a Figma design is a Puppeteer job, not a pdfkit job — pdfkit gives you precise control but you're essentially re-implementing the layout by hand.

Puppeteer renders an HTML template to PDF, so your Figma design translates directly to HTML/CSS and the output is faithful. It's also easier to maintain as the design evolves.

Here's the plan:
• Days 1–2 — HTML/CSS invoice template from Figma, Puppeteer PDF generation endpoint
• Day 3 — Download response + optional email attachment via SendGrid

Can you share the Figma link? The layout complexity determines whether Puppeteer is straightforward or needs some workarounds.`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We want to migrate our Redux state management to Zustand. The Redux setup has become hard to work with — too much boilerplate.

React app, about 15 Redux slices. We want the migration done incrementally, slice by slice.

Budget: $800–1,200`,
    generatedContent: `Redux boilerplate fatigue is real, and Zustand is the right move for most React apps that aren't working with deeply normalized server state.

Slice-by-slice incremental migration is exactly the right approach — you can ship it without a feature freeze. I've done this migration 3 times. The typical result is a 40% reduction in state management code and a noticeably simpler mental model for the team.

Here's the plan:
• Week 1 — Zustand setup, migrate 5 simplest slices, establish the store pattern
• Week 2 — Remaining slices, async patterns with Zustand middleware
• Week 3 — Remove Redux and all its dependencies, final cleanup

I can share the before/after diff from a previous migration to show the pattern.`,
    tone: "PROFESSIONAL",
    status: "WON",
  },
  {
    jobDescription: `Several pages in our web app are broken on mobile — nav menu doesn't close, form inputs get covered by keyboard, and one page has a horizontal scroll that shouldn't be there.

Quick fix job. We can share a staging URL.

Budget: $150–300`,
    generatedContent: `Nav not closing on mobile is usually a click-outside handler that doesn't account for touch events. Keyboard covering inputs is a viewport meta or scroll-into-view issue. Horizontal scroll is almost always an element with a fixed width or negative margin.

Send me the staging URL and I'll have a diagnosis back to you within an hour. From there it's usually a half-day fix.

These are all solvable without touching your component structure — just CSS and a small event handler fix.`,
    tone: "CONVERSATIONAL",
    status: "NO_RESPONSE",
  },
  {
    jobDescription: `We need a reliable Stripe webhook handler built for our Node.js app. We've had issues with duplicate event processing and events being missed during deployments.

Events we care about: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted, invoice.payment_failed.

Budget: $300–500`,
    generatedContent: `Duplicate event processing and missed events during deployments are the two most common Stripe webhook problems — and they're both solvable with the same pattern.

Idempotency keys stored in your DB prevent duplicate processing. A queue-based webhook processor (even just a simple DB queue) handles the missed-during-deploy problem by decoupling receipt from processing.

Here's the plan:
• Day 1 — Webhook endpoint with Stripe signature verification, event storage in DB
• Day 2 — Idempotent handlers for each event type, retry logic for processing failures
• Day 3 — Test with Stripe CLI against all 4 event types, edge cases

I wrote the pattern I use for idempotent webhook handling — want me to share it before we start?`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We're ready to break our Node.js monolith into microservices. The monolith handles user management, orders, inventory, and notifications.

Looking for an architect + developer to design the service boundaries, choose the communication pattern, and build the first two services.

Budget: $3,000–5,000
Timeline: 6–8 weeks`,
    generatedContent: `Service boundary design is where microservices projects succeed or fail — wrong cuts and you've just made a distributed monolith with all the complexity and none of the benefits.

I've led two monolith decompositions. The communication pattern (sync REST vs. async events) depends entirely on your consistency requirements — orders and inventory usually need events with eventual consistency, not synchronous calls.

Here's the plan:
• Weeks 1–2 — Service boundary mapping, event vs. sync decision per boundary, architecture doc
• Weeks 3–5 — Build service 1 (user management) with defined contracts
• Weeks 6–8 — Build service 2 (orders), event broker setup, integration testing

Let's talk before I write a line of code. The architecture conversation is the deliverable that matters most here.`,
    tone: "PROFESSIONAL",
    status: "REPLIED",
  },
  {
    jobDescription: `We want to set up A/B testing on our landing page. We're testing headline copy and CTA button color.

We already use PostHog for analytics. Need the test set up, both variants visible in the preview, and conversion events tracked properly.

Budget: $200–350`,
    generatedContent: `PostHog feature flags for A/B testing is a clean setup — no separate tool needed, and conversion events pipe directly into your existing analytics.

I've done this exact PostHog setup twice. The main thing to get right is the conversion event definition before you start — the test is only as useful as what you're measuring.

Here's the plan:
• Day 1 — Feature flag setup, variant implementation for headline and CTA
• Day 2 — Conversion event tracking, preview links for both variants, QA

What's the conversion event you want to track — signup, scroll depth, or a CTA click?`,
    tone: "CONVERSATIONAL",
    status: null,
  },
  {
    jobDescription: `We need TanStack Query (React Query) integrated into our existing React app. We currently use custom useEffect hooks for all our data fetching — no caching, no loading states.

About 20 data fetching patterns to migrate. We want the migration done right — not just wrapping our existing fetches, but using React Query properly.

Budget: $800–1,200`,
    generatedContent: `Custom useEffect data fetching without caching is how you end up with duplicate requests, loading flickers, and stale data bugs that are hard to reproduce.

TanStack Query v5 migration from useEffect hooks is something I know inside out — it's not just wrapping fetches, it's rethinking data ownership across your component tree.

Here's the plan:
• Days 1–2 — Query client setup, migrate your 5 most-used queries, establish the custom hook pattern
• Days 3–5 — Remaining queries, mutations with optimistic updates where appropriate
• Day 6 — Remove useEffect fetches, verify caching behavior, document the patterns

I can share the custom hook pattern I use so your team follows the same structure going forward.`,
    tone: "PROFESSIONAL",
    status: "WON",
  },
  {
    jobDescription: `Need someone to set up scheduled tasks (cron jobs) in our Node.js API.

Tasks needed: sync user data from a third-party API every hour, clean up expired sessions daily, send weekly summary emails to users, and retry failed webhook deliveries every 15 minutes.

Budget: $400–600`,
    generatedContent: `Four cron tasks with different schedules and retry logic needs a proper job queue, not just node-cron — especially the webhook retry, which needs idempotency and exponential backoff.

node-cron for the schedule layer + Bull Queue for the webhook retry with Redis-backed job storage is the pattern I'd use here. It gives you visibility into failed jobs and retry state without building it from scratch.

Here's the plan:
• Days 1–2 — node-cron setup, hourly sync and daily cleanup tasks
• Days 3–4 — Bull Queue for webhook retry with exponential backoff
• Day 5 — Weekly summary email job, monitoring endpoint to check job health

Do you already have Redis in your stack? The webhook retry design depends on that.`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We need Sentry integrated into our production Next.js + Node.js app for error monitoring.

Not just the basic setup — we want source maps, custom error context (user ID, subscription plan, page context), release tracking, and meaningful alert rules so we're not flooded with noise.

Budget: $300–500`,
    generatedContent: `Basic Sentry setup takes an afternoon. Useful Sentry — with source maps that actually resolve, context that lets you reproduce bugs, and alert rules that don't wake you up at 3am for a 404 — takes someone who's done it properly before.

I've set up Sentry on 6 production apps. The source map upload step is where most setups fail (usually a CI environment variable issue). Custom context with user ID and subscription plan is 20 lines of code once the Sentry instance is configured right.

Here's the plan:
• Day 1 — Sentry setup for Next.js + Node, source map upload in CI
• Day 2 — Custom context scope (userId, plan, page), release tracking on deploy
• Day 3 — Alert rule configuration: meaningful thresholds, ignore noisy errors, on-call routing

What does your current deployment setup look like? (Vercel, Railway, custom CI?)`,
    tone: "PROFESSIONAL",
    status: "NO_RESPONSE",
  },
  {
    jobDescription: `We want to build a full-stack MVP in 4 weeks. The product is a B2B SaaS tool for project management — teams, projects, tasks, comments, and a basic reporting dashboard.

We have wireframes. Looking for a senior full-stack developer to own the entire build.

Budget: $5,000–8,000
Stack preference: Next.js, PostgreSQL, and something for auth.`,
    generatedContent: `4 weeks for a B2B project management MVP is tight but achievable — the key is shipping the core loop (create project → assign tasks → track progress) in week 1 and building around it.

Next.js + Supabase (auth + Postgres) + Stripe is my default MVP stack. I've shipped 3 SaaS MVPs at this scope, and the biggest risk is always feature creep in weeks 3–4 when stakeholders see something working.

Here's the plan:
• Week 1 — Auth, teams, projects, tasks CRUD — the core loop working end-to-end
• Week 2 — Comments, file attachments, notifications
• Week 3 — Reporting dashboard, team management, billing
• Week 4 — QA, performance, deploy, stakeholder review

Can I see the wireframes? I'll put together a scoping doc with risk flags before we start.`,
    tone: "PROFESSIONAL",
    status: "REPLIED",
  },
  {
    jobDescription: `We need a WCAG 2.1 AA accessibility audit and remediation for our React web app.

The app has about 40 screens. We need a full audit report first, then fixes prioritized by severity. We have an upcoming contract requirement for accessibility compliance.

Budget: $1,500–2,500`,
    generatedContent: `A contract requirement for accessibility compliance means you need documented evidence of the audit, not just fixed code — so the report matters as much as the fixes.

I run audits with axe-core, screen reader testing (NVDA + VoiceOver), and keyboard-only navigation. The output is a prioritized issue list with WCAG criterion references so your compliance documentation is audit-ready.

Here's the plan:
• Week 1 — Automated audit with axe, screen reader QA on all 40 screens, written report
• Week 2 — Critical and high-severity fixes (usually: focus management, aria labels, color contrast)
• Week 3 — Medium fixes, retest, updated report with pass/fail for each criterion

Can you share the app URL or staging link? I'll do a sample audit on 3 screens before we finalize scope.`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We need Algolia search added to our e-commerce product catalog in React.

Features: instant search with autocomplete, filters (category, price range, in-stock), sorting, and hit highlighting. The catalog has ~5,000 products synced from our database.

Budget: $700–1,000`,
    generatedContent: `5,000 products with filters, sorting, and highlighting is exactly the use case Algolia is built for — and InstantSearch React makes the UI layer much less work than building it from scratch.

Algolia InstantSearch + React is a setup I know well. The indexing pipeline (keeping Algolia in sync with your database) is the part worth designing carefully — you don't want stale search results after a product update.

Here's the plan:
• Days 1–2 — Algolia index setup, initial product sync, indexing webhook for updates
• Days 3–4 — InstantSearch UI: search box, filters, sorting, hit highlighting
• Day 5 — Autocomplete, QA across filter combinations

I can have a prototype running today if you can share your product schema.`,
    tone: "CONVERSATIONAL",
    status: "WON",
  },
  {
    jobDescription: `We want to set up a Turborepo monorepo to share code between our Next.js web app, React Native mobile app, and Node.js API.

Shared packages needed: types/interfaces, utility functions, and validation schemas (Zod).

Budget: $400–600`,
    generatedContent: `Turborepo + pnpm workspaces for a web + mobile + API monorepo is a setup I've done 3 times this year. The shared Zod schemas across all three apps is actually the biggest win — one schema definition, consistent validation everywhere.

Here's the plan:
• Day 1 — Turborepo scaffold, pnpm workspace config, pipeline setup
• Day 2 — Shared packages: @repo/types, @repo/utils, @repo/schemas
• Day 3 — Import shared packages into all 3 apps, verify build pipeline

The React Native setup has one gotcha: Metro bundler needs a specific symlink configuration to resolve workspace packages. I'll handle that.`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We need a complete design system built in Figma for our SaaS product. Currently our designers and developers are working from different component sets and it's causing inconsistencies.

Deliverables: component library with auto-layout, design tokens, a typography system, and proper dev mode handoff.

Budget: $1,500–2,500`,
    generatedContent: `Inconsistency between design and dev is almost always a tokens problem — when there's no single source of truth for color, spacing, and typography, both sides drift.

A proper Figma design system — auto-layout, variables (not just styles), and dev mode handoff — is something I've built for 4 SaaS products. The variables feature in Figma is what makes tokens actually usable in dev mode now.

Here's the plan:
• Week 1 — Token library: color, spacing, typography, shadow as Figma variables
• Week 2 — Core components with auto-layout: buttons, inputs, cards, modals
• Week 3 — Compound components, documentation, dev mode annotation review

Can you share your current Figma file and your frontend's design token format? I'll align them from the start.`,
    tone: "PROFESSIONAL",
    status: "NO_RESPONSE",
  },
  {
    jobDescription: `We use Chart.js in our React app but want to migrate to Recharts. The main reason is better composability and TypeScript support.

About 8 chart types to migrate. No new charts — just like-for-like migration with Recharts.

Budget: $400–700`,
    generatedContent: `Chart.js to Recharts is mostly a 1:1 migration for standard chart types — the composable API is just more React-friendly.

The Recharts equivalents for your 8 chart types will map cleanly. The main differences to handle are: Recharts uses SVG containers differently, the tooltip and legend APIs are more declarative, and the responsive container wrapper replaces Chart.js's canvas sizing.

Here's the plan:
• Days 1–2 — Migrate 4 simpler charts (bar, line, pie, area), establish the pattern
• Days 3–4 — Remaining chart types, custom tooltips if needed
• Day 5 — Remove Chart.js dependency, visual QA against originals

Can you list the 8 chart types? That helps me flag any that might need custom work.`,
    tone: "CONVERSATIONAL",
    status: "REPLIED",
  },
  {
    jobDescription: `We want to migrate from Prisma ORM to Drizzle ORM for performance and bundle size reasons.

PostgreSQL database, about 25 models, ~150 queries across the codebase. TypeScript.

Budget: $1,200–1,800`,
    generatedContent: `Prisma to Drizzle is a real performance improvement at scale, but it's a larger API change than people expect — Drizzle's query builder is relational SQL, not Prisma's abstracted object API.

I've done both sides of this migration. The tricky part is the complex queries: nested selects, many-to-many relations, and transactions look quite different in Drizzle. Simple CRUD is fast, complex queries need careful translation.

Here's the plan:
• Week 1 — Drizzle schema from existing Prisma schema, migrate CRUD queries
• Week 2 — Complex queries, relations, raw SQL fallbacks where Drizzle's API doesn't map cleanly
• Week 3 — Transactions, migrations workflow, remove Prisma dependency

Can you share the most complex 5 queries in your codebase? I'll translate those first so we know the hardest problems upfront.`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `Need Playwright end-to-end tests written for our checkout flow. The flow has 6 steps: cart, shipping, billing, payment (Stripe), order confirmation, and email verification.

We want the tests to run in CI on every PR.

Budget: $600–900`,
    generatedContent: `Checkout flow E2E tests are the highest-value tests you can write — they protect the one flow that directly generates revenue.

Playwright with page objects is the right pattern for a 6-step flow — it keeps the test readable and makes maintenance when the UI changes much less painful. The Stripe payment step needs their test card numbers and a Stripe test mode check.

Here's the plan:
• Days 1–2 — Page objects for all 6 steps, happy path test end-to-end
• Days 3–4 — Error states: payment failure, invalid addresses, session expiry
• Day 5 — CI integration with GitHub Actions, parallelization for fast runs

Checkout E2E tests are actually my go-to demo — want to see a Loom of a similar test suite before we start?`,
    tone: "PROFESSIONAL",
    status: "WON",
  },
  {
    jobDescription: `We need PayPal added as an alternative payment method alongside our existing Stripe integration.

Our checkout is in React, backend is Node.js. We need PayPal standard checkout and PayPal Pay Later.

Budget: $500–800`,
    generatedContent: `PayPal's SDK is notoriously inconsistent — different behaviors across browsers, race conditions in the button initialization, and Pay Later eligibility that's not always predictable.

I've integrated PayPal alongside Stripe on 3 projects. The key is keeping the PayPal integration fully isolated from your Stripe flow so a PayPal SDK issue can't break your primary checkout.

Here's the plan:
• Days 1–2 — PayPal SDK setup, Orders API integration, standard checkout button
• Days 3–4 — Pay Later eligibility check, order capture and fulfillment
• Day 5 — Cross-browser QA (PayPal has known Safari quirks), error handling

What's your order fulfillment flow on the backend? That determines how the PayPal capture webhook integrates.`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We have a large React component tree with significant prop drilling — some props are passed 5–6 levels deep.

We want to refactor to use React Context API. About 12 components involved across 3 feature areas.

Budget: $400–700`,
    generatedContent: `5–6 levels of prop drilling is the textbook threshold where Context becomes worth the abstraction — and 12 components across 3 feature areas is a clean scope.

Context + useReducer for complex feature state is the pattern I use. The important thing is one context per feature area, not one giant global context that re-renders everything.

Here's the plan:
• Days 1–2 — 3 context providers for the 3 feature areas, move shared state up
• Days 3–4 — Remove prop drilling in 12 components, verify no missing re-renders
• Day 5 — Memoization where context causes unnecessary child updates

I can usually halve the prop chains in a refactor like this. Can you share the component tree?`,
    tone: "PROFESSIONAL",
    status: "NO_RESPONSE",
  },
  {
    jobDescription: `Our Next.js app has slow server-rendered pages — TTFB is around 800ms–1.2s on most routes. We want it under 200ms.

The app has both static and dynamic routes. We're on Vercel.

Budget: $600–900`,
    generatedContent: `800ms–1.2s TTFB on Vercel usually means one of two things: a heavy database query blocking the render, or a route that should be ISR being fully dynamic on every request.

ISR + Suspense streaming for the dynamic parts is how you get TTFB under 200ms without gutting your data fetching. The shell renders instantly, data streams in.

Here's the plan:
• Day 1 — Profile slowest routes, identify query bottlenecks vs. rendering bottlenecks
• Day 2 — Convert static-ish routes to ISR, add Suspense boundaries for dynamic data
• Day 3 — Verify TTFB improvements with Vercel Analytics, document the pattern

What's your current data fetching pattern — server components, API routes, or both?`,
    tone: "PROFESSIONAL",
    status: null,
  },
  {
    jobDescription: `We need Google Maps integrated into our React app with markers, directions, and a search autocomplete for address input.

This is for a delivery app — users enter a pickup and dropoff address, see the route on the map, and get a distance/time estimate.

Budget: $500–800`,
    generatedContent: `Pickup/dropoff with route visualization and estimates is a complete Maps integration — you'll need the Maps JS API for the map, Places API for autocomplete, and Directions API for the route.

I've built this exact pattern for a logistics app. The main thing to get right is the API key restriction (restrict by HTTP referrer in production to prevent key abuse) and the Directions API response parsing for distance/duration.

Here's the plan:
• Days 1–2 — Maps component with markers, Places autocomplete for both inputs
• Days 3–4 — Directions API route rendering, distance and time estimate display
• Day 5 — API key security, edge cases (no route found, out-of-range addresses)

Can you clarify the delivery radius? That determines whether you need any routing constraints.`,
    tone: "CONVERSATIONAL",
    status: "REPLIED",
  },
  {
    jobDescription: `We need to add multi-language support (English and Spanish) to our Next.js app. We have about 200 translation strings across 15 pages.

We want a clean setup the team can maintain — easy to add new strings and eventually new languages.

Budget: $500–800`,
    generatedContent: `200 strings across 15 pages is exactly the size where getting the i18n architecture right pays off — too small to justify a complex translation platform, large enough that an ad-hoc approach becomes a maintenance problem.

next-intl with locale routing is my default for Next.js — it works cleanly with the App Router, has no runtime overhead, and the message format is simple enough for non-developers to update translations.

Here's the plan:
• Days 1–2 — next-intl setup, locale routing, extract all strings from 15 pages
• Days 3–4 — Spanish translations, locale switcher component
• Day 5 — SEO metadata per locale, hreflang tags, QA on both languages

I'll structure the translation files so adding a third language later is a copy-paste of the Spanish file.`,
    tone: "PROFESSIONAL",
    status: "WON",
  },
];
