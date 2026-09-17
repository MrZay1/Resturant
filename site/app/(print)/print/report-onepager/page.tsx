import { BRAND } from "@/lib/brand";
import { SAMPLE_REPORT as R } from "@/data/sampleReport";
import { TapMark } from "@/components/ui/Logo";
import { firstSentences } from "@/lib/text";

/** Letter-size one-page summary of the sample report. Leave-behind for demos. */
export const dynamic = "force-dynamic";

const Star = ({ fill }: { fill: string }) => (
  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
    <path d="M12 2.5l2.94 6.26 6.86.78-5.08 4.7 1.36 6.78L12 17.6l-6.08 3.42 1.36-6.78-5.08-4.7 6.86-.78L12 2.5z" fill={fill} />
  </svg>
);

export default function ReportOnePager() {
  const s = R.summary;
  const label: React.CSSProperties = { fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1f4d3a", fontWeight: 600 };
  const box: React.CSSProperties = { border: "1px solid #e2dccf", borderRadius: 12, padding: 14 };
  return (
    <>
        <style>{`@page { size: letter; margin: 0; } html, body { margin: 0; padding: 0; } .page { width: 8.5in; height: 11in; padding: 0.55in 0.6in; box-sizing: border-box; display: flex; flex-direction: column; }`}</style>
        <div className="page">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={label}>Monthly review report · sample</div>
              <div style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: 34, lineHeight: 1, marginTop: 6 }}>{R.restaurant}</div>
              <div style={{ fontSize: 11, color: "#6f6a62", marginTop: 6 }}>{R.period} · Prepared by {BRAND.name} · Fictional restaurant, illustrative numbers</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#3a3631" }}>
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} fill={i <= Math.round(s.lifetimeRating) ? "#e6b455" : "#cfc7b6"} />)}
              <span style={{ marginLeft: 4 }}>{s.lifetimeRating.toFixed(1)} lifetime · {s.lifetimeReviews} reviews</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
            {[
              ["New reviews", String(s.reviews), `+${s.reviews - s.reviewsPrev} vs July`],
              ["Average rating", s.avgRating.toFixed(1), `+${(s.avgRating - s.avgRatingPrev).toFixed(1)} vs July`],
              ["Card taps", String(s.cardTaps), `${Math.round((s.reviews / s.cardTaps) * 100)}% became reviews`],
              ["Owner reply rate", `${s.replyRate}%`, "goal 80%"],
            ].map(([l, v, d], i) => (
              <div key={l} style={{ ...box, padding: 12 }}>
                <div style={{ fontSize: 10.5, color: "#6f6a62" }}>{l}</div>
                <div style={{ fontSize: i === 0 ? 32 : 22, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 2 }}>{v}</div>
                <div style={{ fontSize: 10, color: "#1f4d3a", fontWeight: 500 }}>{d}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12, borderLeft: "3px solid #1f4d3a", background: "#f7f4ee", padding: "10px 14px", fontSize: 12.5, lineHeight: 1.5 }}>{R.headline}</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            <div style={box}>
              <div style={label}>What is working</div>
              {R.wins.map((w) => (
                <div key={w.title} style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{w.title}</div>
                  <div style={{ fontSize: 11, color: "#3a3631", lineHeight: 1.45 }}>{firstSentences(w.detail, 2)}</div>
                </div>
              ))}
            </div>
            <div style={box}>
              <div style={{ ...label, color: "#9a3a12" }}>What is costing you stars</div>
              {R.issues.map((it) => (
                <div key={it.title} style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>
                    {it.title} <span style={{ fontSize: 9, color: "#6f6a62", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>{it.severity}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#3a3631", lineHeight: 1.45 }}>Fix: {firstSentences(it.action)}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr", gap: 12, marginTop: 12 }}>
            <div style={box}>
              <div style={label}>Staff named</div>
              <table style={{ width: "100%", fontSize: 11, marginTop: 6, borderCollapse: "collapse" }}>
                <tbody>
                  {R.staff.map((p) => (
                    <tr key={p.name} style={{ borderTop: "1px solid #eee8dc" }}>
                      <td style={{ padding: "4px 0" }}>{p.name}</td>
                      <td style={{ textAlign: "right", padding: "4px 0", fontVariantNumeric: "tabular-nums" }}>{p.mentions}</td>
                      <td style={{ paddingLeft: 8, color: p.sentiment === "positive" ? "#1f4d3a" : "#9a3a12" }}>{p.sentiment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={box}>
              <div style={label}>Dishes mentioned</div>
              {R.dishes.map((d) => (
                <div key={d.name} style={{ display: "grid", gridTemplateColumns: "72px 1fr 24px", alignItems: "center", gap: 6, fontSize: 10.5, marginTop: 6 }}>
                  <span>{d.name}</span>
                  <span style={{ height: 7, borderRadius: 3, background: d.sentiment < 80 ? "#d9622b" : "#2a9d63", width: `${(d.mentions / R.dishes[0].mentions) * 100}%` }} />
                  <span style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{d.mentions}</span>
                </div>
              ))}
            </div>
            <div style={box}>
              <div style={label}>This month, do these</div>
              <ol style={{ margin: "6px 0 0", paddingLeft: 16, fontSize: 11, lineHeight: 1.45, color: "#15130f" }}>
                {R.recommendations.map((r) => (
                  <li key={r.priority} style={{ marginTop: 3 }}>{r.text}</li>
                ))}
              </ol>
            </div>
          </div>

          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e2dccf", paddingTop: 10, fontSize: 10.5, color: "#6f6a62" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 18, height: 18, borderRadius: 5, background: "#15130f", display: "grid", placeItems: "center" }}>
                <TapMark className="h-3 w-3" color="#f7f4ee" />
              </span>
              <span>{BRAND.name} · Cards from $15 · Report $50/month, cancel anytime · {BRAND.email}</span>
            </div>
            <div>Full sample at {BRAND.domain}/sample-report</div>
          </div>
        </div>
    </>
  );
}
