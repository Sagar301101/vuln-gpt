# VulnShields — Marketing Site + Dashboard

Production-ready front end for **VulnShields**, built from the design handoff.

**Stack:** Vite · React 18 · TypeScript · Chakra UI v2 · Framer Motion · Lucide · React Router v6.

## Run it

> ⚠️ This machine's `npm` is a corporate policy wrapper (`gmailco WHITELIST mode`) that only allows the internal proxy, which 403s public packages. Install/build on an **unrestricted machine or CI**, or have the packages whitelisted on the proxy.

```bash
cd app
npm install        # needs access to the public npm registry
npm run dev        # local dev server (Vite) → http://localhost:5173
npm run build      # type-check (tsc -b) + production build → dist/
npm run preview    # serve the production build locally
```

A project-local `.npmrc` pins the public registry (`registry.npmjs.org`). Remove it if your environment uses a different approved registry.

## Deploy (Vercel)

Vite SPA. On Vercel: framework preset **Vite**, build command `npm run build`, output dir `dist`.
Because routing is client-side (React Router), add a rewrite so deep links resolve:

```json
// vercel.json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

## Structure

```
app/
├── public/fonts/            Brand fonts (Nexa, Roboto) — loaded via @font-face
├── index.html               SEO meta, favicon, theme-color
├── .env.example             VITE_DEMO_SHEET_ENDPOINT — copy to .env and fill in
└── src/
    ├── main.tsx             ChakraProvider + ColorModeScript(dark) + RouterProvider
    ├── theme.ts             Design tokens: colors, gradients, radii, layout, component variants
    ├── router.tsx           Routes: / (Home), /blog, /blog/:slug, * (NotFound), /dashboard/* (authenticated area)
    ├── vite-env.d.ts        Vite client types + VITE_DEMO_SHEET_ENDPOINT typing
    ├── index.css            @font-face + keyframes + reduced-motion
    ├── data/                Typed constants (products, pricing, services, faqs, site)
    ├── hooks/               useDemoModal, useHeroVisible, useCountUp, useInView
    ├── lib/                 submitDemoRequest.ts — posts to the SheetDB endpoint
    ├── components/
    │   ├── Logo.tsx         Brand mark (SVG preserved exactly)
    │   ├── layout/          Nav, PromoBanner, Footer, Section, AmbientBg, AnimatedGradientBg, Reveal, RootLayout
    │   ├── ui/              Shared primitives (Eyebrow, SectionHeading, Chip, CheckRow, IconTile…)
    │   ├── demo/            DemoModal — the shared "Schedule a free demo call" form
    │   └── dashboard/       DashCard, DataTable, StatusPill, KpiCard, charts, avatars
    ├── sections/            Homepage sections (Hero, Products, Resources, About, Services, Process, Pricing, Faq, TrustStats, CtaBand)
    └── pages/
        ├── Home / BlogPage / BlogPostPage / NotFound
        └── dashboard/       DashboardLayout + Overview, Projects, Scans, ApiKeys, Team, Settings, Billing
```

## Demo form → SheetDB

The "Schedule a free demo call" modal (`src/components/demo/DemoModal.tsx`) validates the
form (name, work email, company, phone) then posts to a [SheetDB](https://sheetdb.io) API
backed by a Google Sheet, via `submitDemoRequest.ts`. The endpoint defaults to the shared
VulnShields sheet and can be overridden with `VITE_DEMO_SHEET_ENDPOINT` in `.env`.

On success the form shows a toast ("Thanks! We'll contact you shortly."), closes the modal,
and clears the form. On failure it shows an inline error and keeps the modal open so the
user can retry.

The Google Sheet behind the SheetDB endpoint has a header row matching the payload:
`Name | Email | Phone Number | Company | What you need`.

## Notes

- **Interactive pieces** (product demo panels, dashboard charts) are front-end illustrations — no backend calls.
- Dashboard is a demo of the authenticated area (route `/dashboard`); it has no auth gate yet — add your auth/route guard before shipping. There is no nav link to it (the "Log in" nav button was removed) — link to it from wherever your auth flow lands users.
- All colors/spacing come from `theme.ts`. Prefer theme tokens over inline hex when extending.
