# Research: nfc_tech

_Generated 2026-09-04 by a research workflow. Fact-check verdicts and gap-fill findings are appended below the main report._

# NFC Tap-to-Review Cards: Technical Research Report (nfc_tech)

Date: 2026-09-04. Scope: how to build credit-card-size NFC cards that reliably open a restaurant's Google "write a review" screen on both iPhone and Android, what to order, and how to encode demo cards at home tonight.

---

## 0. Executive summary (the decisions)

| Decision | Recommendation | Why (short) |
|---|---|---|
| Chip | **NXP NTAG213** (NFC Forum Type 2, ISO 14443-A) | 144 B user memory holds a ~130-char URL; cheapest; identical phone compatibility to 215/216; all three share the same counter/mirror/lock/password features ([wakdev](https://www.wakdev.com/en/knowledge-base/nfc-chips/nxp-ntag213.html), [NXP datasheet](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf)) |
| Card body | White PVC, CR80 85.6 x 54 mm, ~0.76–0.9 mm, perimeter copper coil antenna | Standard; perimeter coil gives the best read range of any tag form factor ([Shop NFC](https://shopnfc.com/en/nfc-cards/11-nfc-cards-in-pvc-ntag213.html)) |
| Payload | One NDEF **URI record**, `https://` prefix code 0x04, pointing to a **founder-owned short domain + per-card slug**, server does a **302 redirect** (with `Cache-Control: no-store`) to the restaurant's Google review URL | Re-pointable without re-encoding, per-card analytics, short enough for NTAG213 |
| Lock | Write the URL, test on 3+ phones, then **lock read-only** (static + dynamic lock bits) | Prevents guests/competitors rewriting the card to a malicious URL; irreversible, so test first |
| Tap counting | Do it **server-side** (redirect logs). NTAG21x counter-mirror is optional/advanced | Server counts work on every phone; chip counter needs config-page writes and counts RF reads, not review visits |
| QR fallback | Yes, on the back: ~20 mm QR, error correction L/M, 4-module quiet zone, same short URL | Covers iPhone 7/8/X, NFC-off Androids, thick cases |
| Google target URL | Use the link from Business Profile > Read Reviews > **Get more reviews** (`g.page/r/<ID>/review`) or `https://search.google.com/local/writereview?placeid=<PLACE_ID>` | Official, opens the review dialog directly ([Google Help](https://support.google.com/business/answer/16816815?hl=en)) |

Biggest 2026-specific facts to design around:
- **iPhone XS/XR (2018) and newer** read a URL tag in the background with no app, showing a tappable banner; iPhone 7/8/X need Control Center's NFC Tag Reader; iPhone 6/6s cannot read tags ([Apple Support](https://support.apple.com/en-euro/guide/iphone/aside/asd-nfc-reader/15.0/ios), [GoToTags](https://gototags.com/help/ios/nfc/compatibility)).
- **Android 16** dispatches http/https tags as `ACTION_VIEW`; **Android 17** shows an "open link" notification that requires an explicit user tap before the browser opens; Android scans for tags only when the screen is unlocked ([Android developer docs](https://developer.android.com/develop/connectivity/nfc/nfc)). Plan the guest script for a "tap the notification" step on both platforms.
- Google's review policy (updated April 2026) bans incentives, review gating, pressuring guests on premises, review quotas for staff, and asking for reviews that name a staff member ([Google Maps UGC policy](https://support.google.com/contributionpolicy/answer/7400114?hl=en), [Launchcodex summary](https://launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update/)). The card is fine; the ask must be neutral and optional.

---

## 1. Chip choice: NTAG213 vs NTAG215 vs NTAG216

### 1.1 Facts from the NXP datasheet (Rev 3.2)
Source: [NXP NTAG213/215/216 datasheet PDF](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf) (text extracted locally).

| Parameter | NTAG213 | NTAG215 | NTAG216 |
|---|---|---|---|
| Total EEPROM | 180 B (45 pages x 4 B) | 540 B (135 pages) | 924 B (231 pages) |
| User memory (pages 04h–27h / 04h–81h / 04h–E1h) | 144 B | 504 B | 888 B |
| CC byte 2 (NDEF area advertised) | 12h = 144 B | 3Eh = 496 B | 6Dh = 872 B |
| Config pages | 29h–2Ch | 83h–86h | E3h–E6h |
| Dynamic lock bytes page | 28h | 82h | E2h |
| Write endurance | 100,000 cycles | same | same |
| Data retention | 10 years | same | same |
| 24-bit NFC read counter, UID/counter ASCII mirror, 32-bit password, originality signature | yes | yes | yes |
| Standard | NFC Forum Type 2 Tag, ISO/IEC 14443-A, 13.56 MHz, 106 kbit/s | same | same |

Delivery CC bytes for NTAG213 are `E1 10 12 00`; setting the low nibble of byte 3 to `0F` makes the CC read-only (part of the lock process) (datasheet section 8.5.4).

### 1.2 Max URL length in one NDEF URI record
- An NDEF URI record replaces the leading `https://` with a single identifier byte (0x04; `https://www.` is 0x02) — see the NFC Forum URI RTD prefix table reproduced at [Adafruit](https://learn.adafruit.com/adafruit-pn532-rfid-nfc/ndef) and [Austin Blackstone Engineering](https://austinblackstoneengineering.com/nfc-p2p-basics/).
- Overhead in a Type 2 tag: NDEF TLV tag byte (0x03) + length byte + short-record header (flags, type length, payload length, type 'U') + prefix byte + terminator TLV (0xFE) = about 8 bytes. So NTAG213 fits roughly **~130–136 characters of URL after `https://`**; vendors quote "around 130 characters" for NTAG213, ~480 for NTAG215, ~850 for NTAG216 ([wakdev NTAG213 page](https://www.wakdev.com/en/knowledge-base/nfc-chips/nxp-ntag213.html), [LINQS](https://shop.linqs.in/articles/nfc-tag-data-storage-capacity)). Tagstand lists "Available NDEF Message Memory 137 bytes" for its NTAG213 card ([Tagstand](https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/)).
- Practical rule: keep the encoded URL under ~60 characters (a short domain + slug is 25–35 chars). Never encode the raw Google `writereview?placeid=` URL if you can avoid it (it is ~80 chars and cannot be changed after locking).

### 1.3 Price difference and availability
- Blank white NTAG213 PVC cards: GoToTags **$0.30 (10) / $0.29 (100) / $0.27 (1,000) / $0.23 (10,000)** per card, 85.5 x 54 x 0.9 mm, pre-formatted NDEF, printable direct-to-card/retransfer/UV ([GoToTags store](https://store.gototags.com/nfc-pvc-card-ntag213/)). Tagstand **$0.55/card** (5% off at 25+, up to 30% off at 1,000+) ([Tagstand blank card](https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/)); Tagstand 100-pack **$45.00** (out of stock at time of research, with a tariff-related price-increase notice) ([Tagstand 100-pack](https://www.tagstand.com/products/bulk-pvc-cards-pack-of-100/)). Shop NFC (EU) €1.29 single down to €0.37 at 8,000 ([Shop NFC](https://shopnfc.com/en/nfc-cards/11-nfc-cards-in-pvc-ntag213.html)).
- NTAG215 typically costs only about $0.10–0.20 more per tag than NTAG213 at retail, and NTAG216 carries the largest premium; some vendors price 213 and 215 cards identically at $0.60 ([Boxy comparison](https://boxy-app.com/blog/posts/ntag-comparison-guide), [TagTix](https://tagtixrfid.com/collections/ntag215)). I could not find a single authoritative per-chip wholesale delta; treat these as retail indications.
- Availability: NTAG213 is the default chip at every US NFC vendor (GoToTags, Tagstand, ID Cards Direct, ID Enhancements) and on Amazon in 10/20/30-packs (e.g., [Amazon B01E9B09XS 10-pack](https://www.amazon.com/Ntag213-Blank-White-compatible-Android/dp/B01E9B09XS), [Amazon B0CDC3DGLJ 30-pack](https://www.amazon.com/NTAG213-Printable-Writable-Compatible-NFC-Enabled/dp/B0CDC3DGLJ)); live Amazon prices were not captured. Beware counterfeit "NTAG213" clones: genuine NXP vs clone is often a bigger cost factor than 213 vs 215, and clones may lack the originality signature/counter ([LINQS pricing guide](https://shop.linqs.in/guides/nfc-tag-price-india)).

### 1.4 Is NTAG21x the right Type 2 choice for phones?
Yes. iPhone reads all NFC Forum tag types and chip types except MIFARE Classic ([GoToTags iPhone compatibility](https://gototags.com/help/ios/nfc/compatibility)); Android's tag dispatch handles any NDEF-formatted tag ([Android docs](https://developer.android.com/develop/connectivity/nfc/nfc)). NTAG213 is explicitly listed as supported by NFC Tools on iOS, Android, and desktop ([wakdev desktop](https://www.wakdev.com/en/apps/nfc-tools-pc-mac.html)). Do **not** use MIFARE Classic (iPhone will not read it) or ISO 15693 "SLIX"/ICODE chips unless you have a specific reason (they read through thick cases better in one tiny-tag test — see 2.4 — but are not the ecosystem default for cards).

When to upgrade: NTAG215 only if you want to bundle a second record (e.g., a Smart Poster title) or a long URL with UID+counter mirror plus tracking params; NTAG216 only for vCards/multi-record payloads. For this product, NTAG213 is correct.

---

## 2. iPhone behaviour

### 2.1 Which models read tags without an app (background tag reading)
- **iPhone XS, XS Max, XR (2018) and every later model** (11 through 17 series, SE 2nd gen and later) automatically read NDEF tags in the background and show a banner ([Apple Support model list](https://support.apple.com/en-euro/guide/iphone/aside/asd-nfc-reader/15.0/ios), [GoToTags](https://gototags.com/help/ios/nfc/reading/background), [Seritag](https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone)).
- **iPhone 7, 7 Plus, 8, 8 Plus, X**: must open Control Center and tap the **NFC Tag Reader** control (available since iOS 14), or use a reader app ([Apple Support](https://support.apple.com/en-euro/guide/iphone/aside/asd-nfc-reader/15.0/ios)). Note: iPhone 7 is capped at iOS 15, iPhone 8/X at iOS 16 ([EveryiPhone](https://everymac.com/systems/by_capability/maximum-ios-supported-by-all-iphone.html)); Apple's model list says iPhone X and earlier "don't support background tag reading" ([Apple developer doc](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading)).
- **iPhone 6/6s**: NFC for Apple Pay only; cannot read tags (6s can only via a third-party app; 6 cannot at all) ([GoToTags](https://gototags.com/help/ios/nfc/compatibility)).

### 2.2 What happens when the tag holds a URL
- The system scans continuously while the display is on; on detection it displays a pop-up banner at the top of the screen showing the domain and the handling app (Safari for a plain https URL). The user must **tap the banner** to open it; this is an intentional opt-in privacy step ([GoToTags](https://gototags.com/help/ios/nfc/reading/background)).
- Only the **first URL record** in the NDEF message is processed; https links open Safari unless the domain is a registered Universal Link for an installed app ([NFCore](https://nfcore.app/en-GB/guides/iphone-background-nfc-universal-link)). Encode exactly one URI record.
- **Lock screen**: background reading works whenever the screen is on, locked or not, after the first unlock since boot. If locked when the banner is tapped, iOS prompts for Face ID/passcode first ([GoToTags](https://gototags.com/help/ios/nfc/reading/background), [Seritag news](https://seritag.com/news/apple-adds-iphone-background-nfc-tag-reading-in-core-nfc)).
- Background reading is **unavailable** when: the device has never been unlocked since restart; a Core NFC session is in progress; Apple Pay/Wallet is in use; the camera is in use; Airplane mode is on ([Apple developer doc](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading), verbatim list at [GitHub tutorial](https://github.com/FabianGroeger96/NFC-Background-reading)). "Camera is in use" is the one that bites in restaurants: a guest photographing their dessert will not get the banner until they leave the Camera app.
- Empty or non-NDEF tags produce **no response at all** on iPhone ([Seritag](https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone)).

### 2.3 Antenna position and read range
- The iPhone NFC antenna is along the **top back edge**, best read point near the centre of that edge ([Serialio](https://serialio.com/serialio-news/blog/iphone-read-tiny-nfc-tag/), [Cryptnox](https://cryptnox.com/phones-antennae-nfc/)). Guests should touch the top ~2 cm of the phone to the card.
- Practical range is "a few centimetres" ([Seritag](https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone)); phone readers are usually quoted at ~1 cm for small tags ([arXiv NFC payments analysis](https://arxiv.org/pdf/1904.10623)). A full-perimeter CR80 coil is the largest passive HF antenna you can get in a card, so cards outperform stickers ([Serialio tag types](https://serialio.com/support/common-types-of-nfc-tags/)).

### 2.4 Thick cases and metal tables
- Case material (plastic) does not matter; thickness does. A common clear case is ~1.5 mm; near the camera bump ~2.5 mm. In Serialio's test with a **tiny 4.5 mm NTAG213 tag**, the read range was ~2 mm and it failed through any case, while an ISO 15693 SLIX tag read at ~9 mm through the case ([Serialio](https://serialio.com/serialio-news/blog/iphone-read-tiny-nfc-tag/)). That test is a worst case (micro-tag); a CR80 perimeter coil couples far better, and card-size tags are routinely read through normal cases. Expect trouble only with very thick rugged cases, cases with metal plates, or wallet/MagSafe folios that put a metal plate or cards between phone and tag — test these explicitly (I did not find a published test for MagSafe wallet cases; treat as an open item).
- **Metal**: a card lying flat on a metal table will not read; the metal acts as a ground plane, detunes the antenna and can cut range by >80% ([Seritag Q&A](https://seritag.com/qa/why-dont-nfc-tags-work-on-metal), [IoT For All](https://www.iotforall.com/nfc-metallic-interference-ferrite-solutions)). Even a 3 mm air gap restores on-metal-tag-level performance and a 6 mm gap lets a standard tag outperform a ferrite on-metal tag ([Seritag on-metal](https://seritag.com/learn/using-nfc/on-metal-nfc-tags)). Practical answer for restaurants: the guest picks the card up and taps it in hand (or it sits in the bill presenter/on the receipt), so a metal table is irrelevant unless staff train guests to tap it flat on the table. Ferrite-backed **cards** in CR80 are rare and expensive; ferrite discs (30 mm) exist at roughly €0.75–1.49 ([Shop NFC on-metal](https://shopnfc.com/en/6-on-metal-nfc-tags)). Do not buy on-metal cards; on-metal tags have roughly half the range of standard tags even off metal ([Seritag](https://seritag.com/learn/using-nfc/on-metal-nfc-tags)).

---

## 3. Android behaviour

- **Prevalence**: ~94% of smartphones globally are NFC-enabled (all-OS figure) ([Expert Market Research](https://www.expertmarketresearch.com/blogs/top-nfc-companies), [ElectroIQ](https://electroiq.com/stats/nfc-payment-statistics/)); every Pixel since Pixel 3 and every Galaxy S/flagship has NFC ([RFIDTag list](https://rfidtag.com/top-phones-with-nfc-capability/)). Some budget US Android models (and some carrier prepaid models) omit NFC; I found no authoritative US-Android-only percentage. The QR fallback covers these.
- **No app needed**: a well-formed NDEF URI record launches the default browser via the tag dispatch system ([Android docs](https://developer.android.com/develop/connectivity/nfc/nfc)).
- **Screen must be on and unlocked**: "Android-powered devices are usually looking for NFC tags when the screen is unlocked, unless NFC is disabled" ([Android docs](https://developer.android.com/develop/connectivity/nfc/nfc)). User reports on Pixel and Samsung confirm tags are not read on the lock screen even with the "Require device unlock for NFC" toggle off (that toggle governs payments) ([GrapheneOS tracker](https://github.com/GrapheneOS/os-issue-tracker/issues/3438), [Samsung community](https://us.community.samsung.com/t5/A-Series-Other-Mobile/Galaxy-M34-5G-Phone-with-NFC-can-scan-NFC-tag-only-with-screen/td-p/2609861)).
- **Android 16 / 17 change**: from Android 16, http/https tags trigger `ACTION_VIEW`; from Android 17, scanning such a tag "surfaces an 'open link' notification, requiring explicit user interaction" ([Android docs](https://developer.android.com/develop/connectivity/nfc/nfc)). Older versions (10–15) often already show an "Open link?" confirmation ([Home Assistant issue](https://github.com/home-assistant/android/issues/876)). So on modern Android the UX converges with iPhone: tap card, then tap the notification.
- **Samsung quirks**: One UI added a "No supported app for this NFC tag" pop-up for non-NDEF tags (bank cards in phone cases) in Android 10; it does not affect properly encoded URL tags and reportedly disappeared after Android 11 ([Samsung EU community](https://eu.community.samsung.com/t5/discussions/no-supported-app-for-this-nfc-tag-pop-up/td-p/1408093)). Antenna position varies by brand/model (usually upper-middle back; some models centre) ([Cryptnox antenna map](https://cryptnox.com/phones-antennae-nfc/)); Voyantic's lab found the optimal position differs by model, e.g. upper part at a 30-degree angle on one phone vs slightly below the top on another ([Voyantic](https://voyantic.com/blog/posts/nfc-tapping-smartphone-performance-comparison/)).
- **NFC toggled off**: many Android users disable NFC; the card does nothing. QR fallback again.

---

## 4. NDEF encoding, locking, and tap counters

### 4.1 Tools
- **NFC Tools (wakdev) mobile**: Android (Play Store) and iOS (iPhone 7+, iOS 15.6+). Features: write URL/text/vCard records; "Erase, format & protect: wipe, reformat, lock or password-protect"; "Advanced NFC commands" (raw hex) under Other ([wakdev iOS](https://www.wakdev.com/en/apps/nfc-tools-ios.html), [wakdev advanced commands](https://www.wakdev.com/en/knowledge-base/how-to-guides/how-to-use-advanced-nfc-commands.html)).
- **NFC Tools for Desktop** (Windows/macOS incl. Apple Silicon/Linux) with a PC/SC USB reader such as **ACR122U**, ACR1252U, ACR1255U-J1; reads UID/type/NDEF and writes URL records; supports NTAG213/215/216 ([wakdev desktop](https://www.wakdev.com/en/apps/nfc-tools-pc-mac.html), [Mac App Store listing](https://apps.apple.com/us/app/nfc-tools-for-desktop/id1392471092)). The desktop page does not advertise lock/mirror features; use the phone app for locking.
- **ACR122U**: CCID/PC/SC USB reader, NFC Forum types 1–4; works on macOS via built-in CCID; note ACS lists it as end-of-life and Amazon is full of clones with QC problems — ACR1252U is the supported successor ([GoToTags ACR122U page](https://gototags.com/help/nfc/hardware/desktop/acr122u), [ACS driver page](http://www.acs.com.hk/en/driver/3/acr122u-usb-nfc-reader/), [GoToTags store](https://store.gototags.com/acs-acr122u-nfc-usb-reader/)). I could not confirm a current 2026 price; check the GoToTags store or Amazon listing directly before buying. For 10 demo cards you do **not** need a USB reader — a phone is enough.
- **NXP TagWriter** (Android): the only consumer app with checkboxes "Add Tag UID (mirror)" and "Add Interaction Counter (mirror)" when writing a URL; the manual documents the resulting `?uid=00000000000000x000000` format ([NXP TagWriter manual PDF](https://inspire.nxp.com/tagwriter/tag-writer-user-manual.pdf), [KSEC TagBase guide](https://tagbase.ksec.co.uk/read-write/tagwriter-android/)). Verify it is still on the Play Store on your phone before relying on it.

### 4.2 Writing the URL record (phone)
1. Open NFC Tools > Write > Add a record > **URL/URI**. Enter the full `https://...` URL (the app picks prefix code 0x04 automatically).
2. Tap Write, hold the top of the iPhone (or the antenna area of the Android) on the card until the success haptic/checkmark ([nfc.cool guide](https://nfc.cool/blog/write-nfc-tags-iphone/)).
3. Tap Read to verify the record, then exit the app and tap the card with the phone's native reader to confirm the banner/browser opens the right page.

### 4.3 Locking read-only (why and how)
- Why: an unlocked NTAG213 can be rewritten by anyone with a phone in ~2 seconds — a prankster or competitor could redirect your client's card to a competitor, a fake review page, or malware. Locking sets OTP lock bits (static lock bytes in page 02h, dynamic lock bytes in page 28h for NTAG213, plus CC read-only bits); it is **irreversible** ([NXP datasheet](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf) sections 8.5.2–8.5.4, [NFCFYI](https://nfcfyi.com/guide/how-to-read-write-nfc-tags/)).
- How: NFC Tools > Other > "Erase, format & protect" > **Lock tag** (permanent). Keep the app updated; an old release note fixed NTAG21x locking ([wakdev iOS](https://www.wakdev.com/en/apps/nfc-tools-ios.html), [NFC Tools App Store](https://apps.apple.com/us/app/nfc-tools/id1252962749)).
- Alternative: **password-protect** writes instead of locking (32-bit PWD/PACK, AUTH0 = first protected page, PROT=0 so reads stay open). This keeps the card re-encodable by you. Because you use a redirect domain you rarely need to re-encode, so the simple permanent lock is fine for production; password protection is nicer for demo cards you may want to reuse.
- Always lock **after** the redirect slug is live and tested on at least one iPhone and one Android.

### 4.4 UID / counter mirroring (optional tap counter on the chip)
How it works (datasheet sections 8.6–8.7):
- Enable the 24-bit NFC counter (`NFC_CNT_EN` = bit 4 of the ACCESS byte, page 2Ah byte 0 on NTAG213). It increments on the **first READ or FAST_READ after the tag is powered by an RF field**, stops at FFFFFF, and can be read with READ_CNT or via the mirror.
- The ASCII mirror virtually overwrites part of user memory on read with the UID (14 ASCII hex chars), the counter (6 ASCII hex chars), or both separated by `x` (21 chars). Configure in page 29h: byte 0 = MIRROR byte (bits 7–6 MIRROR_CONF: 01 = UID, 10 = counter, 11 = both; bits 5–4 MIRROR_BYTE = starting byte 0–3; bit 2 STRG_MOD_EN default 1), byte 2 = MIRROR_PAGE (>03h enables; min 04h; max = last user page −3 for UID, −1 for counter), byte 3 = AUTH0 (leave FFh).
- NXP's worked example: encode `http://www.nxp.com/index.html?m=00000000000000x000000`, set MIRROR_PAGE=0Ch, MIRROR_BYTE=1, MIRROR_CONF=11b, NFC_CNT_EN=1; a read then returns `http://www.nxp.com/index.html?m=04E141124C2880x003F31`.
- Concrete NTAG213 commands (send via NFC Tools > Other > Advanced NFC commands, comma-separated): `A2:29:84:00:PP:FF, A2:2A:10:00:00:00` where `84` = counter-only mirror starting at byte 0, `PP` = the page where your `000000` placeholder begins, and ACCESS `10` enables the counter. Compute `PP` by dumping the tag memory (NFC Tools "Memory" or NXP TagInfo) and finding the page/byte of the first `0` of the placeholder; add filler characters to the URL so the placeholder starts on byte 0 of a page. GoToTags recommends filler data at the mirror location and warns not to mirror over the first three or last five pages ([GoToTags mirroring](https://gototags.com/help/nfc/chip/features/mirroring)). Warning: a wrong write to config pages can brick a card; practise on spares.
- Phones handle it fine: the mirror is transparent — iPhone and Android just see a URL with `?c=00003F` on it. But note (a) the counter counts **RF reads**, including reads where the guest dismissed the banner, wallet-brush reads, and your own tests, and (b) the count can only be read by tapping the card, so it does not give you a dashboard. Ixkio documents "chip count" running higher than "scan count" for exactly this reason ([Ixkio](https://docs.ixkio.com/explainers/chip-count-vs-scan-count)). Recommendation: server-side counting is primary; enable counter mirror only on cards you want tamper-evident stats from.

---

## 5. Physical card specification

- **Format**: ISO CR80, 85.60 x 53.98 mm, rounded corners, 0.76 mm nominal (30 mil); NFC cards are slightly thicker in practice: GoToTags 0.9 mm, Tagstand 0.8 mm, ID Cards Direct ~0.82 mm, Seritag laminated 0.82–0.88 mm ([GoToTags](https://store.gototags.com/nfc-pvc-card-ntag213/), [Tagstand](https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/), [ID Cards Direct](https://www.idcardsdirect.com/products/ntag213-rfid-nfc-blank-white-iso-pvc-card), [Seritag custom cards](https://seritag.com/nfc-tags/cp-cards-ntag213)).
- **Construction**: PVC face / inlay (chip + copper coil) / PVC back, laminated. Antenna runs around the **entire perimeter**; chip sits at one corner or edge of the loop ([Shop NFC](https://shopnfc.com/en/nfc-cards/11-nfc-cards-in-pvc-ntag213.html), [LINQS](https://shop.linqs.in/guides/what-is-nfc-card)). Ask the supplier for the antenna/chip position map before finalising artwork.
- **Chip dip**: printed NFC PVC cards can show a ~5 x 5 mm dip near one corner where the chip sits, where print can be uneven ([Seritag](https://seritag.com/nfc-tags/cards)). Keep logos and QR away from that corner.
- **Printing over the antenna**: normal CMYK inks (dye-sub, retransfer, UV inkjet, offset) are non-conductive and fine. **Avoid solid hot-foil / vacuum-metallised aluminium areas over the coil** — metallic foil layers attenuate the RF signal via eddy currents; if you must use foil, pattern it with cutouts or use a non-conductive (NCVM) metallic finish; screen-printed mica metallic inks are low-risk if registered to the antenna position ([US patent 8393547](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/8393547), [US patent 11704531](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11704531), [Proud Tek](https://proudtek.com/products/rfid-cards/transparent-nfc-card/)). For the demo run: no foil, no metallic ink.
- **Finish/durability for restaurant use** (wiped with sanitizer many times a day):
  - Dye-sub with the thin "O" overlay resists fading 3–5 years indoors but the overlay is a light varnish with little abrasion protection; alcohol-based sanitizers and solvents can smudge printed images on plain cards ([Alibaba printer guide](https://electronics.alibaba.com/buyingguides/pvc-id-card-printer-guide-how-to-choose-right), [NDAS](https://ndasphilsinc.com/are-pvc-cards-waterproof-the-complete-guid-from-ndas-phils-inc/), [HID Global](https://blog.hidglobal.com/2022/07/comparing-card-printing-technologies-your-top-7-questions-answered)).
  - Retransfer printing (image sandwiched under a film) or a true polyester **overlaminate** dramatically improves abrasion/chemical resistance; Seritag offers gloss, matte or "crystal matt" lamination and says most customers choose crystal matt for scratch resistance ([Seritag](https://seritag.com/nfc-tags/cp-cards-ntag213), [Entrust](https://www.entrust.com/resources/learn/guide-to-pvc-id-cards-and-printers)).
  - Spec for production: **retransfer or offset print + laminate, matte finish** (matte hides fingerprints and sanitizer haze). PVC is waterproof; the chip is sealed inside.
- **Read range**: a few cm with phones; card must be roughly parallel to the phone back and overlapping the phone's antenna; edge-on presentation couples poorly ([Transact](https://transactcampus.com/engagement/mobile-credential/transact-nfc-field-detector)).

### 5.1 Custom-printed card suppliers (US-first)
| Supplier | MOQ | Price found | Lead time | Notes |
|---|---|---|---|---|
| [Tagstand custom small-batch](https://www.tagstand.com/products/custom-small-batch-pvc-card-white-lanyard-slot-portrait-ntag213) | none | not shown (out of stock at research time) | n/a | UV inkjet, printed and encoded in USA, 300 dpi, 8 pt min text, 3 mm bleed |
| [GoToTags custom cards](https://store.gototags.com/nfc-tags/nfc-cards/custom-nfc-cards/) | varies by material | quote; pre-printed thin cards from $0.74 | 15–20 business days | CMYK, silkscreen, hot stamp; pre-encoding service or self-encode with GoToTags Desktop App; vector CMYK artwork |
| [Seritag custom PVC](https://seritag.com/nfc-tags/cp-cards-ntag213) (UK) | 100 | $2.54/card at 100–199 down to $0.59 at 20k+ | ~4 weeks | double-sided, lamination options, per-card variable QR/ID from a spreadsheet, professional encoding locked/unlocked |
| [Shop NFC](https://shopnfc.com/en/nfc-cards/11-nfc-cards-in-pvc-ntag213.html) (EU) | 10 | €1.29 → €0.37 at 8k (blank); colour print 7–15 working days, express 2–5 | see left | variable QR per card at no extra charge; 89.6 x 58 mm artwork with 2 mm bleed |
| [NFC.CARDS](https://nfc.cards/en/front-and-back-printing/61-custom-nfc-card-ntag213-front-and-back-printing.html) (EU) | low | not shown | 1–5 days | retransfer; avoid large solid colour areas |
| [TagThose](https://www.tagthose.com/product/custom-nfc-card-ntag213/) | low | not shown | n/a | up to 1.0 mm print shift; PNG/JPG/TIFF only |

For the **demo run**: buy 20–30 blank white NTAG213 cards (GoToTags ~$0.29–0.30 or Amazon 30-pack), print branding with a local print shop that has a dye-sub card printer, or simply apply a full-face **printed vinyl/clear label** (non-metallic) for the first prototypes. Encode and lock them yourself.

---

## 6. URL strategy

1. **Get the Google review link** for each restaurant: Business Profile > Read Reviews > **Get more reviews** > Copy (format `https://g.page/r/<ID>/review`), or build `https://search.google.com/local/writereview?placeid=<PLACE_ID>` using the Place ID Finder. Unverified profiles have no review link; test on a logged-out phone ([Google Help](https://support.google.com/business/answer/16816815?hl=en), [ReviewTrackers](https://www.reviewtrackers.com/blog/google-review-link/), [WiserReview](https://wiserreview.com/blog/google-review-link/)).
2. **Never encode the Google URL directly.** Encode `https://<yourshortdomain>/<slug>` where slug is per-card (e.g. `k7q2`) or per-restaurant (`joes`). Benefits: re-pointable if the Place ID changes or the client churns; per-card tap analytics; short enough for NTAG213; brandable in the iPhone banner (the banner shows the domain — a short, clean domain looks more trustworthy than `search.google.com`).
3. **Redirect implementation**: Cloudflare Bulk/Single Redirects work for a static list but give no per-slug analytics; a tiny Cloudflare Worker + KV/D1 gives logging and is free at 100k requests/day ([Cloudflare Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/), [Cloudflare Workers shortener example](https://github.com/IAMDevBox/cloudflare-url-shortener)). Use **302** (not 301 — browsers cache 301s, so you could never re-point a card) and add `Cache-Control: no-store` ([Semrush 301 vs 302](https://www.semrush.com/blog/301-vs-302-redirect), [Stack Harbor](https://stackharbor.com/en/knowledge-base/cf-redirect-rules-bulk-and-dynamic/)). Managed alternatives: TagLink, Ixkio (custom domain, rules by scan count) ([TagLink](https://taglink.com/redirect-for-nfc/), [Ixkio](https://ixkio.com/)).
4. **Domain**: pick a short, memorable HTTPS domain (5–8 chars before the TLD) because guests will read it in the banner and may type it from the QR fallback. HTTPS is mandatory (iOS/Android open http too, but browsers warn).
5. **Compliance on the landing behaviour**: the redirect must send **every** guest straight to Google — no "how was your meal?" sentiment gate, no incentive language on the card, no staff review quotas ([Google UGC policy](https://support.google.com/contributionpolicy/answer/7400114?hl=en), [Launchcodex April 2026 update](https://launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update/)). The FTC's 2024 fake-review rule adds federal exposure for review suppression ([Birdeye](https://birdeye.com/blog/google-review-policy/)). Card copy such as "Tap to review us on Google" is fine; "Tap for 10% off when you review" is not.

---

## 7. QR fallback on the card back

- Purpose: iPhone 7/8/X users, NFC-off Androids, phones in thick cases, guests who do not trust the tap.
- Encode the **same short URL** (~25–35 chars) — a Version 2–3 QR (25–29 modules) at error-correction L or M.
- Size: ISO/IEC 18004 sets no physical module minimum, only a 4-module quiet zone; practical guidance is ~0.4–0.5 mm modules for close range (<30 cm), and a **2 x 2 cm** overall code as the reliable minimum for business cards scanned at 15–30 cm ([QRCodeFYI](https://qrcodefyi.com/guide/size-calculator-guide/), [Scanova](https://scanova.io/blog/minimum-qr-code-size/), [Uniqode](https://www.uniqode.com/blog/qr-code-best-practices/how-to-perfectly-size-your-qr-codes)). Recommended spec: **20–22 mm code, ≥0.6 mm modules, 4-module (≥2.5 mm) white quiet zone, vector/300 dpi, high contrast, no logo overlay, ECC M**. On a 54 x 85.6 mm card this leaves plenty of room. Keep it away from the chip-dip corner.
- Google's own "Get more reviews" dialog can download a QR PNG, but it encodes the long Google URL and can only be generated on desktop ([Google Help](https://support.google.com/business/answer/16816815?hl=en)); generate your own QR for the short URL instead.

---

## 8. Testing protocol for demo cards

### 8.1 Device matrix (borrow from friends/staff)
| Group | Devices | Expected behaviour |
|---|---|---|
| iPhone background readers | iPhone SE (2nd/3rd gen), 11, 12, 13, 14, 15, 16, 17 | Banner within 1 s; tap banner opens Safari to Google review dialog |
| iPhone legacy | iPhone 8 / X (iOS 16) | Nothing until Control Center > NFC Tag Reader; then banner |
| Android stock | Pixel 6–10 (Android 15/16/17) | Screen unlocked: browser opens directly (≤15), or "open link" notification (17) |
| Samsung | Galaxy S22–S26, one A-series | Same as Pixel; find antenna position (often upper-middle back) |
| Edge cases | Phone in rugged case, MagSafe wallet, NFC disabled, Airplane mode, Camera open, lock screen, Low Power Mode, Google account logged out | Document each result |

### 8.2 Failure modes to expect and their fixes
| Symptom | Likely cause | Fix |
|---|---|---|
| iPhone: nothing at all | Camera open / Airplane mode / never unlocked since reboot / iPhone 7-8-X / empty or non-NDEF tag | Close Camera; Control Center reader; verify NDEF with NFC Tools |
| iPhone: banner appears then disappears | Guest did not tap it within a few seconds | Script says "tap the banner at the top" |
| Android: nothing | Screen locked / NFC off / phone antenna not over card / no NFC hardware | Unlock first; toggle NFC; move card around the back; use QR |
| Opens Google Maps listing, not the review box | Wrong link (profile URL instead of review URL) or unverified profile | Use Get more reviews link; verify profile |
| Redirect page shows old restaurant | Browser cached a 301 | Serve 302 + no-store |
| Card reads at 1 mm only | Card on metal bill tray/table, foil sticker over coil, clone chip | Lift card; remove foil; buy genuine NXP |
| Write fails / "tag locked" | Card already locked by vendor or by you | Use a new card |

### 8.3 Guest script (for staff and for the card back)
- Card front: "Tap your phone here to review us on Google" with an NFC wave icon and a small phone-top pictogram.
- Card back: "iPhone: hold the **top edge** of your phone flat against the card, then tap the banner. Android: unlock your phone and hold the **back** of it against the card, then tap 'Open link'. No luck? Scan the QR code." Keep the antenna hint literal: on every iPhone the reader is along the top back edge ([Serialio](https://serialio.com/serialio-news/blog/iphone-read-tiny-nfc-tag/)).
- Server verbal script (policy-safe): "If you'd like to leave us a Google review, this card takes you straight there — just tap the top of your phone on it. Totally optional, and honest feedback helps us most." No incentives, no "give us five stars".

### 8.4 Acceptance criteria for the demo batch
- 100% of cards read on iPhone 13+ and Pixel/Galaxy within 2 s in hand.
- Redirect lands on the Google review dialog (star picker visible) on both OSes when logged in; logged-out shows Google sign-in then the dialog.
- Every card locked (NFC Tools "Read" shows "read-only/locked").
- QR scans from 20 cm with the native camera on both OSes.

---

## 9. One-page technical spec (what to order)

**Card**: ISO CR80 85.60 x 53.98 mm, rounded corners, PVC (or PVC/PET composite if a laminator will be used), total thickness 0.76–0.90 mm, white core.
**Chip/inlay**: genuine NXP **NTAG213** (NFC Forum Type 2, ISO 14443-A, 13.56 MHz, 144 B user memory, 7-byte UID, originality signature), copper perimeter coil antenna, pre-formatted NDEF, delivered **unlocked**.
**Print**: full-colour both sides, retransfer or offset (UV inkjet acceptable for small batches), **matte laminate** (crystal-matt if offered); no hot-foil, no metallic/conductive inks, no metal cores; 300 dpi/vector artwork, 3 mm bleed, keep critical graphics ≥5 mm from the chip corner (ask supplier for the chip/antenna map).
**Front artwork**: restaurant logo (or "Tap to review us on Google"), NFC wave symbol, phone-top pictogram, one-line instruction.
**Back artwork**: 20–22 mm QR (ECC M, ≥0.6 mm modules, 4-module quiet zone) encoding the short URL; 3-line instructions for iPhone/Android; short URL printed in text; tiny card ID (the slug) in the corner.
**Encoding**: single NDEF URI record, prefix 0x04 (`https://`), URL `https://<shortdomain>/<slug>` ≤ 40 chars; no second record. Optional: NFC counter enabled + counter ASCII mirror appended as `?c=000000`.
**Lock**: after verification, set static + dynamic lock bits and CC read-only (NFC Tools "Lock tag"); or password-protect writes (PWD/PACK, AUTH0 = 04h, PROT = 0) if you want to retain re-encoding.
**Server**: HTTPS short domain; per-slug 302 redirect with `Cache-Control: no-store` to the restaurant's Google review URL; log timestamp, slug, user-agent (for iOS/Android split) and optional `c=` counter.
**Quantity for demo**: 25 blank cards (10 encoded demos + spares for mistakes/locking practice).
**Budget indication**: blank NTAG213 cards $0.29–0.55 each ([GoToTags](https://store.gototags.com/nfc-pvc-card-ntag213/), [Tagstand](https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/)); custom-printed from $2.54/card at 100 (Seritag) with US quotes from Tagstand/GoToTags; USB reader optional.

---

## 10. "Encode 10 blank cards in your kitchen tonight" procedure

Time: ~45 minutes. Needs: 10+ blank NTAG213 PVC cards, an iPhone XS-or-newer **or** an NFC Android, the free NFC Tools app, your short-domain redirect already live (or, for a pure demo, the raw `g.page/r/<ID>/review` link of a friendly restaurant), a marker/labels.

1. **Prepare the redirect** (15 min, laptop): create slugs `d01`…`d10` on your short domain, each 302-redirecting (no-store) to the demo restaurant's Google review link. Test each in a desktop browser and on your phone. If the domain is not ready tonight, encode the `g.page/r/<ID>/review` link directly on the 10 demo cards and accept that those cards are single-purpose.
2. **Install NFC Tools** on the phone (iOS 15.6+/iPhone 7+, or Android). Turn NFC on (Android), close the Camera app, disable Airplane mode.
3. **Inspect one card**: NFC Tools > Read > hold the top of the iPhone (or back of Android) flat on the card. Confirm "NXP NTAG213", "144 bytes", writable, NDEF formatted. If it says "locked", set the card aside.
4. **Write card 1**: Write > Add a record > URL/URI > enter `https://<shortdomain>/d01` > Write > hold on the card until success. Read it back.
5. **Native test**: exit the app, lock/unlock the phone, hold the card to the top of the iPhone: banner appears > tap > Safari opens the Google review dialog. On an Android: unlock, hold, confirm browser (or "open link" notification on Android 17) opens the same page. Also test from the lock screen (iPhone) to see the unlock prompt.
6. **(Optional) counter mirror on 2 cards**: write the URL as `https://<shortdomain>/d01?c=000000`; dump memory in NFC Tools to find the page where `000000` starts (pad the URL with extra characters so it starts on byte 0 of a page); Other > Advanced NFC commands > "I assume" > send `A2:29:84:00:PP:FF, A2:2A:10:00:00:00` with `PP` = that page in hex; read the card twice and confirm the URL now ends in an incrementing hex value. Skip this if unsure — it is not needed for the demo.
7. **Label**: write the slug on the card back with a marker (or a printed label) so you can match cards to redirect logs.
8. **Repeat 4–7** for d02…d10. Batch tip on Android: NFC Tools > Write > "Write / many tags" writes the same record repeatedly; change the slug between cards.
9. **Lock** each verified card: Other > Erase, format & protect > Lock tag (permanent) > hold to card. Re-read: it should now report read-only. Alternatively set a password (Other > Password protection) if you want to keep the demos re-encodable.
10. **QR fallback for the demo**: generate a QR for each slug (any generator, ECC M, SVG), print at 20–22 mm on sticker paper and apply to the back — or skip for tonight and show the QR concept on the mock-up.
11. **Final regression**: tap all 10 on the iPhone and on one Android; check your redirect logs show 20 hits; put 2 cards in a phone-case test (thick case, MagSafe wallet) and one on a metal baking tray to demonstrate the metal-table caveat to yourself.
12. **Pitch prep**: carry an iPhone with Camera closed and screen on; hand the card to the owner and say "hold the top of your phone on it".

---

## 11. Sources

- NXP NTAG213/215/216 datasheet (Rev 3.2): https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf
- NXP product page: https://www.nxp.com/products/NTAG213_215_216
- wakdev NTAG213 chip page: https://www.wakdev.com/en/knowledge-base/nfc-chips/nxp-ntag213.html
- wakdev NFC Tools iOS: https://www.wakdev.com/en/apps/nfc-tools-ios.html
- wakdev NFC Tools desktop: https://www.wakdev.com/en/apps/nfc-tools-pc-mac.html
- wakdev advanced NFC commands: https://www.wakdev.com/en/knowledge-base/how-to-guides/how-to-use-advanced-nfc-commands.html
- NFC Tools for Desktop (Mac App Store): https://apps.apple.com/us/app/nfc-tools-for-desktop/id1392471092
- NXP TagWriter manual (mirror checkboxes): https://inspire.nxp.com/tagwriter/tag-writer-user-manual.pdf
- GoToTags chip mirroring: https://gototags.com/help/nfc/chip/features/mirroring
- GoToTags iOS background reading: https://gototags.com/help/ios/nfc/reading/background
- GoToTags iPhone compatibility: https://gototags.com/help/ios/nfc/compatibility
- GoToTags ACR122U: https://gototags.com/help/nfc/hardware/desktop/acr122u
- Apple: Adding Support for Background Tag Reading: https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading
- Apple Support: models that support NFC Tag Reader: https://support.apple.com/en-euro/guide/iphone/aside/asd-nfc-reader/15.0/ios
- Background reading conditions (mirror of Apple doc): https://github.com/FabianGroeger96/NFC-Background-reading
- NFCore universal link/first record: https://nfcore.app/en-GB/guides/iphone-background-nfc-universal-link
- Seritag iPhone reading: https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone
- Seritag on-metal tags: https://seritag.com/learn/using-nfc/on-metal-nfc-tags and https://seritag.com/qa/why-dont-nfc-tags-work-on-metal
- Seritag custom PVC cards: https://seritag.com/nfc-tags/cp-cards-ntag213 ; card range: https://seritag.com/nfc-tags/cards
- Serialio iPhone case/read-range test: https://serialio.com/serialio-news/blog/iphone-read-tiny-nfc-tag/
- Android NFC basics (tag dispatch, Android 16/17): https://developer.android.com/develop/connectivity/nfc/nfc
- GrapheneOS NFC-while-locked issue: https://github.com/GrapheneOS/os-issue-tracker/issues/3438
- Samsung community threads: https://us.community.samsung.com/t5/A-Series-Other-Mobile/Galaxy-M34-5G-Phone-with-NFC-can-scan-NFC-tag-only-with-screen/td-p/2609861 ; https://eu.community.samsung.com/t5/discussions/no-supported-app-for-this-nfc-tag-pop-up/td-p/1408093
- Home Assistant "Open link?" issue: https://github.com/home-assistant/android/issues/876
- URI prefix table: https://learn.adafruit.com/adafruit-pn532-rfid-nfc/ndef ; https://austinblackstoneengineering.com/nfc-p2p-basics/
- Google: Create a link or QR code to request reviews: https://support.google.com/business/answer/16816815?hl=en
- Google Maps UGC prohibited content: https://support.google.com/contributionpolicy/answer/7400114?hl=en
- April 2026 policy update summary: https://launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update/
- ReviewTrackers review link guide: https://www.reviewtrackers.com/blog/google-review-link/ ; WiserReview: https://wiserreview.com/blog/google-review-link/
- GoToTags blank card pricing: https://store.gototags.com/nfc-pvc-card-ntag213/ ; custom cards: https://store.gototags.com/nfc-tags/nfc-cards/custom-nfc-cards/
- Tagstand blank card: https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/ ; 100-pack: https://www.tagstand.com/products/bulk-pvc-cards-pack-of-100/ ; custom small batch: https://www.tagstand.com/products/custom-small-batch-pvc-card-white-lanyard-slot-portrait-ntag213
- Shop NFC PVC cards: https://shopnfc.com/en/nfc-cards/11-nfc-cards-in-pvc-ntag213.html ; on-metal range: https://shopnfc.com/en/6-on-metal-nfc-tags
- ID Cards Direct: https://www.idcardsdirect.com/products/ntag213-rfid-nfc-blank-white-iso-pvc-card
- Amazon listings: https://www.amazon.com/Ntag213-Blank-White-compatible-Android/dp/B01E9B09XS ; https://www.amazon.com/NTAG213-Printable-Writable-Compatible-NFC-Enabled/dp/B0CDC3DGLJ
- ACS ACR122U driver page: http://www.acs.com.hk/en/driver/3/acr122u-usb-nfc-reader/ ; GoToTags store: https://store.gototags.com/acs-acr122u-nfc-usb-reader/
- Chip price comparisons: https://boxy-app.com/blog/posts/ntag-comparison-guide ; https://tagtixrfid.com/collections/ntag215 ; https://shop.linqs.in/guides/nfc-tag-price-india
- Metallic foil / NFC patents: https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/8393547 ; https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11704531 ; Proud Tek: https://proudtek.com/products/rfid-cards/transparent-nfc-card/
- Ferrite physics: https://www.iotforall.com/nfc-metallic-interference-ferrite-solutions
- Card durability/printing: https://blog.hidglobal.com/2022/07/comparing-card-printing-technologies-your-top-7-questions-answered ; https://www.entrust.com/resources/learn/guide-to-pvc-id-cards-and-printers ; https://ndasphilsinc.com/are-pvc-cards-waterproof-the-complete-guid-from-ndas-phils-inc/ ; https://electronics.alibaba.com/buyingguides/pvc-id-card-printer-guide-how-to-choose-right
- QR sizing: https://qrcodefyi.com/guide/size-calculator-guide/ ; https://scanova.io/blog/minimum-qr-code-size/ ; https://www.uniqode.com/blog/qr-code-best-practices/how-to-perfectly-size-your-qr-codes
- Redirects: https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/ ; https://github.com/IAMDevBox/cloudflare-url-shortener ; https://www.semrush.com/blog/301-vs-302-redirect ; https://stackharbor.com/en/knowledge-base/cf-redirect-rules-bulk-and-dynamic/ ; https://taglink.com/redirect-for-nfc/ ; https://ixkio.com/ ; https://docs.ixkio.com/explainers/chip-count-vs-scan-count
- Phone antenna positions: https://cryptnox.com/phones-antennae-nfc/ ; Voyantic: https://voyantic.com/blog/posts/nfc-tapping-smartphone-performance-comparison/
- NFC prevalence: https://www.expertmarketresearch.com/blogs/top-nfc-companies ; https://electroiq.com/stats/nfc-payment-statistics/ ; https://rfidtag.com/top-phones-with-nfc-capability/
- iOS version ceilings: https://everymac.com/systems/by_capability/maximum-ios-supported-by-all-iphone.html
- nfc.cool iPhone writing guide: https://nfc.cool/blog/write-nfc-tags-iphone/ ; NFCFYI read/write: https://nfcfyi.com/guide/how-to-read-write-nfc-tags/



---

## Fact-check verdicts

- **confirmed**: NTAG213/215/216 have 144/504/888 bytes of user memory, 100,000 write-cycle endurance, 10-year retention, a 24-bit NFC read counter and UID/counter ASCII mirror; NTAG213 config pages are 29h-2Ch, dynamic lock bytes at page 28h, user memory pages 04h-27h.  
  Correction: Verified directly in the NXP datasheet text: '144, 504 or 888 bytes freely available user Read/Write area', 'Data retention time of 10 years', 'Write endurance 100.000 cycles', 'automatically increase the 24 bit counter value', UID and NFC counter ASCII mirror, 'Pages 29h to 2Ch for NTAG213' (configuration pages), 'dynamic lock bytes are located at page 28h' (NTAG213), 'Pages 04h to 27h for NTAG213' (user memory).  
  Source: https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf
- **confirmed**: An NTAG213 holds a URL of roughly 130 characters after NDEF overhead; NFC Tools on iOS works from iPhone 7 / iOS 15.6, and background reading works from iPhone XS/XR onward.  
  Correction: Wakdev page states verbatim: 'a URL of around 130 characters once the NDEF envelope is taken into account' and 'Background reading works from the iPhone XS and XR onwards, and both reading and writing are possible via NFC Tools from the iPhone 7 on iOS 15.6 or later.' Note this is a vendor (NFC Tools maker) page, not Apple; the iOS 15.6 figure is the app's own minimum-version statement.  
  Source: https://www.wakdev.com/en/knowledge-base/nfc-chips/nxp-ntag213.html
- **confirmed**: iPhone 7, 7 Plus, 8, 8 Plus and X must turn on NFC Tag Reader in Control Center; iPhone XR/XS/SE 2nd gen and later read tags automatically.  
  Correction: Apple iPhone User Guide (iOS 15) lists exactly: manual Control Center activation for iPhone 7, 7 Plus, 8, 8 Plus, X; automatic support for iPhone SE (2nd generation and later), XR, XS, XS Max, 11-13 series.  
  Source: https://support.apple.com/en-euro/guide/iphone/aside/asd-nfc-reader/15.0/ios
- **confirmed**: iPhone background tag reading is unavailable when the device has never been unlocked since restart, a Core NFC session is active, Apple Pay/Wallet is in use, the camera is in use, or Airplane mode is on; the user must tap the pop-up banner to open the URL.  
  Correction: GoToTags page lists: unlocked once since startup, no Core NFC session or Apple Pay transaction in progress, camera not in use, Airplane mode not enabled, and 'The user must click on the pop-up to perform the action'. Apple's own Core NFC documentation (reproduced verbatim in the FabianGroeger96 tutorial and summarized in Apple's HIG NFC page) lists the same five conditions including 'Apple Pay Wallet is in use'. GoToTags also notes background reading requires iPhone XS or newer.  
  Source: https://gototags.com/help/ios/nfc/reading/background
- **confirmed**: Android scans for NFC tags only when the screen is unlocked; from Android 16 http/https tags trigger ACTION_VIEW and from Android 17 an 'open link' notification requires explicit user interaction before the browser opens.  
  Correction: Android developer docs: 'Android-powered devices are usually looking for NFC tags when the screen is unlocked'; 'Starting in Android 16, scanning NFC tags that store web links ... triggers the ACTION_VIEW intent'; 'Beginning with Android 17, scanning such a tag surfaces an "open link" notification, requiring explicit user interaction to trigger the ACTION_VIEW intent.' Practical implication for the founder: on Android 17 the guest gets a notification to tap, same as iPhone, rather than the browser opening directly.  
  Source: https://developer.android.com/develop/connectivity/nfc/nfc
- **confirmed**: GoToTags sells blank white NTAG213 PVC cards (85.5 x 54 x 0.9 mm, NDEF pre-formatted) at $0.30 (10), $0.29 (100), $0.27 (1,000), $0.23 (10,000) per card.  
  Correction: Product page (fetched 2026-09-04) shows NXP NTAG213, white, 85.5 x 54 x 0.9 mm, 'Pre NDEF Formatted', and tiers $0.30 (10), $0.29 (100), $0.27 (1,000), $0.23 (10,000), plus $0.20 (50,000) and quote at 100,000+.  
  Source: https://store.gototags.com/nfc-pvc-card-ntag213/
- **partially_correct**: Tagstand blank NTAG213 PVC card is $0.55 each (5% off at 25+, up to 30% off at 1,000+); its 100-pack lists at $45.00 but was out of stock with a tariff price-increase notice.  
  Correction: Price and discount ladder confirmed on the single-card page today: $0.55 base, 5% off at 25-49, 10% at 50-99, 20% at 100-499, 27% at 500-999, 30% at 1,000+ (1,335 in stock). The 100-pack (bulk-pvc-cards-pack-of-100) is $45.00 and 'Out of stock' as of today. However, neither page currently shows a tariff/price-increase notice; that banner ('the current tariff situation will cause restocking delays and necessary price increases') appears only in crawls from Sept-Dec 2025, so the tariff notice detail is stale.  
  Source: https://www.tagstand.com/products/bulk-pvc-cards-pack-of-100/
- **confirmed**: Seritag custom-printed NTAG213 PVC cards: MOQ 100, $2.54/card at 100-199 down to $0.59 at 20,000-49,999, 0.82-0.88 mm thick, ~4 weeks lead time, lamination and per-card variable QR available.  
  Correction: Seritag page (USD pricing selected) shows MOQ 100; $2.54 (100-199), $1.56 (200-299), $1.24 (300-499), $0.98 (500-999), $0.78 (1,000-1,999), $0.69 (2,000-4,999), $0.63 (5,000-9,999), $0.60 (10,000-19,999), $0.59 (20,000-49,999), contact for 50,000+; 'Thickness will depend on lamination but typically 0.82-0.88mm (30 Mil)' with spec line 0.86 mm; 'Current production time is estimated at 4 weeks'; gloss/matt/crystal-matt lamination; variable QR/ID encoded from a spreadsheet. Note Seritag is UK-based; US buyers should confirm shipping/duties.  
  Source: https://seritag.com/nfc-tags/cp-cards-ntag213
- **confirmed**: GoToTags custom NFC cards have 15-20 business day lead times and are quote-priced; pre-printed thin cards start at $0.74.  
  Correction: Page states 'Custom NFC cards are made to order with lead times of 15 to 20 business days', uses a quote-request form, and lists 'Printed NFC Thin Card (NTAG213): As low as $0.74', 'Printed PVC NFC Card (NTAG213): As low as $0.55', 'Printed PVC NFC Badge (NTAG213): As low as $0.80'. The 'as low as' figures are high-volume floors, not small-batch demo pricing.  
  Source: https://store.gototags.com/nfc-tags/nfc-cards/custom-nfc-cards/
- **confirmed**: Google's official review link is generated via Business Profile > Read Reviews > Get more reviews; offering incentives for reviews is prohibited; review QR codes can only be generated on a computer browser.  
  Correction: Google Business Profile Help: 'Go to your Business Profile. Select Read Reviews and then Get more reviews'; 'Offering incentives, like free or discounted goods or services, to customers in exchange for reviews is considered fake engagement and is strictly prohibited'; 'Currently, reviews QR codes can only be generated on a computer browser, not on mobile devices.'  
  Source: https://support.google.com/business/answer/16816815?hl=en
- **confirmed**: Google's Maps policy prohibits incentives, discouraging negative reviews, selectively soliciting positive reviews, and pressuring users to leave reviews; the April 2026 update also bans staff review quotas and requests naming staff.  
  Correction: All prohibitions verified on Google's Prohibited & restricted content page, including 'Merchants requesting that staff solicit a certain number of reviews' and 'Merchants requesting that staff solicit reviews that include specific content, including content that identifies a staff member.' Google's page itself carries no date; the April 17, 2026 timing comes from secondary reporting (PPC Land, Search Engine Roundtable). Important for this business: the policy also says merchants 'should not require or pressure users to leave ratings or write reviews while on the premises', so the card should be a neutral invitation, not a server-driven push, and the AI report naming praised servers must not be tied to staff quotas.  
  Source: https://support.google.com/contributionpolicy/answer/7400114?hl=en
- **confirmed**: A standard NFC tag fails on metal, but even a 3 mm air gap performs as well as an on-metal tag and at 6 mm a standard tag outperforms one; on-metal tags have about half the range of normal tags even off metal.  
  Correction: Seritag article: metal acts as a ground plane and stops the antenna powering the chip; a 3 mm gap gives performance equal to on-metal variants; at 6 mm standard tags outperform on-metal tags; on-metal tags on non-metal surfaces have scan distance roughly halved (Seritag claims its own ferrite tags are an exception). Vendor test, not independent.  
  Source: https://seritag.com/learn/using-nfc/on-metal-nfc-tags
- **partially_correct**: In a tiny-tag (4.5 mm) test, NTAG213 read at ~2 mm on iPhone 13-15 and failed through a ~1.5 mm case; the iPhone NFC antenna is at the top back edge.  
  Correction: Source (Serialio, Jan 27 2025) lists '~2mm' read range for a 4.5 x 1.8 mm NTAG213 PCB tag on iPhone 15 Pro Max/14/13 Pro and says the NFC reader is 'at the top-back-edge of the iPhone, with best read point about the center.' But the failure test was different from what the claim says: the tiny NTAG213 was mounted on a rubber standoff 'over 5mm thick' and 'fails to read with any iPhone, with or without a thin iPhone case'; the 1.5 mm figure is just the measured thickness of a typical clear case. This test concerns a 4.5 mm micro tag and is not representative of a full-size CR80 card antenna, which reads at several cm.  
  Source: https://serialio.com/serialio-news/blog/iphone-read-tiny-nfc-tag/
- **partially_correct**: Practical QR floor for close-range print is ~0.4-0.5 mm modules and a 2 x 2 cm overall code; ISO 18004 mandates a 4-module quiet zone but no physical minimum.  
  Correction: The cited qrcodefyi guide actually says close range (<30 cm) works with modules 'as small as 0.33 mm', 0.5 mm minimum for medium range, and recommends 2-3 cm codes for business cards; it does not state 0.4 mm, 2 x 2 cm, or the quiet-zone rule. The 4-module quiet zone is genuinely from ISO/IEC 18004 (DENSO Wave: 'QR Code requires a four-module wide margin at all sides of a symbol'; qrcodekit confirms 2 modules for Micro QR and no fixed physical minimum in the standard). The 0.4 mm module and 2 x 2 cm figures are common industry rules of thumb from other guides, not from the cited source.  
  Source: https://www.qrcode.com/en/howto/code.html

### Fact-checker notes
## Fact-check summary (verified 2026-09-04)

**Confirmed (10/14):** Claims 1, 2, 3, 4, 5, 6, 8, 9, 10, 11. The NXP datasheet was downloaded and parsed directly; every number and page address in claim 1 matched. GoToTags blank-card pricing, Seritag custom-card pricing, Google review-link steps and the Maps policy text were all re-read from the live pages.

**Partially correct (4/14):**
- **Claim 7 (Tagstand):** $0.55 base price, discount ladder, and $45 out-of-stock 100-pack are correct today, but the tariff price-increase notice is no longer on the site (only in Sept-Dec 2025 crawls). Treat it as stale.
- **Claim 13 (Serialio tiny-tag test):** The NTAG213 failure was caused by a >5 mm rubber standoff, and it failed both with and without a case; the 1.5 mm figure is just a typical case thickness. Also, this is a 4.5 mm micro-tag test with little bearing on a full-size card.
- **Claim 14 (QR sizing):** The cited qrcodefyi page says 0.33 mm modules for close range and 2-3 cm for business cards, not 0.4-0.5 mm / 2 x 2 cm. The 4-module quiet zone is correctly attributed to ISO/IEC 18004 (confirmed via DENSO Wave, the QR inventor).
- **Claim 11 date nuance:** the staff-quota / staff-name prohibitions are verbatim on Google's policy page; the "April 2026" date is only from secondary reporting (PPC Land, Search Engine Roundtable, both citing an April 17, 2026 sighting), which is consistent but not on Google's page.

**Business-relevant flags found while verifying:**
- Google explicitly says merchants should not "require or pressure users to leave ratings or write reviews while on the premises." A server dropping a card is fine as a passive invitation, but any script, quota, or "ask them to mention your name" coaching violates policy, and the AI report's per-server praise/criticism feature should not be marketed as a staff-incentive tool.
- Android 17 now interposes an "open link" notification (like iOS), so the "tap and you're on the review screen" pitch should say "tap, then tap the notification" on both platforms.
- Realistic demo-batch cost is not stated anywhere; verified floor is ~$0.30-$0.55 per blank card plus printing, versus $2.54/card at Seritag's 100 MOQ.


## Completeness critic

- Config-page hardening after 'Lock tag': the NFC Tools lock only sets the static/dynamic lock bits on user memory (pages 03h-27h). NTAG213 config pages 29h-2Ch stay writable unless CFGLCK (ACCESS byte bit 6) is set, so a prankster could still set a password with PROT=1 and AUTH0=04h and make the card unreadable (denial of service), or change mirror settings. The report never mentions CFGLCK, never says whether NFC Tools' lock sets it, and gives no concrete PWD/PACK/AUTH0/PROT write commands (pages 2Bh/2Ch/29h byte 3/2Ah bit 7) for its recommended password-protection alternative.
- No verified small-batch US price for custom-printed NTAG213 cards at demo quantity (10-50). Tagstand custom small-batch was out of stock with no price, GoToTags is quote-only, Seritag is UK with MOQ 100 at $2.54; no Amazon/Etsy print-on-demand NFC card option or local print-shop quote was found, so the founder has no number for 'what do 20 branded demo cards cost and how long do they take'.
- Whether a dye-sub/retransfer card printer (local print shop) will accept a 0.8-0.9 mm NFC card with a chip bump: most desktop card printers spec max ~1.0 mm and vendors warn the chip dip can damage printheads/ribbons. The report recommends 'a local print shop with a dye-sub card printer' without checking feasibility, and does not test whether a full-face vinyl label reduces read range.
- How the Google review URL actually behaves on phones: does g.page/r/<ID>/review or search.google.com/local/writereview?placeid= open the Google Maps app (universal link/app link) or Safari/Chrome, and does the Maps app land on the star picker? The logged-out flow ('Google sign-in then the dialog') is asserted, not tested; no mention that Place IDs can change or how to re-fetch them.
- Redirect stack is not reconciled with the founder's existing Next.js 16 site: the report proposes Cloudflare Workers/KV but does not say whether to use Next.js middleware/redirects on Vercel instead, how to log taps, or what the guest-IP/user-agent logging implies for a privacy policy (CCPA). No candidate short domains, TLD choice, or registrar price were found.
- Brand/trademark rules for the card face: using the 'Google' wordmark or G logo on a printed card (Google brand permissions) and printing the NFC Forum N-Mark (requires a free N-Mark trademark licence). Neither is mentioned even though the spec says 'NFC wave symbol' and 'Tap to review us on Google'.
- Android app-chooser and browser quirks: on Samsung with Samsung Internet + Chrome installed, an https tag can trigger an 'Open with' chooser; Android 16/17 'open link' notification behaviour is cited from docs only, with no description of what it looks like or whether the 'Android 17' rollout share matters in 2026. No US-Android NFC-hardware percentage or estimate of how many users keep NFC off.
- Anti-collision / multiple-card scenarios: what happens when the review card sits in a bill presenter next to the guest's contactless credit card, or the guest's phone is in a wallet case containing payment cards (phone may select the wrong tag, or Samsung shows 'No supported app'). Not covered in the test matrix.
- Counter-mirror procedure is under-specified: it hardcodes MIRROR_BYTE=0 (0x84) and tells the founder to pad the URL so the placeholder starts on byte 0, instead of computing MIRROR_BYTE (bits 5-4) from the dump; does not say whether NFC Tools on iOS can send raw A2 (WRITE) commands via Core NFC, nor whether the mirror survives after the lock bits are set; no example of what a bricked config write looks like or how to detect it.
- Genuine-vs-clone verification: the report warns about counterfeit NTAG213 but gives no procedure (NXP TagInfo originality-signature check, READ_SIG) or which Amazon listings/vendors ship genuine NXP; Amazon live prices were not captured.
- ACR122U/ACR1252U current price and macOS driver status in 2026 not found; also unclear whether NFC Tools for Desktop can lock or password-protect tags (report says 'does not advertise'), so the desktop path for a production run of hundreds of cards is unresolved. GoToTags pre-encoding service price is not given.
- Sanitizer durability has no test data: sources are generic PVC-ID-card marketing; nothing on quaternary-ammonium or 70% alcohol wipes on laminated NFC cards, expected service life in months, or whether the demo 'vinyl label over blank card' survives wiping.
- Total demo budget and timeline are missing: no summed cost (cards + domain + optional reader + labels/QR stickers), no shipping lead time for blank cards (the 'tonight' procedure assumes cards are already in hand), and no decision on whether to order pre-printed or self-encoded for the first 100 production cards.
- Card-in-hand vs on-table usage is asserted without evidence: the metal-table problem is dismissed because 'the guest picks the card up', but the product description says the server drops the card on the table. No guidance on a non-metal holder/stand, or on how thick a card sleeve/holder can be before read range suffers.
- iPhone banner timing and persistence: the report says the banner disappears if not tapped 'within a few seconds' with no source, and expects reads 'within 1 s' in one table and 'within 2 s' in another; no measured read distance for a CR80 card through a 1.5 mm or 2.5 mm case (only a micro-tag test is cited).

### Critic notes
## Internal contradictions and weak reasoning

- **"Never encode the Google URL directly" (Section 6) vs Section 10 step 1**, which tells the founder to encode the raw `g.page/r/<ID>/review` link if the domain is not ready. This is acknowledged but undercuts the whole URL strategy; a demo card locked to one restaurant's Google URL cannot be reused for the next pitch.
- **Lock recommendation is incomplete for its own threat model.** Section 4.3 justifies locking as protection against a competitor rewriting the card, but the recommended NFC Tools lock only covers user memory. The config pages (password, PROT, mirror) remain writable unless CFGLCK is set, so a hostile party can still disable reads by setting a password with PROT=1. The report never mentions CFGLCK.
- **Counter-mirror instructions are inconsistent.** Step 6 says "dump memory to find the page where 000000 starts" and then "pad the URL so it starts on byte 0 of a page", yet the datasheet's MIRROR_BYTE field (which the report itself describes in 4.4) exists precisely to avoid padding. Also, the counter increments on the first READ after power-up, so the founder's own verification reads and NFC Tools reads will inflate the count before the card ever reaches a guest; the report notes this but still calls the feature "tamper-evident".
- **Metal-table dismissal contradicts the product concept.** Section 2.4 says a metal table "is irrelevant unless staff train guests to tap it flat on the table", but the brief says the server drops the card on the table and the guest taps it. No holder/stand or table-material guidance is given.
- **Read-time expectations differ** between 8.1 ("Banner within 1 s") and 8.4 ("within 2 s"), and neither is sourced.
- **Case thickness evidence is weak**: the only cited test is a 4.5 mm micro-tag, which the report itself calls a worst case, then extrapolates that CR80 cards "are routinely read through normal cases" with no source. MagSafe wallets are left open.
- **NFC prevalence (~94%)** comes from a market-research blog and is a global all-OS figure; the report admits no US-Android number, so the Android section's headline stat is not decision-useful.
- **Price data is thin exactly where the founder needs it**: blank-card prices are solid, but custom-printed small-batch US pricing is absent (Tagstand out of stock, GoToTags quote-only), Amazon prices "not captured", ACR122U price "could not confirm", NTAG213 vs 215 delta "no authoritative" source. The one-page spec's "budget indication" therefore only covers blank cards.
- **Android 16/17 behaviour** is taken from a single developer-doc paragraph; there is no description of the Android 17 "open link" notification UX or how widely Android 17 is deployed in Sept 2026, yet the guest script is rewritten around it.
- **Google review link format** (`g.page/r/<ID>/review`) and the "logged-out shows sign-in then dialog" flow are asserted from help-centre/blog text rather than tested on a phone, and the Maps-app-vs-browser handoff on iOS/Android is never discussed.
- **Tools claims are partly unverified**: NFC Tools iOS "Lock tag" and "Advanced NFC commands" support is inferred from feature-list pages; whether raw WRITE (A2) commands work through Core NFC on iPhone is not confirmed; NXP TagWriter availability is flagged "verify it is still on the Play Store".
- Minor: Section 1.2 says "~130-136 characters" while Tagstand quotes 137 bytes of NDEF memory; both are fine, but the report should state one number (approximately 136 URL characters after the prefix byte) in the spec.


---

## Gap-fill research
# NFC Tap-to-Review Cards: Gap-Fill Research (nfc_tech, round 2)

Date: 2026-09-04. Method: primary sources (NXP datasheet text extracted locally, Google/Android/Apple/Vercel/Next.js docs, vendor store pages fetched today) plus a few live HTTP tests run from this machine with curl. Where I could not find a number I say so rather than guess. Amazon and Etsy blocked automated fetches (403/bot wall), so no live prices from those two marketplaces.

---

## 1. Config-page hardening after "Lock tag" (CFGLCK, AUTH0, PROT, PWD/PACK)

**What the datasheet actually says** (NXP NTAG213/215/216 Rev 3.2, text extracted from https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf):
- Config pages on NTAG213: 29h = `MIRROR | RFUI | MIRROR_PAGE | AUTH0`; 2Ah = `ACCESS | RFUI | RFUI | RFUI`; 2Bh = `PWD` (4 bytes); 2Ch = `PACK PACK RFUI RFUI` (Table 8).
- ACCESS byte bits (Table 10): bit 7 `PROT`, bit 6 `CFGLCK`, bit 5 RFUI, bit 4 `NFC_CNT_EN`, bit 3 `NFC_CNT_PWD_PROT`, bits 2-0 `AUTHLIM`.
- `PROT`: "0b ... write access is protected by the password verification; 1b ... read and write access is protected by the password verification".
- `CFGLCK`: "1b ... user configuration permanently locked against write access, except PWD and PACK"; and "The CFGLCK bit activates the permanent write protection of the first two configuration pages. The write lock is only activated after a power cycle of NTAG21x."
- "The PWD and PACK are writable even if the CFGLCK bit is set to 1b. Therefore it is strongly recommended to set AUTH0 to the page where the PWD is located after the password has been written. This page is 2Bh for NTAG213."
- "In the initial state of NTAG21x, password protection is disabled by a AUTH0 value of FFh. PWD and PACK are freely writable in this state. Access to the configuration pages and any part of the user memory can be restricted by setting AUTH0 to a page address within the available memory space."
- `AUTHLIM` 000b = unlimited negative attempts; 001b-111b = max attempts, after which "any further negative password verification leads to a permanent locking of the protected part of the memory" (also quoted by NCC Group: https://nccgroup.com/us/research-blog/the-abcs-of-nfc-chip-security).

**Does NFC Tools "Lock tag" set CFGLCK?** Not documented anywhere I could find. wakdev describes Lock as a permanent read-only operation and Password as a reversible alternative (https://www.wakdev.com/en/knowledge-base/videos/how-to-protect-your-nfc-tags.html, https://www.wakdev.com/en/knowledge-base/how-to-protect-an-nfc-chip-with-a-password.html) but never mentions AUTH0/CFGLCK. An NXP community post describes NFC Tools' *password* function setting AUTH0=04h and its *remove password* setting AUTH0=27h (https://community.nxp.com/t5/NFC/Can-t-remove-NTAG213-protection/m-p/1014471, cited via search; the page is behind a Cloudflare challenge). Treat "Lock tag" as user-memory-only until you verify: after locking, use NFC Tools > Read > Memory (or NXP TagInfo) and read page 2Ah byte 0 - if bit 6 is 0 (e.g. `00`), config pages are still open.

**The DoS attack is real on a merely-locked card**: static/dynamic lock bits cover only pages 03h-27h; pages 29h-2Ch remain writable. Anyone with NFC Tools' "Advanced NFC commands" can send `A2:2B:xx:xx:xx:xx` (their own PWD), `A2:29:00:00:00:04` (AUTH0=04h) and `A2:2A:80:00:00:00` (PROT=1) and the card becomes unreadable by every phone; only their password can undo it. Symptoms of a bricked/hijacked config: iPhone shows no banner at all; NFC Tools "Read" shows UID/type but the NDEF read fails or reports the tag as password protected; a memory dump stops at page 03h. Recovery without the password: none.

**Hardening sequence (NTAG213, send via NFC Tools > Other > Advanced NFC commands, comma-separated; do it on the card *before or after* Lock tag, config pages are independent of the lock bits):**
1. `A2:2B:P1:P2:P3:P4` - write your 32-bit PWD (page 2Bh).
2. `A2:2C:K1:K2:00:00` - write 16-bit PACK (page 2Ch).
3. `A2:2A:40:00:00:00` - ACCESS: PROT=0 (reads stay open), CFGLCK=1, NFC_CNT_EN=0, AUTHLIM=000b. Use `50` instead of `40` if you also want the tap counter (NFC_CNT_EN, bit 4).
4. `A2:29:MM:00:MP:29` - write page 29h last: keep MIRROR byte `MM` and MIRROR_PAGE `MP` at their current values (`00`/`00` if no mirror), AUTH0=29h so *every* config page (29h-2Ch, incl. PWD/PACK) needs PWD_AUTH to write. User memory (already locked) stays outside the password scope.
5. Remove and re-present the card (power cycle) so CFGLCK takes effect; then re-read page 2Ah and confirm `40`/`50`.
Note: with CFGLCK=1, pages 29h/2Ah are permanently frozen (mirror settings included). If you want to keep the option of changing mirror settings, skip CFGLCK and rely on AUTH0=29h + PWD only (`A2:2A:00:00:00:00` then `A2:29:MM:00:MP:29`). To later write PWD/PACK you first send `1B:P1:P2:P3:P4` (PWD_AUTH) in the same session. Raw command codes (WRITE A2h, PWD_AUTH 1Bh, READ_CNT 39h, READ_SIG 3Ch) are from datasheet Table (command overview). A Flipper Zero issue shows the same style of raw writes (`A22B...`, `A22C...`, `A229...`) and explains AUTH0=2Bh vs lower values: https://github.com/flipperdevices/flipperzero-firmware/issues/4300.

NXP's own AN13089 "NTAG 21x features and hints" (Rev 1.0, May 2021, https://www.puntoflotante.net/AN13089.pdf) lists as system-level countermeasures: set the CC lock bit and all block-locking bits (write them twice), and "Protect CC bytes / lock bits by password protection (AUTH0)" - i.e. lock bits plus password, not either alone.

## 2. Verified small-batch price for branded demo cards (10-50)

| Source | What | Price today | MOQ / lead time | URL |
|---|---|---|---|---|
| Tagstand (USA) Custom Small Batch NFC Card, white PVC, **NTAG215**, CR80, UV-inkjet full-bleed colour, "velvet texture", printed and encoded in USA | branded card | **$2.60 per card** (store API `price: 260` cents); tier discounts exist in a JS table but were not exposed to fetch | **no MOQ**; 691 in stock; "ship within 1 week of placing your order" | https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/ |
| Tagstand Custom Small Batch, NTAG213 portrait/lanyard-slot variant | branded card | not shown | **Out of stock** | https://www.tagstand.com/products/custom-small-batch-pvc-card-white-lanyard-slot-portrait-ntag213 |
| GoToTags (USA) Printed PVC NFC Card NTAG213, 0.84-0.86 mm, digital/offset, gloss or matte | branded card | $11.99 (1), $8.50 (5), $7.95 (10), $2.85 (25), $2.40 (50), $2.00 (100), $1.35 (500), $1.05 (1,000), $0.55 (10k+); dual-sided +$1.80; encoding separate | **MOQ 500**, lead time 3 weeks | https://store.gototags.com/printed-pvc-nfc-card-ntag213-nfc-tag/ |
| GoToTags Printed NFC Thin Card NTAG213 (0.36 mm, aluminium antenna) | branded thin card | $1.50 (500) to $0.74 (10k+) | MOQ 500, 3 weeks | https://store.gototags.com/printed-nfc-thin-card-ntag213/ |
| GoToTags NFC Tag Encoding Service | encode + optional lock | $0.23 (50), $0.19 (100), $0.06 (1,000), $0.05 (50k), $0.04 (100k+) | min 30 tags; 1-7 days | https://store.gototags.com/nfc-tag-encoding-service/ |
| GoToTags blank NTAG213 PVC card, 0.9 mm | blank | $0.30 (10), $0.29 (100), $0.27 (1,000), $0.23 (10k), $0.20 (50k) | "Normally Stocked", "Immediate" | https://store.gototags.com/nfc-pvc-card-ntag213/ |
| Tagstand blank NTAG213 PVC card | blank | $0.55; 5% off 25-49 ($0.52), 10% 50-99 ($0.50), 20% 100-499 ($0.44), 27% 500-999 ($0.40), 30% 1,000+ ($0.39); 1,335 in stock | in stock | https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/ |
| ID Cards Direct (Alpharetta GA) NTAG213 blank, 0.82 mm | blank 100-pack | $185.00 ($1.85/card) | listed "Unavailable" | https://www.idcardsdirect.com/products/ntag213-rfid-nfc-blank-white-iso-pvc-card |
| Seritag (UK) custom PVC NTAG213 | branded | $2.54 (100-199), $1.56 (200-299), $1.24 (300-499), $0.98 (500-999), $0.78 (1,000+) | MOQ 100; "estimated at 4 weeks" | https://seritag.com/nfc-tags/cp-cards-ntag213 |
| Etsy "Google review tap card" market (e.g. custom logo NFC+QR card; pack of 20 custom NFC Google review cards) | branded, seller-programmed | **prices not captured (Etsy returns 403 to fetchers)** | varies | https://www.etsy.com/market/google_review_tap_card , https://www.etsy.com/listing/1570328375/custom-nfc-google-review-cards-collect , https://www.etsy.com/listing/1654699562/custom-google-nfc-qr-code-tap-card-made |

**Answer to "what do 20 branded demo cards cost and how long":** Tagstand small batch = 20 x $2.60 = **$52 + shipping, about 1 week**, no MOQ, NTAG215 (NTAG215 behaves identically to NTAG213 on phones; the extra memory is harmless). The GoToTags branded card is cheaper per unit only at 500+ (MOQ 500 = $675). Local print shop quotes were not obtainable online (see 3).

## 3. Will a local dye-sub card printer take a 0.84-0.9 mm NFC card?

- Thickness: Zebra ZC300 accepts "10-40 mil" (0.25-1.0 mm) cards, direct-to-card dye-sub (https://www.zebra.com/us/en/products/spec-sheets/printers/card/zc300-series.html). Fargo DTC1250e: "9 mil ... to thicker 40 mil technology cards" (https://www.alphacard.com/id-card-printers/fargo-dtc1250e-id-card-printer). So 0.84-0.9 mm passes the thickness spec of common desktop DTC printers (adjust the card-thickness gate).
- Chip bump: The Card Network: "you may not get a completely even print finish where the chip sits", causing "a lighter patch, blotch or small white area"; avoid logos/QR at the chip area and full dark floods; "a retransfer printer is the better option for RFID and smart cards where print quality is important" (https://www.thecardnetwork.co.uk/blogs/news/can-you-print-on-rfid-cards-direct-to-card-printer). Industry guidance says embedded electronics "can damage the DTC printhead because the printhead comes in direct contact with the card surface" and recommends retransfer, which "never comes in contact with the uneven card surfaces" (https://identisgroup.com/newsroom/2021/07/direct-to-card-or-retransfer-which-card-printer-is-right-for-your-application/ ; https://www.aptika.com/blog/understanding-the-differences-between-direct-to-card-and-retransfer-printing/). Retransfer runs hotter and vendors recommend composite (PVC/PET) cards to limit warping (https://info.jobrien.com/direct-to-card-vs.-re-transfer-printing-which-id-card-printer-technology-is-right-for-you).
- Practical: ask the shop whether the printer is DTC (Zebra ZC, Fargo DTC, Evolis Primacy, Magicard 300) or retransfer (Fargo HDP, Evolis Avansia, Magicard Prima). DTC shops may refuse chip cards or ask you to sign a printhead waiver; if they accept, print one test card and inspect the chip corner. No local-shop price could be gathered online.
- Full-face vinyl label and read range: **no published measurement found.** Inference from the physics/vendor data: a non-metallic label is a thin dielectric (roughly 0.1 mm) on a card whose free-air range on an iPhone is about 65 mm (see 18); only conductive layers (metal foil, metallic ink) matter, and Seritag's data show even 3 mm of non-metal spacing over metal restores on-metal-tag performance (https://seritag.com/learn/using-nfc/on-metal-nfc-tags). Expect no measurable loss, but do a 10-second A/B with one labelled and one bare card.

## 4. How the Google review URL behaves on phones (tested at HTTP level today)

- `https://search.google.com/local/writereview?placeid=<ID>` requested logged-out with an iPhone Safari UA **and** with an Android Chrome UA both returned `HTTP 302 Location: https://accounts.google.com/ServiceLogin?continue=https://search.google.com/local/writereview?placeid=...` with `cache-control: private`. So the logged-out flow is confirmed: Google sign-in first, then bounce back to the review dialog.
- `https://g.page/r/<ID>/review` returns `302` to the same path with a trailing slash (`/review/`) and then continues to Google; with an invalid ID it dead-ends at google.com, so a wrong/obsolete ID fails silently with no error page.
- Universal links (iOS): `/.well-known/apple-app-site-association` returns **404** on g.page, search.google.com (which redirects to www.google.com), maps.google.com and www.google.com. Apple's CDN fetches that file from the domain, so without it the Google Maps iOS app cannot claim these URLs: **on iPhone the review link opens in Safari**, not the Maps app.
- App Links (Android): `https://search.google.com/.well-known/assetlinks.json` **exists** and grants `com.google.android.apps.maps` `delegate_permission/common.handle_all_urls`. So on Android with Google Maps installed and link-verification intact, the `writereview` link can open **directly inside the Google Maps app** (which shows the star picker), while `g.page` (no assetlinks.json) opens in the browser first. Test both on a Pixel and a Galaxy; if you want a uniform browser experience, redirect to `g.page/r/.../review`; if you want the app, use `search.google.com/local/writereview`.
- Google's official instructions: Business Profile > Read Reviews > Get more reviews; "reviews QR codes can only be generated on a computer browser" (https://support.google.com/business/answer/16816815?hl=en).
- Place IDs: "Place IDs may change over time"; "A place ID may become obsolete if a business closes or moves"; refresh "at no charge" with `https://places.googleapis.com/v1/places/PLACE_ID?fields=id&key=API_KEY`; `NOT_FOUND` = obsolete; obsolete IDs "may continue to be returned in Place Autocomplete responses for a few days" (https://developers.google.com/maps/documentation/places/web-service/place-id). Run a monthly cron that refreshes every stored Place ID and alerts you when one changes - your redirect layer makes the fix a one-row update.

## 5. Redirect stack on the existing Next.js 16 / Vercel site, tap logging, privacy

- `next.config.js` `redirects()` are static, use **307** (`permanent: false`) or **308** (`permanent: true`, "cache the redirect forever"), and need a redeploy to change - fine for a handful of fixed slugs, wrong for per-restaurant re-pointing and gives no logging (https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects, v16.3.4). Use a Route Handler instead, e.g. `app/r/[slug]/route.ts`: look up the slug in your DB (Postgres/Neon/Supabase or Upstash Redis), insert a tap row, and return `NextResponse.redirect(target, 302)` with `Cache-Control: no-store`. Serve it on the short domain via a Vercel domain alias; Cloudflare Workers are not needed.
- Do not rely on Vercel runtime logs as your analytics: retention is **1 hour on Hobby, 1 day on Pro, 30 days only with Observability Plus** (https://vercel.com/docs/logs/runtime, updated 2026-08-28). Write your own tap table: `ts, slug, restaurant_id, os (from UA), ua_family, ip_hash (salted, truncated), c (counter mirror value if any)`.
- Privacy: California's CCPA lists "Internet Protocol address" explicitly as personal information and a "unique identifier" (Civ. Code 1798.140, https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1798.140.&lawCode=CIV). It only *applies* to businesses over $25M revenue, or handling 100,000+ consumers/households, or earning 50%+ from selling PI (same source; https://oag.ca.gov/privacy/ccpa) - you are under all three, but publish a privacy policy anyway: state that a tap records timestamp, card ID, device type and a hashed/truncated IP for fraud and analytics, retained N days, never sold. Hash IPs at write time; you never need raw IPs.
- Domain price (Porkbun, https://porkbun.com/products/domains, fetched today): .link $7.72; .us $7.00; .cc $8.55 (sale $3.40 first year); .com $11.08; .app $14.93 (HSTS-preloaded, HTTPS forced); .me $17.27; .xyz $14.21; .co $31.20; .io/.to $51.80. Cloudflare Registrar sells at registry cost with no markup (https://www.cloudflare.com/products/registrar/). `.tap` is not offered. Candidate patterns (availability **not** checked): a 3-5 letter word on .link or .cc (e.g. `rvw.cc`, `tapr.link`), or `<brand>.app`. Avoid anything containing "google" (see 6).

## 6. Brand and trademark rules for the card face

- Google's "Customer reviews" brand guidance: "Include one of our logos (either the Google G or full Google wordmark)"; describe ratings as being "on Google"; don't use "Google-rated"/"Google rating"; "Don't add stars by the Google name or logos"; no unofficial logos/badges/lockups; keep all logos the same size in a group; rules apply to "print or digital ads" and marketing materials generally (https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/, formerly https://about.google/brand-resource-center/guidance/user-reviews/). General rules: don't use Google's colour combination as decoration, don't put "Google" in your brand/product/domain name, don't imply endorsement (https://about.google/brand-resource-center/brand-elements/, https://about.google/brand-resource-center/guidance/). So "Tap to review us on Google" with an unmodified G logo is explicitly allowed; "Google-rated 5 stars" is not; and the still-unnamed business must not be "GoogleTap"-anything.
- NFC Forum N-Mark: free click-through licence for members and non-members ("available at no charge", https://nfc-forum.org/build/branding). Guidelines v09.2021 (https://nfc-forum.org/uploads/Branding-and-Marks/NFC_N_Mark_Guidelines.pdf): show ® in registered jurisdictions (US is one) or ™, upper right; the symbol "may be omitted" if the N-Mark is under 5 mm high; minimum height 3 mm (v1/v2), 4 mm (v4), 10 mm (v3); clear space = half the mark's height; attribution "The N-Mark is a trademark or registered trademark of NFC Forum, Inc. in the United States and in other countries." on packaging/literature, or "on printed matter distributed together with the product" if not feasible on the item; the N-Mark must appear only where the licensee's own trademark is present and where the tag actually is; colours PMS 7463 (coated)/2965 (uncoated), HEX #002e5f, or black/white. Seritag confirms the N-Mark and the newer Wayfinding marks are free, but the EMVCo contactless-payment wave symbol is **not** free and requires EMVCo approval for non-payment use (https://seritag.com/qa/which-nfc-logo-is-free-to-use) - so do not copy the payment-terminal "(((" symbol; use the N-Mark or a generic phone-plus-waves pictogram of your own.

## 7. Android chooser and browser quirks

- Android docs: "If more than one application can handle the intent, the Activity Chooser is presented so the user can select the Activity", and Google explicitly warns that a chooser at tap time forces the user to break the connection (https://developer.android.com/develop/connectivity/nfc/nfc). From Android 16 a URL tag fires `ACTION_VIEW`; "Beginning with Android 17, scanning such a tag surfaces an 'open link' notification, requiring explicit user interaction" (same page, verbatim). The Android 17 behavior-changes page does not describe or screenshot the notification (https://developer.android.com/about/versions/17/behavior-changes-all) and I found no press screenshot; treat the exact look as unknown until you test on a Pixel on Android 17.
- Samsung: with Samsung Internet and Chrome both installed and no default browser chosen, Galaxy users report a browser-selection popup on link opens (https://forum.developer.samsung.com/t/url-skeme-problem-of-samsung-internet/24753, https://forum.developer.samsung.com/t/open-link-in-chrome-doesnt-work-anymore/29914). Mitigation on the card back: "choose either browser, then Always".
- Share numbers: US mobile OS share Aug 2026 is iOS 60.68% / Android 39.29% (https://gs.statcounter.com/os-market-share/mobile/united-states-of-america). Android version distribution (Statcounter April 2026 via https://apilevels.com/): Android 16+ 22.3% cumulative, 15+ 41.0%, 14+ 54.5%; Android 17 0% (beta at the time). So in autumn 2026 the Android 17 notification affects only fresh Pixels and early One UI 9 devices; it will matter more in 2027. No source gives a US-Android NFC-hardware percentage or a share of users with NFC switched off; the QR fallback remains the mitigation.

## 8. Anti-collision and the bill-presenter / wallet-case scenario

- NTAG21x: "An intelligent anticollision function allows to operate more than one tag in the field simultaneously. The anticollision algorithm selects each tag individually" (datasheet section 1.5). That is the ISO 14443-3 mechanism; it lets a *reader* enumerate tags, but phones dispatch one tag per detection and you cannot control which one wins.
- Real-world symptom on Android: "you have placed a credit card, rewards card, or debit card with a scanner tag too close to the back of your phone. If you are using a folding case with cards inside it, this is highly likely to occur" - the phone reads the bank card and shows "No supported app for this NFC tag"; fixes are an RFID-blocking case or an aluminium strip (https://appuals.com/no-supported-app-for-this-nfc-tag-error/). On iPhone, background reading ignores non-NDEF tags silently (https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone), so a nearby credit card can simply make the tap "do nothing".
- Design/test implications: (a) never present the review card stacked on the guest's payment card in the bill presenter - put it in the receipt sleeve on its own or hand it over separately; (b) add to the device matrix: phone in a wallet case with 2 payment cards, review card on top of a contactless credit card, review card in a metal-clip check presenter; expected outcomes are "no banner / wrong card / Samsung popup"; (c) Apple's Core NFC pages could not be fetched (JS-only), so I could not confirm the in-app "more than one tag found" message; not needed for background reading.

## 9. Counter-mirror procedure (computing MIRROR_BYTE, iOS raw commands, lock interaction)

- Datasheet Table 9: MIRROR byte = bits 7-6 `MIRROR_CONF` (01 UID, 10 counter, 11 both), bits 5-4 `MIRROR_BYTE` ("the byte position within the page defined by the MIRROR_PAGE byte"), bit 2 `STRG_MOD_EN` (default 1). Mirror is enabled by `MIRROR_PAGE > 03h`; if the mirror would exceed user memory "the data will not be mirrored". GoToTags: do not mirror over the first three or last five pages, and encode filler where the mirror lands (https://gototags.com/help/nfc/chip/features/mirroring).
- Compute instead of pad: dump memory (NFC Tools "Dump & export tag memory" exists on iOS: https://www.wakdev.com/en/apps/nfc-tools-ios.html), find the absolute byte offset `o` of the first `0` of your `000000` placeholder (page 04h byte 0 is offset 16). Then `MIRROR_PAGE = o div 4` and `MIRROR_BYTE = o mod 4`. Counter-only MIRROR byte values: `84` (byte 0), `94` (byte 1), `A4` (byte 2), `B4` (byte 3). Example: placeholder at offset 58 -> page 0Eh, byte 2 -> `A2:29:A4:00:0E:FF, A2:2A:10:00:00:00`.
- iOS raw commands: NFC Tools for iOS lists "Send custom commands to NTAG, MIFARE and other chips" and "Dump & export tag memory" (iPhone 7+, iOS 15.6+), and wakdev's guide shows the Advanced NFC commands screen for both Android and iOS with the "I assume" gate (https://www.wakdev.com/en/knowledge-base/how-to-guides/how-to-use-advanced-nfc-commands.html). Core NFC exposes raw MIFARE/NTAG commands to apps, so yes, page writes to 29h/2Ah work from an iPhone.
- Mirror after locking: lock bits protect pages 03h-27h only; the mirror configuration lives in 29h/2Ah and the mirror is "virtual" (overlaid at read time, datasheet 8.7), so it can be enabled *after* Lock tag as long as the placeholder characters were written before locking and you have not set CFGLCK/AUTH0 over the config pages. Ixkio's managed service says the chip counter "needs to be enabled when the tags are encoded and cannot be added later" - that is their workflow constraint, not a chip limit (https://docs.ixkio.com/explainers/chip-count-vs-scan-count). Not tested by me; verify on a spare.
- What a bad config write looks like: a mis-typed page 29h with AUTH0 <= 04h plus page 2Ah with PROT=1 makes every phone ignore the card and NFC Tools fail the NDEF read (only UID visible); AUTH0 too low with PROT=0 leaves reads working but blocks your own later writes. AN13089 also warns that NTAG 21x "is not a security certified product" and that mirror/counter values are only a "basic plausibility check" (https://www.puntoflotante.net/AN13089.pdf).

## 10. Genuine-vs-clone verification and where to buy

- Procedure: NTAG21x carries a 32-byte ECDSA (secp128r1) originality signature read with `READ_SIG` = `3C 00`; validate with NXP's app note AN11350 public key. Tools: NXP **TagInfo** (iOS App Store, v3.2.1 updated June 2026, "Originality Check support" for NXP families: https://apps.apple.com/us/app/nfc-taginfo-by-nxp/id1246143596; Android: https://play.google.com/store/apps/details?id=com.nxp.taginfolite) and the free **GoToTags Desktop App** ("can validate the originality signature", https://gototags.com/help/nfc/chip/features/originality-signature). Limits: "some highly configurable NFC chips may support UID and signature manipulation", so a clone that copies UID+signature from one genuine chip passes; a fleet of such clones would share a UID, which TagInfo/your own READ_CNT check will expose (counter missing or UID repeated). NXP community shows the READ_SIG APDU sequence on ACS readers (https://community.nxp.com/t5/NFC/NFC-NTAG213-READ-SIG-Originality-Signature-Verification-Using/td-p/1888739).
- Acceptance test per batch: sample 3 cards -> TagInfo shows "NTAG213", originality check "valid", unique UIDs, READ_CNT (`39 02`) responds, GET_VERSION product code matches.
- Vendors: GoToTags and Tagstand both list NXP as chip maker on their SKUs (URLs above). GoToTags' Oct 2025 rig test found "Amazon NTAG215 cards underperformed due to inferior antenna design and manufacturing quality" with the highest read-distance variance versus a verified supplier (https://gototags.com/articles/which-nfc-chip-type-is-the-best). **Amazon live prices could not be captured** (product pages return a bot wall to scripted fetches); if you buy on Amazon, run the TagInfo test before printing.

## 11. Desktop readers, macOS drivers, desktop locking, encoding service

- GoToTags store today: ACS **ACR122U** $49.59 (1), $47.30 (10), $45.21 (50), $43.92 (100), "Normally Stocked" (https://store.gototags.com/acs-acr122u-nfc-usb-reader/); ACS **ACR1252U** $44.32 (1), $42.89 (10), "Limited Supply" (https://store.gototags.com/acs-acr1252u-nfc-usb-reader/); GoToTags' own-branded ACR1252U is discontinued. GoToTags warns the ACR122U "has been cloned by several Chinese companies and sold for low-prices on Amazon, eBay, Alibaba ... these devices should be avoided" (https://gototags.com/help/nfc/hardware/desktop/acr122u).
- macOS: both are CCID/PC-SC class devices and work with the built-in macOS CCID driver; ACS's ACR1252U driver page lists a download dated 28-Jul-2026 (https://www.acs.com.hk/en/driver/342/acr1252u-usb-nfc-reader-iii-nfc-forum-certified-reader/) and the open-source acsccid driver lists the ACR1252U IDs (https://acsccid.sourceforge.io/). No "Sequoia/Tahoe certified" statement found; expect plug-and-play.
- NFC Tools for Desktop (latest v2.7, no dates given): release notes list "Added password protection feature" (1.8), "Fix password feature for ACR122U" (1.9), "Edit memory for NTAG" (1.10), macOS Big Sur/Apple Silicon fixes (2.3) - **no "lock/read-only" entry** (https://www.wakdev.com/en/apps/nfc-tools-pc-mac/release-notes.html). Tested readers include ACR122U and ACR1252U (https://www.wakdev.com/en/apps/nfc-tools-pc-mac.html). For hundreds of cards use either the free GoToTags Desktop App (encode + lock + originality check with an ACR1252U) or GoToTags' encoding service: $0.23/tag at 50, $0.19 at 100, $0.06 at 1,000, min 30, "choose whether to permanently lock", 1-7 days (https://store.gototags.com/nfc-tag-encoding-service/). Tagstand's small-batch card is delivered "printed and encoded" (URL in 2).

## 12. Sanitizer durability - what data exists

- Peer-reviewed: Journal of Hospital Infection 2024, "Chemical resistance testing of plastics: material compatibility of detergent and disinfectant products" (https://www.journalofhospitalinfection.com/article/S0195-6701(24)00169-5/fulltext): all 2-in-1 wet wipes tested contained environmental-stress-cracking agents; products with pH > 8.0 caused 74% of failures; 22 of 39 plastics cracked; quat formulations with added amines or alcohol cracked more; method BS EN ISO 22088-3. (Fetch blocked at ScienceDirect; figures as reported in search extract.)
- Vendor coupon test (Ecolab): "Quaternary Disinfectant Wipes did not cause any damage"; "high alcohol wipes resulted in irreversible corrosion and whitening"; hydrogen-peroxide wipes left residue (https://www.ecolab.com/offerings/disinfectant-wipes/quaternary-disinfectant-wipes).
- Card industry: a dye-sub overlay is about 0.25 mil and rated "2 to 3 years" medium durability; a polyester laminate is 0.5-1 mil and marketed for "chemical attack" and abrasion resistance (https://www.idcardgroup.com/overlaminates, https://www.idwholesaler.com/learning-center/why-laminate-plastic-id-cards/; both pages fetched via search extracts, direct fetch 403).
- **No test exists for NFC cards, laminated PVC vs 70% IPA wipes, or a vinyl label over a card; no service-life-in-months figure is published.** Run your own: 3 cards each of (Tagstand UV-inkjet, laminated retransfer, blank + vinyl label), wiped 20x/day for 30 days with the restaurant's actual product (most US restaurants use quat sanitiser buckets, not alcohol). Score print fade, edge lift of the label, and read range weekly.

## 13. Demo budget and timeline (summed)

| Item | Qty | Cost | Lead time | Source |
|---|---|---|---|---|
| Branded demo cards, Tagstand small batch (NTAG215, printed+encoded) | 20 | $52.00 (+ shipping, not shown) | ships within 1 week | Tagstand URL in 2 |
| or blank NTAG213 cards for self-encoding/labels | 25 | $7.50 (GoToTags $0.30) or $13.00 (Tagstand $0.52) | in stock / immediate | URLs in 2 |
| Short domain | 1 yr | $7-15 (.link $7.72, .com $11.08, .app $14.93) | minutes | Porkbun |
| Vinyl/QR labels for blank cards | 25 | not priced online (local print) | days | - |
| Optional USB reader ACR1252U | 1 | $44.32 | in stock (limited) | GoToTags |
| Optional encoding service | 30 min | $6.90 (30 x $0.23) | 1-7 days | GoToTags |
| **Demo total** | | **about $60-70 without reader; about $105-115 with reader** (branded path) or **about $20-30** (blank + self-label, excluding labels) | **7-10 days to cards in hand** | |

First 100 production cards: GoToTags branded has MOQ 500 ($675 at $1.35); Seritag 100 x $2.54 = $254 plus UK shipping and a 10% US surcharge (see 19), 4 weeks; Tagstand small batch 100 x $2.60 = $260 (tier discount unknown), no MOQ, about 1 week, US-made and pre-encoded. Recommendation: **pre-printed and pre-encoded from Tagstand for the first 100**, self-encode only the demo blanks; move to GoToTags at 500+ ($1.35 -> $1.05 at 1,000, plus $0.06 encoding).

## 14. Card on the table vs in hand; holders and sleeves

- Seritag: "a normal NFC tag doesn't function at all on a metal surface"; "with a gap of just 3mm performs as well as an on-metal tag. With a gap of 6mm (0.6cm), the normal tag starts to perform better than an on-metal tag" (https://seritag.com/learn/using-nfc/on-metal-nfc-tags).
- A CR80 NTAG213 card reads at roughly 65 mm on an iPhone in free air (Serialio, see 18), so a 2-3 mm acrylic or wood table stand costs a few percent of range and a 6 mm-thick stand makes even a steel table a non-issue. Plastic card sleeves (0.2-0.5 mm) are negligible on the same reasoning (inference; no sleeve-specific test found).
- Since the product spec has the server *dropping the card on the table*, ship each restaurant either (a) a non-metal table stand (Etsy has an "NFC Google review stand" category: https://www.etsy.com/market/nfc_google_review_stand) or (b) a card sleeve inside the check presenter, and train staff never to put it on a metal tray or on top of the guest's payment card (see 8).

## 15. iPhone banner timing/persistence and read distance through cases

- Apple's documentation, GoToTags and Seritag only state that the user "must click on the pop-up" / "Press this notification"; **no source documents how long the banner persists**, so the earlier "within a few seconds" claim is unsourced (https://gototags.com/help/ios/nfc/reading/background, https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone). Test it: on iOS 18/26 the banner behaves like a notification banner and is dismissed by any other touch; document the observed seconds.
- Harmonise the acceptance criterion to "banner within 2 s".
- Read distance: Serialio measured an 85 x 54 mm NTAG213 inlay at "about four-finger width (about 65mm)" on an iPhone 11, and a 12 x 20 mm tag at about 18 mm (https://serialio.com/serialio-news/blog/iphone-built-in-rfid-nfc-read-distance-varies-based-on-inlay-tag-antenna-size/, Jan 2021). No published measurement through a 1.5 mm or 2.5 mm case exists for a CR80 card; with 65 mm of margin, a 2.5 mm case should cost under 5% of range (inference). Only metal-plate/MagSafe-wallet cases need testing.

## 16. Google's "on the premises" rule and the card workflow

Google's Maps user-generated-content policy (https://support.google.com/contributionpolicy/answer/7400114?hl=en, no visible last-updated date) states: "Merchants should not require or pressure users to leave ratings or write reviews while on the premises"; prohibits incentives; prohibits "Merchants requesting that staff solicit a certain number of reviews" and "requesting that staff solicit reviews that include specific content, including content that identifies a staff member"; allows soliciting content that "does represent a genuine experience, without offering incentives ... or attempting to influence the rating or the contents of the review". Operating rules for the product: the card is left with the check with neutral copy ("Tap to review us on Google - optional"); no verbal script asking for a rating, no "before you go", no server scripts; **the AI report's per-server praise data must never be turned into per-server review targets or bonuses**; do not print a server's name on the card or ask guests to mention one. Put this in the client onboarding sheet and in your terms.

## 17. Small-batch demo-card economics (concrete)

Cheapest verified paths for 10-50 branded cards: (a) Tagstand small batch $2.60/card, no MOQ, about 1 week - 20 cards $52, 50 cards $130; (b) blank cards at $0.30-0.55 plus a self-applied printed label (label cost unpriced) and self-encoding with a phone. Seritag ($2.54 but MOQ 100, 4 weeks, UK) and GoToTags custom (MOQ 500) are not demo options. Sources as in 2.

## 18. Full-size CR80 read range on phones

Serialio: about 65 mm for an 85 x 54 mm NTAG213 on iPhone 11, versus about 18 mm for a 12 x 20 mm tag (URL in 15). Academic: a phone-on-frame test of 30 commercial NFC tags found the best commercial tag at 5.6 cm and a large custom antenna at 8.1 cm (https://arxiv.org/pdf/2210.12327). GoToTags' Oct 2025 rig test (iPhone 11 + ACS ACM1552U, ten cards per chip) reports Type 5 (SLIX2/ST25TV) at roughly 1.5-2x the range of Type 2 (NTAG213) but publishes no millimetre table (https://gototags.com/articles/which-nfc-chip-type-is-the-best). Vendor sheets quote 1-5 cm conservatively (e.g. https://tagtixrfid.com/products/nfc-card-ntag213). Working figure for the spec: **2-6 cm on iPhone, similar on Android**, position the card over the top edge of the iPhone.

## 19. Import shipping, duties and tariff exposure (UK/China-sourced cards)

- The US de minimis exemption was suspended for all countries from 12:01 a.m. EDT on 29 August 2025 (Executive Order 14324, https://www.whitehouse.gov/presidential-actions/2025/07/suspending-duty-free-de-minimis-treatment-for-all-countries/): every parcel is now dutiable; postal shipments were assessed either ad valorem at the IEEPA rate or per-item ($80/$160/$200 per package) for six months, ad valorem thereafter.
- Seritag's delivery page: since 25 February 2026 "10% surcharge plus administrative fees" apply to all US deliveries, prepayable at checkout ("makes deliveries quicker and fixes the costs"); orders under 5,000 tags placed before 1 p.m. ship same day (https://seritag.com/delivery). So Seritag's $254 for 100 becomes about $280 plus courier before duties/fees.
- HTS classification: 8523.52.00 "Smart cards", general duty rate **Free**, column-2 rate 35% (USITC HTS API, https://hts.usitc.gov/reststop/search?keyword=8523.52); GoToTags lists its cards under 8523.52.10. Country-specific additional duties (IEEPA reciprocal tariffs; Section 301 for China-origin goods) sit on top of the general rate and change frequently - I did not find a current authoritative rate for NFC cards, so ask any overseas vendor for a DDP (duties-paid) quote and treat US-stocked vendors (GoToTags, Tagstand, ID Cards Direct) as tariff-insulated at checkout, even though their own restocking costs (and the 2025 Tagstand banner) reflect the tariffs.

---

## Corrections (restated facts)

1. **Tagstand blank NTAG213 card**: $0.55 base; 5% off at 25-49 ($0.52), 10% at 50-99 ($0.50), 20% at 100-499 ($0.44), 27% at 500-999 ($0.40), 30% at 1,000+ ($0.39); 1,335 in stock today. The 100-pack is $45.00 and out of stock. **No tariff/price-increase banner is shown on either page today**; that notice appeared only in Sept-Dec 2025 crawls, so drop it from the report (https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/, https://www.tagstand.com/products/bulk-pvc-cards-pack-of-100/).
2. **Serialio micro-tag test**: the "~2 mm" figure is for a 4.5 x 1.8 mm NTAG213 PCB tag on iPhone 13 Pro/14/15 Pro Max; the failure case was that tag on a rubber standoff over 5 mm thick, which "fails to read with any iPhone, with or without a thin iPhone case"; 1.5 mm is simply the measured thickness of a common clear case. It says nothing about CR80 cards, which Serialio separately measured at about 65 mm on iPhone (https://serialio.com/serialio-news/blog/iphone-read-tiny-nfc-tag/, https://serialio.com/serialio-news/blog/iphone-built-in-rfid-nfc-read-distance-varies-based-on-inlay-tag-antenna-size/).
3. **QR sizing**: the qrcodefyi guide says modules "as small as 0.33 mm" work under 30 cm, 0.5 mm minimum for medium range, and recommends 2-3 cm codes for business cards; it does not state 0.4 mm, 2 x 2 cm or the quiet-zone rule. The 4-module quiet zone comes from ISO/IEC 18004 via DENSO Wave ("QR Code requires a four-module wide margin at all sides of a symbol", https://www.qrcode.com/en/howto/code.html); the standard sets no physical minimum. Keep the report's 20-22 mm / >= 0.6 mm-module spec but cite it as a design margin, not as the source's numbers.

## Sources (new in this round)
- NXP NTAG213/215/216 datasheet Rev 3.2: https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf
- NXP AN13089 NTAG 21x features and hints: https://www.puntoflotante.net/AN13089.pdf
- NCC Group NFC chip security: https://nccgroup.com/us/research-blog/the-abcs-of-nfc-chip-security
- Flipper Zero NTAG21x password issue: https://github.com/flipperdevices/flipperzero-firmware/issues/4300
- NXP community NFC Tools AUTH0 thread: https://community.nxp.com/t5/NFC/Can-t-remove-NTAG213-protection/m-p/1014471
- NXP READ_SIG on ACS readers: https://community.nxp.com/t5/NFC/NFC-NTAG213-READ-SIG-Originality-Signature-Verification-Using/td-p/1888739
- wakdev password guide / protect video / advanced commands / iOS app / desktop release notes: https://www.wakdev.com/en/knowledge-base/how-to-guides/how-to-protect-an-nfc-chip-with-a-password.html , https://www.wakdev.com/en/knowledge-base/videos/how-to-protect-your-nfc-tags.html , https://www.wakdev.com/en/knowledge-base/how-to-guides/how-to-use-advanced-nfc-commands.html , https://www.wakdev.com/en/apps/nfc-tools-ios.html , https://www.wakdev.com/en/apps/nfc-tools-pc-mac/release-notes.html
- Tagstand small batch NTAG215 / NTAG213 / blank: https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/ , https://www.tagstand.com/products/custom-small-batch-pvc-card-white-lanyard-slot-portrait-ntag213 , https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/
- GoToTags printed card / thin card / blank / encoding / readers / custom page / chip test / originality / mirroring / ACR122U help: https://store.gototags.com/printed-pvc-nfc-card-ntag213-nfc-tag/ , https://store.gototags.com/printed-nfc-thin-card-ntag213/ , https://store.gototags.com/nfc-pvc-card-ntag213/ , https://store.gototags.com/nfc-tag-encoding-service/ , https://store.gototags.com/acs-acr122u-nfc-usb-reader/ , https://store.gototags.com/acs-acr1252u-nfc-usb-reader/ , https://store.gototags.com/nfc-tags/nfc-cards/custom-nfc-cards/ , https://gototags.com/articles/which-nfc-chip-type-is-the-best , https://gototags.com/help/nfc/chip/features/originality-signature , https://gototags.com/help/nfc/chip/features/mirroring , https://gototags.com/help/nfc/hardware/desktop/acr122u
- Seritag custom cards / delivery / logos / on-metal / iPhone: https://seritag.com/nfc-tags/cp-cards-ntag213 , https://seritag.com/delivery , https://seritag.com/qa/which-nfc-logo-is-free-to-use , https://seritag.com/learn/using-nfc/on-metal-nfc-tags , https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone
- ID Cards Direct: https://www.idcardsdirect.com/products/ntag213-rfid-nfc-blank-white-iso-pvc-card
- Etsy market and listings: https://www.etsy.com/market/google_review_tap_card , https://www.etsy.com/listing/1570328375/custom-nfc-google-review-cards-collect , https://www.etsy.com/listing/1654699562/custom-google-nfc-qr-code-tap-card-made , https://www.etsy.com/market/nfc_google_review_stand
- Card printers: https://www.zebra.com/us/en/products/spec-sheets/printers/card/zc300-series.html , https://www.alphacard.com/id-card-printers/fargo-dtc1250e-id-card-printer , https://www.thecardnetwork.co.uk/blogs/news/can-you-print-on-rfid-cards-direct-to-card-printer , https://identisgroup.com/newsroom/2021/07/direct-to-card-or-retransfer-which-card-printer-is-right-for-your-application/ , https://www.aptika.com/blog/understanding-the-differences-between-direct-to-card-and-retransfer-printing/ , https://info.jobrien.com/direct-to-card-vs.-re-transfer-printing-which-id-card-printer-technology-is-right-for-you
- Google: review link help https://support.google.com/business/answer/16816815?hl=en ; UGC policy https://support.google.com/contributionpolicy/answer/7400114?hl=en ; Place IDs https://developers.google.com/maps/documentation/places/web-service/place-id ; brand customer-reviews https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/ ; brand elements https://about.google/brand-resource-center/brand-elements/ ; Android app-links file https://search.google.com/.well-known/assetlinks.json
- NFC Forum branding and N-Mark guidelines: https://nfc-forum.org/build/branding , https://nfc-forum.org/uploads/Branding-and-Marks/NFC_N_Mark_Guidelines.pdf
- Android NFC basics / Android 17 changes: https://developer.android.com/develop/connectivity/nfc/nfc , https://developer.android.com/about/versions/17/behavior-changes-all
- Samsung browser-chooser threads: https://forum.developer.samsung.com/t/url-skeme-problem-of-samsung-internet/24753 , https://forum.developer.samsung.com/t/open-link-in-chrome-doesnt-work-anymore/29914
- Statcounter US mobile OS: https://gs.statcounter.com/os-market-share/mobile/united-states-of-america ; Android versions: https://apilevels.com/
- "No supported app" wallet-case explanation: https://appuals.com/no-supported-app-for-this-nfc-tag-error/
- Serialio read-distance articles: https://serialio.com/serialio-news/blog/iphone-built-in-rfid-nfc-read-distance-varies-based-on-inlay-tag-antenna-size/ , https://serialio.com/serialio-news/blog/iphone-read-tiny-nfc-tag/ ; arXiv NFC antenna test: https://arxiv.org/pdf/2210.12327
- NXP TagInfo: https://apps.apple.com/us/app/nfc-taginfo-by-nxp/id1246143596 , https://play.google.com/store/apps/details?id=com.nxp.taginfolite
- ACS driver page / acsccid: https://www.acs.com.hk/en/driver/342/acr1252u-usb-nfc-reader-iii-nfc-forum-certified-reader/ , https://acsccid.sourceforge.io/
- Sanitizer: https://www.journalofhospitalinfection.com/article/S0195-6701(24)00169-5/fulltext , https://www.ecolab.com/offerings/disinfectant-wipes/quaternary-disinfectant-wipes , https://www.idcardgroup.com/overlaminates , https://www.idwholesaler.com/learning-center/why-laminate-plastic-id-cards/
- Next.js redirects / Vercel logs / CCPA: https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects , https://vercel.com/docs/logs/runtime , https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1798.140.&lawCode=CIV , https://oag.ca.gov/privacy/ccpa
- Domains: https://porkbun.com/products/domains , https://www.cloudflare.com/products/registrar/
- Tariffs: https://www.whitehouse.gov/presidential-actions/2025/07/suspending-duty-free-de-minimis-treatment-for-all-countries/ , https://hts.usitc.gov/reststop/search?keyword=8523.52
- Ixkio chip count: https://docs.ixkio.com/explainers/chip-count-vs-scan-count
- QR correction sources: https://qrcodefyi.com/guide/size-calculator-guide/ , https://www.qrcode.com/en/howto/code.html


## Open questions
- Current (2026) retail price of a genuine ACS ACR122U or ACR1252U USB reader was not verified; check the GoToTags store or Amazon listing before buying (optional for a 10-card demo).
- Tagstand's custom small-batch printed card price was not visible (out of stock); request a quote from Tagstand and GoToTags for 50-100 full-colour double-sided NTAG213 cards to get a firm US per-card cost.
- No published test found for CR80 NFC cards through MagSafe wallet / metal-plate phone cases; include these in the demo test matrix.
- Whether NXP TagWriter (with its one-click UID/counter mirror checkboxes) is still available on Google Play in 2026 should be checked on a real Android; otherwise use NFC Tools raw commands or have the card vendor pre-configure the mirror.
- No authoritative US-only figure for the share of Android phones with NFC; QR fallback covers the gap.
- Exact in-app menu wording for 'Lock tag' in the latest NFC Tools iOS build should be confirmed on-device (documented as Other > Erase, format & protect).
- Chemical-resistance data (IPA/sanitizer wipe cycles) for laminated vs overlay-only PVC cards was not found; run a 2-week sanitizer-wipe test on the demo cards.