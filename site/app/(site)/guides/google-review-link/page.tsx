import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ExternalLink, Mail } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ReviewLinkBuilder } from "@/components/tools/ReviewLinkBuilder";
import { BRAND, LINKS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Find your Google review link",
  description:
    "Three ways to find the link that opens your restaurant's Google review box, plus a builder that turns a Place ID into a working review link.",
};

const PLACE_ID_FINDER_URL =
  "https://developers.google.com/maps/documentation/places/web-service/place-id";

type Method = {
  title: string;
  intro: string;
  steps: ReactNode[];
  note?: string;
};

const methods: Method[] = [
  {
    title: "From your Business Profile on a computer",
    intro: "The fastest way if you manage your profile from a laptop.",
    steps: [
      "Sign in to the Google account that owns your Business Profile.",
      "Search your restaurant's name on Google. Your profile panel appears with owner tools at the top.",
      <>
        Click the button labeled <strong>Ask for reviews</strong> (older profiles say{" "}
        <strong>Get more reviews</strong>, or similar).
      </>,
      <>
        Copy the short link that appears. It looks like{" "}
        <span className="font-mono text-[13px]">g.page/r/.../review</span>.
      </>,
      "Open it in a private window to check that it lands on the review box, not your profile.",
    ],
    note: "If you do not see owner tools, you are either signed in to the wrong account or the profile is not verified yet.",
  },
  {
    title: "From the Google Maps app on your phone",
    intro: "Handy if you run the business from your phone.",
    steps: [
      "Open Google Maps and make sure you are signed in as the profile owner.",
      <>
        Tap your profile picture, then <strong>Your Business Profile</strong> (or similar).
      </>,
      <>
        Look for <strong>Ask for reviews</strong>, <strong>Get more reviews</strong> or{" "}
        <strong>Share review form</strong>. Google moves this around, so check under the More or
        Share menu if you do not see it.
      </>,
      "Tap Copy link. That is your review link.",
      "Paste it into a message to yourself and tap it to confirm the review box opens.",
    ],
  },
  {
    title: "Build it from your Place ID",
    intro: "Works for any verified business and does not depend on Google's buttons.",
    steps: [
      <>
        Open Google&apos;s Place ID Finder. It sits on a developer page, but the finder itself is
        just a map with a search box. No account or code needed.
      </>,
      "Search your restaurant's name and pick the result with your street address.",
      <>
        Copy the Place ID. It usually starts with{" "}
        <span className="font-mono text-[13px]">ChIJ</span>.
      </>,
      "Paste it into the link builder below and test the result.",
    ],
  },
];

const problems = [
  {
    title: "The link opens my profile, not the review box",
    body: "You have a share link for your listing rather than a review link. Share links from Google Maps (maps.app.goo.gl) show your profile page. A review link comes from the Ask for reviews button, or from a Place ID using the builder above. Test it: the right link lands on five empty stars.",
  },
  {
    title: "I cannot find the Ask for reviews button",
    body: "Google only shows owner tools on verified profiles. If your restaurant is not verified yet, complete verification first through Google Business Profile. Until then, guests can still leave reviews on your listing but you will not have a short link. The Place ID method also requires the listing to exist on Google Maps.",
  },
  {
    title: "I have more than one location",
    body: "Each location has its own listing, its own Place ID and its own review link. Repeat the steps for every location and label the links clearly. When you order cards, tell us which link belongs to which location so every card points to the right one.",
  },
];

export default function Page() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section tone="paper" className="pb-12 sm:pb-16">
          <Container size="narrow">
            <Eyebrow>Guide</Eyebrow>
            <Heading as="h1" size="xl" className="mt-4">
              Find your Google review link
            </Heading>
            <Lede className="mt-6">
              Every {BRAND.name} card sends guests to one link: the screen where they write a Google
              review for your restaurant. Here are three ways to find it, in about five minutes.
            </Lede>
            <p className="mt-6 text-sm text-muted">
              Google renames and moves buttons often. Where we name one, the label may read a little
              differently on your screen.
            </p>
          </Container>
        </Section>

        <Section tone="paper-2">
          <Container size="narrow">
            <Eyebrow>Three methods</Eyebrow>
            <Heading size="md" className="mt-4">
              Pick whichever is easiest for you
            </Heading>
            <ol className="mt-10 flex flex-col gap-6">
              {methods.map((m, i) => (
                <li
                  key={m.title}
                  className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft font-display text-lg text-accent">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-2xl leading-tight">{m.title}</h3>
                      <p className="mt-1 text-sm text-muted">{m.intro}</p>
                      <ol className="mt-5 space-y-3 text-[15px] leading-relaxed text-ink-2">
                        {m.steps.map((step, j) => (
                          <li key={j} className="flex gap-3">
                            <span className="mt-[3px] w-5 shrink-0 text-[12px] font-semibold text-muted">
                              {i + 1}.{j + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                      {i === 2 && (
                        <div className="mt-5">
                          <Button
                            href={PLACE_ID_FINDER_URL}
                            variant="secondary"
                            size="sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Open the Place ID Finder <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      )}
                      {m.note && (
                        <p className="mt-5 border-t border-line pt-4 text-sm text-muted">{m.note}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        <Section tone="paper" id="builder">
          <Container size="narrow">
            <Eyebrow>Link builder</Eyebrow>
            <Heading size="md" className="mt-4">
              Turn a Place ID into a review link
            </Heading>
            <Lede className="mt-4 text-lg sm:text-lg">
              Paste a Place ID or a short link. We check it, build the link, and let you test it in a
              new tab.
            </Lede>
            <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
              <ReviewLinkBuilder />
            </div>
          </Container>
        </Section>

        <Section tone="paper" className="pt-0 sm:pt-0">
          <Container size="narrow">
            <div className="rounded-2xl bg-dark p-8 text-paper sm:p-10">
              <Eyebrow tone="inverse">Send it to us</Eyebrow>
              <Heading size="sm" className="mt-4">
                Rather not do this yourself?
              </Heading>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-paper/75">
                Send us your restaurant name and address. We find the link, test it, and program your
                cards to it before they ship. Most owners never touch it again.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={LINKS.demo} variant="gold">
                  Book a demo
                </Button>
                <Button href={`mailto:${BRAND.email}`} variant="inverse">
                  <Mail className="h-4 w-4" aria-hidden="true" /> {BRAND.email}
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        <Section tone="white">
          <Container size="narrow">
            <Eyebrow>Common problems</Eyebrow>
            <Heading size="md" className="mt-4">
              If something looks off
            </Heading>
            <dl className="mt-10 divide-y divide-line border-y border-line">
              {problems.map((p) => (
                <div key={p.title} className="grid gap-3 py-7 sm:grid-cols-[1fr_1.6fr] sm:gap-8">
                  <dt className="font-display text-xl leading-snug">{p.title}</dt>
                  <dd className="text-[15px] leading-relaxed text-ink-2">{p.body}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-sm text-muted">
              Still stuck? Email{" "}
              <a href={`mailto:${BRAND.email}`} className="text-ink underline underline-offset-4">
                {BRAND.email}
              </a>{" "}
              with your restaurant name and address.
            </p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
