import { NextResponse } from "next/server";
import { z } from "zod";
import { guard } from "@/lib/apiGuard";
import { verifyAdminPassword, createSessionCookie } from "@/lib/auth";

const Body = z.object({ email: z.string().email(), password: z.string().min(1) });

export async function POST(req: Request) {
  const blocked = guard(req, { key: "admin-login", limit: 10, windowMs: 10 * 60 * 1000 });
  if (blocked) return blocked;

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const session = await verifyAdminPassword(parsed.data.email, parsed.data.password);
  if (!session) return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 });

  await createSessionCookie(session);
  return NextResponse.json({ ok: true });
}
