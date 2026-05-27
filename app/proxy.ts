import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api).*)",
  ],
};

const SESSION_COOKIE = "celestium_session";
const LOGIN_ROUTE = "/login";
const PROTECTED_PATH_PREFIXES = [""];

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (pathname === LOGIN_ROUTE) return NextResponse.next();

  const loggedIn = hasSession(req);
  if (!loggedIn && isProtectedPath(pathname)) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, req.url));
  }

  return NextResponse.next();
}

function hasSession(req: NextRequest) {
  return Boolean(req.cookies.get(SESSION_COOKIE)?.value);
}

function isProtectedPath(pathname: string) {
  return PROTECTED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
