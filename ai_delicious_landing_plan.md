# Ai Delicious Cafe — Landing Page MVP Plan

A 3-page landing site designed to convert Google searchers and Instagram visitors into walk-ins, reservations, and delivery orders.

---

## 1. Brand Audit (what I observed)

**Identity:** 爱品味 Ai Delicious Cafe · Since 2019 · Setapak, Kuala Lumpur

**Visual DNA:**
- Interior: bright, airy, greenery-draped ceiling grid, curtained booths, white + wood tones
- Logo: marble texture with gold/bronze ring, chopsticks, bilingual English + Chinese (爱品味)
- Food: fusion — Western mains (pasta, chicken chop), Asian bowls, indulgent waffles & desserts
- Audience: young professionals, couples, families, Chinese-speaking crowd, Muslim-friendly

**Emotional positioning:** *"A cozy escape in Setapak where comfort meets flavor — since 2019."*

---

## 2. Design Direction

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background | Warm Cream | `#FAF6F0` |
| Primary Text | Deep Charcoal | `#2B2420` |
| Accent — Gold | Bronze Gold | `#B08D57` |
| Accent — Soft | Sage Green (greenery nod) | `#8FA68E` |
| Surface | Pure White | `#FFFFFF` |
| Muted | Warm Taupe | `#A89885` |

### Typography

- **Display / Headings:** `Fraunces` (serif, elegant, pairs with their script logo)
- **Body:** `Inter` (clean, mobile-friendly, readable)
- **Chinese characters:** `Noto Serif SC` (complements Fraunces)

All via Google Fonts — free, fast, licensed for commercial.

### Mood

Warm · Inviting · Boutique · Modern-traditional · Bilingual · Instagrammable

---

## 3. Tech Stack

### Recommended Stack (for this MVP)

| Layer | Tool | Why |
|-------|------|-----|
| Framework | **Astro** | Fastest for content sites, zero JS by default, ships minimal bundles |
| Styling | **Tailwind CSS** | Rapid iteration, consistent design tokens |
| Animations | **Framer Motion** (via React islands in Astro) or **Motion One** | Framer Motion for rich interactions; Motion One if you want lighter weight |
| Deployment | **Vercel** or **Cloudflare Pages** | Free tier, instant deploys, global CDN |
| Forms (contact / reservation) | **Formspree** or **Web3Forms** | Free tier, no backend needed |
| Analytics | **Plausible** or **Umami (self-hosted)** | Privacy-friendly, lightweight |
| Images | **Astro Image** component + WebP | Auto-optimize, lazy load |

### Why Astro over Next.js for this project
- Content-heavy, near-zero interactivity — Astro ships ~0kb JS on most pages
- Faster Lighthouse scores (important for SEO + Malaysian mobile networks)
- Simpler mental model for landing-page work
- You can still drop in React components (including Framer Motion) via islands where needed

### Alternative stack (if you want one codebase across future clients)
- **Next.js 15 + App Router + Tailwind + Framer Motion** deployed to Vercel
- Slightly heavier but more familiar if you plan to add dashboards/CMS later

---

## 4. Page Architecture

### Page 1 — Home

**Section breakdown (top to bottom):**

1. **Sticky navbar** — logo left, links right (Home · Menu · About · Location) · WhatsApp button accent
2. **Hero section**
   - Full-width image: interior shot (greenery ceiling)
   - Overlay: `爱品味` subtitle + `Cozy comfort, served daily in Setapak` headline
   - Two CTAs: "View Menu" (primary gold) + "WhatsApp Us" (secondary outline)
3. **Signature Dishes strip** (3-card row)
   - Chicken Chop · Creamy Pasta · Oreo Waffle
   - Hover: slight lift + image zoom
4. **Ambiance gallery** — 4-image asymmetric grid, subtle parallax on scroll
5. **Why visitors love us** — 3 value props with icons
   - Halal Muslim-friendly · Since 2019 · Dine-in & Delivery
6. **Reviews block** — 3 selected Google reviews, rating stars, "4.8 / 5 from 1,185+ diners"
7. **Location + hours teaser** — map preview + hours + "Get Directions" button
8. **Footer** — socials, hours, phone, delivery platform links

### Page 2 — Menu

- **Category tabs** (sticky): All · Mains · Pasta · Rice Bowls · Waffles · Desserts · Drinks
- **Card grid** — dish photo, name (EN + 中文), short description, price
- **Filter chips**: Halal ✓ · Vegetarian · Popular · New
- **Floating WhatsApp button** — "Order via WhatsApp" (opens pre-filled message)
- **Order platform buttons** — FoodPanda, GrabFood (monetize both direct + delivery)

### Page 3 — About & Contact

- **Our Story** — short narrative: "Since 2019, 爱品味 has been…"
- **The Space** — gallery of interior shots, full-bleed
- **Visit Us** — embedded Google Maps, address, hours, parking note
- **Contact form** — name, phone, message (optional reservation date picker)
- **WhatsApp quick-chat** — primary CTA
- **Social links** — Instagram, Facebook, TikTok

---

## 5. Animation Plan (Framer Motion)

Keep it tasteful — cafe brand, not a SaaS product. Rules:
- **All animations under 600ms**
- **Respect `prefers-reduced-motion`** — disable for accessibility
- **Easing:** `easeOut` for entries, `easeInOut` for hovers

### Specific animations

| Element | Animation | Detail |
|---------|-----------|--------|
| Hero text | Fade up + stagger on load | headline, sub, CTAs cascade (80ms stagger) |
| Navbar on scroll | Background blur + shadow fade in | after 80px scroll |
| Dish cards | Fade up on scroll into view | `whileInView` + `viewport={{ once: true }}` |
| Dish card hover | Scale 1.02 + image zoom 1.05 | 300ms easeOut |
| Gallery images | Lazy fade in on intersection | no parallax on mobile (performance) |
| Section transitions | Soft fade between page routes | Astro view transitions (free, no lib needed) |
| WhatsApp floating button | Gentle pulse every 4s | subtle, not annoying |

### Micro-interactions
- Menu category tab change: underline slides
- Gallery image click: lightbox with crossfade
- Form submit: button morphs to checkmark on success

---

## 6. Copywriting

### Tone of voice
Warm · Confident · Bilingual-aware · Not corporate · Short sentences

### Sample copy

**Hero headline:**
> Cozy comfort, served daily in Setapak.
> *温馨美味，每一口都是回家的感觉。*

**Hero subline:**
> Since 2019, Ai Delicious Cafe has been Setapak's quiet favorite — where friends catch up, couples unwind, and every plate tells a story.

**Signature dishes intro:**
> Loved by 1,100+ diners. These are the ones they keep coming back for.

**About section opener:**
> We opened in 2019 with a simple idea: great food shouldn't feel rushed. Pull back the curtain, take a seat, and stay a while.

**Footer tagline:**
> 爱品味 — Made with love in Setapak. See you soon.

**WhatsApp CTA:**
> Chat with us on WhatsApp — we usually reply in minutes.

### SEO essentials
- **Meta title:** `Ai Delicious Cafe Setapak | Cozy Dining Since 2019 | 爱品味`
- **Meta description:** `Halal Muslim-friendly cafe in Setapak serving Western mains, pasta, rice bowls & signature waffles. Rated 4.8/5 by 1,100+ diners. Dine-in & delivery.`
- **Structured data:** Restaurant schema (name, address, phone, hours, price range, menu URL, aggregateRating)
- **Open Graph tags:** for shareable previews on WhatsApp/FB/IG

---

## 7. Content Needed From The Client

Before building, ask the owner for:

1. High-res photos of 8-10 signature dishes (they likely have these on IG)
2. Their menu — full list with prices (physical menu photo is fine)
3. Opening hours (including PH closures)
4. WhatsApp business number
5. Any existing logo files (PNG / vector ideal)
6. 2-3 sentences about their story — "why we started"
7. Permission to use their Google review screenshots
8. Social media handles to link to

If they don't have time to provide these, I can extract 80% of it from their IG and Google Maps listing and have them just approve.

---

## 8. Build Timeline (MVP)

| Day | Deliverable |
|-----|-------------|
| 1 | Astro project setup, Tailwind config, design tokens, fonts loaded |
| 2 | Home page — hero, signature dishes, ambiance gallery |
| 3 | Home page — reviews, location, footer · Menu page skeleton |
| 4 | Menu page complete · About page complete |
| 5 | Framer Motion animations · responsive polish · image optimization |
| 6 | SEO meta, OG tags, structured data, form integration |
| 7 | QA on real devices · deploy to Vercel · hand off |

Realistic for a solo dev working evenings: **10-14 days**.

---

## 9. What Makes This A Good MVP (not over-engineered)

✅ 3 pages only — enough to be a real site, not so much that it drags
✅ Static generation — no server costs, fast
✅ Free hosting (Vercel) — zero infrastructure headache
✅ Form handled externally (Formspree) — no backend to maintain
✅ No CMS — content is rare to change; edits happen in code
✅ Single language (English) with Chinese accents for authenticity — full bilingual i18n is a Phase 2 upsell

---

## 10. Upsell Paths After MVP (for your recurring revenue)

- **Online ordering system** — integrate StoreHub / beepit / Deliverect (+RM1,500)
- **Reservation system** — Chope or custom booking form (+RM800)
- **Full bilingual EN/ZH toggle** — (+RM1,200)
- **Monthly maintenance retainer** — updates, new photos, menu changes (RM150/month)
- **SEO + Google My Business optimization** — (RM500 one-off + monthly)
- **Gift voucher / loyalty card integration** — (+RM1,500)

---

## Proposed Pricing For This Project

| Item | Price (RM) |
|------|-----------|
| 3-page landing site (MVP) | 2,800 |
| Domain registration (.com, 1 year) | 60 |
| Hosting setup (Vercel free tier) | 0 |
| Professional email setup (Google Workspace, 1 user) | 120 (first year) |
| **One-time total** | **~3,000** |
| Monthly maintenance retainer (optional) | 150/month |

For a first-client discount with permission to use as portfolio, offer **RM2,200** instead of 2,800.

---

## Next Steps

1. Show this plan to the owner — even if they say no, you get feedback
2. If they approve: collect the content listed in Section 7
3. I can build the actual MVP as HTML artifact for your portfolio *before* you pitch — so you walk in with a visible mockup of their site
