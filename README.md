# Viva Yoga con Connie

Bilingual (ES/EN) website for Viva Yoga with Connie — Vinyasa & beach yoga on the Costa del Sol.

**Stack:** Astro 4 (static site) + Sanity (headless CMS) + Cloudflare Pages (hosting) + Tailwind CSS

## Architecture

```
vivayoga-connie-prod/
├── src/                     # Astro site source
│   ├── pages/
│   │   ├── index.astro      # Spanish homepage
│   │   └── en/index.astro   # English homepage
│   ├── components/          # Astro components (Nav, Hero, About, etc.)
│   ├── layouts/             # Base layout
│   ├── lib/
│   │   ├── sanity.ts        # Sanity client
│   │   ├── content.ts        # Fetch with Sanity → fallback
│   │   └── fallback.ts      # v3.1 hardcoded content (works without Sanity)
│   └── styles/global.css
├── studio/                  # Sanity Studio (where Connie edits content)
│   ├── schemas/             # All editable content types
│   ├── sanity.config.ts
│   └── sanity.cli.ts
├── scripts/
│   └── seed-sanity.mjs      # Push v3.1 content into Sanity as a starting point
├── public/                  # Static assets (favicon, etc.)
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── wrangler.toml            # Cloudflare Pages config
├── .env.example
└── package.json
```

## How it works

- **Content flow**: `pages/index.astro` calls `getContent('es')` → tries Sanity first → if empty or env not set, falls back to `fallback.ts` (the v3.1 content).
- **Bilingual**: Astro's built-in i18n. `/` = Spanish, `/en/` = English. Single layout, two page entry points.
- **Editing**: Connie goes to the deployed Sanity Studio URL, logs in, edits content (text, schedule, pricing, gallery, contact). Publishes. The next Cloudflare deploy (or revalidation) picks up the change.
- **Parallax + scrolly cards**: preserved from v3.1 via CSS `background-attachment: fixed` on desktop.

## Setup (one-time, ~20 min)

### 1. Install deps

```bash
cd vivayoga-connie-prod
npm install
cd studio && npm install && cd ..
```

### 2. Create a free Sanity project

1. Go to https://www.sanity.io/manage and create a free account.
2. Create a new project. Note the **Project ID** (e.g. `abc123xy`).
3. The default dataset is `production`. Use that.
4. In the project, go to **API → Tokens** → **Add API token** → name it "Connie Website" → set **Permissions** to **Editor** → save. Copy the token.

### 3. Configure env

```bash
cp .env.example .env
```

Edit `.env`:

```
PUBLIC_SANITY_PROJECT_ID=abc123xy
PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=sk...
PUBLIC_FORMSPREE_ID=your_formspree_id
```

(For the Formspree ID: sign up at https://formspree.io, create a form, copy its ID — that's the bit after `/f/` in the form endpoint URL.)

### 4. Seed Sanity with v3.1 content

```bash
npm run seed
```

This creates two `siteContent` documents in Sanity (one for ES, one for EN) so the site is populated immediately. You can edit them in the Studio later.

### 5. Test locally

```bash
# Terminal 1: Astro dev server
npm run dev

# Terminal 2: Sanity Studio (for editing)
npm run studio
```

Open http://localhost:4321 to see the site. Open http://localhost:3333 to see the Sanity Studio.

## Deploy to Cloudflare Pages

### Option A: Connect a Git repo (recommended)

1. Push this folder to a GitHub/GitLab repo.
2. In Cloudflare dashboard: **Workers & Pages → Create application → Pages → Connect to Git**.
3. Select the repo.
4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** add the same ones from `.env`
5. Click Save and Deploy. Site goes live on `*.vivayogaconnie.pages.dev`.

### Option B: Manual deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name=vivayoga-connie
```

### Custom domain

Once deployed on Cloudflare Pages:
1. Buy `vivayogaconnie.es` (~€8/yr at Namecheap or similar) or `.com` (~$10/yr).
2. In Cloudflare Pages project → **Custom domains** → add the domain.
3. Update nameservers at your registrar to Cloudflare's (Cloudflare will guide you).
4. Update `astro.config.mjs` → `site: 'https://vivayogaconnie.com'` and redeploy.

## Connie edits content

After setup, Connie's daily workflow is:

1. Open the Sanity Studio URL (e.g. `vivayoga-connie-studio.sanity.studio` after `npm run studio:deploy`).
2. Log in with her Sanity account.
3. Click **Site Content → English (or Spanish)**.
4. Edit any field. Click **Publish**.
5. The site updates after the next deploy (or immediately if you've set up ISR/webhooks — out of scope for v1).

## Things you can tweak later

- **Add a new class**: in Sanity, add a new entry under "Classes". Add a corresponding image to `public/` and reference it in the Astro page.
- **Change the palette**: edit `tailwind.config.mjs` colors.
- **Add a blog / events section**: add a new schema in `studio/schemas/`, fetch it in `src/lib/content.ts`, render in a new Astro component.

## Cost summary

- **Sanity free tier:** 3 users, 10K documents, 5GB assets, 100GB bandwidth — plenty for one site.
- **Cloudflare Pages:** free for unlimited static sites.
- **Domain:** ~€8-12/yr.
- **Total ongoing:** ~€10/yr for the domain. Sanity + Cloudflare = €0.
