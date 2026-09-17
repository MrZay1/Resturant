import { BRAND, PRICING } from "@/lib/brand";
import { CardFace } from "@/components/card/CardFace";
import { DEFAULT_DESIGN } from "@/components/card/cardSpec";
import { TapMark } from "@/components/ui/Logo";

/**
 * Letter-size, one-page staff guide. Laminate it and keep it at the server station.
 * Export: node scripts/export-print.mjs  (see scripts/README.md)
 * Query: ?name=Restaurant+Name
 */
export const dynamic = "force-dynamic";

export default async function StaffGuide({ searchParams }: PageProps<"/print/staff-guide">) {
  const sp = await searchParams;
  const name = (Array.isArray(sp.name) ? sp.name[0] : sp.name) || "Your Restaurant";
  const design = { ...DEFAULT_DESIGN, restaurantName: name };
  return (
    <>
        <style>{`@page { size: letter; margin: 0; } html, body { margin: 0; padding: 0; } .page { width: 8.5in; height: 11in; padding: 0.6in 0.65in; box-sizing: border-box; display: flex; flex-direction: column; }`}</style>
        <div className="page">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1f4d3a", fontWeight: 600 }}>Server guide · {name}</div>
              <h1 style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontWeight: 400, fontSize: 40, lineHeight: 1.02, margin: "10px 0 0" }}>
                The card goes down with the check. Every table, every time.
              </h1>
            </div>
            <div style={{ width: 150, flexShrink: 0, marginLeft: 24, marginTop: 6, borderRadius: 8, overflow: "hidden", boxShadow: "0 8px 24px -10px rgba(0,0,0,.35)" }}>
              <CardFace design={design} side="front" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginTop: 28 }}>
            {[
              ["1", "Drop it with the check", "Put the card in the check presenter or next to it, face up. One optional line, then walk away: “If you’d like to leave us an honest review on Google, just tap your phone on this. Now or whenever.”"],
              ["2", "Show, don’t explain", "If they look unsure: “Hold the top of your iPhone on it,” or “the back of your Android.” A link pops up. They tap it and the review screen opens."],
              ["3", "Pick it up with the check", "The card comes back with the signed slip. Wipe it if needed. It goes back in your apron for the next table."],
            ].map(([n, t, b]) => (
              <div key={n} style={{ border: "1px solid #e2dccf", borderRadius: 14, padding: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: "#15130f", color: "#f7f4ee", display: "grid", placeItems: "center", fontSize: 13, fontFamily: "var(--font-geist-mono), monospace" }}>{n}</div>
                <div style={{ fontWeight: 600, fontSize: 15, marginTop: 10 }}>{t}</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "#3a3631", marginTop: 6 }}>{b}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 18, marginTop: 20 }}>
            <div style={{ background: "#f7f4ee", borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1f4d3a", fontWeight: 600 }}>Say this</div>
              <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: 13, lineHeight: 1.6, color: "#15130f" }}>
                <li>“If you’d like to leave us an honest review on Google, just tap your phone on this. Now or whenever.”</li>
                <li>“A link pops up, you tap it, and the review page opens. Takes about a minute.”</li>
                <li>Then leave the table. The guest decides, on their own phone, in their own time.</li>
              </ul>
              <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9a3a12", fontWeight: 600, marginTop: 16 }}>Never say this</div>
              <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: 13, lineHeight: 1.6, color: "#15130f" }}>
                <li>“Only if it’s five stars.” We ask everyone the same way. Asking only happy guests breaks Google’s rules.</li>
                <li>“I’ll take something off the bill if you review us.” No rewards for reviews. Ever.</li>
                <li>“Mention my name.” Guests can, but we never ask them to.</li>
                <li>“Could you do it before you go?” No waiting at the table, no hovering. Pressure on the premises is against Google’s rules.</li>
              </ul>
            </div>
            <div style={{ border: "1px solid #e2dccf", borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1f4d3a", fontWeight: 600 }}>If the tap does not work</div>
              <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: 12.5, lineHeight: 1.55, color: "#3a3631" }}>
                <li>iPhone: the reader is at the top edge. Screen on, phone unlocked. Older iPhones (7, 8, X) need the NFC reader in Control Center.</li>
                <li>Android: the reader is on the back, usually the upper half. Screen on.</li>
                <li>Thick wallet case or a metal table under the card? Lift the card and hold it in the air.</li>
                <li>Still nothing? Flip the card. The QR code on the back opens the same page.</li>
              </ul>
              <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1f4d3a", fontWeight: 600, marginTop: 14 }}>Card care</div>
              <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 12.5, lineHeight: 1.55, color: "#3a3631" }}>
                <li>Wipe with sanitizer. Do not bend or punch a hole in it.</li>
                <li>Lost or broken? Tell the manager. {PRICING.freeReplacementCardsPerMonth} replacements a month are included.</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e2dccf", paddingTop: 12, fontSize: 11, color: "#6f6a62" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 20, height: 20, borderRadius: 6, background: "#15130f", display: "grid", placeItems: "center" }}>
                <TapMark className="h-3 w-3" color="#f7f4ee" />
              </span>
              <span>{BRAND.name} · {BRAND.email}</span>
            </div>
            <div>Why it matters: guests who write at the table mention dishes and servers by name. Those reviews bring the next table in.</div>
          </div>
        </div>
    </>
  );
}
