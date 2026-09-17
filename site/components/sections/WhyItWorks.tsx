import { Container } from "@/components/ui/Container";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { Clock, Smartphone, ShieldCheck, RefreshCw } from "lucide-react";

const points = [
  {
    icon: Clock,
    title: "Asked at the right moment",
    body: "The card arrives with the check, while the meal is still a feeling and not a memory. Reviews written at the table tend to mention specifics: the dish, the server, the patio.",
  },
  {
    icon: Smartphone,
    title: "Nothing to download, nothing to type",
    body: "Hold the phone to the card, tap the link that pops up, and the review form opens. No QR code to hunt for, no URL to type, no app. Most guests are already signed in to Google on their phone.",
  },
  {
    icon: ShieldCheck,
    title: "Every guest, the same way",
    body: "You ask everyone, you never filter, you never reward. That is what Google requires, and it is how you avoid giving Google a reason to remove them.",
  },
  {
    icon: RefreshCw,
    title: "Cards you never have to re-print",
    body: "Each card points to a short link we manage. Change your Google link, move locations, or add a survey later. The plastic stays the same.",
  },
];

export function WhyItWorks() {
  return (
    <Section tone="paper-2">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>Why it works</Eyebrow>
            <Heading className="mt-4">Timing beats tactics.</Heading>
            <Lede className="mt-5">
              Email and text follow-ups arrive after the guest has gone home. By then the only guests who answer
              are the ones with something to shout about.
            </Lede>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {points.map((p) => (
              <div key={p.title} className="rounded-2xl border border-line bg-white p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
