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
  { href: "/doubt", label: "Doubt pucho", desc: "AI tutor, 24x7", icon: MessageCircleQuestion },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

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
    // transparent shell keeps the pill in the flow (so pages below start in the
    // right place) while the pill itself reads as floating
    <header className="no-print sticky top-0 z-50 px-3 pb-3 pt-4 sm:px-4">
      <div ref={navRef} className="mx-auto flex max-w-4xl justify-center">
        {/*
          Same pill at every size. On a narrow screen it stretches to the full
          width and carries the brand name, so it never collapses into a stub
          floating in the middle; from md it hugs its links instead.
        */}
        <div className="flex h-[52px] w-full items-center justify-between gap-1 rounded-full bg-[#141318] px-1.5 shadow-[0_8px_30px_rgba(16,15,24,0.28)] ring-1 ring-white/5 md:w-auto md:justify-center">
          {/* round logo badge, with the name beside it while there is room */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5 md:gap-0">
            <span
              aria-hidden
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white transition hover:scale-[1.04]"
            >
              <BookOpen size={17} className="text-[#141318]" />
            </span>
            <span className="font-display text-[15px] font-extrabold tracking-[-0.01em] text-white md:hidden">
              Himmat Rakh
            </span>
          </Link>

          {/* desktop links */}
          <nav className="hidden items-center gap-0.5 px-1.5 md:flex">
            {GROUPS.map((g) => {
              const active = groupActive(g);
              const isOpen = open === g.label;
              return (
                <div key={g.label} className="relative">
                  <button
                    onClick={() => setOpen(isOpen ? null : g.label)}
                    onMouseEnter={() => open && setOpen(g.label)}
                    aria-expanded={isOpen}
                    className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition ${
                      active || isOpen ? "bg-white/12 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    {g.label}
                    <ChevronDown size={13} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="a-rise absolute left-1/2 top-[calc(100%+12px)] w-[272px] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-card p-1.5 shadow-lift">
                      {g.items.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          className={`flex items-start gap-2.5 rounded-xl px-2.5 py-2.5 transition ${
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
                className={`rounded-full px-3.5 py-2 text-[13.5px] font-medium transition ${
                  isActive(s.href) ? "bg-white/12 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </nav>

          {/* white pill: who is signed in, click to sign out */}
          <button
            onClick={logout}
            title="Logout"
            className="group hidden h-10 items-center gap-2 rounded-full bg-white pl-4 pr-3.5 text-[13px] font-semibold text-[#141318] transition hover:bg-white/90 md:flex"
          >
            arnav
            <LogOut size={13} className="text-[#141318]/45 transition group-hover:text-[#141318]" />
          </button>

          {/* mobile toggle */}
          <button
            onClick={() => setMobile((v) => !v)}
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#141318] md:hidden"
          >
            {mobile ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      {mobile && (
        <div className="a-rise mx-auto mt-2.5 max-w-4xl overflow-hidden rounded-2xl border border-line bg-card p-4 shadow-lift md:hidden">
          {[...GROUPS, { label: "Aur", items: SOLO }].map((g) => (
            <div key={g.label} className="mb-4">
              <p className="mb-1.5 px-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-faint">
                {g.label}
              </p>
              <div className="grid gap-1">
                {g.items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={`flex items-center gap-3 rounded-xl px-2.5 py-2.5 ${
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

          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#141318] px-4 py-3 text-[13.5px] font-semibold text-white"
          >
            <LogOut size={14} /> Logout (arnav)
          </button>
        </div>
      )}
    </header>
  );
}
