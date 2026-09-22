import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_COOKIE = "tn_admin_session";
const CUSTOMER_COOKIE = "tn_customer_session";

/**
 * Gate /admin and /dashboard behind their own signed session cookies.
 * Verified here (edge-safe with jose) rather than importing lib/auth.ts or
 * lib/customerAuth.ts, which pull in the Postgres client - middleware should
 * stay dependency-light.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login" || pathname === "/login") return NextResponse.next();

  const isAdminRoute = pathname.startsWith("/admin");
  const cookieName = isAdminRoute ? ADMIN_COOKIE : CUSTOMER_COOKIE;
  const loginPath = isAdminRoute ? "/admin/login" : "/login";

  const token = req.cookies.get(cookieName)?.value;
  const secret = process.env.SESSION_SECRET;
  if (token && secret) {
    try {
      await jwtVerify(token, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch {
      // fall through to redirect
    }
  }
  const loginUrl = new URL(loginPath, req.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
