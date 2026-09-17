import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Prose, ProseNote, LegalHeader } from "@/components/sections/Prose";
import { BRAND, PRICING } from "@/lib/brand";

const UPDATED = "September 4, 2026";

export const metadata = {
  title: "Terms of service",
  description: `The terms that govern ${BRAND.name} tap-to-review cards and the monthly review report.`,
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section tone="paper" className="pt-14 sm:pt-20">
          <Container size="narrow">
            <LegalHeader
              title="Terms of service"
              updated={UPDATED}
              intro={`These terms are the agreement between your restaurant and ${BRAND.legalName} when you buy cards or subscribe to the report. Please read them. They are written to be understood, not to hide anything.`}
            />

            <Prose>
              <ProseNote>
                <strong>Plain-English summary.</strong> You buy cards, you own them. The report is month to month and you can
                cancel any time. We do not promise a number of reviews or a rating. You agree to ask every guest the same
                way and never to filter, pay for, or fake reviews. If something goes wrong, our responsibility is capped at
                what you paid us in the last twelve months.
              </ProseNote>

              <h2 id="agreement">1. The agreement</h2>
              <p>
                By placing an order, starting a subscription, or using the {BRAND.name} website or services, you agree to
                these Terms and to our <a href="/legal/privacy">Privacy policy</a> and{" "}
                <a href="/legal/review-policy">Review policy</a>, which are part of this agreement. &ldquo;You&rdquo; means the
                business that orders the service and the person acting for it. You confirm that you are authorized to bind
                that business. If you do not agree, do not use the service.
              </p>

              <h2 id="products">2. What we sell</h2>
              <h3>Cards</h3>
              <p>
                {BRAND.name} cards are credit-card-size NFC cards printed with your restaurant&rsquo;s design. Each card is
                encoded with a short link on our domain that redirects a guest&rsquo;s phone to your restaurant&rsquo;s Google
                review page. Cards are sold one-time at ${PRICING.cardPrice} each, with a minimum order of{" "}
                {PRICING.minCards} cards and a maximum of {PRICING.maxCards} per order. The redirect link stays active for
                as long as we operate the service, whether or not you subscribe to the report.
              </p>
              <h3>Monthly report subscription</h3>
              <p>
                The report is an optional subscription billed at ${PRICING.monthlyReport} per month per restaurant
                location. Each month we read the new public Google reviews for your location and deliver a written report
                covering what guests praise, what they complain about, staff and dishes mentioned by name, trends over
                time, and suggested actions.
              </p>
              <h3>Replacement cards for subscribers</h3>
              <p>
                Active subscribers may request up to {PRICING.freeReplacementCardsPerMonth} replacement cards per month at
                no charge, subject to fair use. Replacement cards are for cards that are lost, stolen, worn out, or damaged
                in normal use. They are not for expanding your set, outfitting new tables, or supplying additional
                locations. Unused replacement allowances do not roll over. If you need more cards than your allowance, or
                need them for new tables, you can buy them at the standard card price. We may ask for a short explanation
                or a photo before shipping replacements, and we may decline requests that look like they exceed fair use.
              </p>

              <h2 id="pricing">3. Pricing and billing</h2>
              <ul>
                <li>All prices are in US dollars. Applicable sales tax is added at checkout where required.</li>
                <li>
                  Payment is handled by Stripe. By purchasing, you authorize us and Stripe to charge the payment method you
                  provide for cards and subscription fees.
                </li>
                <li>
                  Cards are charged in full at checkout, or when you pay the invoice we send you if you order by email. If you
                  cancel before approving your design preview, we refund the card charge in full. Subscriptions are charged on the day
                  you subscribe and then on the same day each month.
                </li>
                <li>
                  If a subscription payment fails, we will retry and email you. If it remains unpaid for 14 days we may pause
                  the report until payment is made.
                </li>
                <li>
                  We may change prices. For subscriptions we will give at least 30 days notice by email before a new price
                  takes effect, and you may cancel before then.
                </li>
              </ul>

              <h2 id="cancel">4. Renewal and cancellation</h2>
              <p>
                The subscription renews automatically each month until you cancel. You can cancel at any time from your
                account or by emailing <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>. Cancellation takes effect at
                the end of the current billing period. You keep access to reports already delivered, and no further charges
                are made. We do not prorate or refund partial months. Your cards keep working after you cancel; only the
                report and the replacement card allowance stop.
              </p>
              <p>
                We may end or suspend your subscription with notice if you breach these Terms, or with at least 30 days
                notice for any other reason, in which case we will refund any prepaid amount for the unused period.
              </p>

              <h2 id="design preview">5. Design approval</h2>
              <p>
                After you order, we prepare a digital design preview of your card design using the logo, colors, and review link you
                provide. We will not print until you approve the design preview in writing (an approval button or email reply
                counts). You are responsible for checking the design preview carefully, including spelling, logo placement, and that
                the review link opens the correct Google listing. You may request reasonable revisions before approving.
                Once you approve, the design is final and production begins.
              </p>

              <h2 id="refunds">6. Refunds and defects</h2>
              <p>
                Because cards are custom printed for your restaurant, they cannot be resold. <strong>Custom-printed cards
                are not refundable after design approval.</strong> Before approval, you may cancel an order for a full
                refund.
              </p>
              <p>
                If cards arrive damaged, misprinted relative to the approved design, or with NFC chips that do not work, tell
                us within 30 days of delivery and we will reprint and reship them at no charge. If a card&rsquo;s chip fails
                in normal use later on, contact us and we will replace it. We cannot accept returns for changes of mind or
                for design details that were present in the approved design.
              </p>

              <h2 id="shipping">7. Shipping</h2>
              <p>
                We ship within the United States. Cards typically ship in about {PRICING.shipBusinessDays} business days after
                design approval, plus transit time. Delivery estimates are estimates, not guarantees. Risk of loss passes to you on delivery
                to the address you provided. If a package is lost in transit, contact us and we will work with the carrier
                and reship if needed. Please double-check your shipping address; we are not responsible for packages sent
                to an incorrect address you supplied.
              </p>

              <h2 id="ownership">8. The cards are yours</h2>
              <p>
                Once paid for, the physical cards belong to you. You may use them at your restaurant as you see fit. You
                may not resell cards that carry another business&rsquo;s review link, and you may not re-encode a card to
                point to content that violates these Terms or Google&rsquo;s policies. The short links, the redirect service,
                the {BRAND.name} name and marks, and our website and report software remain our property.
              </p>
              <p>
                You keep all rights to the logo and artwork you give us. You grant us a limited license to use it to
                produce your design preview and cards, and you confirm you have the right to use it.
              </p>

              <h2 id="no-promises">9. What we do not promise</h2>
              <ul>
                <li>
                  <strong>No guaranteed review counts or ratings.</strong> Cards make it easier for guests to leave a
                  review. Whether a guest leaves one, and what they say, is up to the guest. We make no promise about how
                  many reviews you will receive or how your rating will change.
                </li>
                <li>
                  <strong>Google controls reviews.</strong> Google decides which reviews are published, filtered, delayed,
                  or removed, and can change its policies, its review pages, or its APIs at any time. We do not control
                  Google and are not responsible for its decisions.
                </li>
                <li>
                  <strong>NFC depends on the guest&rsquo;s phone.</strong> Most modern phones read NFC without an app, but
                  some older devices, cases, or settings can prevent a tap from working. Each card also carries a printed
                  QR code and short link as a fallback.
                </li>
              </ul>

              <h2 id="acceptable-use">10. Acceptable use</h2>
              <p>
                Google&rsquo;s review policies and the FTC&rsquo;s rule on consumer reviews and testimonials apply to you as a
                business collecting reviews. Our <a href="/legal/review-policy">Review policy</a> explains how the product
                is designed to comply. By using {BRAND.name} you agree that you will not:
              </p>
              <ul>
                <li>
                  <strong>Gate reviews.</strong> Do not screen guests by how happy they are and show the review link only to
                  the happy ones. Every guest gets the same card.
                </li>
                <li>
                  <strong>Offer incentives.</strong> Do not offer discounts, free items, entries, or anything else of value
                  in exchange for a review, or for a particular kind of review.
                </li>
                <li>
                  <strong>Post fake or insider reviews.</strong> Do not write reviews yourself, have staff or family write
                  them, buy them, or use another person&rsquo;s account to write them.
                </li>
                <li>
                  <strong>Suppress honest feedback.</strong> Do not pressure guests to remove negative reviews or threaten
                  them for leaving one.
                </li>
                <li>Use the cards, links, or website for anything unlawful, deceptive, or harmful, or attempt to interfere with our systems.</li>
              </ul>
              <p>
                If we reasonably believe you are violating these rules, we may pause the redirect on your cards, suspend or
                end your subscription, and decline further orders. We will tell you why and give you a chance to respond
                where practical. Fees for the current period are not refunded in cases of violation.
              </p>

              <h2 id="report">11. Report limitations</h2>
              <p>
                The monthly report is generated with the help of an AI language model that reads your public reviews. It is
                a useful summary, not a perfect one. It may miss a review, misread sarcasm, misattribute a name, or draw a
                conclusion you disagree with. Review it with your own judgment before acting on it.
              </p>
              <p>
                The report&rsquo;s suggestions are general operational guidance. They are not legal, financial, employment,
                health, or safety advice. In particular, references to staff members in the report reflect what guests
                wrote and should not on their own be used as the basis for disciplinary decisions. You are responsible for
                any decisions you make using the report.
              </p>
              <p>
                We depend on Google to make review data available. If Google changes or restricts access, a report may be
                delayed or incomplete. We will tell you if that happens and will not charge for a month in which we cannot
                deliver a report.
              </p>

              <h2 id="trademarks">12. Trademarks and affiliation</h2>
              <p>
                Google, Google Maps, and Google Business Profile are trademarks of Google LLC. {BRAND.name} is not
                affiliated with, sponsored by, or endorsed by Google. We refer to Google only to describe where the review
                link goes. We do not print the Google logo on cards. The {BRAND.name} name, logo, and tap mark are
                trademarks of {BRAND.legalName}.
              </p>

              <h2 id="warranty">13. Disclaimer of warranties</h2>
              <p>
                Except as expressly stated in Section 6, the cards, the redirect service, the report, and the website are
                provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the fullest extent permitted by law, we disclaim
                all other warranties, express or implied, including implied warranties of merchantability, fitness for a
                particular purpose, and non-infringement. Some states do not allow certain disclaimers, so parts of this
                section may not apply to you.
              </p>

              <h2 id="liability">14. Limitation of liability</h2>
              <p>
                To the fullest extent permitted by law, {BRAND.legalName} and its owners, employees, and suppliers will not
                be liable for any indirect, incidental, special, consequential, or punitive damages, or for lost profits,
                lost revenue, lost reviews, changes in ratings, or reputational harm, arising out of or related to the
                service, even if we were told such damages were possible.
              </p>
              <p>
                Our total liability for any claim arising out of or related to these Terms or the service will not exceed
                the amount you paid us in the twelve months before the event giving rise to the claim. These limits apply
                to all legal theories and are a basic part of the bargain that makes our pricing possible.
              </p>

              <h2 id="indemnity">15. Your responsibility</h2>
              <p>
                You agree to defend and hold us harmless from claims, losses, and reasonable legal costs arising from your
                breach of these Terms, your violation of Google&rsquo;s policies or applicable law, the artwork you supply, or
                decisions you make based on the report.
              </p>

              <h2 id="law">16. Governing law and disputes</h2>
              <p>
                These Terms are governed by the laws of the State of {BRAND.state}, without regard to conflict-of-law rules.
                Any dispute will be brought in the state or federal courts located in {BRAND.state}, and both of us consent to that
                venue. Before filing, each side agrees to contact the other and make a good-faith attempt to resolve the
                issue within 30 days. Nothing in this section prevents either of us from seeking an injunction to protect
                intellectual property.
              </p>

              <h2 id="general">17. General terms</h2>
              <ul>
                <li>
                  <strong>Changes.</strong> We may update these Terms. We will post the new date at the top and email
                  active subscribers at least 14 days before material changes take effect. Continued use after that date
                  means you accept the changes.
                </li>
                <li>
                  <strong>Entire agreement.</strong> These Terms, the Privacy policy, the Review policy, and your order
                  confirmation are the whole agreement between us and replace any earlier discussions.
                </li>
                <li>
                  <strong>Severability.</strong> If any part of these Terms is found unenforceable, the rest stays in
                  effect.
                </li>
                <li>
                  <strong>Assignment.</strong> You may not transfer this agreement without our consent. We may assign it as
                  part of a sale of the business, with notice to you.
                </li>
                <li>
                  <strong>No waiver.</strong> If we do not enforce a provision right away, we can still enforce it later.
                </li>
                <li>
                  <strong>Notices.</strong> We will send notices to the email on your account. You can send notices to us
                  at the address below.
                </li>
              </ul>

              <h2 id="contact">18. Contact</h2>
              <p>
                {BRAND.legalName}
                <br />
                Email: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                <br />
                Website: {BRAND.domain}
              </p>
            </Prose>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
