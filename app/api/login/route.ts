import { NextRequest, NextResponse } from "next/server";
import { AUTH_USER, AUTH_PASS, COOKIE, SESSION_DAYS, makeToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const user = (body.username ?? "").trim();
  const pass = body.password ?? "";

  if (user.toLowerCase() !== AUTH_USER.toLowerCase() || pass !== AUTH_PASS) {
    // one message for both cases - don't reveal which half was wrong
    return NextResponse.json({ error: "Username ya password galat hai." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, await makeToken(AUTH_USER), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
  return res;
}
