import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";

const COOKIE_NAME = "tn_customer_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days - owners check this occasionally, not daily

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "SESSION_SECRET is not set (or too short). Generate one with `openssl rand -base64 32` " +
        "and add it to your environment."
    );
  }
  return new TextEncoder().encode(secret);
}

export type CustomerSession = { customerId: number; email: string };

/**
 * Creates a dashboard login. Only called right after a real completed Stripe
 * checkout (see app/api/customer/signup) - there is no open "sign up" form
 * anywhere on the public site, on purpose: an account always starts from an
 * order that already exists.
 */
export async function createCustomer(email: string, password: string): Promise<CustomerSession> {
  const normalizedEmail = email.toLowerCase().trim();
  const passwordHash = await bcrypt.hash(password, 12);
  const rows = await sql<{ id: number }[]>`
    insert into customers (email, password_hash) values (${normalizedEmail}, ${passwordHash})
    returning id
  `;
  return { customerId: rows[0].id, email: normalizedEmail };
}

export async function getCustomerByEmail(email: string): Promise<{ id: number } | null> {
  const rows = await sql<{ id: number }[]>`
    select id from customers where email = ${email.toLowerCase().trim()} limit 1
  `;
  return rows[0] ?? null;
}

export async function verifyCustomerPassword(email: string, password: string): Promise<CustomerSession | null> {
  const rows = await sql<{ id: number; email: string; password_hash: string }[]>`
    select id, email, password_hash from customers where email = ${email.toLowerCase().trim()} limit 1
  `;
  const user = rows[0];
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;
  return { customerId: user.id, email: user.email };
}

/**
 * Attaches every existing order that matches this email (and has no owner
 * yet) to this customer account, plus - by session id, when it is known and
 * that order hasn't been picked up by the email match already - the specific
 * order that triggered the signup. Safe to call more than once.
 */
export async function linkOrdersToCustomer(customerId: number, email: string, stripeSessionId?: string | null): Promise<void> {
  const normalizedEmail = email.toLowerCase().trim();
  if (normalizedEmail) {
    await sql`
      update orders set customer_id = ${customerId}, updated_at = now()
      where customer_id is null and lower(contact_email) = ${normalizedEmail}
    `;
  }
  if (stripeSessionId) {
    await sql`
      update orders set customer_id = ${customerId}, updated_at = now()
      where customer_id is null and stripe_session_id = ${stripeSessionId}
    `;
  }
}

export async function createCustomerSessionCookie(session: CustomerSession) {
  const token = await new SignJWT({ email: session.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(session.customerId))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secretKey());

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearCustomerSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

/** Reads and verifies the session cookie. Returns null if missing/invalid/expired. */
export async function getCustomerSession(): Promise<CustomerSession | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (!payload.sub || typeof payload.email !== "string") return null;
    return { customerId: Number(payload.sub), email: payload.email };
  } catch {
    return null;
  }
}

export { COOKIE_NAME as CUSTOMER_SESSION_COOKIE };
