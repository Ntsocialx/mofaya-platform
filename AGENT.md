# AGENT.md - Developer Personas, Tooling & Execution Strategy

## Execution Personas & Behaviors
- **Karpathy Style:** Direct, first-principles clarity, concise code blocks, no unnecessary abstractions.
- **Caveman Style:** Cut fluffy commentary and logs. Direct, concrete, punchy explanations.
- **Grill Me Mode:** Proactively highlight potential edge cases, mobile performance bottlenecks with GSAP ScrollTrigger, or layout shifts.
- **Impeccable & Ponytail:** Pixel-perfect alignment matching the Figma blueprint, smooth 60fps animations, zero layout jitter.

## Context & Tooling Protocols
- **Context7:** Ensure all code snippets include complete imports and zero uninstalled dependencies.
- **Playwright:** Write E2E test suites for validating recruitment form submission and cookie banner toggles.
- **Language Server:** Guarantee 0 TypeScript strict errors (`tsc --noEmit`).
- **Figma:** Maintain strict adherence to design tokens and spacing from the Figma reference layout.

## Scope Definitions
- **IN SCOPE:** Monorepo setup (`client` & `server`), Next.js client, Express form controller, GSAP pinned scroll animations, official mofaya.co.za image integration, responsive dark theme styling, and About Us section (featuring founder Tyrone Marhungani, DJ Sbu, and lead developer Tiyani Nkuna).
- **OUT OF SCOPE:** Payment gateways, checkout carts, or custom database authentication.

---

## Project Map
```
client/   Next.js 15 App Router + Tailwind 3 + GSAP ScrollTrigger   → http://localhost:3000
server/   Express + TypeScript, validates and proxies to Google Form → http://localhost:4000
```

## Commands
```bash
npm install                          # root, installs both workspaces
npm run dev:server                   # terminal 1
npm run dev:client                   # terminal 2
npm run typecheck                    # tsc --noEmit in client and server
npx playwright install chromium      # once
npm run test:e2e                     # Playwright suite (client/e2e)
```
Env: copy `server/.env.example` → `server/.env`, `client/.env.example` → `client/.env.local`.

## Hard Rules
- **Assets:** only official `mofaya.co.za` URLs, declared once in `client/src/lib/mofayaData.ts`. No stock or placeholders. `CanImage` draws a CSS can in the flavour colours if a remote image fails — never a substitute photo.
- **Tokens:** `obsidian #0A0A0C`, `flame #FF3E00`, `ember #E60000`, `gold #C9A13B`, `ash #DCDCDC` in `client/tailwind.config.ts`. Use tokens, not raw hex, in components (flavour gradients excepted — they live in `mofayaData.ts`).
- **Look of mofaya.co.za:** Montserrat Black caps headlines + one Permanent Marker `.brush` accent word; black header bar with red glow; sharp-cornered caps buttons (`.btn-outline`, `.btn-flame`); dark sections on the official brush-chevron wallpaper (`.brush-wallpaper`), one light `ash` band; `.pattern-strip` (official geometric pattern) between sections; photos in the site's own skewed card cut-outs.
- **Tailwind config changes** need a dev-server restart (`rm -rf client/.next`), or new tokens silently don't compile.
- **Flavours:** edit only `FLAVORS` in `mofayaData.ts`. The scroll timeline derives its length, labels, gradients and copy from that array.
- **Brand facts:** story copy must be verifiable on mofaya.co.za. Don't invent dates, figures or quotes.
- **Form pipeline:** client → `POST /api/recruitment` → `formController` validates → `POST application/x-www-form-urlencoded` to `GOOGLE_FORM_ACTION_URL` with `entry.{FIELD_ID}` keys from `GOOGLE_FORM_ENTRY_*`. Unconfigured → logs and replies `forwarded: false`.
- **POPIA:** consent checkbox is mandatory; server rejects without it.

## Grill-Me Checklist (GSAP / mobile)
- Pinned section uses `100svh`, not `100vh`, so mobile URL-bar resize doesn't jump the pin.
- Only `transform`/`opacity`/`visibility` are animated; no layout properties in the timeline.
- All five cans are stacked in one grid cell and preloaded — swapping `src` mid-scrub would flash.
- `ScrollTrigger` is created inside `useGSAP` so it's reverted on unmount / Fast Refresh.
- Reduced motion: snapping disabled and float/flicker keyframes off.
