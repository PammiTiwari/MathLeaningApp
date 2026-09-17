import { NextRequest, NextResponse } from "next/server";
import { COOKIE, verifyToken } from "@/lib/auth";

/** Everything is behind the login except the login page itself and its API. */
export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const isPublic =
    pathname === "/login" ||
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/logout");

  const user = await verifyToken(req.cookies.get(COOKIE)?.value);

  if (!user && !isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    // come back to where they were heading after signing in
    url.search = pathname === "/" ? "" : `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  // already signed in - no reason to show the login page again
  if (user && pathname === "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // skip Next internals, the favicon and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?)$).*)"],
};
