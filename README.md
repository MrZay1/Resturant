# Tap-to-review cards + monthly AI review report (working name: Tablenote)

Everything for the launch lives in this folder. Start with [docs/00-what-exists.md](docs/00-what-exists.md) for the one-page inventory.

| Folder | What is in it |
| --- | --- |
| `site/` | The website (Next.js 16, Tailwind v4, TypeScript). Marketing pages, pricing, the card configurator with Stripe Checkout, the sample report, the NFC redirect layer, and print pages for card artwork. |
| `cards/exports/` | Print-ready card artwork (PDF + 300 dpi PNG, with 3 mm bleed) and letter-size PDFs (staff guide, sample report one-pager). Regenerate with the scripts below. |
| `docs/` | Ordering guide and supplier shortlist, NFC tech spec and encoding procedure, sales playbook, compliance rules, unit economics, launch checklist. |
| `research/` | The raw research reports behind the docs, with sources. |

## Run the site

```bash
cd "site" && npm install && npm run dev
```

Open http://localhost:3000. Copy `site/.env.example` to `site/.env.local` and add your Stripe secret key to enable checkout. Without it, the order form falls back to an "email us your order" request that posts to `/api/lead`.

## Change the name, prices, or links

Everything reads from `site/lib/brand.ts`. Change `BRAND.name`, `BRAND.domain`, `BRAND.shortLinkHost`, `BRAND.email` and `PRICING` there.

## Export print files

With the dev server running:

```bash
cd "site" && node scripts/export-cards.mjs
```

```bash
cd "site" && node scripts/export-print.mjs --name "Restaurant Name"
```

Card files land in `cards/exports/<design>/` and letter PDFs in `cards/exports/print/`. See `site/scripts/README.md` for the supplier print spec and how to export a custom design list.

## NFC redirect links

Cards are encoded with `https://<your domain>/r/<slug>?s=card`. Slugs and destinations live in `site/data/links.json`. Change a destination there and redeploy; the plastic never changes. Set `TAP_WEBHOOK_URL` to count taps.

## Deploy

The site is a standard Next.js app. On Vercel: import the `site/` folder as the project root, add the environment variables from `.env.example`, and point your domain at it.
