"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { getChapter, CHAPTERS } from "@/lib/data/chapters";
import { getLesson, deepStartIndex } from "@/lib/data/lessons";
import type { Beat } from "@/lib/data/lesson-types";
import { useProgress } from "@/lib/progress";
import { Rich, Formula } from "@/components/Tex";
import { Bar, Pill } from "@/components/ui";
import {
  ArrowLeft, ArrowRight, AlertTriangle, Lightbulb, Trophy,
  CheckCircle2, XCircle, PartyPopper, Eye, Microscope, Flame, Sigma,
} from "lucide-react";

export default function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const ch = getChapter(slug);
  const lesson = getLesson(slug);
  const router = useRouter();
  const { p, ready, setBeat } = useProgress();

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
  const deepAt = deepStartIndex(slug);

  function go(d: 1 | -1) {
    const n = Math.min(Math.max(i + d, 0), beats.length - 1);
    setI(n);
    setBeat(slug, n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* top bar */}
      <div className="sticky top-14 z-30 -mx-4 mb-6 border-b border-line/60 bg-sunk px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href={`/chapters/${slug}`} className="shrink-0 text-faint transition hover:text-head">
            <ArrowLeft size={18} />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-[13px] font-bold text-head">
                {ch.title}
                {deepAt > 0 && i >= deepAt && (
                  <span className="ml-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary" style={{ background: "#F1EDFF" }}>
                    deep
                  </span>
                )}
              </p>
              <span className="shrink-0 text-[11px] text-faint">{i + 1}/{beats.length}</span>
            </div>
            <div className="mt-1.5"><Bar value={i + 1} max={beats.length} color={ch.color} /></div>
          </div>
        </div>
      </div>

      {i === deepAt && deepAt > 0 && (
        <div className="a-rise mb-5 flex items-center gap-3 rounded-2xl border border-primary/25 bg-primarySoft px-5 py-4">
          <Microscope size={20} className="shrink-0 text-primary" />
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-primary">Deep dive shuru</p>
            <p className="mt-0.5 text-[13.5px] leading-snug text-body">
              Ab basics se aage. Yahaan se formulas ki derivation, asli theory, aur board ke tough sawaal aayenge.
            </p>
          </div>
        </div>
      )}
      <div key={i} className="a-beat">
        <BeatView beat={beat} color={ch.color} />
      </div>

      {/* nav */}
      <div className="mt-8 flex items-center gap-3 pb-4">
        <button
          onClick={() => go(-1)}
          disabled={i === 0}
          className="rounded-xl border border-line px-4 py-3 text-sm font-semibold text-muted transition hover:bg-sunk disabled:opacity-25"
        >
          <ArrowLeft size={16} />
        </button>

        {!last ? (
          <button
            onClick={() => go(1)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-head transition hover:brightness-110"
            style={{ background: ch.color }}
          >
            Aage badho <ArrowRight size={16} />
          </button>
        ) : (
          <div className="flex flex-1 gap-3">
            <Link
              href={`/notes/${slug}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line py-3 text-sm font-bold text-body hover:bg-sunk"
            >
              Notes dekho
            </Link>
            {nextCh ? (
              <Link
                href={`/learn/${nextCh.slug}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-head"
                style={{ background: ch.color }}
              >
                Ch {nextCh.n} <ArrowRight size={16} />
              </Link>
            ) : (
              <Link
                href="/papers"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-saffron py-3 text-sm font-bold text-white"
              >
                Board papers dekho
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
            style={{ background: n <= i ? (deepAt > 0 && n >= deepAt ? "#5B3FD6" : ch.color) : "#E3E0D8" }}
          />
        ))}
      </div>
    </div>
  );
}

function BeatView({ beat, color }: { beat: Beat; color: string }) {
  switch (beat.kind) {
    case "story":
      return (
        <div className="rounded-3xl border border-line bg-gradient-to-br from-surface2 to-surface p-6 sm:p-8">
          <div className="mb-4 text-5xl animate-float">{beat.emoji ?? "💡"}</div>
          <Rich text={beat.text} className="text-[16.5px] leading-[1.75] text-body" />
        </div>
      );

    case "concept":
      return (
        <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
          {beat.tag && <Pill color={color}>{beat.tag}</Pill>}
          <h2 className="mt-3 font-display text-[24px] font-extrabold leading-tight text-head">{beat.title}</h2>
          <Rich text={beat.body} className="mt-3 text-[15px] leading-[1.75] text-body" />
          {beat.formula && (
            <div className="mt-5 rounded-2xl border p-5" style={{ borderColor: `${color}44`, background: `${color}0e` }}>
              <Formula tex={beat.formula} className="text-head" />
            </div>
          )}
        </div>
      );

    case "example":
      return <ExampleView beat={beat} color={color} />;

    case "quiz":
      return <QuizView beat={beat} color={color} />;

    case "trap":
      return (
        <div className="rounded-3xl border border-rose/30 bg-roseSoft p-6 sm:p-8">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle size={20} className="text-rose" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-rose">Yahan log phaste hain</span>
          </div>
          <Rich text={beat.text} className="text-[15.5px] leading-[1.75] text-body" />
        </div>
      );

    case "boardtip":
      return (
        <div className="rounded-3xl border border-saffron/30 bg-saffronSoft p-6 sm:p-8">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb size={20} className="text-saffron" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-saffron">Board exam tip</span>
          </div>
          <Rich text={beat.text} className="text-[15.5px] leading-[1.75] text-body" />
        </div>
      );

    case "derive":
      return <DeriveView beat={beat} />;

    case "deep":
      return (
        <div className="rounded-3xl border border-primary/25 bg-white p-6 shadow-soft sm:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-primarySoft px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-primary">
              <Sigma size={11} /> Deep dive
            </span>
            {beat.tag && <Pill color="#6B6B7B">{beat.tag}</Pill>}
          </div>
          <h2 className="font-display text-[23px] font-extrabold leading-tight text-head">{beat.title}</h2>
          <Rich text={beat.body} className="mt-3 text-[15px] leading-[1.75] text-body" />
          {beat.formula && (
            <div className="mt-5 rounded-2xl border border-primary/25 bg-primarySoft p-5">
              <Formula tex={beat.formula} />
            </div>
          )}
        </div>
      );

    case "hard":
      return <HardView beat={beat} />;

    case "victory":
      return (
        <div className="rounded-3xl border border-mint/35 bg-gradient-to-br from-mint/[0.12] to-surface p-6 text-center sm:p-9">
          <PartyPopper size={44} className="mx-auto animate-float text-mint" />
          <p className="mt-4 font-display text-[22px] font-extrabold leading-tight text-head">{beat.text}</p>
          <div className="mx-auto mt-6 max-w-md space-y-2 text-left">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-mint">Yaad rakhne wali baatein</p>
            {beat.recap.map((r, i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-lg bg-sunk px-3 py-2">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-mint" />
                <Rich text={r} className="text-[13.5px] leading-snug text-body" />
              </div>
            ))}
          </div>
        </div>
      );
  }
}

function DeriveView({ beat }: { beat: Extract<Beat, { kind: "derive" }> }) {
  const [shown, setShown] = useState(0);
  const all = shown >= beat.steps.length;
  return (
    <div className="rounded-3xl border border-sky/30 bg-white p-6 shadow-soft sm:p-8">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-skySoft px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-sky">
        Derivation — yeh formula aaya kahaan se
      </span>
      <h2 className="mt-3 font-display text-[23px] font-extrabold leading-tight text-head">{beat.title}</h2>
      <div className="mt-3 rounded-2xl border border-sky/25 bg-skySoft p-4">
        <Rich text={beat.claim} className="text-[14.5px] leading-relaxed text-body" />
      </div>

      <div className="mt-5 space-y-3">
        {beat.steps.slice(0, shown).map((s, i) => (
          <div key={i} className="a-slide rounded-2xl border border-line bg-sunk p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-skySoft text-[11px] font-bold text-sky">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <Rich text={s.do} className="text-[14.5px] leading-relaxed text-head" />
                <div className="mt-2 flex gap-2 rounded-lg bg-white px-3 py-2">
                  <span className="shrink-0 text-xs font-bold text-saffron">kyun?</span>
                  <Rich text={s.why} className="text-[12.5px] leading-snug text-muted" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!all ? (
        <button onClick={() => setShown((v) => v + 1)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line2 py-3.5 text-sm font-semibold text-muted transition hover:border-sky hover:text-sky">
          <Eye size={15} /> {shown === 0 ? "Derivation shuru karo" : `Agla step (${shown}/${beat.steps.length})`}
        </button>
      ) : beat.note ? (
        <div className="a-pop mt-4 rounded-2xl border border-saffron/30 bg-saffronSoft p-4">
          <p className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-saffron">Isse aur kya samajh aata hai</p>
          <Rich text={beat.note} className="text-[14px] leading-relaxed text-body" />
        </div>
      ) : null}
    </div>
  );
}

function HardView({ beat }: { beat: Extract<Beat, { kind: "hard" }> }) {
  const [shown, setShown] = useState(0);
  const [tried, setTried] = useState(false);
  const all = shown >= beat.steps.length;
  return (
    <div className="rounded-3xl border border-rose/30 bg-white p-6 shadow-soft sm:p-8">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-roseSoft px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-rose">
        <Flame size={11} /> {beat.label}
      </span>
      <div className="mt-3 rounded-2xl border border-line bg-sunk p-4">
        <Rich text={beat.problem} className="text-[16px] leading-relaxed text-head" />
      </div>

      {!tried && shown === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-line2 p-4 text-center">
          <p className="text-[13.5px] leading-relaxed text-muted">
            Pehle khud try karo — copy nikalo, 10 minute do. Solution dekhne se pehle koshish karne par hi
            yeh sawaal yaad rehta hai.
          </p>
          <button onClick={() => setTried(true)}
            className="mt-3 rounded-lg bg-rose px-4 py-2 text-xs font-bold text-white hover:brightness-110">
            Try kar liya, solution dikhao
          </button>
        </div>
      )}

      {tried && (
        <>
          <div className="mt-5 space-y-3">
            {beat.steps.slice(0, shown).map((s, i) => (
              <div key={i} className="a-slide rounded-2xl border border-line bg-sunk p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-roseSoft text-[11px] font-bold text-rose">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <Rich text={s.do} className="text-[14.5px] leading-relaxed text-head" />
                    <div className="mt-2 flex gap-2 rounded-lg bg-white px-3 py-2">
                      <span className="shrink-0 text-xs font-bold text-saffron">kyun?</span>
                      <Rich text={s.why} className="text-[12.5px] leading-snug text-muted" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!all ? (
            <button onClick={() => setShown((v) => v + 1)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line2 py-3.5 text-sm font-semibold text-muted transition hover:border-rose hover:text-rose">
              <Eye size={15} /> {shown === 0 ? "Pehla step dikhao" : `Agla step (${shown}/${beat.steps.length})`}
            </button>
          ) : (
            <div className="a-pop mt-4 rounded-2xl border border-rose/30 bg-roseSoft p-4 text-center">
              <p className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-rose">Answer</p>
              <Formula tex={beat.answer} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ExampleView({ beat, color }: { beat: Extract<Beat, { kind: "example" }>; color: string }) {
  const [shown, setShown] = useState(0);
  const allShown = shown >= beat.steps.length;

  return (
    <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
      <Pill color={color}>Solved example</Pill>
      <div className="mt-3 rounded-2xl border border-line bg-sunk p-4">
        <Rich text={beat.problem} className="text-[15.5px] leading-relaxed text-head" />
      </div>

      <div className="mt-5 space-y-3">
        {beat.steps.slice(0, shown).map((s, i) => (
          <div key={i} className="a-slide rounded-2xl border border-line bg-sunk p-4">
            <div className="flex items-start gap-3">
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold"
                style={{ background: `${color}25`, color }}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <Rich text={s.do} className="text-[14.5px] leading-relaxed text-head" />
                <div className="mt-2 flex gap-2 rounded-lg bg-sunk px-3 py-2">
                  <span className="shrink-0 text-xs font-bold text-saffron">kyun?</span>
                  <Rich text={s.why} className="text-[12.5px] leading-snug text-muted" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!allShown ? (
        <button
          onClick={() => setShown((s) => s + 1)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line py-3.5 text-sm font-semibold text-muted transition hover:border-primary/50 hover:text-head"
        >
          <Eye size={15} />
          {shown === 0 ? "Pehla step dikhao" : `Next step (${shown}/${beat.steps.length})`}
        </button>
      ) : (
        <div
          className="a-pop mt-4 rounded-2xl border p-4 text-center"
          style={{ borderColor: `${color}55`, background: `${color}12` }}
        >
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color }}>Answer</p>
          <Formula tex={beat.answer} className="text-head" />
        </div>
      )}
    </div>
  );
}

function QuizView({
  beat, color,
}: { beat: Extract<Beat, { kind: "quiz" }>; color: string }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const right = picked === beat.correct;

  function choose(n: number) {
    if (answered) return;
    setPicked(n);
  }

  return (
    <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
      <Pill color="#FFB020">Apna dimaag lagao</Pill>
      <div className="mt-3">
        <Rich text={beat.q} className="text-[16.5px] font-semibold leading-relaxed text-head" />
      </div>

      <div className="mt-5 space-y-2.5">
        {beat.options.map((o, n) => {
          const isCorrect = n === beat.correct;
          const isPicked = n === picked;
          let cls = "border-line bg-sunk hover:border-line2 hover:bg-sunk";
          if (answered && isCorrect) cls = "border-mint bg-mintSoft";
          else if (answered && isPicked) cls = "border-rose bg-roseSoft";
          else if (answered) cls = "border-line bg-sunk opacity-45";

          return (
            <button
              key={n}
              onClick={() => choose(n)}
              disabled={answered}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition ${cls}`}
            >
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-[11px] font-bold text-muted"
                style={answered && isCorrect ? { background: "#22D3A5", color: "#0B0A12", borderColor: "#22D3A5" } : {}}
              >
                {String.fromCharCode(97 + n)}
              </span>
              <Rich text={o} className="flex-1 text-[14px] leading-snug text-body" />
              {answered && isCorrect && <CheckCircle2 size={17} className="shrink-0 text-mint" />}
              {answered && isPicked && !isCorrect && <XCircle size={17} className="shrink-0 text-rose" />}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className={`a-rise mt-4 rounded-2xl border p-4 ${right ? "border-mint/35 bg-mintSoft" : "border-saffron/40 bg-saffronSoft"}`}
        >
          <p className={`mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${right ? "text-mint" : "text-saffron"}`}>
            {right ? <><Trophy size={13} /> Shabaash!</> : <><Lightbulb size={13} /> Koi baat nahi, dekho</>}
          </p>
          <Rich text={beat.explain} className="text-[14px] leading-relaxed text-body" />
        </div>
      )}
    </div>
  );
}
