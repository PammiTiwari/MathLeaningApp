"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CHAPTERS, UNITS } from "@/lib/data/chapters";
import { MOCK_PAPERS } from "@/lib/data/papers";
import { useProgress, levelOf } from "@/lib/progress";
import { Card, Bar, Pill } from "@/components/ui";
import {
  Flame, Trophy, Timer, PlayCircle, NotebookPen, FileText,
  Sparkles, Target, MessageCircleQuestion, Layers, ArrowRight, CalendarDays,
} from "lucide-react";

const TILES = [
  { href: "/chapters", icon: Layers, label: "Chapters padho", sub: "13 chapters, Hinglish mein", color: "#7C5CFF" },
  { href: "/videos", icon: PlayCircle, label: "Video lessons", sub: "Khan Academy, topic-wise", color: "#FF5470" },
  { href: "/notes", icon: NotebookPen, label: "Handwritten notes", sub: "Ek page, poora chapter", color: "#22D3A5" },
  { href: "/exam", icon: Timer, label: "Timed mock exam", sub: "AI tumhari copy check karega", color: "#FFB020" },
  { href: "/papers", icon: FileText, label: "Previous papers", sub: "CBSE ke official papers", color: "#38BDF8" },
  { href: "/formulas", icon: Sparkles, label: "Formula sheet", sub: "94 formulas, ek jagah", color: "#F472B6" },
  { href: "/flashcards", icon: Target, label: "Flashcards", sub: "5 minute revision", color: "#FB923C" },
  { href: "/doubt", icon: MessageCircleQuestion, label: "Doubt pucho", sub: "AI tutor, 24x7", color: "#2DD4BF" },
];

export default function Home() {
  const { p, ready, setExamDate } = useProgress();
  const lvl = levelOf(p.xp);
  const [editingDate, setEditingDate] = useState(false);

  const done = p.lessonDone.length;
  const pctSyllabus = Math.round((done / CHAPTERS.length) * 100);

  const nextChapter = useMemo(
    () => CHAPTERS.find((c) => !p.lessonDone.includes(c.slug)) ?? CHAPTERS[0],
    [p.lessonDone]
  );

  const daysLeft = useMemo(() => {
    if (!p.examDate) return null;
    const d = Math.ceil((new Date(p.examDate).getTime() - Date.now()) / 86400000);
    return d;
  }, [p.examDate]);

  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : hour < 21 ? "Good evening" : "Raat ko bhi padh rahe ho";

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative mt-4 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface2 via-surface to-ink p-6 sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-24 h-48 w-48 rounded-full bg-saffron/10 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-medium text-white/45">{greet} 👋</p>
          <h1 className="mt-1.5 font-display text-[34px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[46px]">
            Himmat rakh —<br className="sm:hidden" />{" "}
            <span className="bg-gradient-to-r from-primary via-[#A78BFA] to-saffron bg-clip-text text-transparent">
              Maths ho jayega.
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/55">
            CBSE Class 12 Maths ka poora syllabus — 13 chapters, 80 marks. Padho, video dekho, mock exam do,
            aur AI se apni copy check karwao. Sab ek jagah.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/learn/${nextChapter.slug}`}
              className="glow inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primaryDim"
            >
              {done === 0 ? "Padhna shuru karo" : "Continue: " + nextChapter.title}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/exam"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <Timer size={16} /> Mock exam do
            </Link>
          </div>

          {/* stat strip */}
          {ready && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat icon={Flame} color="#FFB020" value={`${p.streak}`} label={p.streak === 1 ? "din streak" : "din ka streak"} />
              <Stat icon={Trophy} color="#7C5CFF" value={`${p.xp}`} label={`XP · ${lvl.name}`} />
              <Stat icon={Layers} color="#22D3A5" value={`${done}/13`} label="chapters done" />
              <Stat
                icon={CalendarDays}
                color="#FF5470"
                value={daysLeft !== null ? (daysLeft > 0 ? `${daysLeft}` : "0") : "—"}
                label={daysLeft !== null ? "din baaki" : "exam date set karo"}
                onClick={() => setEditingDate((v) => !v)}
              />
            </div>
          )}

          {editingDate && (
            <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-line bg-surface p-3">
              <label className="text-xs text-white/60">Board exam ki date:</label>
              <input
                type="date"
                defaultValue={p.examDate ?? ""}
                onChange={(e) => setExamDate(e.target.value || null)}
                className="rounded-lg border border-line bg-ink px-3 py-1.5 text-sm text-white"
              />
              <button onClick={() => setEditingDate(false)} className="text-xs font-semibold text-primary">
                done
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------- LEVEL BAR ---------- */}
      {ready && (
        <Card className="mt-4 p-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-bold text-white">
              Level {lvl.level} · <span className="text-primary">{lvl.name}</span>
            </span>
            <span className="text-white/40">{lvl.into}/{lvl.need} XP to next level</span>
          </div>
          <Bar value={lvl.into} max={lvl.need} />
          <div className="mt-3 flex items-center justify-between text-xs text-white/40">
            <span>Syllabus complete</span>
            <span className="font-semibold text-white/70">{pctSyllabus}%</span>
          </div>
          <div className="mt-1.5"><Bar value={done} max={CHAPTERS.length} color="#22D3A5" /></div>
        </Card>
      )}

      {/* ---------- QUICK TILES ---------- */}
      <h2 className="mb-3 mt-9 font-display text-xl font-bold text-white">Kahaan se shuru karein?</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {TILES.map((t) => (
          <Link key={t.href} href={t.href}>
            <Card className="card-hover h-full p-4">
              <span
                className="mb-3 grid h-10 w-10 place-items-center rounded-xl"
                style={{ background: `${t.color}1f`, color: t.color }}
              >
                <t.icon size={19} />
              </span>
              <p className="text-[14px] font-bold leading-snug text-white">{t.label}</p>
              <p className="mt-1 text-[12px] leading-snug text-white/45">{t.sub}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* ---------- UNIT WEIGHTAGE ---------- */}
      <div className="mt-10 grid gap-4 lg:grid-cols-5">
        <Card className="p-5 lg:col-span-3">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-white">Kaunse unit ke kitne marks?</h2>
            <Pill>80 marks theory</Pill>
          </div>
          <p className="mb-5 text-xs text-white/45">
            CBSE sirf unit-wise marks deta hai, chapter-wise nahi. Calculus sabse bada — aadhe se zyada paper wahin se.
          </p>
          <div className="space-y-3.5">
            {UNITS.map((u) => (
              <div key={u.name}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-semibold text-white/85">{u.name}</span>
                  <span className="shrink-0 text-xs font-bold" style={{ color: u.color }}>
                    {u.marks} marks
                  </span>
                </div>
                <Bar value={u.marks} max={35} color={u.color} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <h2 className="mb-1 font-display text-lg font-bold text-white">Aaj ka plan</h2>
          <p className="mb-4 text-xs text-white/45">Chhote steps, roz. Yahi kaafi hai.</p>
          <ol className="space-y-3">
            <PlanStep n={1} done={p.lessonDone.includes(nextChapter.slug)} text={`${nextChapter.title} ka lesson padho`} href={`/learn/${nextChapter.slug}`} />
            <PlanStep n={2} done={p.notesRead.includes(nextChapter.slug)} text="Uske handwritten notes dekho" href={`/notes/${nextChapter.slug}`} />
            <PlanStep n={3} done={(p.quizStats[nextChapter.slug]?.right ?? 0) > 0} text="5 flashcards revise karo" href="/flashcards" />
            <PlanStep n={4} done={p.attempts.length > 0} text="Ek 30-minute speed test do" href="/exam/quick-30" />
          </ol>
        </Card>
      </div>

      {/* ---------- MOCK PAPERS ---------- */}
      <div className="mb-3 mt-10 flex items-end justify-between">
        <h2 className="font-display text-xl font-bold text-white">Exam ki practice</h2>
        <Link href="/exam" className="text-xs font-semibold text-primary hover:underline">saare papers →</Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {MOCK_PAPERS.slice(0, 2).map((m) => (
          <Link key={m.id} href={`/exam/${m.id}`}>
            <Card className="card-hover h-full p-5">
              <div className="mb-2 flex items-center gap-2">
                <Pill color="#FFB020">{m.badge}</Pill>
                <span className="text-xs text-white/40">{m.minutes} min · {m.marks} marks</span>
              </div>
              <p className="font-display text-[17px] font-bold text-white">{m.title}</p>
              <p className="mt-1.5 text-[13px] leading-snug text-white/50">{m.subtitle}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* ---------- CHAPTER STRIP ---------- */}
      <div className="mb-3 mt-10 flex items-end justify-between">
        <h2 className="font-display text-xl font-bold text-white">Saare chapters</h2>
        <Link href="/chapters" className="text-xs font-semibold text-primary hover:underline">poori list →</Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CHAPTERS.map((c) => {
          const finished = p.lessonDone.includes(c.slug);
          return (
            <Link key={c.slug} href={`/chapters/${c.slug}`}>
              <Card className="card-hover h-full p-4">
                <div className="mb-2 flex items-start justify-between">
                  <span className="text-2xl">{c.emoji}</span>
                  {finished && <span className="text-xs font-bold text-mint">✓</span>}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: c.color }}>
                  Ch {c.n}
                </p>
                <p className="mt-0.5 text-[13px] font-bold leading-snug text-white">{c.title}</p>
                <p className="mt-1 font-hand text-[15px] leading-none text-white/40">{c.hinglish}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Stat({
  icon: Icon, value, label, color, onClick,
}: { icon: any; value: string; label: string; color: string; onClick?: () => void }) {
  const inner = (
    <>
      <Icon size={16} style={{ color }} />
      <span className="mt-1.5 block font-display text-2xl font-extrabold leading-none text-white">{value}</span>
      <span className="mt-1 block text-[11px] leading-tight text-white/45">{label}</span>
    </>
  );
  return onClick ? (
    <button onClick={onClick} className="rounded-xl border border-line bg-white/[0.03] p-3 text-left transition hover:bg-white/[0.07]">
      {inner}
    </button>
  ) : (
    <div className="rounded-xl border border-line bg-white/[0.03] p-3">{inner}</div>
  );
}

function PlanStep({ n, text, done, href }: { n: number; text: string; done: boolean; href: string }) {
  return (
    <li>
      <Link href={href} className="flex items-start gap-3 rounded-lg p-1.5 transition hover:bg-white/5">
        <span
          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
            done ? "bg-mint text-ink" : "border border-line text-white/40"
          }`}
        >
          {done ? "✓" : n}
        </span>
        <span className={`text-[13px] leading-snug ${done ? "text-white/35 line-through" : "text-white/75"}`}>
          {text}
        </span>
      </Link>
    </li>
  );
}
