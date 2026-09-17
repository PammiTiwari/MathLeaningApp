"use client";

import { useState } from "react";
import { IMAGES, PHOTO_CREDIT } from "@/lib/images";
import { BookOpen, Loader2, AlertTriangle, ArrowRight, Eye, EyeOff, Zap } from "lucide-react";

const DEMO = { username: "arnav", password: "123" };

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function signIn(user: string, pass: string) {
    if (busy) return;
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Login nahi ho paya.");
      // read where they were headed at submit time, so the page itself can be
      // server-rendered instead of being pushed client-side by useSearchParams
      const next = new URLSearchParams(window.location.search).get("next") || "/";
      // full navigation so the middleware sees the fresh cookie
      window.location.href = next;
    } catch (e: any) {
      setErr(e?.message ?? "Kuch gadbad ho gayi.");
      setBusy(false);
    }
  }

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10"
      style={{ background: IMAGES.login.fallback }}
    >
      <picture>
        <source media="(min-width: 640px)" srcSet={IMAGES.login.src(1800)} />
        <img
          src={IMAGES.login.src(900)}
          alt={IMAGES.login.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
      </picture>
      <div className="absolute inset-0 bg-[#0E0D18]/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0D18]/85 via-transparent to-[#0E0D18]/90" />

      <div className="relative w-full max-w-[390px]">
        {/* brand */}
        <div className="mb-7 text-center">
          <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-saffron shadow-lg">
            <BookOpen size={22} className="text-white" />
          </span>
          <h1 className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white">
            Himmat Rakh
          </h1>
          <p className="mt-1 text-[13.5px] text-white/60">Class 12 Maths · CBSE (041)</p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); signIn(username, password); }}
          className="rounded-2xl border border-white/15 bg-white/95 p-6 shadow-2xl backdrop-blur-sm"
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
                placeholder="123"
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
            {busy && <Loader2 size={16} className="animate-spin" />}
            {busy ? "Andar le ja raha hoon..." : "Andar chalo"}
            {!busy && <ArrowRight size={16} />}
          </button>

          {/* ---- saved credentials: one tap, no typing ---- */}
          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
              Tumhara login
            </p>
            <button
              type="button"
              disabled={busy}
              onClick={() => { setUsername(DEMO.username); setPassword(DEMO.password); signIn(DEMO.username, DEMO.password); }}
              className="flex w-full items-center gap-3 rounded-xl border border-primary/25 bg-primarySoft px-4 py-3 text-left transition hover:border-primary/50 disabled:opacity-60"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-white">
                <Zap size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-bold leading-tight text-head">
                  {DEMO.username} · {DEMO.password}
                </span>
                <span className="mt-0.5 block text-[11.5px] leading-snug text-muted">
                  Click karo, seedha andar - baar baar likhna nahi padega
                </span>
              </span>
              <ArrowRight size={15} className="shrink-0 text-primary" />
            </button>
          </div>
        </form>

        <p className="mt-6 text-center font-hand text-[19px] text-saffron">
          &ldquo;Himmat rakh, ho jayega.&rdquo;
        </p>
      </div>

      <span className="absolute bottom-3 right-4 text-[10px] text-white/30">
        photo: {PHOTO_CREDIT}
      </span>
    </main>
  );
}
