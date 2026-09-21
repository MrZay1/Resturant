import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";

const COOKIE_NAME = "tn_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

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

export type AdminSession = { adminId: number; email: string };

export async function verifyAdminPassword(email: string, password: string): Promise<AdminSession | null> {
  const rows = await sql<{ id: number; email: string; password_hash: string }[]>`
    select id, email, password_hash from admin_users where email = ${email.toLowerCase().trim()} limit 1
  `;
  const user = rows[0];
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;
  return { adminId: user.id, email: user.email };
}

export async function createSessionCookie(session: AdminSession) {
  const token = await new SignJWT({ email: session.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(session.adminId))
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

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

/** Reads and verifies the session cookie. Returns null if missing/invalid/expired. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (!payload.sub || typeof payload.email !== "string") return null;
    return { adminId: Number(payload.sub), email: payload.email };
  } catch {
    return null;
  }
}

export { COOKIE_NAME as ADMIN_SESSION_COOKIE };
