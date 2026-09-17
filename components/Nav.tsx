"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Menu, X, ChevronDown, BookOpen, PlayCircle, NotebookPen,
  FileText, Sparkles, MessageCircleQuestion, LogOut,
} from "lucide-react";

type Item = { href: string; label: string; desc: string; icon: any };
type Group = { label: string; items: Item[] };

const GROUPS: Group[] = [
  {
    label: "Padho",
    items: [
      { href: "/chapters", label: "Chapters", desc: "13 chapters, basics se deep tak", icon: BookOpen },
      { href: "/videos", label: "Video lessons", desc: "Khan Academy, topic-wise", icon: PlayCircle },
    ],
  },
  {
    label: "Practice",
    items: [
      { href: "/papers", label: "Board papers", desc: "Asli CBSE papers, 2022-2026", icon: FileText },
      { href: "/formulas", label: "Formula sheet", desc: "94 formulas, searchable", icon: Sparkles },
    ],
  },
];

const SOLO: Item[] = [
  { href: "/notes", label: "Notes", desc: "Poora chapter, ek sheet par", icon: NotebookPen },
  { href: "/doubt", label: "Doubt pucho", desc: "AI tutor, 24×7", icon: MessageCircleQuestion },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState<string | null>(null);   // desktop dropdown
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // close on route change, outside click, Escape
  useEffect(() => { setOpen(null); setMobile(false); }, [path]);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setOpen(null); setMobile(false); }
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  const isActive = (href: string) => path === href || path.startsWith(href + "/");
  const groupActive = (g: Group) => g.items.some((i) => isActive(i.href));

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-page/85 backdrop-blur-xl">
      <div ref={navRef} className="mx-auto flex h-14 w-full max-w-6xl items-center gap-2 px-4 sm:px-6">
        {/* ---- logo ---- */}
        <Link href="/" className="mr-1 flex shrink-0 items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-saffron shadow-soft">
            <BookOpen size={16} className="text-white" />
          </span>
          <span className="font-display text-[16px] font-extrabold tracking-[-0.02em] text-head">
            Himmat Rakh
          </span>
        </Link>

        {/* ---- desktop nav ---- */}
        <nav className="ml-2 hidden items-center gap-0.5 md:flex">
          {GROUPS.map((g) => {
            const active = groupActive(g);
            const isOpen = open === g.label;
            return (
              <div key={g.label} className="relative">
                <button
                  onClick={() => setOpen(isOpen ? null : g.label)}
                  onMouseEnter={() => open && setOpen(g.label)}
                  className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-[13.5px] font-semibold transition ${
                    active || isOpen ? "bg-primarySoft text-primary" : "text-body hover:bg-sunk hover:text-head"
                  }`}
                  aria-expanded={isOpen}
                >
                  {g.label}
                  <ChevronDown size={13} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="a-rise absolute left-0 top-[calc(100%+6px)] w-[270px] overflow-hidden rounded-xl border border-line bg-card p-1.5 shadow-lift">
                    {g.items.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        className={`flex items-start gap-2.5 rounded-lg px-2.5 py-2.5 transition ${
                          isActive(it.href) ? "bg-primarySoft" : "hover:bg-sunk"
                        }`}
                      >
                        <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                          isActive(it.href) ? "bg-primary text-white" : "bg-sunk text-muted"
                        }`}>
                          <it.icon size={14} />
                        </span>
                        <span className="min-w-0">
                          <span className={`block text-[13.5px] font-semibold leading-tight ${
                            isActive(it.href) ? "text-primary" : "text-head"
                          }`}>
                            {it.label}
                          </span>
                          <span className="mt-0.5 block text-[11.5px] leading-snug text-muted">{it.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {SOLO.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`rounded-lg px-3 py-1.5 text-[13.5px] font-semibold transition ${
                isActive(s.href) ? "bg-primarySoft text-primary" : "text-body hover:bg-sunk hover:text-head"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </nav>

        {/* ---- right: one compact stat chip ---- */}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={logout}
            title="Logout"
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-line bg-card px-3 text-[12.5px] font-semibold text-muted transition hover:border-line2 hover:text-head sm:flex"
          >
            <LogOut size={13} /> Logout
          </button>
          <button
            onClick={() => setMobile((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-card text-body transition hover:bg-sunk md:hidden"
            aria-label="Menu"
          >
            {mobile ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* ---- mobile panel ---- */}
      {mobile && (
        <div className="a-rise border-t border-line bg-card md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">

            <button
              onClick={logout}
              className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-sunk px-4 py-3 text-[13.5px] font-semibold text-muted"
            >
              <LogOut size={14} /> Logout
            </button>

            {[...GROUPS, { label: "Aur", items: SOLO }].map((g) => (
              <div key={g.label} className="mb-4 last:mb-0">
                <p className="mb-1.5 px-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-faint">
                  {g.label}
                </p>
                <div className="grid gap-1">
                  {g.items.map((it) => (
                    <Link
                      key={it.href}
                      href={it.href}
                      className={`flex items-center gap-3 rounded-lg px-2.5 py-2.5 ${
                        isActive(it.href) ? "bg-primarySoft" : "hover:bg-sunk"
                      }`}
                    >
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                        isActive(it.href) ? "bg-primary text-white" : "bg-sunk text-muted"
                      }`}>
                        <it.icon size={15} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[14px] font-semibold leading-tight ${
                          isActive(it.href) ? "text-primary" : "text-head"
                        }`}>
                          {it.label}
                        </span>
                        <span className="mt-0.5 block text-[11.5px] leading-snug text-muted">{it.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
