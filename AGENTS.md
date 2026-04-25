# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Ai Delicious Cafe (爱品味) — a 3-page landing site for a fusion cafe in Setapak, Kuala Lumpur. The site converts Google/Instagram visitors into walk-ins, reservations, and delivery orders.

## Tech Stack

- **Framework:** Astro (static generation, zero JS by default)
- **Styling:** Tailwind CSS with custom design tokens
- **Animations:** Framer Motion via React islands in Astro
- **Icons:** lucide-react
- **Forms:** Formspree (no backend)
- **Deployment:** Vercel (free tier)
- **Fonts:** Fraunces (headings), Inter (body), Noto Serif SC (Chinese brand accent only)

## Common Commands

```bash
npm create astro@latest -- --template minimal --typescript strict  # initial setup
npx astro add tailwind    # add Tailwind
npx astro add react       # add React integration
npm install framer-motion lucide-react
npm run dev               # local dev server
npm run build             # production build (output: dist/)
npm run preview           # preview production build locally
```

## Architecture

Three pages composed from section components:

- `src/pages/index.astro` — Home (hero, signature dishes, gallery, value props, reviews, location teaser)
- `src/pages/menu.astro` — Menu (category tabs, filterable card grid, order CTAs)
- `src/pages/about.astro` — About & Contact (story, gallery, map, contact form, socials)

Key directories:
- `src/components/` — reusable UI (Button, Navbar, Footer, WhatsAppFloat, MenuTabs.tsx, MenuGrid.tsx, ContactForm.tsx)
- `src/sections/` — page-specific sections (Hero, SignatureDishes, Gallery, etc.)
- `src/layouts/` — BaseLayout.astro (meta tags, fonts, global CSS, JSON-LD schema)
- `src/data/` — menu.json, reviews.json, site.json (business info)
- `src/assets/images/` — organized into `interior/`, `food/`, `logo/`

React islands (`.tsx`) are used only where interactivity is needed: MenuTabs, MenuGrid, ContactForm, navbar scroll effect.

## Design Tokens

| Token | Hex |
|-------|-----|
| cream (background) | `#FAF6F0` |
| charcoal (text) | `#2B2420` |
| gold (accent) | `#B08D57` |
| sage (accent) | `#8FA68E` |
| taupe (muted) | `#A89885` |

## Critical Rules

- **Language policy:** ALL content in English. Chinese `爱品味` appears ONLY as decorative brand accent in: logo, hero brand line (`爱品味 · SINCE 2019`), and footer tagline. Never translate headings, menu items, descriptions, form labels, or body copy into Chinese.
- **Animation discipline:** All animations under 600ms. Respect `prefers-reduced-motion`. Use `easeOut` for entries, `easeInOut` for hovers. Keep it tasteful — cafe brand, not SaaS.
- **Mobile-first:** Most traffic is mobile on Malaysian 4G networks. Test at 375px, 768px, 1440px. No parallax on mobile.
- **Don't over-engineer:** This is a 3-page static site. No CMS, no i18n, no server-side logic.
- **Commit convention:** Commit per phase with format `feat(phase-N): description`

## Environment Variables

- `PUBLIC_WHATSAPP_NUMBER` — WhatsApp business number
- `PUBLIC_FORMSPREE_ID` — Formspree form endpoint

## Reference Images

The `images/` directory at project root contains 20 reference photos (interior shots, food, ambiance) from the cafe for use during development.
