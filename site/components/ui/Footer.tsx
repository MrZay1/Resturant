import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { BRAND, LINKS } from "@/lib/brand";

const cols = [
  {
    title: "Product",
    links: [
      { href: LINKS.howItWorks, label: "How it works" },
      { href: LINKS.report, label: "Sample report" },
      { href: LINKS.pricing, label: "Pricing" },
      { href: LINKS.order, label: "Order cards" },
      { href: "/dashboard", label: "Owner dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: LINKS.demo, label: "Book a demo" },
      { href: LINKS.faq, label: "FAQ" },
      { href: "/guides/google-review-link", label: "Find your Google review link" },
      { href: `mailto:${BRAND.email}`, label: BRAND.email },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy policy" },
      { href: "/legal/terms", label: "Terms of service" },
      { href: "/legal/review-policy", label: "Review policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Tap-to-review cards your servers drop at every table, and a monthly AI report that
              tells you what your guests actually think.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink-2 hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.</div>
          <div>
            Google and Google Maps are trademarks of Google LLC. {BRAND.name} is not affiliated with or endorsed by Google.
          </div>
        </div>
      </Container>
    </footer>
  );
}
