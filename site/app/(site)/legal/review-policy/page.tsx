import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Prose, ProseNote, LegalHeader } from "@/components/sections/Prose";
import { BRAND } from "@/lib/brand";

const UPDATED = "September 4, 2026";

const GOOGLE_POLICY = "https://support.google.com/contributionpolicy/answer/7400114";
const FTC_RULE = "https://www.ftc.gov/legal-library/browse/rules/rule-use-consumer-reviews-testimonials";

export const metadata = {
  title: "Review policy",
  description: `How ${BRAND.name} is built to comply with Google's review policies and the FTC rule on consumer reviews and testimonials.`,
};

export default function ReviewPolicyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section tone="paper" className="pt-14 sm:pt-20">
          <Container size="narrow">
            <LegalHeader
              title="Review policy"
              updated={UPDATED}
              intro="Honest reviews are the whole point. This page explains how the product is designed to stay inside Google's rules and US law, what we ask of the restaurants that use it, and what guests should know."
            />

            <Prose>
              <ProseNote>
                <strong>One sentence.</strong> {BRAND.name} makes it easier for every guest to leave a review. It never
                chooses which guests get asked, never rewards them, and never writes reviews.
              </ProseNote>

              <h2 id="rules">The rules we follow</h2>
              <p>Two sets of rules matter for a restaurant collecting Google reviews in the United States.</p>
              <h3>Google&rsquo;s review policies</h3>
              <p>
                Google publishes content policies for reviews and other contributions to Maps. In plain terms, Google
                does not allow businesses to selectively ask for reviews from customers they expect to be positive, to
                discourage or block negative reviews, to offer incentives in exchange for reviews, or to post reviews of
                their own business or a competitor&rsquo;s. Updates in 2026 added that businesses must not pressure guests
                to write a review while they are on the premises, must not set review quotas for staff, must not ask
                guests to include specific content such as a staff member&rsquo;s name, and must not collect reviews on a
                shared device such as a house tablet. Reviews must reflect a real experience by the person writing
                them. Google can remove reviews and take action against listings that break these rules. You can read the
                current policy at{" "}
                <a href={GOOGLE_POLICY} target="_blank" rel="noopener noreferrer">
                  support.google.com
                </a>
                .
              </p>
              <h3>The FTC rule on consumer reviews and testimonials</h3>
              <p>
                In October 2024 the Federal Trade Commission&rsquo;s rule on the use of consumer reviews and testimonials
                (16 CFR Part 465) took effect. Among other things, it prohibits creating or buying fake reviews, offering
                compensation conditioned on a review expressing a particular sentiment, having employees or relatives
                review a business without clear disclosure, suppressing negative reviews through threats or
                intimidation, and displaying reviews in a way that misrepresents what customers said. Violations can
                carry civil penalties. The rule is published at{" "}
                <a href={FTC_RULE} target="_blank" rel="noopener noreferrer">
                  ftc.gov
                </a>
                .
              </p>

              <h2 id="how">How {BRAND.name} is built to comply</h2>
              <table>
                <thead>
                  <tr>
                    <th>Principle</th>
                    <th>How the product works</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Every guest is asked the same way</td>
                    <td>
                      The card is dropped at every table with the check. There is no rating screen, no &ldquo;how was your
                      meal?&rdquo; question, and no branching. One tap, one destination: the public Google review page.
                    </td>
                  </tr>
                  <tr>
                    <td>No filtering by sentiment</td>
                    <td>
                      The link does not ask for a star rating before deciding where to send the guest. Happy and unhappy
                      guests land in exactly the same place. We do not build, and will not build, a private feedback path
                      that catches negative comments before they reach Google.
                    </td>
                  </tr>
                  <tr>
                    <td>No incentives</td>
                    <td>
                      Our cards, design previews, and templates never include offers, discounts, contests, or rewards tied to
                      leaving a review. We decline artwork that does.
                    </td>
                  </tr>
                  <tr>
                    <td>No employee, family, or fake reviews</td>
                    <td>
                      We do not write reviews, sell reviews, or supply accounts. Our report reads reviews; it never creates
                      them. If we notice a pattern that suggests fake reviews, we will raise it with the restaurant.
                    </td>
                  </tr>
                  <tr>
                    <td>Guest privacy</td>
                    <td>
                      A tap records only a timestamp and a device type. We never collect a guest&rsquo;s name, contact
                      details, or Google account. See our <a href="/legal/privacy">Privacy policy</a>.
                    </td>
                  </tr>
                  <tr>
                    <td>Honest reporting</td>
                    <td>
                      The monthly report summarizes all new public reviews, positive and negative. It does not hide the bad
                      ones or reword the good ones.
                    </td>
                  </tr>
                  <tr>
                    <td>Restaurants must not gate</td>
                    <td>
                      Review gating and incentives are prohibited by our <a href="/legal/terms">Terms of service</a>. We
                      may pause a restaurant&rsquo;s cards or cancel its subscription for violations.
                    </td>
                  </tr>
                </tbody>
              </table>

              <h2 id="ask">What we ask of restaurants</h2>
              <ul>
                <li>Drop the card at every table, every time. Consistency is what keeps it fair.</li>
                <li>Train servers to say something simple and neutral, such as &ldquo;If you have a minute, we would love an honest review.&rdquo;</li>
                <li>Never ask only the guests who seemed happy. Never skip a table because something went wrong.</li>
                <li>Leave the table after the card goes down. No waiting, no hovering, no &ldquo;could you do it before you go?&rdquo;</li>
                <li>No review quotas, contests, or leaderboards for servers, and never ask a guest to mention a server by name.</li>
                <li>Guests use their own phone. Never hand a guest a house tablet or tap the card to a staff device for them.</li>
                <li>Never offer a discount, a free dessert, a raffle entry, or anything else in exchange for a review.</li>
                <li>Do not ask staff, family, or friends to review the restaurant.</li>
                <li>Do not pressure a guest to change or remove a review. Reply politely and fix the problem instead.</li>
                <li>Reply to reviews honestly. Do not claim a review is fake unless you have real reason to believe it.</li>
                <li>Use the report to improve the restaurant, not to argue with guests.</li>
              </ul>

              <h2 id="guests">What guests should know</h2>
              <ul>
                <li>Tapping a card is optional. Nothing happens if you do not.</li>
                <li>The card takes you to Google. Your review is written on Google, under Google&rsquo;s terms, and is public.</li>
                <li>The restaurant cannot see who tapped. We record only that a tap happened and what type of phone it was.</li>
                <li>You will not be offered anything for your review, and you should not be. If a restaurant offers you something, please tell us.</li>
                <li>Write what you actually experienced. Positive, negative, or mixed, it all helps the restaurant.</li>
                <li>You can edit or delete your review at any time through your Google account.</li>
              </ul>

              <h2 id="report">Report a concern</h2>
              <p>
                If you believe a restaurant using {BRAND.name} is gating reviews, offering incentives, or posting fake
                reviews, email <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>. We take these reports seriously and
                will look into every one. Fake or misleading reviews can also be reported directly to Google from the
                review itself.
              </p>

              <h2 id="changes">Changes to this policy</h2>
              <p>
                Google and the FTC update their rules from time to time. When they do, we will update this page and, where
                it affects how restaurants should use the product, email active customers. This page is a plain-English
                explanation, not legal advice. Restaurants remain responsible for their own compliance.
              </p>
            </Prose>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
