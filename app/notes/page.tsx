"use client";

import Link from "next/link";
import { CHAPTERS } from "@/lib/data/chapters";
import { notesFor } from "@/lib/data/notes";
import { PageHead, Card } from "@/components/ui";
import { NotebookPen, Printer } from "lucide-react";

export default function NotesHome() {
  return (
    <div>
      <PageHead
        eyebrow="Handwritten notes"
        title="Ek page, poora chapter"
        sub="Har chapter POORA cover kiya hai - definitions, saare formulas, aur har method ke step-by-step tareeke. Short rakha hai par kuch chhoda nahi. Exam se ek raat pehle sirf yahi kaafi hai. Print bhi kar sakte ho."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CHAPTERS.map((c) => {
          const n = notesFor(c.slug);
          return (
            <Link key={c.slug} href={`/notes/${c.slug}`}>
              <Card className="card-hover relative h-full overflow-hidden p-5">
                <div className="absolute right-0 top-0 h-16 w-16 -translate-y-6 translate-x-6 rotate-45 opacity-[0.07]"
                  style={{ background: c.color }} />
                <span className="block text-2xl">{c.emoji}</span>
                <p className="mt-2.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: c.color }}>
                  Chapter {c.n}
                </p>
                <p className="mt-0.5 font-display text-[15px] font-bold leading-snug text-head">{c.title}</p>
                <p className="mt-2 flex items-center gap-1.5 text-[11px] text-faint">
                  <NotebookPen size={11} /> {n?.pages.length ?? 1} page{(n?.pages.length ?? 1) > 1 ? "s" : ""}
                  <span className="text-faint">·</span>
                  {n?.pages.reduce((a, pg) => a + pg.filter((b) => b.t === "h").length, 0)} sections
                </p>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card className="mt-7 p-5">
        <div className="flex items-center gap-3">
          <Printer size={18} className="text-saffron" />
          <p className="text-[13.5px] text-muted">
            Har note page print-friendly hai. Kisi bhi chapter ka note kholo aur <kbd className="rounded bg-line/60 px-1.5 py-0.5 text-xs">Ctrl+P</kbd> dabao -
            saaf-suthra ek page nikal aayega, ekdum revision ke liye.
          </p>
        </div>
      </Card>
    </div>
  );
}
