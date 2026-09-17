import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 14,
          background: "#15130f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 32 32" width="40" height="40" fill="none">
          <circle cx="16" cy="16" r="3.2" fill="#f7f4ee" />
          <path d="M9.6 9.6a9 9 0 0 0 0 12.8" stroke="#f7f4ee" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M22.4 9.6a9 9 0 0 1 0 12.8" stroke="#f7f4ee" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M5.2 5.2a15.3 15.3 0 0 0 0 21.6" stroke="#f7f4ee" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
          <path d="M26.8 5.2a15.3 15.3 0 0 1 0 21.6" stroke="#f7f4ee" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
        </svg>
      </div>
    ),
    size
  );
}
