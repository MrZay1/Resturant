import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  Mail,
  Nfc,
  Package,
  QrCode,
  Smartphone,
  Sparkles,
  Truck,
  Users,
  Link2,
  Palette,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card3D } from "@/components/card/Card3D";
import { DEFAULT_DESIGN } from "@/components/card/cardSpec";
import { BRAND, LINKS, PRICING } from "@/lib/brand";

export const metadata = {
  title: "How it works",
  description: `A tap-to-review card at every table and a monthly AI report on your Google reviews. Here is exactly how ${BRAND.name} works, from the first shift to the first report.`,
};

type Step = { n: string; title: string; body: string; icon: LucideIcon };

const RITUAL: Step[] = [
  {
    n: "01",
    title: "Server drops the card with the check",
    body:
      "The card goes down with the check presenter, the same way every time. One line is all it takes: \"If you have a second, tap this and let Google know how it went.\" No pitch, no pressure.",
    icon: CreditCard,
  },
  {
    n: "02",
    title: "Guest taps, the review screen opens",
    body:
      "The guest holds their phone to the card and taps the link that appears. Your Google review screen opens, already pointed at your restaurant. They pick a rating, write a line or two, and post while the meal is still fresh.",
    icon: Smartphone,
  },
  {
    n: "03",
    title: "Every month, you get the report",
    body:
      "We read every new review and send you a short report on the first business day of the month. What guests love, what they complain about, which servers get named, and what to do about it.",
    icon: BarChart3,
  },
];

const CARD_SPECS: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Credit-card size",
    body: "85.6 by 54 mm with rounded corners. It fits in a check presenter, a bill fold, or a shirt pocket.",
    icon: CreditCard,
  },
  {
    title: "Printed on PVC",
    body: "The same durable plastic as a gift card. Wipes clean, survives spills, and does not curl.",
    icon: ShieldCheck,
  },
  {
    title: "NTAG NFC chip",
    body: "Works with iPhone and Android with no app to install. Guests hold their phone to the card and a link appears.",
    icon: Nfc,
  },
  {
    title: "QR code on the back",
    body: "For phones without NFC, or guests who prefer to scan. Same destination, same review screen.",
    icon: QrCode,
  },
  {
    title: "A short link we manage",
    body: `Each card points to a ${BRAND.shortLinkHost} link. If your Google listing ever changes, we update the destination and your cards keep working.`,
    icon: Link2,
  },
  {
    title: "Your logo or one of four designs",
    body: "Send your logo and we build the card around it, or pick Classic, Noir, Logo forward, or Brand color and we handle the rest.",
    icon: Palette,
  },
];

const REPORT_SECTIONS = [
  { title: "Headline summary", body: "The month in three sentences. Read this one and you know where you stand." },
  { title: "Wins", body: "What guests praised most, with the exact words they used." },
  { title: "Issues with fixes", body: "Each recurring complaint, how often it came up, and a concrete fix you can try this week." },
  { title: "Staff mentions", body: "Every server named in a review, and whether the mention was praise or a problem." },
  { title: "Dish mentions", body: "Which dishes came up, how often, and how guests felt about them." },
  { title: "Themes", body: "The bigger patterns across all reviews: service, food, wait times, noise, value." },
  { title: "Trend", body: "How this month compares to the last one, in reviews and in rating." },
  { title: "Priority actions", body: "A short, ordered list of what to do first." },
  { title: "Drafted replies", body: "Ready-to-post responses for every review that deserves one, in your voice." },
];

const FIRST_30: { day: string; title: string; body: string; icon: LucideIcon }[] = [
  {
    day: "Day 0",
    title: "Order and send your logo",
    body: "Pick a design, choose a card count, and check out. Reply to the confirmation email with your logo and your Google review link.",
    icon: Package,
  },
  {
    day: "Day 1 to 2",
    title: "Design preview",
    body: "We send a digital design preview of the front and back. Approve it or ask for changes. Nothing prints until you say so.",
    icon: FileText,
  },
  {
    day: "Week 3",
    title: "Cards arrive with a staff guide",
    body: "About 10 business days after you approve the design preview, the box arrives with a one-page guide for servers. It covers the line to say, where the card goes, and what to do if a guest asks a question.",
    icon: Truck,
  },
  {
    day: "First shift",
    title: "Cards go down with every check",
    body: "Servers hand the card back with the check. Most teams settle into the habit within a few services.",
    icon: Users,
  },
  {
    day: "Day 30",
    title: "First report",
    body: "Your first monthly report lands on the first business day of the following month, covering every review since the cards went live.",
    icon: Mail,
  },
];

export default function Page() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* (a) Hero */}
        <Section tone="paper" className="pt-16 sm:pt-24">
          <Container size="narrow">
            <Eyebrow>How it works</Eyebrow>
            <Heading as="h1" size="xl" className="mt-5">
              From the last bite to a written review before the check is paid
            </Heading>
            <Lede className="mt-6 max-w-2xl">
              Most guests would leave a review if it were easy. {BRAND.name} makes it a small
              part of the check ritual, and then turns what they write into a report you can act on.
            </Lede>
          </Container>
        </Section>

        {/* (b) The ritual */}
        <Section tone="white" id="ritual">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>The ritual</Eyebrow>
              <Heading className="mt-4">Three steps, and only one of them is yours</Heading>
            </div>
            <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              <div
                aria-hidden="true"
                className="absolute left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] top-6 hidden h-px bg-line-strong md:block"
              />
              {RITUAL.map((s) => (
                <li key={s.n} className="relative">
                  <div className="flex items-center gap-4 md:flex-col md:items-start">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent font-display text-lg text-paper ring-4 ring-white">
                      {s.n}
                    </div>
                  </div>
                  <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-card">
                    <s.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-2xl leading-tight">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        {/* (c) Why the timing matters */}
        <Section tone="paper-2">
          <Container size="narrow">
            <Eyebrow>Why the timing matters</Eyebrow>
            <Heading className="mt-4">Reviews at the table come from the middle</Heading>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-2">
              <p>
                Left alone, reviews come from two kinds of guests. The ones who were delighted
                enough to remember later, and the ones who were upset enough to make a point of it.
                Everyone in between goes home, has a good night, and never thinks about it again.
              </p>
              <p>
                That middle is most of your dining room. They liked the food. They noticed the
                server was kind. They would say so if someone asked while they were still sitting
                there. A card on the table asks, at the one moment they have a phone in hand and a
                minute to spare.
              </p>
              <p>
                The result is a set of reviews that looks more like your actual guests. And because
                they are written minutes after the meal, they mention specifics: the dish, the
                server, the patio, the wait. That is what makes the monthly report useful.
              </p>
            </div>
          </Container>
        </Section>

        {/* (d) The card */}
        <Section tone="white" id="card">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <div>
                <Eyebrow>The card</Eyebrow>
                <Heading className="mt-4">Built to live on a table for years</Heading>
                <Lede className="mt-5">
                  It looks like something you would be glad to hand a guest. Underneath, it is a
                  small piece of hardware we chose carefully.
                </Lede>
                <div className="mt-10">
                  <Card3D design={DEFAULT_DESIGN} className="max-w-md" />
                </div>
              </div>
              <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {CARD_SPECS.map((c) => (
                  <div key={c.title} className="border-t border-line pt-5">
                    <dt className="flex items-center gap-2.5 font-medium text-ink">
                      <c.icon className="h-4.5 w-4.5 text-accent" aria-hidden="true" />
                      {c.title}
                    </dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-muted">{c.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </Section>

        {/* (e) The report */}
        <Section tone="paper" id="report">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
              <div>
                <Eyebrow>The report</Eyebrow>
                <Heading className="mt-4">One email a month that reads every review for you</Heading>
                <Lede className="mt-5">
                  For ${PRICING.monthlyReport} a month, we read every new Google review and write
                  up what matters. Subscribers also get {PRICING.freeReplacementCardsPerMonth} free
                  replacement cards each month.
                </Lede>
                <div className="mt-8">
                  <Button href={LINKS.report} variant="secondary">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Read a sample report
                  </Button>
                </div>
              </div>
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {REPORT_SECTIONS.map((r) => (
                  <li key={r.title} className="bg-white p-5 sm:last:col-span-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent" aria-hidden="true" />
                      <div>
                        <div className="font-medium text-ink">{r.title}</div>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{r.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        {/* (f) First 30 days */}
        <Section tone="white" id="first-30-days">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>Your first 30 days</Eyebrow>
              <Heading className="mt-4">What happens after you order</Heading>
            </div>
            <ol className="mt-14 grid gap-8 md:grid-cols-5 md:gap-6">
              {FIRST_30.map((s, i) => (
                <li key={s.title} className="relative">
                  {i < FIRST_30.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-12 right-[-1.5rem] top-6 hidden h-px bg-line-strong md:block"
                    />
                  )}
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-white text-accent ring-4 ring-white">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {s.day}
                  </div>
                  <h3 className="mt-2 font-display text-2xl leading-tight">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        {/* (g) Google's rules */}
        <Section tone="paper-2">
          <Container size="narrow">
            <div className="rounded-2xl border border-line bg-white p-8 shadow-card sm:p-10">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <Eyebrow>Playing by Google&apos;s rules</Eyebrow>
              </div>
              <Heading size="md" className="mt-5">
                Every guest gets the same card and the same ask
              </Heading>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-2">
                <p>
                  Google prohibits review gating, which means picking who gets asked based on how
                  happy they seem, and it prohibits offering anything in exchange for a review. We
                  agree with both rules, and the card is designed around them.
                </p>
                <p>
                  The card goes down with every check. It does not filter, it does not screen, and
                  it never offers a discount or a free dessert. Guests write whatever they want,
                  directly on Google. You get honest reviews, and nothing about the card gives Google a
                  reason to act against your listing.
                </p>
              </div>
              <Link
                href="/legal/review-policy"
                className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-accent underline-offset-4 hover:underline"
              >
                Read our review policy
              </Link>
            </div>
          </Container>
        </Section>

        {/* (h) CTA */}
        <Section tone="dark">
          <Container size="narrow" className="text-center">
            <Eyebrow tone="inverse" className="justify-center">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              Ready when you are
            </Eyebrow>
            <Heading className="mt-5 text-paper">Cards on every table by the end of the month</Heading>
            <Lede className="mx-auto mt-5 max-w-xl text-paper/70">
              ${PRICING.cardPrice} per card, one time. The monthly report is optional and you can
              add it whenever you like.
            </Lede>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={LINKS.order} variant="gold" size="lg">
                Order cards
              </Button>
              <Button href={LINKS.demo} variant="inverse" size="lg">
                Book a demo
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
