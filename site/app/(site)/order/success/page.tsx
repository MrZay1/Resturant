import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2, FileText, Image as ImageIcon, LayoutDashboard, Link2, Mail, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CreateAccountForm } from "@/components/customer/CreateAccountForm";
import { TEMPLATE_META, type CardTemplate } from "@/components/card/cardSpec";
import { BRAND, LINKS, PRICING } from "@/lib/brand";
import { getStripe } from "@/lib/stripe";
import { getCustomerSession } from "@/lib/customerAuth";

export const metadata = {
  title: "Order received",
  description: "Thanks for your order. Here is what happens next.",
  robots: { index: false, follow: false },
};

type OrderSummary = {
  restaurant: string | null;
  template: string | null;
  cards: number | null;
  report: boolean | null;
  email: string | null;
};

function isTemplate(v: string): v is CardTemplate {
  return v in TEMPLATE_META;
}

async function loadOrder(sessionId: string | undefined): Promise<OrderSummary | null> {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return null;
  const stripe = getStripe();
  if (!stripe) return null;
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sessionId)) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items"] });
    // only completed sessions get a summary; abandoned or forged ids fall through to neutral copy
    if (session.status !== "complete") return null;
    const md = session.metadata ?? {};
    const cardsFromMeta = md.cards ? Number.parseInt(md.cards, 10) : Number.NaN;
    const cardLine = session.line_items?.data.find((li) => !li.price?.recurring);
    const reportLine = session.line_items?.data.find((li) => Boolean(li.price?.recurring));
    const cards = Number.isFinite(cardsFromMeta) ? cardsFromMeta : (cardLine?.quantity ?? null);
    const report =
      md.report !== undefined ? md.report === "true" : reportLine ? true : session.mode === "subscription";
    return {
      restaurant: md.restaurant || null,
      template: md.template && isTemplate(md.template) ? TEMPLATE_META[md.template].name : md.template || null,
      cards,
      report,
      email: session.customer_details?.email ?? session.customer_email ?? null,
    };
  } catch {
    return null;
  }
}

const STEPS: { title: string; body: ReactNode; icon: LucideIcon }[] = [
  {
    title: "We email you within one business day",
    body: "A real person confirms your order, your design, and your Google review link.",
    icon: Mail,
  },
  {
    title: "Send us your logo",
    body: (
      <>
        Reply to that email with your logo (SVG or a high-resolution PNG is best), or send it to{" "}
        <a href={`mailto:${BRAND.email}?subject=Logo%20for%20my%20card%20order`} className="font-medium text-accent underline-offset-4 hover:underline">
          {BRAND.email}
        </a>
        . If you picked a design without a logo, you can skip this step.
      </>
    ),
    icon: ImageIcon,
  },
  {
    title: "Digital design preview in about 2 business days",
    body: "You see the front and back before anything prints. Approve it or ask for changes.",
    icon: FileText,
  },
  {
    title: "Cards ship in about 10 business days",
    body: "They arrive with a one-page staff guide so your team knows exactly what to say.",
    icon: Package,
  },
  {
    title: "Your first report arrives at the start of next month",
    body: `If you added the monthly report, it lands in your inbox at the start of each month. Your ${PRICING.freeReplacementCardsPerMonth} free replacement cards a month are there whenever you need them. Request them from your dashboard or by replying to any report email.`,
    icon: Sparkles,
  },
];

export default async function Page(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const searchParams = await props.searchParams;
  const raw = searchParams.session_id;
  const sessionId = Array.isArray(raw) ? raw[0] : raw;
  const [order, customerSession] = await Promise.all([loadOrder(sessionId), getCustomerSession()]);

  const rows: { label: string; value: string }[] = [];
  if (order) {
    if (order.restaurant) rows.push({ label: "Restaurant", value: order.restaurant });
    if (order.template) rows.push({ label: "Design", value: order.template });
    if (order.cards !== null) rows.push({ label: "Cards", value: `${order.cards} at $${PRICING.cardPrice} each` });
    rows.push({
      label: "Monthly report",
      value: order.report ? `Included, $${PRICING.monthlyReport}/month` : "Not included",
    });
    if (order.email) rows.push({ label: "Confirmation sent to", value: order.email });
  }

  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section tone="paper" className="pt-16 sm:pt-24">
          <Container size="narrow">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <Eyebrow>Order received</Eyebrow>
            </div>
            <Heading as="h1" size="xl" className="mt-5">
              {order?.restaurant ? `Thank you, ${order.restaurant}.` : "Thank you."}
            </Heading>
            <Lede className="mt-6">
              {order
                ? "Here is what we have on file. If anything looks off, reply to the confirmation email and we will fix it before anything prints."
                : "If your payment completed, a confirmation is on its way to your inbox. If you did not finish checkout, nothing was charged. Here is what happens next."}
            </Lede>

            {rows.length > 0 && (
              <dl className="mt-10 divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
                {rows.map((r) => (
                  <div key={r.label} className="flex items-baseline justify-between gap-6 px-6 py-4">
                    <dt className="text-sm text-muted">{r.label}</dt>
                    <dd className="text-right font-medium text-ink">{r.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {order && sessionId && (
              <div className="mt-10 rounded-2xl border border-line bg-white p-8 shadow-card sm:p-10">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent">
                    <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Eyebrow>Your dashboard</Eyebrow>
                </div>
                {customerSession ? (
                  <>
                    <Heading size="md" className="mt-5">
                      You&apos;re already signed in.
                    </Heading>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
                      This order is on its way to your account. Track its status, your Google
                      review link, and request replacement cards from your dashboard any time.
                    </p>
                    <div className="mt-6">
                      <Button href="/dashboard">Go to my dashboard</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Heading size="md" className="mt-5">
                      Create your dashboard login
                    </Heading>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
                      Set a password now and you can track this order&apos;s status, your Google
                      review link, and request replacement cards any time &mdash; no need to wait
                      for the confirmation email.
                    </p>
                    <CreateAccountForm sessionId={sessionId} defaultEmail={order.email ?? ""} />
                  </>
                )}
              </div>
            )}
          </Container>
        </Section>

        <Section tone="white">
          <Container size="narrow">
            <Eyebrow>What happens next</Eyebrow>
            <Heading className="mt-4">Five steps between now and your first shift</Heading>
            <ol className="mt-12 space-y-0">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative flex gap-5 border-t border-line py-7 first:border-t-0 first:pt-0">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent font-display text-lg text-paper">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 text-lg font-medium text-ink">
                      <s.icon className="h-4.5 w-4.5 text-accent" aria-hidden="true" />
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        <Section tone="paper-2">
          <Container size="narrow">
            <div className="rounded-2xl border border-line bg-white p-8 shadow-card sm:p-10">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent">
                  <Link2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <Eyebrow>One thing to do now</Eyebrow>
              </div>
              <Heading size="md" className="mt-5">
                Save your Google review link
              </Heading>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
                Every card points at your Google &quot;write a review&quot; screen, so we need the
                exact link for your listing. If you did not add it at checkout, find it now and
                include it in your reply to the confirmation email. It takes about two minutes.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/guides/google-review-link" variant="secondary">
                  How to find your review link
                </Button>
                <Button href={LINKS.report} variant="ghost">
                  See a sample report
                </Button>
              </div>
            </div>
            <p className="mt-8 text-sm text-muted">
              Questions in the meantime? Write to{" "}
              <Link href={`mailto:${BRAND.email}`} className="font-medium text-ink underline-offset-4 hover:underline">
                {BRAND.email}
              </Link>
              .
            </p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
