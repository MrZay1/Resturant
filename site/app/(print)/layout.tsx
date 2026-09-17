import "../globals.css";
import { fontClass } from "@/lib/fonts";

export const metadata = { title: "Print", robots: { index: false, follow: false } };

/** Root layout for print pages: no site chrome, white background, dev overlay hidden. */
export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClass}>
      <body style={{ margin: 0, background: "white" }}>
        <style>{`nextjs-portal { display: none !important; } body { font-family: var(--font-geist-sans), Geist, system-ui, sans-serif; color: #15130f; }`}</style>
        {children}
      </body>
    </html>
  );
}
