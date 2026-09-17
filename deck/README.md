# Pitch deck

Two versions of the same nine slides.

## 1. Web deck (personalizes itself)

1. Open `/pitch` on the site, add the restaurant, upload their logo, type their Google numbers and your offer.
2. Click **Open pitch deck**. Arrow keys or click to advance, **Fullscreen** for the meeting, **Save as PDF** to print or email it.
3. **Copy deck link for my phone** gives you a URL that carries everything except the logo. Open it on your phone. For the logo, use **Save preview as image** and AirDrop the PNG.

## 2. PowerPoint template (`pitch-deck-template.pptx`)

Opens in PowerPoint, Keynote, or Google Slides. Placeholders to replace on slides 1, 2, 3 and 9: `[Restaurant Name]`, `[City]`, `[Owner]`, `[4.3]`, `[58]`, `[3 months ago]`. Speaker notes on every slide carry the talk track.

To generate a pre-filled copy for a restaurant instead of editing by hand:

```bash
cd "site" && node scripts/build-pitch-deck.cjs --name "Blue Door Bistro" --city "Riverside" --owner "Dana" --rating 4.2 --count 63 --last "2 months ago"
```

That writes `deck/pitch-deck-blue-door-bistro.pptx`. Add `--offer "..."` to change the offer line on the pricing slide.

The card pictures on slides 1, 5 and 9 show a generic "Your Restaurant" card. To show their logo, save the preview image from `/pitch` and paste it over those pictures.

This template passed structural validation but was not rendered on this machine (no PowerPoint installed). Open it once before the first pitch and check nothing wraps oddly.
