import { AUTH_USER, AUTH_PASS } from "@/lib/auth";
import LoginForm from "./LoginForm";

// Read the credentials per request, not at build time: on Vercel the env vars
// are set after the build, so a prerendered page would keep advertising
// whatever was configured when it was compiled.
export const dynamic = "force-dynamic";

/**
 * Server component so the real configured credentials decide what the form
 * shows. The one-tap button appears only while the app is still on its
 * built-in defaults; once a real password is set the button disappears
 * rather than printing a password that would not work.
 */
export default function LoginPage() {
  const usingDefaults = AUTH_USER === "arnav" && AUTH_PASS === "123";
  return (
    <LoginForm quickFill={usingDefaults ? { username: AUTH_USER, password: AUTH_PASS } : null} />
  );
}
