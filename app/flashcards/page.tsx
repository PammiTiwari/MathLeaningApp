"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FLASHCARDS } from "@/lib/data/flashcards";
import { CHAPTERS, getChapter } from "@/lib/data/chapters";
import { useProgress } from "@/lib/progress";
import { PageHead, Card, Bar, Pill } from "@/components/ui";
import { RotateCcw, Check, X, Shuffle, ArrowRight } from "lucide-react";

export default function Flashcards() {
  const { p, toggleCard, addXp } = useProgress();
  const [filter, setFilter] = useState<string>("all");
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [order, setOrder] = useState<number[] | null>(null);

  const pool = useMemo(
    () => FLASHCARDS.map((c, idx) => ({ ...c, key: `${c.ch}-${idx}` })).filter((c) => filter === "all" || c.ch === filter),
    [filter]
  );

  const deck = useMemo(() => (order ? order.map((n) => pool[n]).filter(Boolean) : pool), [order, pool]);
  const card = deck[i];
  const mastered = pool.filter((c) => p.cardsMastered.includes(c.key)).length;

  function next(got: boolean) {
    if (card) {
      const already = p.cardsMastered.includes(card.key);
      if (got && !already) { toggleCard(card.key); addXp(5); }
      if (!got && already) toggleCard(card.key);
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
        sub="Sawaal dekho, dimaag mein jawab socho, phir card palto. Jo yaad hai use ✓ karo, jo nahi use ✗ — woh wapas aayega."
      />

      <div className="no-print mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => { setFilter("all"); setI(0); setOrder(null); setFlipped(false); }}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${filter === "all" ? "bg-primary text-white" : "border border-line text-white/50 hover:text-white"}`}
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
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${filter === c.slug ? "text-white" : "border border-line text-white/50 hover:text-white"}`}
              style={filter === c.slug ? { background: c.color } : {}}
            >
              {c.emoji} Ch{c.n}
            </button>
          );
        })}
      </div>

      {deck.length === 0 ? (
        <Card className="p-10 text-center text-sm text-white/45">Is chapter ke flashcards abhi nahi hain.</Card>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between text-xs text-white/40">
            <span>Card {i + 1} / {deck.length}</span>
            <span>{mastered} yaad ho gaye</span>
          </div>
          <Bar value={mastered} max={pool.length} color="#22D3A5" />

          <div className="mt-5 [perspective:1400px]">
            <AnimatePresence mode="wait">
              <motion.button
                key={`${card?.key}-${flipped}`}
                initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={() => setFlipped((f) => !f)}
                className={`flex min-h-[260px] w-full flex-col items-center justify-center rounded-3xl border p-8 text-center transition ${
                  flipped ? "border-mint/40 bg-mint/[0.07]" : "card"
                }`}
              >
                <Pill color={flipped ? "#22D3A5" : getChapter(card.ch)?.color}>
                  {flipped ? "Jawab" : getChapter(card.ch)?.title ?? "Sawaal"}
                </Pill>
                <p className={`mt-4 leading-relaxed ${flipped ? "text-[17px] text-white/90" : "font-display text-[21px] font-bold text-white"}`}>
                  {flipped ? card.back : card.front}
                </p>
                {!flipped && <p className="mt-6 text-xs text-white/30">tap karke palto ↻</p>}
              </motion.button>
            </AnimatePresence>
          </div>

          {flipped ? (
            <div className="mt-4 flex gap-3">
              <button onClick={() => next(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose/40 bg-rose/10 py-3.5 text-sm font-bold text-rose hover:bg-rose/20">
                <X size={16} /> Yaad nahi tha
              </button>
              <button onClick={() => next(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-mint py-3.5 text-sm font-bold text-ink hover:brightness-110">
                <Check size={16} /> Yaad tha! +5 XP
              </button>
            </div>
          ) : (
            <div className="mt-4 flex gap-3">
              <button onClick={shuffle}
                className="flex items-center gap-2 rounded-xl border border-line px-4 py-3.5 text-sm font-semibold text-white/60 hover:bg-white/5">
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
