"use client";

import { useMemo, useState } from "react";
import { FLASHCARDS } from "@/lib/data/flashcards";
import { CHAPTERS, getChapter } from "@/lib/data/chapters";
import { PageHead, Card, Bar, Pill } from "@/components/ui";
import { RotateCcw, Check, X, Shuffle, ArrowRight } from "lucide-react";

export default function Flashcards() {
  const [filter, setFilter] = useState<string>("all");
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [order, setOrder] = useState<number[] | null>(null);
  const [known, setKnown] = useState<Set<string>>(new Set());  // this session only

  const pool = useMemo(
    () => FLASHCARDS.map((c, idx) => ({ ...c, key: `${c.ch}-${idx}` })).filter((c) => filter === "all" || c.ch === filter),
    [filter]
  );

  const deck = useMemo(() => (order ? order.map((n) => pool[n]).filter(Boolean) : pool), [order, pool]);
  const card = deck[i];
  const mastered = pool.filter((c) => known.has(c.key)).length;

  function next(got: boolean) {
    if (card) {
      setKnown((prev) => {
        const n = new Set(prev);
        if (got) n.add(card.key); else n.delete(card.key);
        return n;
      });
    }
    setFlipped(false);
    setI((n) => (n + 1) % deck.length);
  }

  function shuffle() {
    const idx = pool.map((_, n) => n).sort(() => Math.random() - 0.5);
    setOrder(idx); setI(0); setFlipped(false);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHead
        eyebrow="Flashcards"
        title="5 minute revision"
        sub="Sawaal dekho, dimaag mein jawab socho, phir card palto. Jo yaad hai use ✓ karo, jo nahi use ✗. Ginti sirf is session ki hai — kuch save nahi hota."
      />

      <div className="no-print mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => { setFilter("all"); setI(0); setOrder(null); setFlipped(false); }}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${filter === "all" ? "bg-primary text-white" : "border border-line text-muted hover:text-head"}`}
        >
          Sab ({FLASHCARDS.length})
        </button>
        {CHAPTERS.map((c) => {
          const n = FLASHCARDS.filter((f) => f.ch === c.slug).length;
          if (!n) return null;
          return (
            <button
              key={c.slug}
              onClick={() => { setFilter(c.slug); setI(0); setOrder(null); setFlipped(false); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${filter === c.slug ? "text-head" : "border border-line text-muted hover:text-head"}`}
              style={filter === c.slug ? { background: c.color } : {}}
            >
              {c.emoji} Ch{c.n}
            </button>
          );
        })}
      </div>

      {deck.length === 0 ? (
        <Card className="p-10 text-center text-sm text-faint">Is chapter ke flashcards abhi nahi hain.</Card>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between text-xs text-faint">
            <span>Card {i + 1} / {deck.length}</span>
            <span>{mastered} yaad hain</span>
          </div>
          <Bar value={mastered} max={pool.length} color="#22D3A5" />

          <div className="mt-5 [perspective:1400px]">
            <button
              key={`${card?.key}-${flipped}`}
              onClick={() => setFlipped((f) => !f)}
              className={`a-flip flex min-h-[260px] w-full flex-col items-center justify-center rounded-3xl border p-8 text-center ${
                flipped ? "border-mint/35 bg-mintSoft" : "card"
              }`}
            >
                <Pill color={flipped ? "#22D3A5" : getChapter(card.ch)?.color}>
                  {flipped ? "Jawab" : getChapter(card.ch)?.title ?? "Sawaal"}
                </Pill>
                <p className={`mt-4 leading-relaxed ${flipped ? "text-[17px] text-head" : "font-display text-[21px] font-bold text-head"}`}>
                  {flipped ? card.back : card.front}
                </p>
              {!flipped && <p className="mt-6 text-xs text-faint">tap karke palto ↻</p>}
            </button>
          </div>

          {flipped ? (
            <div className="mt-4 flex gap-3">
              <button onClick={() => next(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose/30 bg-roseSoft py-3.5 text-sm font-bold text-rose hover:bg-rose/20">
                <X size={16} /> Yaad nahi tha
              </button>
              <button onClick={() => next(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-mint py-3.5 text-sm font-bold text-white hover:brightness-110">
                <Check size={16} /> Yaad tha
              </button>
            </div>
          ) : (
            <div className="mt-4 flex gap-3">
              <button onClick={shuffle}
                className="flex items-center gap-2 rounded-xl border border-line px-4 py-3.5 text-sm font-semibold text-muted hover:bg-sunk">
                <Shuffle size={15} /> Shuffle
              </button>
              <button onClick={() => setFlipped(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white hover:bg-primaryDim">
                Jawab dekho <ArrowRight size={15} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
