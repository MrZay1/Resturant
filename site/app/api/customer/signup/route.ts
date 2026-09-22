import { NextResponse } from "next/server";
import { z } from "zod";
import { guard } from "@/lib/apiGuard";
import { getStripe } from "@/lib/stripe";
import { getCustomerByEmail, createCustomer, linkOrdersToCustomer, createCustomerSessionCookie } from "@/lib/customerAuth";

const Body = z.object({
  sessionId: z.string().min(1).max(200),
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

/**
 * Creates a dashboard login. Only reachable from the order-success page,
 * right after a checkout completes - there is no public "sign up" form.
 * When Stripe is configured, the session id is verified as a real, completed
 * checkout before an account is allowed; that order is then linked to the
 * new account, along with any other past orders sharing the same email.
 */
export async function POST(req: Request) {
  const blocked = guard(req, { key: "customer-signup", limit: 10, windowMs: 10 * 60 * 1000 });
  if (blocked) return blocked;

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  const { sessionId, email, password } = parsed.data;

  const stripe = getStripe();
  if (stripe) {
    if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sessionId)) {
      return NextResponse.json({ error: "That order could not be verified." }, { status: 400 });
    }
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.status !== "complete") {
        return NextResponse.json({ error: "That order has not finished checkout yet." }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "That order could not be verified." }, { status: 400 });
    }
  }

  const existing = await getCustomerByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "An account with that email already exists. Sign in instead." }, { status: 409 });
  }

  const session = await createCustomer(email, password);
  await linkOrdersToCustomer(session.customerId, email, sessionId);
  await createCustomerSessionCookie(session);
  return NextResponse.json({ ok: true });
}
