import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Prose, ProseNote, LegalHeader } from "@/components/sections/Prose";
import { BRAND, PRICING } from "@/lib/brand";

const UPDATED = "September 4, 2026";

export const metadata = {
  title: "Privacy policy",
  description: `How ${BRAND.name} collects, uses, and protects information from restaurants, their guests, and visitors to our website.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section tone="paper" className="pt-14 sm:pt-20">
          <Container size="narrow">
            <LegalHeader
              title="Privacy policy"
              updated={UPDATED}
              intro={`This policy explains what ${BRAND.name} collects, why, and what we do with it. We keep it short where we can and specific where it matters.`}
            />

            <Prose>
              <ProseNote>
                <strong>Who we are.</strong> {BRAND.name} is operated by {BRAND.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;).
                We sell NFC tap-to-review cards to restaurants and offer an optional monthly report that summarizes a
                restaurant&rsquo;s public Google reviews. Questions about this policy go to{" "}
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
              </ProseNote>

              <h2 id="summary">The short version</h2>
              <ul>
                <li>We collect what we need to ship cards, bill subscriptions, and produce the report. Nothing more.</li>
                <li>Stripe handles payment. We never see or store card numbers.</li>
                <li>A tap on a card records a timestamp and a device type. It does not record who the guest is.</li>
                <li>The report is built from reviews that are already public on Google.</li>
                <li>We do not sell personal information. We do not run advertising trackers on this site.</li>
              </ul>

              <h2 id="scope">Who this policy covers</h2>
              <p>This policy applies to three groups of people:</p>
              <ul>
                <li>
                  <strong>Restaurant customers.</strong> Owners, managers, and staff who order cards, subscribe to the
                  report, or contact us.
                </li>
                <li>
                  <strong>Guests.</strong> Diners who tap a {BRAND.name} card at a restaurant. We collect very little from
                  guests, and none of it identifies them.
                </li>
                <li>
                  <strong>Website visitors.</strong> Anyone who browses {BRAND.domain}.
                </li>
              </ul>

              <h2 id="collect">What we collect and why</h2>

              <h3>1. Information you give us on the website</h3>
              <p>
                When you fill out a lead form, book a demo, or place an order, we collect what you type: your name,
                email address, phone number if you provide it, restaurant name and address, and any message you send.
                For orders we also collect your shipping address, the Google review link for your restaurant, the
                quantity of cards, and any logo or artwork you upload for the card design.
              </p>
              <p>We use this information to answer you, produce your design preview, print and ship your cards, and set up your account.</p>

              <h3>2. Payment information</h3>
              <p>
                Payments are processed by Stripe. When you pay, your card details are entered directly into Stripe&rsquo;s
                secure form and sent to Stripe. We never receive, see, or store your full card number, expiration date, or
                security code. Stripe shares with us only what we need to run the account: a customer identifier, the last
                four digits and brand of the card, the amount charged, and the billing status. Stripe&rsquo;s own privacy
                policy governs how it handles your data.
              </p>

              <h3>3. Tap analytics from the cards</h3>
              <p>
                Each card carries a short link on our domain ({BRAND.shortLinkHost}) that redirects the guest to your
                restaurant&rsquo;s Google review page. When a guest taps a card we log:
              </p>
              <ul>
                <li>The date and time of the tap.</li>
                <li>Which card was tapped (its serial), so you can see which tables are active.</li>
                <li>A general device type, such as iPhone or Android, taken from the browser user agent.</li>
              </ul>
              <p>
                We do not collect the guest&rsquo;s name, phone number, email address, Google account, contacts, or precise
                location. We do not set cookies on the guest&rsquo;s phone during the redirect. We do not know whether the
                guest went on to write a review or what they wrote; that happens on Google, not with us. The IP address
                used for the request is processed briefly to serve the redirect and protect against abuse and is not
                stored with the tap record.
              </p>
              <p>
                We use tap counts to show you how often cards are being used and to spot cards that may be lost or
                damaged.
              </p>

              <h3>4. Public Google review data we process for the report</h3>
              <p>
                If you subscribe to the monthly report, we read the reviews that are publicly posted on your
                restaurant&rsquo;s Google listing. A public review includes the reviewer&rsquo;s chosen display name, their star
                rating, the text of the review, the date, and any public reply from the restaurant. This information is
                already visible to anyone on Google. We do not obtain private information about reviewers, and we do not
                contact reviewers.
              </p>
              <p>We process this data to:</p>
              <ul>
                <li>Summarize what guests praise and what they complain about.</li>
                <li>Identify dishes and staff members mentioned by name in reviews.</li>
                <li>Track how sentiment changes month to month.</li>
                <li>Suggest concrete actions for you to consider.</li>
              </ul>
              <p>
                Reports are generated with the help of an AI language model. Review text is sent to our model provider
                solely to produce your report. We choose providers that contractually agree not to use customer content to
                train their models. Reports are delivered only to the restaurant that subscribed to them.
              </p>

              <h3>5. Google Business Profile access</h3>
              <p>
                Some restaurants choose to grant us manager access to their Google Business Profile. This is optional.
                If you grant it, we use that access only to read your reviews reliably and, if you ask us to, to help you
                post replies. We do not change your business information, hours, photos, or posts unless you specifically
                request it in writing. You can remove our access at any time from your Google Business Profile settings,
                and we will remove ourselves promptly when you cancel.
              </p>

              <h3>6. Information collected automatically on our website</h3>
              <p>
                Our web servers keep standard logs, which include IP address, browser type, the pages requested, and
                timestamps. We use these logs for security, debugging, and to keep the site running. They are kept for a
                limited period and then deleted.
              </p>

              <h2 id="cookies">Cookies</h2>
              <p>
                We use only essential cookies: the ones needed to keep you signed in to your account, remember your order
                as you build it, and protect forms from abuse. These cannot be switched off without breaking the site.
              </p>
              <p>
                We do not currently use advertising cookies or third-party analytics trackers. If we add a privacy-focused
                analytics tool in the future, we will update this policy first and, where required by law, ask for your
                consent before setting any non-essential cookie.
              </p>

              <h2 id="email">Email communications</h2>
              <p>We send three kinds of email:</p>
              <ul>
                <li>
                  <strong>Transactional.</strong> Order confirmations, design previews, shipping updates, receipts, and monthly
                  reports. You receive these because they are part of the service you bought.
                </li>
                <li>
                  <strong>Service notices.</strong> Changes to pricing, this policy, or the Terms, and security alerts.
                </li>
                <li>
                  <strong>Occasional updates.</strong> Tips and product news. These are optional. Every one includes an
                  unsubscribe link, and opting out does not affect your service.
                </li>
              </ul>
              <p>We do not send marketing email to guests who tap a card. We never have their email address.</p>

              <h2 id="sharing">How we share information</h2>
              <p>We do not sell personal information, and we do not share it with advertisers. We share information only with:</p>
              <table>
                <thead>
                  <tr>
                    <th>Who</th>
                    <th>What</th>
                    <th>Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Stripe</td>
                    <td>Billing name, email, amounts</td>
                    <td>Payment processing and subscription billing</td>
                  </tr>
                  <tr>
                    <td>Print and fulfillment partner</td>
                    <td>Shipping name, address, card artwork</td>
                    <td>Printing and delivering your cards</td>
                  </tr>
                  <tr>
                    <td>Hosting and email providers</td>
                    <td>Account data, report content</td>
                    <td>Running the website and delivering email</td>
                  </tr>
                  <tr>
                    <td>AI model provider</td>
                    <td>Public review text</td>
                    <td>Generating your monthly report</td>
                  </tr>
                  <tr>
                    <td>Authorities</td>
                    <td>Only what is legally required</td>
                    <td>Responding to valid legal requests</td>
                  </tr>
                </tbody>
              </table>
              <p>
                If {BRAND.legalName} is ever acquired or merges with another company, customer information may transfer as
                part of that deal. We would tell you before that happens and this policy would continue to apply.
              </p>

              <h2 id="retention">How long we keep information</h2>
              <ul>
                <li>
                  <strong>Account and order records:</strong> for as long as you are a customer, and then as long as tax and
                  accounting rules require, typically seven years for invoices.
                </li>
                <li>
                  <strong>Tap analytics:</strong> up to 24 months, then aggregated or deleted.
                </li>
                <li>
                  <strong>Review data and reports:</strong> for as long as your subscription is active so we can show trends.
                  When you cancel, we delete stored review data and generated reports within 90 days, except for copies
                  you have downloaded.
                </li>
                <li>
                  <strong>Lead form submissions</strong> that do not become customers: up to 18 months.
                </li>
                <li>
                  <strong>Server logs:</strong> up to 90 days.
                </li>
              </ul>

              <h2 id="security">Security</h2>
              <p>
                We use encryption in transit for all connections to our website and services, limit staff access to the
                minimum needed, and rely on established providers for hosting, payments, and email. No system is perfectly
                secure. If we learn of a breach that affects your information, we will notify you as required by law.
              </p>

              <h2 id="rights">Your choices and rights</h2>
              <p>
                Depending on where you live, you may have the right to access, correct, delete, or receive a copy of your
                personal information, to object to or restrict certain processing, and to opt out of marketing. Residents
                of California and several other US states have specific rights under their state privacy laws, including
                the right to know what we collect and the right not to be discriminated against for exercising those
                rights. We do not sell or share personal information for cross-context behavioral advertising.
              </p>
              <p>
                To exercise any of these rights, email <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> from the address
                on your account. We will respond within the time required by applicable law, usually within 30 days. We may
                ask you to verify your identity first.
              </p>
              <p>
                <strong>Reviewers.</strong> If you wrote a Google review and want it changed or removed, that must be done
                through Google, since we only process what is publicly posted there. If you would prefer we exclude your
                review from a restaurant&rsquo;s report, email us and we will do so.
              </p>

              <h2 id="children">Children</h2>
              <p>
                Our website and services are intended for business owners and adults. We do not knowingly collect personal
                information from anyone under 16. If you believe a child has provided information to us, contact us and we
                will delete it.
              </p>

              <h2 id="international">Where data is stored</h2>
              <p>
                We are based in the United States and store data with providers in the United States. If you access our
                services from outside the US, you understand that your information will be processed here.
              </p>

              <h2 id="changes">Changes to this policy</h2>
              <p>
                When we make meaningful changes, we will update the date at the top of this page and email active customers
                before the changes take effect. Continued use of the service after the effective date means you accept the
                updated policy. Past versions are available on request.
              </p>

              <h2 id="contact">Contact</h2>
              <p>
                {BRAND.legalName}
                <br />
                Email: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                <br />
                Website: {BRAND.domain}
              </p>
              <p className="text-sm text-muted">
                Reference: the monthly report is billed at ${PRICING.monthlyReport} per month per location and includes{" "}
                {PRICING.freeReplacementCardsPerMonth} replacement cards per month. Pricing terms are set out in our{" "}
                <a href="/legal/terms">Terms of service</a>.
              </p>
            </Prose>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
