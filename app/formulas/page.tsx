"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FORMULAS, ALL_FORMULA_COUNT } from "@/lib/data/formulas";
import { getChapter } from "@/lib/data/chapters";
import { PageHead, Card, Pill } from "@/components/ui";
import { Formula } from "@/components/Tex";
import { Search, Printer, X } from "lucide-react";

export default function FormulasPage() {
  const [q, setQ] = useState("");

  const groups = useMemo(() => {
    if (!q.trim()) return FORMULAS;
    const s = q.toLowerCase();
    return FORMULAS.map((g) => ({
      ...g,
      items: g.items.filter(
        (f) =>
          f.name.toLowerCase().includes(s) ||
          f.tex.toLowerCase().includes(s) ||
          (f.note ?? "").toLowerCase().includes(s) ||
          g.chapter.toLowerCase().includes(s)
      ),
    })).filter((g) => g.items.length);
  }, [q]);

  return (
    <div>
      <PageHead
        eyebrow="Formula sheet"
        title={`${ALL_FORMULA_COUNT} formulas, ek jagah`}
        sub="Poore syllabus ke saare zaroori formulas, chapter ke hisaab se. Exam se pehle wali raat ke liye yahi page kaafi hai — print kar lo aur deewar par chipka do."
        right={
          <button onClick={() => window.print()}
            className="no-print flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-xs font-semibold text-muted hover:bg-sunk">
            <Printer size={13} /> Print
          </button>
        }
      />

      <div className="no-print sticky top-[60px] z-20 mb-6">
        <div className="relative">
          <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Formula dhoondho… (jaise 'bayes', 'integral', 'adjoint')"
            className="w-full rounded-xl border border-line bg-card py-3 pl-11 pr-10 text-sm text-head placeholder:text-faint focus:border-primary focus:outline-none"
          />
          {q && (
            <button onClick={() => setQ("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-faint hover:text-head">
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {groups.length === 0 && (
        <Card className="p-10 text-center text-sm text-faint">
          &ldquo;{q}&rdquo; ke liye kuch nahi mila. Doosre shabd se try karo.
        </Card>
      )}

      <div className="space-y-6">
        {groups.map((g) => {
          const ch = getChapter(g.slug);
          return (
            <section key={g.slug} id={g.slug} className="scroll-mt-24">
              <div className="mb-3 flex flex-wrap items-center gap-2.5">
                <span className="text-xl">{ch?.emoji}</span>
                <h2 className="font-display text-lg font-bold text-head">{g.chapter}</h2>
                {ch && <Pill color={ch.color}>Ch {ch.n}</Pill>}
                <Link href={`/chapters/${g.slug}`} className="no-print ml-auto text-xs font-semibold text-primary hover:underline">
                  chapter kholo →
                </Link>
              </div>
              <div className="grid gap-2.5 md:grid-cols-2">
                {g.items.map((f, i) => (
                  <Card key={i} className="p-4">
                    <div className="mb-1.5 flex items-start justify-between gap-2">
                      <p className="text-[11.5px] font-bold uppercase tracking-wide text-muted">{f.name}</p>
                      {f.note && (
                        <span className="shrink-0 rounded-full bg-saffronSoft px-2 py-0.5 text-[10px] font-semibold text-saffron">
                          {f.note}
                        </span>
                      )}
                    </div>
                    <Formula tex={f.tex} className="text-head" />
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
