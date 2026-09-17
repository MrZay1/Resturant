import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${BRAND.name}: tap-to-review cards and monthly AI review reports for restaurants`;

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#f7f4ee",
          display: "flex",
          padding: 72,
          fontFamily: "Georgia, serif",
          color: "#15130f",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 620 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 34 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "#15130f", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
                <circle cx="16" cy="16" r="3.2" fill="#f7f4ee" />
                <path d="M9.6 9.6a9 9 0 0 0 0 12.8" stroke="#f7f4ee" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M22.4 9.6a9 9 0 0 1 0 12.8" stroke="#f7f4ee" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </div>
            {BRAND.name}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 72, lineHeight: 1.02, letterSpacing: "-0.02em" }}>The review your guests meant to leave.</div>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 26, color: "#6f6a62", marginTop: 24, lineHeight: 1.35 }}>
              Tap-to-review cards for every table, and a monthly AI report on what guests are saying.
            </div>
          </div>
        </div>
        {/* card */}
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 150,
            width: 460,
            height: 290,
            borderRadius: 22,
            background: "#ffffff",
            boxShadow: "0 30px 60px -20px rgba(21,19,15,0.35)",
            transform: "rotate(-6deg)",
            display: "flex",
            flexDirection: "column",
            padding: 34,
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 15, letterSpacing: "0.2em", color: "#6f6a62" }}>LUCIA&apos;S TRATTORIA</div>
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} viewBox="0 0 24 24" width="22" height="22">
                <path d="M12 2.5l2.94 6.26 6.86.78-5.08 4.7 1.36 6.78L12 17.6l-6.08 3.42 1.36-6.78-5.08-4.7 6.86-.78L12 2.5z" fill="#e6b455" />
              </svg>
            ))}
          </div>
          <div style={{ fontSize: 50, lineHeight: 1.05, marginTop: 28, letterSpacing: "-0.01em" }}>Tap to review us on Google</div>
          <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 16, color: "#6f6a62", marginTop: "auto" }}>Hold your phone here</div>
        </div>
      </div>
    ),
    size
  );
}
