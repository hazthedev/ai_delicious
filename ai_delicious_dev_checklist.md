# Ai Delicious Cafe Landing Page — Development Checklist

> Project brief: Build a 3-page landing site for Ai Delicious Cafe (爱品味), a cozy fusion cafe in Setapak, Kuala Lumpur. Tech stack: Astro + Tailwind CSS + Framer Motion (via React islands) + Vercel deployment. Brand is warm/boutique with cream/gold/sage palette. Target audience: young professionals, couples, families in the Setapak/Wangsa Maju area. Site must be mobile-first (most traffic is mobile), fast on 4G, and highly visual.
>
> **Language policy: ALL CONTENT IN ENGLISH BY DEFAULT.** Chinese characters (爱品味) are used only as a visual/brand accent in specific places — the logo, hero subtitle, and footer tagline. Do NOT translate menu items, descriptions, section headings, or body copy into Chinese. No bilingual toggle. No dual-language paragraphs. English only for all readable content, with Chinese treated as decorative branding that reinforces the cafe's identity.

---

## Phase 0 — Project Setup

- [ ] Initialize Astro project: `npm create astro@latest -- --template minimal --typescript strict`
- [ ] Install Tailwind CSS: `npx astro add tailwind`
- [ ] Install React integration for Framer Motion islands: `npx astro add react`
- [ ] Install Framer Motion: `npm install framer-motion`
- [ ] Install lucide-react for icons: `npm install lucide-react`
- [ ] Configure `tailwind.config.mjs` with custom design tokens (see Phase 1)
- [ ] Set up Git repo, add `.gitignore`, initial commit
- [ ] Create folder structure:
  ```
  src/
    components/     # reusable UI (Button, Card, Navbar, Footer)
    sections/       # page-specific sections (Hero, Menu, Gallery)
    layouts/        # BaseLayout.astro
    pages/          # index.astro, menu.astro, about.astro
    styles/         # global.css
    assets/
      images/
        interior/
        food/
        logo/
    data/           # menu.json, reviews.json
  public/
    fonts/
  ```
- [ ] Add `@fontsource/fraunces`, `@fontsource/inter`, `@fontsource/noto-serif-sc` and import in BaseLayout
- [ ] Create `.env.example` with `PUBLIC_WHATSAPP_NUMBER`, `PUBLIC_FORMSPREE_ID`

---

## Phase 1 — Design System & Base Layout

- [ ] Extend Tailwind theme with custom colors:
  - `cream: #FAF6F0`
  - `charcoal: #2B2420`
  - `gold: #B08D57`
  - `sage: #8FA68E`
  - `taupe: #A89885`
- [ ] Extend Tailwind theme with custom fonts:
  - `font-display: Fraunces` (headings)
  - `font-body: Inter` (body)
  - `font-zh: Noto Serif SC` (for the 爱品味 brand accent only — hero, footer)
- [ ] Add custom Tailwind animations: `fade-up`, `fade-in`, `pulse-soft`
- [ ] Create `BaseLayout.astro` with:
  - HTML lang="en"
  - Meta tags (title, description, viewport, OG, Twitter card)
  - Font preloading
  - Global CSS reset
  - Slot for page content
- [ ] Create reusable components:
  - [ ] `Button.astro` — primary (gold filled) + secondary (gold outline) variants
  - [ ] `Container.astro` — max-w-7xl mx-auto px-4 wrapper
  - [ ] `SectionHeading.astro` — serif heading + optional Chinese subtitle
- [ ] Create `Navbar.astro`:
  - Logo left, nav links right (Home, Menu, About, Location)
  - Mobile: hamburger menu with slide-in drawer
  - Desktop: WhatsApp button as accent CTA
  - Scroll-triggered backdrop blur (use React island + Framer Motion)
- [ ] Create `Footer.astro`:
  - 3 columns: contact info, hours, socials
  - Tagline: "爱品味 — Made with love in Setapak."
  - Copyright line
- [ ] Create `WhatsAppFloat.astro` — fixed bottom-right WhatsApp button with gentle pulse (4s interval)
- [ ] Verify responsiveness at 375px, 768px, 1440px

---

## Phase 2 — Data Files

- [ ] Create `src/data/menu.json` with structure:
  ```json
  [
    {
      "category": "Pasta",
      "items": [
        {
          "name": "Creamy Carbonara",
          "description": "Rich cream sauce, crispy bacon, fresh herbs",
          "price": 18.90,
          "image": "/images/food/carbonara.jpg",
          "tags": ["halal", "popular"]
        }
      ]
    }
  ]
  ```
  - Categories: Mains, Pasta, Rice Bowls, Waffles, Desserts, Drinks
  - Add 4-6 placeholder items per category (to be replaced with real menu)
- [ ] Create `src/data/reviews.json` with 3 standout Google reviews (use real ones from their listing)
- [ ] Create `src/data/site.json` with:
  - Business name, tagline, address, phone, WhatsApp, hours, socials, Google Maps embed URL

---

## Phase 3 — Home Page (`/`)

- [ ] **Hero section** (`src/sections/Hero.astro`):
  - Full-width interior image as background (use the greenery-ceiling shot)
  - Dark overlay (rgba 0,0,0,0.3) for text legibility
  - Brand accent line: `爱品味 · SINCE 2019` (decorative only — small, gold color, above main headline)
  - Main headline: `Cozy comfort, served daily in Setapak.`
  - Subtext: "Where friends catch up, couples unwind, and every plate tells a story."
  - Two CTAs: "View Menu" (primary gold) + "WhatsApp Us" (outline)
  - Framer Motion: fade-up stagger on load (80ms between each element)
- [ ] **Signature Dishes section** (`src/sections/SignatureDishes.astro`):
  - Intro: "Loved by 1,100+ diners. These are the ones they keep coming back for."
  - 3-card grid (desktop) / carousel (mobile)
  - Cards: dish image, name (English), one-line description
  - Hover: scale 1.02 + image zoom 1.05 (300ms easeOut)
- [ ] **Ambiance Gallery section** (`src/sections/Gallery.astro`):
  - Asymmetric 4-image grid (use interior shots: curtained booths, greenery ceiling, full dining area, bar/kitchen)
  - Each image: fade-in on scroll intersection
  - Click image → lightbox (use a lightweight lib like `yet-another-react-lightbox` or build simple custom)
- [ ] **Value Props section** (`src/sections/ValueProps.astro`):
  - 3 columns with icons (lucide-react)
  - Halal Muslim-friendly / Since 2019 / Dine-in & Delivery
- [ ] **Reviews section** (`src/sections/Reviews.astro`):
  - Heading: "4.8 / 5 from 1,185+ diners on Google"
  - 3 review cards with star rating, quote, reviewer name
  - Subtle fade-up on scroll
- [ ] **Location teaser** (`src/sections/LocationTeaser.astro`):
  - Static map preview (Google Static Maps API or screenshot)
  - Hours summary
  - "Get Directions" button → opens Google Maps
- [ ] Wire `pages/index.astro` to compose all sections + Navbar + Footer + WhatsAppFloat
- [ ] Add SEO meta for home page (title, description, OG image)

---

## Phase 4 — Menu Page (`/menu`)

- [ ] **Menu Hero** (`src/sections/MenuHero.astro`):
  - Smaller hero with food collage background
  - Headline: "Our Menu"
  - Subtext: "Fresh, made-to-order, and Halal Muslim-friendly."
- [ ] **Category tabs** (`src/components/MenuTabs.tsx` — React island):
  - Sticky below navbar
  - Tabs: All, Mains, Pasta, Rice Bowls, Waffles, Desserts, Drinks
  - Active tab: animated underline (Framer Motion `layoutId`)
  - Filter grid below based on selection
- [ ] **Filter chips** (optional): Halal ✓, Vegetarian, Popular, New — multi-select
- [ ] **Menu grid** (`src/components/MenuGrid.tsx`):
  - Responsive: 1 col mobile, 2 col tablet, 3 col desktop
  - Card: image (4:3 ratio), name (English), description, price (right-aligned, bold)
  - Tags as small pills (halal, popular, etc.)
  - Hover: lift + shadow
  - Fade-up on scroll into view (stagger children)
- [ ] **Order CTA block** (bottom of menu):
  - "Ready to order?" heading
  - Buttons: WhatsApp (pre-filled message), FoodPanda link, GrabFood link
- [ ] Add SEO meta for menu page

---

## Phase 5 — About & Contact Page (`/about`)

- [ ] **Story section** (`src/sections/Story.astro`):
  - 2-column: text left, image right (or stacked on mobile)
  - Heading: "Our Story"
  - 3-paragraph narrative (placeholder, owner to edit):
    - Opening in 2019
    - Fusion food philosophy
    - Why Setapak
- [ ] **The Space section**:
  - Full-bleed gallery carousel of interior shots
  - Captions optional
- [ ] **Visit Us section** (`src/sections/Visit.astro`):
  - 2-column: Google Maps embed left, details right
  - Details: full address, phone, WhatsApp, hours (per day), parking note
  - "Get Directions" CTA
- [ ] **Contact form** (`src/components/ContactForm.tsx`):
  - Fields: Name, Phone/Email, Message, optional Reservation Date (date picker)
  - Submit via Formspree (env var for endpoint)
  - Validation (required name + phone/email + message)
  - Success state: button morphs to checkmark, message appears
  - Error state: inline error messages
- [ ] **Social section**:
  - 3 large social cards (Instagram, Facebook, TikTok)
  - Hover: color fill transition
- [ ] Add SEO meta for about page

---

## Phase 6 — Animations Polish (Framer Motion)

- [ ] Wrap scroll-triggered elements in `motion.div` with `whileInView` + `viewport={{ once: true, margin: "-50px" }}`
- [ ] Hero stagger: parent variant with `staggerChildren: 0.08`
- [ ] Navbar scroll effect: `useScroll` hook, fade in blur + shadow after 80px
- [ ] Menu tab underline: `layoutId="activeTab"` on the active underline
- [ ] Respect `prefers-reduced-motion`: use `useReducedMotion()` hook, disable all motion variants if true
- [ ] Cap all durations at 600ms
- [ ] Test on slow 3G throttling — no layout shift, no lag

---

## Phase 7 — Images & Assets

- [ ] Collect all client photos into `src/assets/images/`
- [ ] Organize: `interior/`, `food/`, `logo/`
- [ ] Use Astro `<Image>` component for all photos (auto WebP, lazy load, responsive srcset)
- [ ] For hero image: use `<Picture>` with art-directed crops (mobile vs desktop)
- [ ] Add `alt` text for every image (accessibility + SEO)
- [ ] Create OG image (1200x630) — use their logo + signature dish
- [ ] Create favicon set (16x16, 32x32, apple-touch-icon 180x180)

---

## Phase 8 — SEO & Meta

- [ ] Per-page meta titles and descriptions (see plan doc Section 6)
- [ ] Open Graph tags (og:title, og:description, og:image, og:url, og:type=restaurant)
- [ ] Twitter card tags
- [ ] Canonical URL per page
- [ ] Add JSON-LD Restaurant schema in BaseLayout:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Ai Delicious Cafe",
    "alternateName": "爱品味",
    "address": {...},
    "telephone": "...",
    "openingHoursSpecification": [...],
    "priceRange": "$$",
    "servesCuisine": ["Asian Fusion", "Western"],
    "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "1185"}
  }
  ```
- [ ] Create `robots.txt` — allow all
- [ ] Generate `sitemap.xml` — use `@astrojs/sitemap` integration

---

## Phase 9 — Performance & Accessibility

- [ ] Run Lighthouse audit — target 95+ on all 4 categories
- [ ] All images lazy-loaded except hero
- [ ] Inline critical CSS (Astro does this by default)
- [ ] Font display: swap
- [ ] Test keyboard navigation on all interactive elements
- [ ] Verify color contrast ratios (WCAG AA minimum)
- [ ] Add `aria-label` to icon-only buttons (WhatsApp float, hamburger, social icons)
- [ ] Verify focus states are visible on all clickable elements
- [ ] Test with screen reader (VoiceOver / NVDA) — nav + forms should be usable

---

## Phase 10 — Deployment

- [ ] Create `vercel.json` if custom config needed (redirects, headers)
- [ ] Push to GitHub repo
- [ ] Connect repo to Vercel, configure build: `npm run build`, output: `dist/`
- [ ] Set environment variables in Vercel dashboard (WhatsApp number, Formspree ID)
- [ ] Test deployed preview URL on real mobile device (not just emulator)
- [ ] Configure custom domain (once client purchases) — add DNS records
- [ ] Enable Vercel Analytics (free tier)
- [ ] Set up simple uptime monitoring (UptimeRobot free tier)

---

## Phase 11 — QA Before Handoff

- [ ] Test on real iPhone Safari
- [ ] Test on real Android Chrome
- [ ] Test on desktop Chrome, Firefox, Safari
- [ ] Verify WhatsApp button opens correct chat with pre-filled message
- [ ] Verify contact form actually sends email to client
- [ ] Verify Google Maps embed loads correctly
- [ ] Verify all external links open in new tab (`target="_blank" rel="noopener"`)
- [ ] Proofread all copy — no typos, no placeholder text left
- [ ] Verify all dish photos have correct prices
- [ ] Click every link on every page
- [ ] Test 404 page exists and has navigation back
- [ ] Verify site loads fine with slow 3G throttling

---

## Phase 12 — Handoff

- [ ] Write simple README.md for client:
  - How to request a change (email/WhatsApp you)
  - Their domain renewal date + where it's registered
  - Monthly maintenance retainer scope
- [ ] Send client:
  - Live URL
  - Summary of what's on each page
  - 2-3 screenshots showing off the design
  - Invoice for remaining balance
- [ ] Archive project files, tag v1.0.0 in Git
- [ ] Add to your portfolio site as a case study

---

## Notes for Claude Code

- Before starting each phase, read the previous phase's output to maintain context
- Commit after each phase with clear message: `feat(phase-3): home page sections`
- If stuck on a design decision, default to the mood described in the plan: warm, boutique, tasteful animations
- Don't over-engineer — this is a 3-page static site, not a SaaS product
- Ask for clarification if any phase step is ambiguous
- Placeholder images: use Unsplash cafe/food photos with attribution until real assets are in
- **Language rule (strict): All readable content in English. The only Chinese that appears anywhere on the site is the brand mark `爱品味` used as a decorative accent — in the logo, hero brand line, and footer tagline. Never translate section headings, menu descriptions, form labels, alt text, or body copy. If tempted to add Chinese for "authenticity," don't — stick to English.**
