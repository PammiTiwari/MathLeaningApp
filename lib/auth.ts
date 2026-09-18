/**
 * A single shared login for a personal study app.
 *
 * The credentials live in env vars and are only ever compared on the server,
 * so the password never reaches the browser bundle. The cookie holds an
 * HMAC-signed token rather than the username itself, so it cannot simply be
 * forged by typing a cookie value into devtools.
 *
 * This is a front door, not a vault: one shared account, no rate limiting.
 * Fine for one student's own app; don't put anything sensitive behind it.
 */

export const COOKIE = "himmat_session";
export const SESSION_DAYS = 30;

/**
 * Pasting into a hosting dashboard very easily carries a trailing space or
 * newline, and an empty box should mean "not set" rather than "the password is
 * the empty string" - both would lock you out of your own app.
 */
function envValue(raw: string | undefined, fallback: string) {
  const v = raw?.trim();
  return v ? v : fallback;
}

export const AUTH_USER = envValue(process.env.AUTH_USER, "arnav");
export const AUTH_PASS = envValue(process.env.AUTH_PASS, "123");
const SECRET = envValue(process.env.AUTH_SECRET, "himmat-rakh-dev-secret-change-me");

async function hmac(value: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** token = "<user>.<expiry>.<signature>" */
export async function makeToken(user: string) {
  const expiry = Date.now() + SESSION_DAYS * 86400_000;
  const body = `${user}.${expiry}`;
  return `${body}.${await hmac(body)}`;
}

export async function verifyToken(token: string | undefined) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [user, expiry, sig] = parts;
  if (Number(expiry) < Date.now()) return null;
  const expected = await hmac(`${user}.${expiry}`);
  // constant-time-ish compare
  if (sig.length !== expected.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0 ? user : null;
}
