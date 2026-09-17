# NFC card technical spec, redirect layer, and the encode-tonight procedure

Working brand: Tablenote (placeholder). Short-link host: tblnt.com (placeholder, not yet registered). Date: 2026-09-04.

This document is the build sheet for the physical card and the code that sits behind it. Read section 1 before ordering, section 2 before deploying, section 3 before touching a blank card. Everything with a number or a rule carries a source; anything unverified says so.

---

## 1. One-page card spec

| Item | Spec | Why / source |
|---|---|---|
| Format | ISO CR80, 85.60 x 53.98 mm, corner radius 3.18 mm, white PVC core | Standard card body; matches the print files exported from the site (`site/scripts/README.md`) |
| Thickness | 0.76 to 0.90 mm. GoToTags blanks are 0.9 mm, Tagstand 0.8 mm | [GoToTags](https://store.gototags.com/nfc-pvc-card-ntag213/), [Tagstand](https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/) |
| Chip | Genuine NXP NTAG213, NFC Forum Type 2, ISO/IEC 14443-A, 13.56 MHz | 144 bytes user memory, 7-byte UID, 24-bit read counter, UID/counter ASCII mirror, 32-bit password, 100,000 write cycles, 10-year retention ([NXP datasheet](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf)) |
| Memory map (NTAG213) | User pages 04h to 27h; dynamic lock bytes page 28h; config pages 29h to 2Ch; static lock bytes in page 02h | [NXP datasheet](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf) |
| URL capacity | About 130 characters after `https://` | Vendor figure ([wakdev](https://www.wakdev.com/en/knowledge-base/nfc-chips/nxp-ntag213.html)); the chip URL is 26 characters plus the slug (30 for `d001`), see section 2.1 |
| Payload | Exactly one NDEF URI record, prefix byte 0x04 (`https://`), value `https://tblnt.com/r/<slug>?s=card`. No second record | iPhone only processes the first URI record ([Apple](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading)) |
| Lock (production) | After testing: NFC Tools on an Android phone, "Lock tag" (static + dynamic lock bits), then CFGLCK on the config pages. Irreversible. The iOS app only soft-locks, so an Android phone is required; if you have none, have the vendor lock (Tagstand, GoToTags, Seritag) or use an ACR1252U reader with the GoToTags Desktop App | Section 3 step 9 and section 4; [NXP datasheet](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf); [Seritag on iPhone locking](https://seritag.com/news/can-iphones-lock-nfc-tags) |
| Lock (demo cards) | Password-protect writes instead of locking, so the card can be re-encoded | Section 3 step 9 |
| Antenna | Copper coil around the full card perimeter, chip at one corner. GoToTags quotes a 70 x 40 mm antenna | Largest passive HF loop that fits a CR80; best read range of any tag form factor ([Shop NFC](https://shopnfc.com/en/nfc-cards/11-nfc-cards-in-pvc-ntag213.html), [GoToTags](https://store.gototags.com/nfc-pvc-card-ntag215/)) |
| Chip dip | A roughly 5 x 5 mm dip near one corner where print can be uneven. Keep the QR and logos at least 5 mm from it; ask the supplier for the chip/antenna map | [Seritag](https://seritag.com/nfc-tags/cards) |
| Read range | Reliable at 2 to 3 cm, maximum 7 to 8 cm; NXP quotes up to 100 mm depending on field and antenna | [Seritag](https://seritag.com/qa/what-is-the-maximum-distance-for-nfc-communication), [NXP datasheet](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf) |
| Print | Full colour both sides, retransfer or offset (UV inkjet acceptable for small batches), matte laminate. Vector PDF, 3 mm bleed, 300 dpi | Matte hides sanitizer haze; retransfer or a polyester overlaminate resists abrasion ([Seritag](https://seritag.com/nfc-tags/cp-cards-ntag213), [AlphaCard](https://www.alphacard.com/learning-center/understanding-smart-cards/can-i-print-on-smart-cards/)) |
| QR on back | 21 x 21 mm, error correction M, `https://tblnt.com/r/<slug>?s=qr` (same path as the chip, source tag `qr`) | Section 8 |
| Front text | "Tap to review us on Google" in plain text. No star graphics, no Google logo | Google allows its name in plain text; the logo and colour palette need permission ([Google brand guidance](https://about.google/brand-resource-center/guidance/)) |

### What to avoid

- No hot-foil, vacuum-metallised or conductive metallic inks over the coil. Metal layers attenuate the field through eddy currents ([US patent 8393547](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/8393547)). Screen-printed mica inks are low risk if kept off the antenna path. For the demo run: no foil, no metallic ink.
- No metal cores, metal-backed cards, or "on-metal" ferrite cards. On-metal tags read at roughly half the distance of a normal tag even off metal ([Seritag](https://seritag.com/learn/using-nfc/on-metal-nfc-tags)).
- No MIFARE Classic chips (iPhone will not read them) and no ISO 15693 chips (not the ecosystem default) ([GoToTags](https://gototags.com/help/ios/nfc/compatibility)).
- No thermal pouch lamination of finished cards. Rigid PVC starts to distort around 60 C ([Wikipedia PVC](https://en.wikipedia.org/wiki/Polyvinyl_chloride)); use cold lamination or factory lamination.
- No clone chips. Clones may lack the originality signature and counter ([LINQS](https://shop.linqs.in/guides/nfc-tag-price-india)). Buy from GoToTags or Tagstand, not the cheapest marketplace listing.
- Nothing on the card that promises a one-step experience. Both platforms require a second tap (section 5).

### Blank cards for tonight

| Vendor | Price | Notes | Source |
|---|---|---|---|
| GoToTags NFC PVC Card NTAG213 | $0.30 each at 10, $0.29 at 100 | 85.5 x 54 x 0.9 mm, pre-formatted NDEF, MOQ 10 | [GoToTags](https://store.gototags.com/nfc-pvc-card-ntag213/) |
| Tagstand blank NTAG213 card | $0.55 single, $0.52 at 25+, $0.50 at 50+, $0.44 at 100+ | 1,335 in stock at research time. No tariff notice found (an earlier note claiming one was withdrawn) | [Tagstand](https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/) |

Buy 25: 10 demos plus spares for lock practice and mistakes. A USB reader is not needed for 25 cards; a phone does everything in this document, as long as one of the phones is an Android (the hard lock in step 9 needs it). If you want one later, GoToTags lists the ACR1252U at $44.32 ([GoToTags](https://store.gototags.com/acs-acr1252u-nfc-usb-reader/)).

---

## 2. How the redirect layer works

Cards never carry a Google URL. They carry a Tablenote URL that the server 302-redirects to the restaurant's Google review page. That is what lets you re-point a locked card, count taps, and survive Place ID changes.

### 2.1 The URL scheme

Three strings, one path:

| Where | String | Length |
|---|---|---|
| Encoded on the chip | `https://tblnt.com/r/<slug>?s=card` | 26 characters plus the slug (`d001` gives 30, `bluedoor` gives 34) |
| Encoded in the QR on the back | `https://tblnt.com/r/<slug>?s=qr` | 24 characters plus the slug (`d001` gives 28, `bluedoor` gives 32) |
| Printed as text on the back | `tblnt.com/r/<slug>` | 11 plus the slug. No source tag, so a typed visit logs as `unknown`. Accepted; typing is rare |

The code already does this: `site/app/(print)/print/card/page.tsx` and `site/components/order/Configurator.tsx` both call `` QRCode.toDataURL(`https://${shortUrl}?s=qr`, ...) ``, and the exports in `cards/exports/` were regenerated after that change (2026-09-05). Any doc or spreadsheet that gives another length or says the QR carries no `?s=` is stale.

| Parameter | Meaning | Handled where |
|---|---|---|
| `<slug>` | Card or restaurant identifier. The code lowercases it and strips anything outside `a-z 0-9 - _` before lookup, so use only those characters | `site/lib/links.ts` |
| `?s=card` or `?s=qr` | Source tag. Logged as `source`. Chip taps say `card`, QR scans say `qr`; anything missing is logged as `unknown` | `site/app/r/[slug]/route.ts` |
| `?c=<hex>` | Optional NTAG counter mirror value (section 4). Logged as `counter`, truncated to 16 characters | `site/app/r/[slug]/route.ts` |

### 2.2 `site/data/links.json`

One object per slug:

```json
{
  "demo": {
    "name": "Demo card (sample restaurant)",
    "to": "/sample-report",
    "note": "Generic demo card. Points at the sample report so any prospect can tap it."
  },
  "lucias": {
    "name": "Lucia's Trattoria (fictional sample)",
    "to": "/sample-report",
    "note": "Replace `to` with the real Google review link for each restaurant"
  }
}
```

- `name`: human label, used only by you.
- `to`: destination. Either a site-relative path (`/sample-report`) or a full `http(s)` URL. Anything else fails validation and the slug is treated as unknown.
- `note`: free text.

### 2.3 What the route does (`site/app/r/[slug]/route.ts`)

1. Looks up the slug. Unknown slugs redirect to the site root `/` and are logged as `unknown:<slug>`. Nothing ever 404s in a guest's face.
2. Sends a `302` with `Cache-Control: no-store`. 302 rather than 301 so no browser caches the destination and a re-pointed card takes effect on the next tap ([Semrush](https://www.semrush.com/blog/301-vs-302-redirect)). Google's own g.page review link is itself a 302 chain, so redirecting to the review URL is normal practice ([verified in research](https://g.page/r/CTW9H70cPgDuEBM/review)).
3. After the redirect is sent, records the tap: `slug`, `ts`, `ua` (user agent, for the iPhone/Android split), `referer`, `source`, `counter`. No IP, no personal data.

### 2.4 `TAP_WEBHOOK_URL` for counting

Serverless file systems are read-only, so `site/lib/taps.ts` POSTs each tap as JSON to `TAP_WEBHOOK_URL` if set (Airtable automation, Zapier, Make, Google Apps Script, or your own endpoint), with `Authorization: Bearer <TAP_WEBHOOK_SECRET>` if that is set. The call is bounded to 8 seconds. If the variable is unset, taps go to the server log only, which on Vercel means you will not keep them. Both variables are in `site/.env.example`.

- [ ] Before handing out cards, set `TAP_WEBHOOK_URL` (and `LEAD_WEBHOOK_URL`, same shape, used by `site/app/api/lead/route.ts`) to something that stores rows. Pick one of the two recipes below. Budget 30 minutes.

**Payloads.** Tap: `slug, ts, ua, referer, source, counter`. Lead: `name, restaurant, email, phone, city, message, kind, ts`. `ts` is an ISO 8601 string; `ua` is up to 256 characters and `referer` up to 512, so give them long-text fields.

**Recipe A: Airtable "When webhook received" (fastest to set up).**

1. Create a base with two tables. `Taps`: `slug` (single line text), `ts` (date with time, or single line text if the date field rejects the ISO string), `ua` (long text), `referer` (long text), `source` (single select: card, qr, unknown), `counter` (single line text). `Leads`: `name`, `restaurant`, `email` (email), `phone` (phone), `city` (single line text), `message` (long text), `kind` (single select: demo, contact, logo), `ts`.
2. Automations > Create automation > trigger "When webhook received". Airtable shows a unique URL; copy it into `TAP_WEBHOOK_URL` in the hosting dashboard (Vercel > Project > Settings > Environment Variables) and redeploy.
3. Open `https://<host>/r/d001?s=card` once so Airtable receives a sample payload, then click Test trigger and confirm it shows the fields.
4. Add the action "Create record" in `Taps` and map each field from the webhook body. Turn the automation on.
5. Repeat with a second automation for `Leads` and `LEAD_WEBHOOK_URL`.
6. Leave `TAP_WEBHOOK_SECRET` and `LEAD_WEBHOOK_SECRET` empty. The Airtable trigger gives the automation the request body, not the request headers, so it cannot check the `Authorization: Bearer` value. The unguessable URL is the only secret; do not paste it anywhere public. The Bearer check only pays off with your own endpoint (recipe B or a real server).
7. Pricing: Free $0, Team $20 per user per month, Business $45 per user per month billed annually ([Airtable pricing](https://airtable.com/pricing), read 2026-09-05). The pricing page says automation and API usage is capped per plan but does not print the monthly run limit, and it does not say whether the webhook trigger is on the Free plan. Unverified: open the trigger picker on a Free base before relying on it. If the trigger is missing or the run cap is too low for a restaurant's tap volume, use recipe B.

**Recipe B: Google Apps Script `doPost` into a Google Sheet ($0, no plan limits at pilot volume).**

1. New Google Sheet with two tabs, `Taps` and `Leads`, and the payload field names as the header row.
2. Extensions > Apps Script. Paste:

```js
function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  const tab = body.slug !== undefined ? "Taps" : "Leads";
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tab);
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  sh.appendRow(headers.map((h) => (body[h] === undefined ? "" : String(body[h]))));
  return ContentService.createTextOutput("ok");
}
```

3. Deploy > New deployment > type Web app > Execute as: Me > Who has access: Anyone > Deploy. Copy the `/exec` URL into both `TAP_WEBHOOK_URL` and `LEAD_WEBHOOK_URL`, redeploy the site ([Apps Script web apps](https://developers.google.com/apps-script/guides/web); `e.postData.contents` is the POST body). Every code change needs a new deployment version.
4. Apps Script answers a POST with a 302 to a `script.googleusercontent.com` URL; Node's `fetch` follows it, so `res.ok` in the lead route is true. If leads start returning 502, this redirect is the first thing to check.
5. The event object does not expose request headers either, so the Bearer secret is again unusable; the long deployment URL is the secret.

Whichever recipe you use, the test in step 0 of section 3 (one tap, one row) is the acceptance check.

### 2.5 Pointing a card at a new restaurant

1. Get the restaurant's Place ID. The owner's own link from Business Profile > Read Reviews > Get more reviews is `https://g.page/r/<code>/review`; opening it on a phone resolves to `https://search.google.com/local/writereview?placeid=<PLACE_ID>` ([Google Help](https://support.google.com/business/answer/16816815?hl=en)). Without owner access, use the Place ID Finder ([Google](https://developers.google.com/maps/documentation/places/web-service/place-id)).
2. Set `to` to `https://search.google.com/local/writereview?placeid=<PLACE_ID>`. Use the bare Place ID form, not the g.page link: one fewer hop and no user-agent-dependent branch (research showed a generic user agent gets a Maps URL instead).
3. Commit and redeploy. Because `links.json` is imported at build time, a change is live only after the next deploy. There is no admin route yet. A Vercel deploy is a few minutes; that is fast enough for onboarding but not for re-pointing a card mid-pitch. If you want sub-minute re-pointing, the redirect target must move to a runtime store (Cloudflare KV, Vercel Edge Config, or a database). Decision for you (open item).
4. Test with a real GET and a mobile user agent. A signed-out phone should land on `accounts.google.com/ServiceLogin?continue=...writereview?placeid=<same ID>`. A redirect to a `google.com/search` or `maps/place` URL means the Place ID no longer resolves (profile merged, suspended, or moved). HEAD requests return 200 regardless, so do not use them for checks (verified in research).
5. Place IDs can change. Google recommends refreshing IDs older than 12 months; a Place Details request for the `id` field only is free ([Google](https://developers.google.com/maps/documentation/places/web-service/place-id)).

Demo cards: point demo slugs at `/sample-report` or at your own verified Business Profile once you have one. Never encode a real local restaurant's review page on cards you hand out; a test review on a live profile violates Google's policy on content not based on a real experience ([Google UGC policy](https://support.google.com/contributionpolicy/answer/7400114)).

Policy rule for the destination: every guest goes straight to the blank Google form. No "how was your meal" interstitial, no sentiment gate, no incentive text ([Google UGC policy](https://support.google.com/contributionpolicy/answer/7400114), [FTC rule, 16 CFR 465](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials)).

---

## 3. Encode 10 blank cards in your kitchen tonight

Time: about 45 minutes. You need: 10 or more blank NTAG213 PVC cards, an iPhone XS or newer for the native tap test, an NFC Android phone with the free NFC Tools app by wakdev for writing and for the hard lock (the iOS app writes and password-protects but only soft-locks; Seritag recommends an Android phone or vendor locking for tags in public places, [Seritag](https://seritag.com/news/can-iphones-lock-nfc-tags); app: iOS 15.6 or later on iPhone 7 and up, Android on the Play Store, [wakdev](https://www.wakdev.com/en/apps/nfc-tools-ios.html)), a permanent marker or small labels, and the redirect live on a real domain.

No Android available: encode and password-protect the demo cards from the iPhone (steps 3 to 9, demo branch) and do not lock anything. For production cards, either (a) order them locked by the vendor: Tagstand Custom Small Batch "Encode and Lock" at no extra charge (`research/suppliers.md` gap-fill section 8, [Tagstand](https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/)), GoToTags encoding service with "permanently read-only" at $0.23 per tag at 50 and $0.19 at 100, MOQ 30, only for tags bought from GoToTags ([GoToTags](https://store.gototags.com/nfc-tag-encoding-service/)), or Seritag "Single Encoding (Locked)" ([Seritag](https://seritag.com/nfc-tags/cp-cards-ntag213)); or (b) buy the ACS ACR1252U USB reader, $44.32 at GoToTags ([GoToTags](https://store.gototags.com/acs-acr1252u-nfc-usb-reader/)), and lock with the GoToTags Desktop App, which encodes, locks and checks originality (`research/nfc_tech.md` gap-fill section 11; the app comes with a free 100-credit pack and then costs about $0.05 per encode, [GoToTags credits](https://gototags.com/software/credits), per `docs/01-ordering-guide.md` section 3). NFC Tools for Desktop is not a fallback: its release notes list password protection but no lock feature ([wakdev](https://www.wakdev.com/en/apps/nfc-tools-pc-mac/release-notes.html)). Vendor-locked cards still need the CFGLCK step; ask the vendor whether their lock covers the config pages, and if they cannot say, treat it as not covered (unverified).

The domain matters. Whatever host you encode is burned into the plastic. `tblnt.com` is a placeholder and is not registered yet. If you have no real short domain tonight, encode the deployed site's real hostname instead (for example `https://<your-vercel-domain>/r/d001?s=card`), password-protect the cards, and do not lock them. Lock only cards whose encoded host you will own for years.

### Step 0: prepare slugs (laptop, 10 minutes)

- [ ] Add `d001` to `d010` to `site/data/links.json`. Four-character slugs are deliberate; they make the optional counter mirror line up (section 4).
- [ ] Point each at `/sample-report` for now, or at your own Business Profile review URL if you have one.
- [ ] Deploy. Open `https://<host>/r/d001?s=card` in a desktop browser and on your phone; confirm the redirect and confirm a row arrives at your tap webhook with `source=card` (section 2.4 recipes). Open `https://<host>/r/d001?s=qr` once as well and confirm `source=qr`.

### Step 1: phone setup

- [ ] Install NFC Tools. On Android, turn NFC on. On iPhone, close the Camera app and turn Airplane mode off (both block background reading) ([Apple](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading)).
- [ ] Update both apps. The iOS release notes mention an NTAG21x locking fix (v2.25), but that is the iOS soft lock; it does not make the iPhone hard-lock a tag ([wakdev release notes](https://www.wakdev.com/en/apps/nfc-tools-ios/release-notes.html), [Seritag](https://seritag.com/news/can-iphones-lock-nfc-tags)). The Android app does the production lock in step 9.

### Step 2: inspect one card

- [ ] NFC Tools > Read. Hold the top edge of the iPhone (or the upper back of the Android) flat on the card.
- [ ] Confirm: NXP NTAG213, 144 bytes, writable, NDEF formatted. If it says locked or read-only, set that card aside.

### Step 3: write card 1

- [ ] Write > Add a record > URL/URI. Enter `https://<host>/r/d001?s=card` in full. The app picks prefix 0x04 for you.
- [ ] Tap Write, hold the phone on the card until the checkmark.
- [ ] Tap Read. Confirm a single URI record with exactly that URL.

### Step 4: native test

- [ ] Exit the app. Lock and unlock the phone. Hold the card to the top of the iPhone: a banner appears; tap it; Safari opens and the redirect lands. On Android: unlock, hold the card to the back, and confirm the browser opens (or an "open link" notification appears on Android 17; tap it) ([Android docs](https://developer.android.com/develop/connectivity/nfc/nfc)).
- [ ] Also tap from the iPhone lock screen. You should get the banner, then a Face ID or passcode prompt when you tap it ([Apple](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading)).

### Step 5: label

- [ ] Write the slug (`d001`) on the back with a marker or a small label so cards match webhook rows. Production cards get the slug printed in small type on the back.

### Step 6: repeat for d002 to d010

- [ ] Change the slug in the record each time. On Android, Write > "Write / many tags" writes the same record repeatedly, which is only useful if several cards share a slug.

### Step 7: optional counter mirror

Skip this tonight unless you want tamper-evident chip counts on two spare cards. It adds bricking risk and no demo value. If you do it, follow section 4 exactly and do it before step 9.

### Step 8: regression

- [ ] Tap all 10 on the iPhone and on one Android. Check the webhook shows 20 rows with `source=card`.
- [ ] Put two cards in a phone-case test (thin case, thick rugged case, MagSafe wallet). Lay one on a metal baking tray and tap it there to see the metal effect for yourself.

### Step 9: protect the cards

Decide per card. Do not lock a card until its slug is live and it has passed step 4 on at least one iPhone and one Android.

**Demo cards (reusable): password-protect, do not lock.**

- [ ] NFC Tools > Other > Password protection (NTAG21x). Set a password; write it in your password manager with the card slug. This sets PWD/PACK and AUTH0 with reads left open (PROT = 0), so any phone still reads the URL but only someone with the password can rewrite it ([NXP datasheet](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf), [wakdev release notes](https://www.wakdev.com/en/apps/nfc-tools-ios/release-notes.html)).
- [ ] Verify: try to write a text record without the password; it should fail. Remove protection later with Other > Password protection > remove (the app also has a raw 4-byte hex password mode since v2.38).

Why not lock demo cards: a locked card pointing at `/sample-report` is fine forever, but you may want to re-encode demo cards to a different host once the real domain exists. Locking is irreversible.

**Production cards (shipped to a restaurant): lock, on the Android phone.**

- [ ] On the Android phone only (the iOS app soft-locks): NFC Tools > Other > Erase, format & protect > Lock tag (permanent). Hold to the card. No Android: use a vendor lock or the ACR1252U route from the section 3 intro.
- [ ] Re-read. The app should report read-only. Then open the memory dump and confirm page 02h bytes 2 and 3 read `FF FF` (static lock bits) and page 28h bytes 0 and 1 are non-zero (dynamic lock bits). wakdev does not document exactly which bits "Lock tag" sets, so this dump check is the acceptance test.
- [ ] Freeze the config pages. The lock bits do not cover pages 29h to 2Ch, so a prankster could still set a password or a mirror on a "locked" card. Other > Advanced NFC commands > accept the prompt > send `A2:2A:40:00:00:00` (CFGLCK on, counter off) or `A2:2A:50:00:00:00` (CFGLCK on, counter on). Take the card away from the phone; the config lock activates only after a power cycle. Re-read once more ([NXP datasheet](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf) ACCESS byte, CFGLCK bit 6).

Order of operations for a production card: write URL, optional mirror config, verify by two reads, Lock tag, CFGLCK, power cycle, final read.

### Step 10: QR fallback for the demos

- [ ] Either apply the exported back artwork as a printed label (section 8) or, for tonight, print a 21 mm QR of `https://<host>/r/d001?s=qr` on sticker paper for each card. Any generator works if it exports SVG at ECC M. Scan it once and confirm the webhook row says `source=qr`.

### Step 11: pitch prep

- [ ] Carry the iPhone with Camera closed and screen on. Hand the card over and say: "Hold the top of your phone on it, then tap the banner."
- [ ] If the owner's phone asks for a Google sign-in, that is normal: Google requires a signed-in account to review, and it returns the guest to the review page after sign-in ([Google Help](https://support.google.com/business/answer/3474122?hl=en); redirect verified in research). Show the empty stars and close the dialog. Never post a test review.

---

## 4. Optional: NTAG counter mirror

What it does: the chip's 24-bit counter increments on the first read after each power-up, and the ASCII mirror virtually overwrites six characters of the stored URL with the counter as hex on every read. Phones see `...&c=0003F1`. The route logs that value as `counter` ([NXP datasheet](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf) sections 8.6 to 8.7).

Why it is optional: the chip counts RF reads, not review visits. Wallet brushes, dismissed banners, and your own tests all count, so the chip number always runs higher than the server count ([Ixkio](https://docs.ixkio.com/explainers/chip-count-vs-scan-count)). The server log is the real metric. The mirror only gives you a tamper-evident cross-check for cards you suspect are being tapped without reaching the server.

Warning: a wrong write to the config pages can brick a card. Practise on spares. Config must be written before CFGLCK. Do the memory dump check before sending anything.

### Layout for the Tablenote URL

NFC Tools writes a short URI record as page 04h = `03 LL D1 01`, page 05h = `PL 55 04 <first char>`. So the first character after `https://` sits at absolute byte 23, and character index i sits at byte 23 + i. It lands on byte 0 of a page when i mod 4 = 1.

With `https://tblnt.com/r/d001?s=card&c=000000` the prefix `tblnt.com/r/d001?s=card&c=` is 25 characters. 25 mod 4 = 1, so the first `0` is at byte 48 = page 0Ch, byte 0. That is why the demo slugs are four characters. For a different host or slug, count again: if the length mod 4 is not 1, add filler in the query string (`&v=1&c=`) until it is.

### Commands (NFC Tools > Other > Advanced NFC commands, comma-separated)

1. Write the URL `https://tblnt.com/r/d001?s=card&c=000000` as a normal URI record.
2. Read the memory dump. Find the page whose byte 0 is the first `0` of the placeholder. Expect 0Ch; if it is not, use what the dump shows.
3. Send: `A2:29:84:00:0C:FF, A2:2A:10:00:00:00`
   - `A2:29:84:00:0C:FF`: page 29h. MIRROR byte 0x84 = counter-only mirror (MIRROR_CONF 10b), MIRROR_BYTE 0, strong modulation on. Byte 2 = MIRROR_PAGE 0Ch. Byte 3 = AUTH0 FFh (no password).
   - `A2:2A:10:00:00:00`: page 2Ah. ACCESS 0x10 = NFC_CNT_EN.
4. Remove the card, read it twice with the native reader. The URL should now end in an incrementing hex value.
5. When locking later, use `A2:2A:50:00:00:00` (keeps the counter enabled while setting CFGLCK).

Rules: never mirror over the first three or last five pages ([GoToTags mirroring](https://gototags.com/help/nfc/chip/features/mirroring)). MIRROR_PAGE for a counter-only mirror must be at most 26h on NTAG213. Reads made before enabling the counter do not count; every read afterwards does, including yours. The raw-command feature exists on both the Android and iOS apps ([wakdev guide](https://www.wakdev.com/en/knowledge-base/how-to-guides/how-to-use-advanced-nfc-commands.html)). NXP TagWriter on Android offers checkbox mirroring, but whether it is still on the Play Store was not verified; check on a real Android before relying on it ([NXP TagWriter manual](https://inspire.nxp.com/tagwriter/tag-writer-user-manual.pdf)).

---

## 5. Phone compatibility and the two-step tap

### 5.1 The two steps

No modern phone opens a URL from a tag without a confirmation tap.

- iPhone XS and later: the system reads the tag in the background and shows a banner at the top; the guest taps the banner and Safari opens ([Apple](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading), [GoToTags](https://gototags.com/help/ios/nfc/reading/background)).
- Android 16: scanning a web-link tag fires `ACTION_VIEW`, usually opening the browser directly, though older versions often show an "Open link?" confirmation. Android 17: an "open link" notification that the guest must tap ([Android docs](https://developer.android.com/develop/connectivity/nfc/nfc)). Android 17 is below the smallest listed share in US StatCounter data for August 2026, so under about 6 percent of US Android phones ([StatCounter](https://gs.statcounter.com/android-version-market-share/mobile/united-states-of-america)).

Card and script wording: "Hold your phone on the card, then tap the link that pops up." Never "tap once and you are there".

### 5.2 Matrix

| Group | Behaviour | Source |
|---|---|---|
| iPhone XS, XS Max, XR (2018) and every later model, SE 2nd gen and later | Reads tags in the background while the screen is on. Banner, then tap. Works on the lock screen after the first unlock since boot; tapping the banner prompts for Face ID or passcode | [Apple Support](https://support.apple.com/en-euro/guide/iphone/aside/asd-nfc-reader/15.0/ios), [Apple developer](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading) |
| iPhone 7, 7 Plus, 8, 8 Plus, X | No background reading. Guest must open Control Center > NFC Tag Reader, then hold the card. Realistically they use the QR | [Apple Support](https://support.apple.com/en-euro/guide/iphone/aside/asd-nfc-reader/15.0/ios) |
| iPhone 6, 6s and earlier | Cannot read tags. QR only | [GoToTags](https://gototags.com/help/ios/nfc/compatibility) |
| iPhone: Camera app open, Apple Pay or Wallet in use, Airplane mode, never unlocked since restart, another NFC app session running | Background reading is off. Nothing happens | [Apple developer](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading) |
| iPhone: Low Power Mode, Focus or Do Not Disturb | Not on Apple's list of blockers; expect it to work. Test once anyway | [Apple Low Power Mode](https://support.apple.com/en-us/101604) |
| Android with NFC, any version, screen unlocked | Browser opens (or a confirmation, see 5.1) | [Android docs](https://developer.android.com/develop/connectivity/nfc/nfc) |
| Android, screen off or locked | Not scanned. The lock-screen NFC toggle governs payments, not tag reading | [Android docs](https://developer.android.com/develop/connectivity/nfc/nfc), [GrapheneOS tracker](https://github.com/GrapheneOS/os-issue-tracker/issues/3438) |
| Android, NFC disabled in settings | Nothing. QR | [Android docs](https://developer.android.com/develop/connectivity/nfc/nfc) |
| Android without NFC hardware (some budget and prepaid models) | Nothing. QR. No authoritative US share figure found | Research gap; unverified |
| Android with Google Maps installed | `search.google.com` publishes an App Link file for Maps, so the redirect may open the Maps app instead of Chrome. Unresolved without a device test; either way the review dialog appears | [assetlinks.json](https://search.google.com/.well-known/assetlinks.json) fetched in research |
| iPhone with Google Maps installed | Stays in Safari. No Universal Link file exists for `search.google.com` or `g.page` | Apple CDN check in research (404) |

### 5.3 Antenna position

- iPhone: along the top back edge, best at the centre of that edge. Guests touch the top 2 cm of the phone to the card ([Serialio](https://serialio.com/serialio-news/blog/iphone-read-tiny-nfc-tag/)).
- Android: usually upper-middle back; varies by model and even angle ([Cryptnox](https://cryptnox.com/phones-antennae-nfc/), [Voyantic](https://voyantic.com/blog/posts/nfc-tapping-smartphone-performance-comparison/)). "Lay the back of the phone on the card" is the neutral instruction.
- Card and phone should be parallel and overlapping; edge-on presentation couples poorly.

### 5.4 Cases and wallets

- Plastic case material does not matter; thickness does. A CR80 coil reads reliably at 2 to 3 cm, so a 1.5 to 2.5 mm case uses less than a tenth of the margin. Expect a pass. The often-cited failure test used a 4.5 mm micro-tag on a 5 mm standoff and does not apply to cards ([Serialio](https://serialio.com/serialio-news/blog/iphone-read-tiny-nfc-tag/), [Seritag](https://seritag.com/qa/what-is-the-maximum-distance-for-nfc-communication)).
- No published test exists for CR80 cards through MagSafe wallets or metal-plate cases. Treat them as expected failures and script "take the phone out of the wallet". Measure your own go/no-go: stack business cards (about 0.3 mm each) between phone and card and record where reads stop; more than 8 cards with margin is a pass for "normal case".

### 5.5 Metal tables and check presenters

A card lying flat on metal will not read; the metal detunes the antenna. A 3 mm air gap performs like an on-metal tag; at 6 mm a normal tag pulls ahead ([Seritag](https://seritag.com/learn/using-nfc/on-metal-nfc-tags)). A leatherette presenter gives only 1 to 3 mm. Solutions, in order: card copy and staff script say pick the card up; supply a vinyl or leatherette presenter rather than stainless (WebstaurantStore lists vinyl presenters from $2.89 and a stainless one at $32.29 to avoid) ([WebstaurantStore](https://www.webstaurantstore.com/search/check-presenter.html)); for bar tops use an acrylic stand with 6 mm or more standoff.

---

## 6. Test protocol for demo cards

Basis: US mobile OS share August 2026 is iOS 60.68 percent, Android 39.29 percent ([StatCounter](https://gs.statcounter.com/os-market-share/mobile/united-states-of-america)); US Android versions are led by 16.0 at 40.48 percent, with 13.0, 15.0, 14.0, 12.0 and 11.0 following ([StatCounter](https://gs.statcounter.com/android-version-market-share/mobile/united-states-of-america)). Safari is 52.84 percent of US mobile browsing, so half of guests open the link in Safari, whose Google session is separate from the Gmail and Maps apps ([StatCounter](https://gs.statcounter.com/browser-market-share/mobile/united-states-of-america)).

### Minimum devices (borrow them)

| Device | Why | Expected |
|---|---|---|
| iPhone 15, 16 or 17 | Majority of guests | Banner within 2 s, Safari, redirect lands |
| iPhone 11, 12 or SE 2nd gen | Older background reader | Same |
| iPhone 8 or X (if you can find one) | Legacy path | Nothing until Control Center > NFC Tag Reader; confirms the QR matters |
| Pixel on Android 16 | Largest Android version | Browser opens directly; note Chrome vs Maps app |
| Galaxy S on One UI (Android 15 or 16) | Samsung antenna position and quirks | Same; note where on the back it reads |
| Any Pixel on Android 17 if available | Notification step | "Open link" notification, then browser |

### Procedure

- 5 taps per device per card, each from a fresh screen-on state. Pass = 5 of 5 give a banner or notification within 2 s in hand.
- Then per device, one tap each in these states: lock screen, Camera app open, Low Power Mode, Focus on, Airplane mode, thin case, rugged case, MagSafe wallet, card flat on metal, Google account signed out in the browser.
- Signed-out test: confirm the sign-in page appears and, after sign-in, the review dialog with five empty stars. Do not submit.
- Android with Maps installed: record whether the redirect lands in Chrome or the Maps app.
- QR: scan from 20 cm with the native camera on both platforms; also from 40 cm.
- After every session, compare taps performed with rows at the webhook. Every native tap that opened a browser must have a row.

### Log columns

date, card slug, device model, OS version, browser, case (none/thin/rugged/wallet), phone state (unlocked/locked/camera/LPM/Focus/airplane), taps attempted, taps succeeded, seconds to banner, landing (Safari/Chrome/Maps app/sign-in), signed in (Y/N), reached star picker (Y/N), webhook row seen (Y/N), notes.

### Acceptance for the demo batch

- [ ] 10 of 10 cards read on the newest iPhone and on a Pixel or Galaxy within 2 s in hand, 5 of 5 taps.
- [ ] Redirect lands on the Google review dialog on both platforms when signed in; sign-in page then dialog when signed out.
- [ ] Every card either locked (memory dump shows lock bits) or password-protected (write without password fails), and the state recorded next to its slug.
- [ ] QR scans from 20 cm on both platforms and the row says `source=qr`.
- [ ] Webhook shows one row per tap with the right slug and `source=card`.

---

## 7. Field troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| iPhone: nothing at all | Camera app open; Airplane mode; phone not unlocked since restart; iPhone 7, 8 or X; iPhone 6 or older; empty or non-NDEF tag | Close Camera; unlock once; on 7/8/X use Control Center NFC Tag Reader; otherwise QR. Verify the tag in NFC Tools |
| iPhone: banner appears then vanishes | Guest did not tap it in time | Script: "tap the banner at the top" |
| Android: nothing | Screen locked; NFC off; wrong spot on the back; no NFC hardware | Unlock; Settings > NFC on; slide the card around the upper back; QR |
| Android: "open link" notification, guest confused | Android 17 behaviour, or older confirmation dialog | Script: "then tap Open" |
| Reads only when pressed hard, or at 1 mm | Card on metal table or metal presenter; foil label over the coil; clone chip | Pick the card up; remove foil; replace with a genuine NXP card |
| Reads through no case at all | Rare for a CR80 card; suspect a metal-plate or MagSafe wallet case | Take the phone out of the wallet |
| Opens Google Maps listing, not the review box | `to` is a profile or Maps URL, or the profile is unverified | Use `writereview?placeid=`; verify the profile |
| Redirects to a Google search page | Place ID no longer resolves (merged, suspended, moved) | Refresh the Place ID; update `to`; redeploy |
| Guest lands on a Google sign-in page | Normal. Reviews need a Google account | Script: "sign in once and it brings you back to the review box" |
| Old restaurant page after re-pointing | Change not deployed, or a cached 301 from an earlier setup | Confirm the deploy finished; the route serves 302 with no-store |
| Tap works but no webhook row | `TAP_WEBHOOK_URL` unset or not redeployed after setting it; Airtable automation switched off or run cap reached; Apps Script deployment not updated after a code edit; webhook slower than 8 s | Check env vars in the hosting dashboard and redeploy; `curl -X POST -H 'content-type: application/json' -d '{"slug":"d001","ts":"2026-09-05T00:00:00Z","ua":"curl","referer":"","source":"card"}' "$TAP_WEBHOOK_URL"` and look for the row; section 2.4 |
| Row shows `source=unknown` | Someone typed the printed text URL, or a QR or chip was made before the `?s=` scheme in section 2.1 (any export dated before 2026-09-05) | Typed visits are accepted as `unknown`. Re-export and reprint stale artwork; re-encode stale demo cards. QR scans should log `source=qr` |
| Row shows `unknown:<slug>` | Slug missing from `links.json`, or uppercase or punctuation in the encoded slug | Add the slug; re-encode with lowercase letters, digits, hyphen or underscore only |
| Write fails or "tag is locked" in NFC Tools | Card already locked (by you or the vendor) or password-protected | Use another card, or remove the password if you set one |
| Card reads its URL but a second record appears | Two records written | iPhone uses the first URI record; erase and rewrite with one record |
| "No supported app for this NFC tag" on an older Samsung | Non-NDEF tag; not our cards | Verify the tag is NDEF formatted ([Samsung community](https://eu.community.samsung.com/t5/discussions/no-supported-app-for-this-nfc-tag-pop-up/td-p/1408093)) |

---

## 8. QR code on the back

### Spec

| Item | Value | Source |
|---|---|---|
| Content | `https://tblnt.com/r/<slug>?s=qr` (24 characters plus the slug) | `site/app/(print)/print/card/page.tsx`, `site/components/order/Configurator.tsx` |
| Size | 21 x 21 mm printed, placed 4 mm from the right trim edge and 13 mm from the top | `site/components/card/CardFace.tsx` |
| Symbol | 28 characters (`demo` or `d001`) gives a Version 3 symbol (29 x 29 modules), so each module is about 0.72 mm at 21 mm. Slugs up to 18 characters stay in Version 3; 19 to 38 characters give Version 4 (33 modules, 0.64 mm) | Computed with the `qrcode` package at ECC M on 2026-09-05; guidance is 0.5 mm or larger modules for medium range ([qrcodefyi](https://qrcodefyi.com/guide/size-calculator-guide/)) |
| Error correction | M | Set in code; M is the default recommendation without a logo overlay ([Uniqode](https://www.uniqode.com/blog/qr-code-best-practices/how-to-perfectly-size-your-qr-codes)) |
| Quiet zone | 4 modules on every side, so at least 2.9 mm of clear background around a Version 3 code (2.6 mm at Version 4). Current artwork: about 4 mm to the "Scan to review" caption on all templates; only 2 mm of light plate around the code on the noir and dark brand templates (see the fixes list) | [Denso Wave](https://www.qrcode.com/en/howto/code.html); `site/components/card/CardFace.tsx` |
| Colours | Always dark modules `#15130f` on a transparent background. On noir and dark brand colours `CardFace.tsx` draws a 25 x 25 mm paper-coloured plate behind the code, so the QR is never inverted | `qrColorsFor()` in `site/components/card/cardSpec.ts`; `site/components/card/CardFace.tsx` |
| Logo overlay | None | Keeps ECC M sufficient |
| Files | Vector PDF plus 300 dpi PNG with 3 mm bleed | `site/scripts/README.md` |

Do not use Google's own QR from the Get more reviews dialog. It encodes the long g.page link, so it cannot be counted or re-pointed, and it can only be generated on a desktop browser ([Google Help](https://support.google.com/business/answer/16816815?hl=en)).

### How the site generates it

The print page (`site/app/(print)/print/card/page.tsx`) and the order configurator (`site/components/order/Configurator.tsx`) call the `qrcode` npm package: `` QRCode.toDataURL(`https://${shortUrl}?s=qr`, { margin: 0, errorCorrectionLevel: "M", color: qrColorsFor(design) }) ``, where `shortUrl` is the printed text `tblnt.com/r/<slug>`. The result is embedded as an image in the SVG card face at 21 x 21 mm. `margin: 0` means the library adds no quiet zone; the card background provides it. `node scripts/export-cards.mjs` drives headless Chromium against `/print/card` and writes `cards/exports/<design>/<template>-back.pdf` and `.png`.

Export commands, from the `site` folder with the dev server running:

```sh
node scripts/export-cards.mjs
node scripts/export-print.mjs --name "Restaurant Name"
```

### Pre-print fixes: status on 2026-09-05

Decision: QR scans are counted. They are the fallback for iPhone 7/8/X, phones without NFC and cards on metal, and the report needs to say how many guests reached Google by each route.

Done in code and in the current exports (`cards/exports/*` regenerated 2026-09-05, after the code change):

- `?s=qr` is in the QR string in both `page.tsx` and `Configurator.tsx`. The printed text stays `tblnt.com/r/<slug>`; typed visits log as `unknown` (accepted).
- The "Scan to review" caption baseline is at 39.8 mm, about 4 mm below the code's bottom edge at 34 mm, so the caption clears the 2.9 mm quiet zone on every template.
- Inverted codes are gone: the QR is always dark modules, and the noir and dark brand templates draw a 25 x 25 mm paper plate behind it.

Still open before ordering from the exports:

- [ ] The paper plate leaves only 2 mm of light background around the code on the noir and dark brand templates, under the 4-module (2.9 mm) minimum. Scan-test the exported noir back on three phones from 20 cm and 40 cm. If any scan fails, widen the plate to 27 x 27 mm (`x={qrX - 3} y={10}` in `CardFace.tsx`), re-export with `node scripts/export-cards.mjs`, and scan-test again. The classic and light brand templates have the whole card as quiet zone.
- [ ] Scan one exported back with a phone camera and confirm the decoded string ends in `?s=qr` and the row at the webhook says `source=qr`. Do this on every export, not once.
- [ ] If any export or printed proof is dated before 2026-09-05, throw it away and re-export. That artwork encodes the QR without `?s=qr`.

---

## Sources

- NXP NTAG213/215/216 datasheet: https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf
- wakdev NTAG213 page: https://www.wakdev.com/en/knowledge-base/nfc-chips/nxp-ntag213.html
- wakdev NFC Tools iOS: https://www.wakdev.com/en/apps/nfc-tools-ios.html and release notes: https://www.wakdev.com/en/apps/nfc-tools-ios/release-notes.html
- wakdev advanced NFC commands: https://www.wakdev.com/en/knowledge-base/how-to-guides/how-to-use-advanced-nfc-commands.html
- NXP TagWriter manual: https://inspire.nxp.com/tagwriter/tag-writer-user-manual.pdf
- GoToTags mirroring: https://gototags.com/help/nfc/chip/features/mirroring
- GoToTags encoding and permanent lock service: https://store.gototags.com/nfc-tag-encoding-service/ ; Desktop App credits: https://gototags.com/software/credits
- Seritag, can iPhones lock NFC tags: https://seritag.com/news/can-iphones-lock-nfc-tags
- Tagstand Custom Small Batch (Encode and Lock option): https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/
- wakdev NFC Tools for Desktop release notes (no lock feature): https://www.wakdev.com/en/apps/nfc-tools-pc-mac/release-notes.html
- Airtable pricing: https://airtable.com/pricing
- Google Apps Script web apps (doPost): https://developers.google.com/apps-script/guides/web
- GoToTags iOS background reading: https://gototags.com/help/ios/nfc/reading/background
- GoToTags iPhone compatibility: https://gototags.com/help/ios/nfc/compatibility
- GoToTags blank NTAG213 card: https://store.gototags.com/nfc-pvc-card-ntag213/ ; NTAG215 card (antenna size): https://store.gototags.com/nfc-pvc-card-ntag215/ ; ACR1252U reader: https://store.gototags.com/acs-acr1252u-nfc-usb-reader/
- Tagstand blank NTAG213 card: https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/
- Apple, Adding Support for Background Tag Reading: https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading
- Apple Support, NFC Tag Reader models: https://support.apple.com/en-euro/guide/iphone/aside/asd-nfc-reader/15.0/ios
- Apple Low Power Mode: https://support.apple.com/en-us/101604
- Android NFC basics: https://developer.android.com/develop/connectivity/nfc/nfc
- GrapheneOS lock-screen NFC issue: https://github.com/GrapheneOS/os-issue-tracker/issues/3438
- Samsung community, non-NDEF pop-up: https://eu.community.samsung.com/t5/discussions/no-supported-app-for-this-nfc-tag-pop-up/td-p/1408093
- Serialio iPhone antenna and micro-tag test: https://serialio.com/serialio-news/blog/iphone-read-tiny-nfc-tag/
- Cryptnox antenna map: https://cryptnox.com/phones-antennae-nfc/
- Voyantic phone comparison: https://voyantic.com/blog/posts/nfc-tapping-smartphone-performance-comparison/
- Seritag NFC range: https://seritag.com/qa/what-is-the-maximum-distance-for-nfc-communication
- Seritag on-metal: https://seritag.com/learn/using-nfc/on-metal-nfc-tags
- Seritag card range (chip dip): https://seritag.com/nfc-tags/cards ; custom cards: https://seritag.com/nfc-tags/cp-cards-ntag213
- Shop NFC PVC cards: https://shopnfc.com/en/nfc-cards/11-nfc-cards-in-pvc-ntag213.html
- AlphaCard, printing on smart cards: https://www.alphacard.com/learning-center/understanding-smart-cards/can-i-print-on-smart-cards/
- Metallic foil patent: https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/8393547
- PVC heat limits: https://en.wikipedia.org/wiki/Polyvinyl_chloride
- LINQS clone warning: https://shop.linqs.in/guides/nfc-tag-price-india
- Ixkio chip count vs scan count: https://docs.ixkio.com/explainers/chip-count-vs-scan-count
- Semrush 301 vs 302: https://www.semrush.com/blog/301-vs-302-redirect
- Google, create a review link or QR: https://support.google.com/business/answer/16816815?hl=en
- Google, get reviews (sign-in requirement): https://support.google.com/business/answer/3474122?hl=en
- Google Place IDs: https://developers.google.com/maps/documentation/places/web-service/place-id
- Google Maps UGC policy: https://support.google.com/contributionpolicy/answer/7400114
- Google brand guidance: https://about.google/brand-resource-center/guidance/
- FTC fake reviews rule: https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials
- Android App Links file for search.google.com: https://search.google.com/.well-known/assetlinks.json
- StatCounter US mobile OS: https://gs.statcounter.com/os-market-share/mobile/united-states-of-america ; Android versions: https://gs.statcounter.com/android-version-market-share/mobile/united-states-of-america ; browsers: https://gs.statcounter.com/browser-market-share/mobile/united-states-of-america
- WebstaurantStore check presenters: https://www.webstaurantstore.com/search/check-presenter.html
- Denso Wave QR quiet zone: https://www.qrcode.com/en/howto/code.html
- qrcodefyi QR sizing: https://qrcodefyi.com/guide/size-calculator-guide/
- Uniqode QR best practices: https://www.uniqode.com/blog/qr-code-best-practices/how-to-perfectly-size-your-qr-codes
- Project files: `site/app/r/[slug]/route.ts`, `site/lib/links.ts`, `site/lib/taps.ts`, `site/data/links.json`, `site/.env.example`, `site/components/card/CardFace.tsx`, `site/components/card/cardSpec.ts`, `site/app/(print)/print/card/page.tsx`, `site/scripts/README.md`
