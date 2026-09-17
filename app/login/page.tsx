"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Loader2, AlertTriangle, ArrowRight, Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Login nahi ho paya.");
      // full navigation so the middleware sees the fresh cookie
      window.location.href = next;
    } catch (e: any) {
      setErr(e?.message ?? "Kuch gadbad ho gayi.");
      setBusy(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-full bg-primarySoft opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-saffronSoft opacity-70 blur-3xl" />

      <div className="relative w-full max-w-[380px]">
        {/* brand */}
        <div className="mb-7 text-center">
          <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-saffron shadow-soft">
            <BookOpen size={22} className="text-white" />
          </span>
          <h1 className="font-display text-[26px] font-extrabold tracking-[-0.02em] text-head">
            Himmat Rakh
          </h1>
          <p className="mt-1 text-[13.5px] text-muted">Class 12 Maths · CBSE (041)</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-line bg-card p-6 shadow-soft"
        >
          <p className="mb-5 font-hand text-[22px] leading-tight text-saffron">
            Wapas aa gaye? Chalo shuru karte hain.
          </p>

          <label className="block">
            <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-muted">
              Username
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              required
              placeholder="arnav"
              className="w-full rounded-xl border border-line bg-sunk px-4 py-3 text-[15px] text-head placeholder:text-faint focus:border-primary focus:bg-card focus:outline-none"
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-muted">
              Password
            </span>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="••••"
                className="w-full rounded-xl border border-line bg-sunk px-4 py-3 pr-11 text-[15px] text-head placeholder:text-faint focus:border-primary focus:bg-card focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Password chhupao" : "Password dikhao"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-faint transition hover:text-body"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {err && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose/30 bg-roseSoft p-3">
              <AlertTriangle size={15} className="mt-0.5 shrink-0 text-rose" />
              <p className="text-[13px] leading-snug text-rose">{err}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-primaryDim disabled:opacity-60"
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : null}
            {busy ? "Andar le ja raha hoon…" : "Andar chalo"}
            {!busy && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="mt-6 text-center font-hand text-[19px] text-saffron">
          &ldquo;Himmat rakh, ho jayega.&rdquo;
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
