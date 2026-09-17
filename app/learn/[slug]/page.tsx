"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { getChapter, CHAPTERS } from "@/lib/data/chapters";
import { getLesson } from "@/lib/data/lessons";
import type { Beat } from "@/lib/data/lesson-types";
import { useProgress } from "@/lib/progress";
import { Rich, Formula } from "@/components/Tex";
import { Bar, Pill } from "@/components/ui";
import {
  ArrowLeft, ArrowRight, AlertTriangle, Lightbulb, Trophy,
  CheckCircle2, XCircle, PartyPopper, Eye,
} from "lucide-react";

export default function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const ch = getChapter(slug);
  const lesson = getLesson(slug);
  const router = useRouter();
  const { p, ready, setBeat, finishLesson, recordQuiz } = useProgress();

  const [i, setI] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (ready && !started) {
      setI(Math.min(p.lessonBeats[slug] ?? 0, (lesson?.beats.length ?? 1) - 1));
      setStarted(true);
    }
  }, [ready, started, p.lessonBeats, slug, lesson]);

  if (!ch || !lesson) notFound();

  const beats = lesson.beats;
  const beat = beats[i];
  const last = i === beats.length - 1;
  const nextCh = CHAPTERS.find((c) => c.n === ch.n + 1);

  function go(d: 1 | -1) {
    const n = Math.min(Math.max(i + d, 0), beats.length - 1);
    setI(n);
    setBeat(slug, n);
    if (n === beats.length - 1) finishLesson(slug, lesson!.xp);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* top bar */}
      <div className="sticky top-[57px] z-30 -mx-4 mb-6 border-b border-line/60 bg-ink/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href={`/chapters/${slug}`} className="shrink-0 text-white/40 transition hover:text-white">
            <ArrowLeft size={18} />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-[13px] font-bold text-white">{ch.title}</p>
              <span className="shrink-0 text-[11px] text-white/35">{i + 1}/{beats.length}</span>
            </div>
            <div className="mt-1.5"><Bar value={i + 1} max={beats.length} color={ch.color} /></div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          <BeatView beat={beat} color={ch.color} onQuiz={(right) => recordQuiz(slug, right)} />
        </motion.div>
      </AnimatePresence>

      {/* nav */}
      <div className="mt-8 flex items-center gap-3 pb-4">
        <button
          onClick={() => go(-1)}
          disabled={i === 0}
          className="rounded-xl border border-line px-4 py-3 text-sm font-semibold text-white/60 transition hover:bg-white/5 disabled:opacity-25"
        >
          <ArrowLeft size={16} />
        </button>

        {!last ? (
          <button
            onClick={() => go(1)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition hover:brightness-110"
            style={{ background: ch.color }}
          >
            Aage badho <ArrowRight size={16} />
          </button>
        ) : (
          <div className="flex flex-1 gap-3">
            <Link
              href={`/notes/${slug}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line py-3 text-sm font-bold text-white/80 hover:bg-white/5"
            >
              Notes dekho
            </Link>
            {nextCh ? (
              <Link
                href={`/learn/${nextCh.slug}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white"
                style={{ background: ch.color }}
              >
                Ch {nextCh.n} <ArrowRight size={16} />
              </Link>
            ) : (
              <Link
                href="/exam"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-saffron py-3 text-sm font-bold text-ink"
              >
                Mock exam do
              </Link>
            )}
          </div>
        )}
      </div>

      {/* beat dots */}
      <div className="flex flex-wrap justify-center gap-1.5 pb-8">
        {beats.map((b, n) => (
          <button
            key={n}
            onClick={() => { setI(n); setBeat(slug, n); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            title={b.kind}
            className={`h-1.5 rounded-full transition-all ${n === i ? "w-6" : "w-1.5"}`}
            style={{ background: n <= i ? ch.color : "#2C2840" }}
          />
        ))}
      </div>
    </div>
  );
}

function BeatView({ beat, color, onQuiz }: { beat: Beat; color: string; onQuiz: (right: boolean) => void }) {
  switch (beat.kind) {
    case "story":
      return (
        <div className="rounded-3xl border border-line bg-gradient-to-br from-surface2 to-surface p-6 sm:p-8">
          <div className="mb-4 text-5xl animate-float">{beat.emoji ?? "💡"}</div>
          <Rich text={beat.text} className="text-[16.5px] leading-[1.75] text-white/85" />
        </div>
      );

    case "concept":
      return (
        <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
          {beat.tag && <Pill color={color}>{beat.tag}</Pill>}
          <h2 className="mt-3 font-display text-[24px] font-extrabold leading-tight text-white">{beat.title}</h2>
          <Rich text={beat.body} className="mt-3 text-[15px] leading-[1.75] text-white/70" />
          {beat.formula && (
            <div className="mt-5 rounded-2xl border p-5" style={{ borderColor: `${color}44`, background: `${color}0e` }}>
              <Formula tex={beat.formula} className="text-white" />
            </div>
          )}
        </div>
      );

    case "example":
      return <ExampleView beat={beat} color={color} />;

    case "quiz":
      return <QuizView beat={beat} color={color} onQuiz={onQuiz} />;

    case "trap":
      return (
        <div className="rounded-3xl border border-rose/35 bg-rose/[0.08] p-6 sm:p-8">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle size={20} className="text-rose" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-rose">Yahan log phaste hain</span>
          </div>
          <Rich text={beat.text} className="text-[15.5px] leading-[1.75] text-white/85" />
        </div>
      );

    case "boardtip":
      return (
        <div className="rounded-3xl border border-saffron/35 bg-saffron/[0.08] p-6 sm:p-8">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb size={20} className="text-saffron" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-saffron">Board exam tip</span>
          </div>
          <Rich text={beat.text} className="text-[15.5px] leading-[1.75] text-white/85" />
        </div>
      );

    case "victory":
      return (
        <div className="rounded-3xl border border-mint/35 bg-gradient-to-br from-mint/[0.12] to-surface p-6 text-center sm:p-9">
          <PartyPopper size={44} className="mx-auto animate-float text-mint" />
          <p className="mt-4 font-display text-[22px] font-extrabold leading-tight text-white">{beat.text}</p>
          <div className="mx-auto mt-6 max-w-md space-y-2 text-left">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-mint">Yaad rakhne wali baatein</p>
            {beat.recap.map((r, i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-lg bg-white/[0.04] px-3 py-2">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-mint" />
                <Rich text={r} className="text-[13.5px] leading-snug text-white/80" />
              </div>
            ))}
          </div>
        </div>
      );
  }
}

function ExampleView({ beat, color }: { beat: Extract<Beat, { kind: "example" }>; color: string }) {
  const [shown, setShown] = useState(0);
  const allShown = shown >= beat.steps.length;

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <Pill color={color}>Solved example</Pill>
      <div className="mt-3 rounded-2xl border border-line bg-ink/60 p-4">
        <Rich text={beat.problem} className="text-[15.5px] leading-relaxed text-white" />
      </div>

      <div className="mt-5 space-y-3">
        {beat.steps.slice(0, shown).map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-line bg-ink/40 p-4"
          >
            <div className="flex items-start gap-3">
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold"
                style={{ background: `${color}25`, color }}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <Rich text={s.do} className="text-[14.5px] leading-relaxed text-white/90" />
                <div className="mt-2 flex gap-2 rounded-lg bg-white/[0.04] px-3 py-2">
                  <span className="shrink-0 text-xs font-bold text-saffron">kyun?</span>
                  <Rich text={s.why} className="text-[12.5px] leading-snug text-white/55" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!allShown ? (
        <button
          onClick={() => setShown((s) => s + 1)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line py-3.5 text-sm font-semibold text-white/60 transition hover:border-primary/50 hover:text-white"
        >
          <Eye size={15} />
          {shown === 0 ? "Pehla step dikhao" : `Next step (${shown}/${beat.steps.length})`}
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 rounded-2xl border p-4 text-center"
          style={{ borderColor: `${color}55`, background: `${color}12` }}
        >
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color }}>Answer</p>
          <Formula tex={beat.answer} className="text-white" />
        </motion.div>
      )}
    </div>
  );
}

function QuizView({
  beat, color, onQuiz,
}: { beat: Extract<Beat, { kind: "quiz" }>; color: string; onQuiz: (right: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const right = picked === beat.correct;

  function choose(n: number) {
    if (answered) return;
    setPicked(n);
    onQuiz(n === beat.correct);
  }

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <Pill color="#FFB020">Apna dimaag lagao</Pill>
      <div className="mt-3">
        <Rich text={beat.q} className="text-[16.5px] font-semibold leading-relaxed text-white" />
      </div>

      <div className="mt-5 space-y-2.5">
        {beat.options.map((o, n) => {
          const isCorrect = n === beat.correct;
          const isPicked = n === picked;
          let cls = "border-line bg-ink/40 hover:border-white/25 hover:bg-white/[0.06]";
          if (answered && isCorrect) cls = "border-mint bg-mint/12";
          else if (answered && isPicked) cls = "border-rose bg-rose/12";
          else if (answered) cls = "border-line bg-ink/20 opacity-45";

          return (
            <button
              key={n}
              onClick={() => choose(n)}
              disabled={answered}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition ${cls}`}
            >
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/15 text-[11px] font-bold text-white/60"
                style={answered && isCorrect ? { background: "#22D3A5", color: "#0B0A12", borderColor: "#22D3A5" } : {}}
              >
                {String.fromCharCode(97 + n)}
              </span>
              <Rich text={o} className="flex-1 text-[14px] leading-snug text-white/85" />
              {answered && isCorrect && <CheckCircle2 size={17} className="shrink-0 text-mint" />}
              {answered && isPicked && !isCorrect && <XCircle size={17} className="shrink-0 text-rose" />}
            </button>
          );
        })}
      </div>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 rounded-2xl border p-4 ${right ? "border-mint/40 bg-mint/[0.08]" : "border-saffron/40 bg-saffron/[0.08]"}`}
        >
          <p className={`mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${right ? "text-mint" : "text-saffron"}`}>
            {right ? <><Trophy size={13} /> Shabaash! +5 XP</> : <><Lightbulb size={13} /> Koi baat nahi, dekho</>}
          </p>
          <Rich text={beat.explain} className="text-[14px] leading-relaxed text-white/80" />
        </motion.div>
      )}
    </div>
  );
}
