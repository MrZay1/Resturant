# Getting access to the Google Business Profile API

This is the API that will eventually let Tablenote read a restaurant's Google reviews
automatically to build the monthly report (Phase 5). It has its own approval process
that runs on Google's timeline, not ours - worth starting now so it isn't the thing
that delays launch later.

## The one requirement worth knowing about before you start

Google requires the applicant to manage a Google Business Profile that's been
**verified and active for at least 60 days** before they'll approve API access. That
profile can be your own business, or a client's.

This means: don't apply using a brand-new "Tablenote" listing you just created - that
starts a 60-day clock. Instead, as soon as you have your first real restaurant
customer, ask them to add you as a **Manager** on their existing Google Business
Profile (you'll want this anyway, to eventually pull their reviews). A restaurant's
listing is almost always years old already, so this satisfies the 60-day requirement
immediately instead of making you wait.

So the practical order is: sign your first restaurant → get added as a manager on
their Google Business Profile → apply.

## Steps

1. **Create a Google Cloud project.** Go to [console.cloud.google.com](https://console.cloud.google.com),
   create a new project (or use an existing one), and note its **Project Number**
   (shown on the project dashboard).
2. **Get manager access to a qualifying Business Profile** (see above - your own if
   it's 60+ days old and verified, or a client's).
3. **Submit the access request.** Go to the
   [Business Profile API contact form](https://support.google.com/business/workflow/16726127)
   and choose "Application for Basic API Access." Use an email address that is an
   owner/manager on the qualifying Business Profile, and have your Project Number
   ready.
4. **Wait for Google's review.** There's no published timeline - you'll get a
   follow-up email either way. You can check your own status without waiting on the
   email: in Google Cloud Console, look at your quota for the Business Profile API.
   - **0 requests/minute** = not yet approved
   - **300 requests/minute** = approved

## Two different Google APIs, worth not confusing

- **Google Places API** - no approval process, just an API key. Gives review count,
  star rating, and up to 5 sample reviews per place. This is enough for the AI pitch
  generator (Phase 4) to show competitor stats and general context.
- **Google Business Profile API** - the one this doc is about. Requires the approval
  process above, plus the restaurant's own OAuth consent once they're a customer.
  This is the one that can actually pull the full, ongoing stream of new reviews a
  restaurant is getting, which is what the $50/month report is actually built on.

Start the approval process for the second one now; the first one can be wired up
anytime since it doesn't need approval.
