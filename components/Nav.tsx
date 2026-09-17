"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useProgress, levelOf } from "@/lib/progress";
import { BookOpen, Menu, X, Flame, Trophy } from "lucide-react";

const LINKS = [
  { href: "/chapters", label: "Chapters" },
  { href: "/videos", label: "Videos" },
  { href: "/notes", label: "Notes" },
  { href: "/papers", label: "Papers" },
  { href: "/exam", label: "Mock Exam" },
  { href: "/formulas", label: "Formulas" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/doubt", label: "Ask Doubt" },
  { href: "/progress", label: "Progress" },
];

export default function Nav() {
  const path = usePathname();
  const { p, ready } = useProgress();
  const [open, setOpen] = useState(false);
  const lvl = levelOf(p.xp);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line/70 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-saffron text-lg shadow-lg">
            <BookOpen className="h-4.5 w-4.5 text-white" size={18} />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[17px] font-extrabold tracking-tight text-white">
              Himmat Rakh
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
              Class 12 Maths
            </span>
          </span>
        </Link>

        <nav className="ml-4 hidden flex-1 items-center gap-0.5 lg:flex">
          {LINKS.map((l) => {
            const active = path === l.href || path.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition ${
                  active ? "bg-primary/20 text-white" : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {ready && (
            <>
              <span className="hidden items-center gap-1 rounded-full bg-saffron/15 px-2.5 py-1 text-xs font-semibold text-saffron sm:flex">
                <Flame size={13} /> {p.streak}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
                <Trophy size={13} /> {p.xp}
                <span className="hidden text-white/40 sm:inline">· Lv{lvl.level}</span>
              </span>
            </>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-white/70 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="grid grid-cols-2 gap-1 border-t border-line/70 px-4 py-3 sm:grid-cols-3 lg:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
