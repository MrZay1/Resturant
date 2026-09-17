# Card print export

`scripts/export-cards.mjs` turns the card artwork into print-ready files. It drives a headless Chromium (Playwright) against the `/print/card` page, which renders one card side at exact physical size with bleed, and saves a vector PDF plus a 300 dpi PNG for every template and side.

## Run it

1. Start the dev server in one terminal:

   ```sh
   npm run dev
   ```

2. In another terminal, from the `site` folder:

   ```sh
   node scripts/export-cards.mjs
   ```

   If the dev server is on a different port, point the script at it:

   ```sh
   BASE_URL=http://localhost:3111 node scripts/export-cards.mjs
   ```

The script is not wired into `package.json`; run it with `node` as shown.

## Where files land

Everything goes to `../cards/exports/` (a sibling of the `site` folder), one sub-folder per design slug:

```
cards/exports/
  lucias-classic/
    classic-front.pdf   classic-front.png
    classic-back.pdf    classic-back.png
  lucias-noir/ ...
  lucias-logo/ ...
  lucias-brand/ ...
  demo-your-restaurant/
    classic-front.pdf ... 
```

Default run exports the four templates (classic, noir, logo, brand) for the sample restaurant "Lucia's Trattoria", plus a generic "Your Restaurant" demo card on the classic template. Each output path is logged. A failure in one design is reported and the run continues with the next.

## Custom designs

Pass a JSON file path as the first argument:

```sh
node scripts/export-cards.mjs my-designs.json
```

The file is an array of design objects:

```json
[
  {
    "slug": "blue-door-bistro",
    "template": "brand",
    "name": "Blue Door Bistro",
    "headline": "Tap to review us on Google",
    "subline": "Hold your phone here",
    "color": "#1d3a6b",
    "url": "tblnt.co/r/bluedoor",
    "stars": 1
  }
]
```

| Field      | Notes                                                                 |
| ---------- | --------------------------------------------------------------------- |
| `slug`     | Output folder name. Falls back to a slug of `name`.                   |
| `template` | `classic`, `noir`, `logo` or `brand`. Omit it to export all four.     |
| `name`     | Restaurant name.                                                      |
| `headline` | Front headline. Splits onto two lines at " on " when present.         |
| `subline`  | Small line under the headline.                                        |
| `color`    | Hex with `#`. Used by the brand template and as the accent elsewhere. |
| `url`      | Short link printed on the back and encoded in the QR code.            |
| `stars`    | `1` to show the five gold stars, `0` to hide them.                    |
| `logo`     | Optional logo: file path, http(s) URL, or data URL (PNG, JPEG, SVG, WebP). Shown on every template; knocked out to paper on dark ones. |

Missing fields fall back to the sample restaurant values.

## Print spec for the card supplier

Send the supplier the PDF (preferred, vector) or the PNG for each side.

- Card size: CR80, 85.6 x 53.98 mm (standard credit card).
- Bleed: 3 mm on every side is already included. Files measure 91.6 x 59.98 mm. The supplier trims to 85.6 x 53.98 mm.
- Corner radius: 3.18 mm.
- Safe zone: all text and logos sit at least 3 mm inside the trim edge. Keep it that way if you edit the artwork.
- PNG: 300 dpi, roughly 1082 x 709 px, RGB.
- PDF: vector, page size 91.6 x 59.98 mm, no margins, backgrounds printed. Chromium embeds the fonts (Geist and Instrument Serif) as subsets; ask the supplier to confirm text renders correctly on their proof, or convert text to outlines in their prepress if they require it.
- Colour: files are RGB. CMYK conversion is done by the printer. Expect the basil green and gold to shift slightly; ask for a proof if colour matters.
- The dashed magenta rectangle at the trim line is a guide from the print page, not part of the artwork. If it shows up in the files, ask the supplier to ignore it or remove the guide in `components/card/CardFace.tsx` before exporting.

## How the sizes are derived

- Bleed box in CSS pixels: 91.6 mm / 25.4 * 96 = 346.2 px wide, 59.98 mm / 25.4 * 96 = 226.7 px tall. The browser viewport is set to the rounded values (346 x 227) and the `#card` element is captured directly, so its exact millimetre size is preserved.
- 300 dpi comes from `deviceScaleFactor = 300 / 96 = 3.125`, giving about 1082 x 709 px.
- The PDF uses `preferCSSPageSize: true` so the `@page { size: 91.6mm 59.98mm; margin: 0 }` rule on the print page defines the page box.
