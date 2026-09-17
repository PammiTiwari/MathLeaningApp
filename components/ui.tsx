import Link from "next/link";
import React from "react";

export function PageHead({
  eyebrow, title, sub, right,
}: { eyebrow?: string; title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <div className="mb-6 mt-4 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        )}
        <h1 className="font-display text-[30px] font-extrabold leading-tight tracking-tight text-white sm:text-[38px]">
          {title}
        </h1>
        {sub && <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-white/55">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Card({
  children, className = "", as = "div",
}: { children: React.ReactNode; className?: string; as?: "div" | "section" }) {
  const C = as;
  return <C className={`card rounded-2xl ${className}`}>{children}</C>;
}

export function Pill({ children, color = "#7C5CFF" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
      style={{ background: `${color}22`, color }}
    >
      {children}
    </span>
  );
}

export function Bar({ value, max, color = "#7C5CFF" }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

export function Empty({ title, sub, cta }: { title: string; sub: string; cta?: { href: string; label: string } }) {
  return (
    <Card className="p-10 text-center">
      <p className="font-display text-lg font-bold text-white">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-white/50">{sub}</p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-5 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primaryDim"
        >
          {cta.label}
        </Link>
      )}
    </Card>
  );
}
