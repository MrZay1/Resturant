import type { Metadata } from "next";
import "../globals.css";
import { BRAND } from "@/lib/brand";
import { fontClass } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${BRAND.domain}`),
  title: {
    default: `${BRAND.name}: tap-to-review cards and monthly AI review reports for restaurants`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "NFC tap-to-review cards your servers drop at every table, plus a monthly AI report that tells you exactly what guests are saying. More Google reviews, clearer decisions.",
  openGraph: {
    type: "website",
    siteName: BRAND.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontClass} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
