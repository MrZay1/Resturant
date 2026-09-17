# Pitch pack: one restaurant, everything personalized

Give the founder's assistant a restaurant name and city. It comes back with a folder under `cards/pitch/<slug>/` that holds everything for that visit.

## What is in a pack

| File | What it is | Use |
|---|---|---|
| `brief.md` | One-page pre-visit brief: their Google numbers, opening line, three talking points, what their guests already say, who outranks them, the likely objection, the offer | Read in the car |
| `profile.json` | Everything above plus the logo, ready to import into `/pitch` | Import once on your laptop; the deck and preview follow |
| `preview-sheet.png` | All four card designs with their logo on one image | Phone, at the table |
| `cards/` | Front and back of each design, PNG and print-ready PDF | Print sample cards later if they sign |
| `pitch-deck-<slug>.pptx` | The deck, pre-filled, with the two research slides | Laptop, or convert to PDF |
| `logo.png` | Cleaned logo | |

## How it is made

1. **Research** (assistant, with web tools): Google listing (rating, review count, most recent review), website, cuisine, address, owner or GM name if public, logo from the site, the search phrase a guest would type, the three nearby places that outrank them on that search, and a read of their recent public reviews: praise themes, recurring complaints, dishes named. Everything is written to `site/research/<slug>.json` with the schema below.
2. **Generate** (script, about a minute): with the dev server running,

```bash
cd "site" && node scripts/pitch-pack.mjs research/<slug>.json
```

3. **Open it**: the generator prints two links.

| Link | Use |
|---|---|
| `/pitch/deck?pack=<slug>` | Present. Arrow keys, fullscreen, Save as PDF. |
| `/pitch/deck?pack=<slug>&view=all` | Review. Every slide stacked on one scrollable page, numbered, for marking up. |
| `/pitch` | Edit. The pack appears under **Prepared packs**; click it to load the form, tweak wording, save the preview image. |

No import step is needed: the deck reads the pack straight off disk by slug. Press `g` in the deck to flip between presenting and reviewing.

## Changing the deck after you see it

Open the review link, scroll through, and mark up whatever is wrong (circle it and type the change). Send that back and the fix goes into the deck template, so every future restaurant gets it. Say "slide 4" and the number badge above each slide identifies it.

## Research JSON schema

```json
{
  "name": "Blue Door Bistro",
  "city": "Riverside",
  "owner": "Dana",
  "address": "412 Main St, Riverside",
  "website": "https://...",
  "cuisine": "American bistro",
  "rating": "4.2",
  "reviewCount": "63",
  "lastReview": "2 months ago",
  "query": "bistro riverside",
  "hook": "One sentence that opens the conversation with their own numbers.",
  "competitors": [{ "name": "Riverside Grill", "rating": 4.5, "count": 412, "note": "9 reviews last month" }],
  "praise": ["Warm servers", "Brunch"],
  "complaints": ["Weekend waits"],
  "dishes": ["Shrimp and grits"],
  "talkingPoints": ["...", "...", "..."],
  "likelyObjection": "\"We already have a QR code.\" Answer: ...",
  "offer": "optional, overrides the default offer line",
  "logo": "https://theirsite.com/logo.png or a local path",
  "brandColor": "optional #rrggbb; derived from the logo when omitted"
}
```

## Rules the research follows

- Numbers come from the live Google listing on the day of research and are dated in the brief.
- Praise and complaints are paraphrased themes from public reviews, never quotes with reviewer names.
- Staff names from reviews are not put in the deck. The deck says "three of your last ten reviews name a server"; the name stays in your head for the conversation.
- No revenue promises. The hook uses their numbers and the sourced stats only.
- The competitor slide shows ratings and counts as published; it says nothing negative about the competitors.

## Adding a restaurant

Type the restaurant name and city in chat. The research needs live web lookups (Google listing, reviews, competitors, logo), so it runs there, not on the site. The site is for previewing, editing and presenting what comes back.

## Critique loop

After the first pack, note what to change about the structure (slides, brief sections, tone, what to research). The change is applied to the generator and the research prompt, and every later restaurant gets it automatically.
