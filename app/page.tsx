import Link from "next/link";
import { CHAPTERS, UNITS, getChapter } from "@/lib/data/chapters";
import { NOTES } from "@/lib/data/notes";
import { PAPER_PATTERN } from "@/lib/data/papers";
import { MOCKS, MOCK_STATS } from "@/lib/data/mocks";
import { Card, Bar, Pill } from "@/components/ui";
import { Formula } from "@/components/Tex";
import {
  Timer, PlayCircle, NotebookPen, FileText, Sparkles, Target,
  MessageCircleQuestion, Layers, ArrowRight, Clock, Printer, Check,
} from "lucide-react";

const TILES = [
  { href: "/chapters", icon: Layers, label: "Chapters", sub: "13 chapters, basics se deep tak", color: "#5B3FD6" },
  { href: "/videos", icon: PlayCircle, label: "Video lessons", sub: "Khan Academy, topic-wise", color: "#C8304F" },
  { href: "/notes", icon: NotebookPen, label: "Handwritten notes", sub: "Poora chapter, ek sheet par", color: "#0B8A64", star: true },
  { href: "/exam", icon: Timer, label: "Mock exam", sub: "AI tumhari copy check karega", color: "#B26A00" },
  { href: "/papers", icon: FileText, label: "Board papers", sub: "Asli CBSE papers, 2022–2026", color: "#0A72AB" },
  { href: "/formulas", icon: Sparkles, label: "Formula sheet", sub: "94 formulas, searchable", color: "#9333EA" },
  { href: "/flashcards", icon: Target, label: "Flashcards", sub: "5-minute revision", color: "#EA580C" },
  { href: "/doubt", icon: MessageCircleQuestion, label: "Doubt pucho", sub: "AI tutor, 24×7", color: "#0D9488" },
];

const NOTE_STATS = (() => {
  let sections = 0, formulas = 0, methods = 0, traps = 0;
  for (const n of NOTES)
    for (const page of n.pages)
      for (const b of page) {
        if (b.t === "h") sections++;
        else if (b.t === "f") formulas++;
        else if (b.t === "fl") formulas += b.items.length;
        else if (b.t === "steps") methods++;
        else if (b.t === "warn") traps++;
      }
  return { sections, formulas, methods, traps };
})();

export default function Home() {
  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative mt-5 overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primarySoft opacity-70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-28 h-52 w-52 rounded-full bg-saffronSoft opacity-70 blur-3xl" />

        <div className="relative max-w-2xl">
          <Pill>CBSE Class 12 · Mathematics (041)</Pill>
          <h1 className="mt-3 font-display text-[34px] font-extrabold leading-[1.1] tracking-[-0.025em] text-head sm:text-[46px]">
            Himmat rakh —{" "}
            <span className="bg-gradient-to-r from-primary via-[#7C5CFF] to-saffron bg-clip-text text-transparent">
              Maths ho jayega.
            </span>
          </h1>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-muted">
            Poora syllabus — 13 chapters, 80 marks. Har chapter basics se shuru hota hai aur derivations
            aur board-level tough questions tak jaata hai. Saath mein asli CBSE board papers, handwritten
            notes, aur timed mock exam jise AI step marks ke saath check karta hai.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/chapters"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-primaryDim"
            >
              Padhna shuru karo <ArrowRight size={16} />
            </Link>
            <Link
              href="/exam"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-bold text-body transition hover:border-line2 hover:bg-sunk"
            >
              <Timer size={16} /> Mock exam do
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- TILES ---------- */}
      <h2 className="mb-4 mt-10 font-display text-[20px] font-bold tracking-[-0.01em] text-head">
        Kahaan se shuru karein?
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {TILES.map((t) => (
          <Link key={t.href} href={t.href}>
            <Card className={`card-hover h-full p-4 ${t.star ? "border-mint/40 bg-mintSoft/40" : ""}`}>
              <span
                className="mb-3 grid h-10 w-10 place-items-center rounded-xl"
                style={{ background: `${t.color}14`, color: t.color }}
              >
                <t.icon size={19} />
              </span>
              <p className="text-[14px] font-bold leading-snug text-head">{t.label}</p>
              <p className="mt-1 text-[12px] leading-snug text-muted">{t.sub}</p>
            </Card>
          </Link>
        ))}
      </div>


      {/* ---------- FEATURED: HANDWRITTEN NOTES ---------- */}
      <section className="mt-12 overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          {/* left: the pitch */}
          <div className="p-6 sm:p-9">
            <Pill color="#0B8A64">Sabse zyada kaam ki cheez</Pill>
            <h2 className="mt-3 font-display text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-head sm:text-[32px]">
              Handwritten notes —<br />poora chapter, ek sheet par
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-muted">
              Jaise topper ki copy se photocopy karayi ho. Har chapter ki saari definitions, saare formulas,
              aur har method ke step-by-step tareeke — chhota rakha hai par kuch chhoda nahi.
              <strong className="text-head"> Exam se ek raat pehle sirf yahi kaafi hai.</strong>
            </p>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {[
                `${NOTE_STATS.sections} sections, 13 chapters`,
                `${NOTE_STATS.formulas} boxed formulas`,
                `${NOTE_STATS.methods} step-by-step methods`,
                `${NOTE_STATS.traps} red-pen warnings`,
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 text-[13.5px] text-body">
                  <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-mintSoft text-mint">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/notes"
                className="inline-flex items-center gap-2 rounded-xl bg-mint px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:brightness-110">
                Saare notes kholo <ArrowRight size={16} />
              </Link>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-line px-4 py-3 text-[13px] font-semibold text-muted">
                <Printer size={14} /> Print-ready
              </span>
            </div>

            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-faint">Seedha kholo</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["integrals", "determinants", "probability", "vector-algebra", "continuity-and-differentiability"].map((slug) => {
                const c = getChapter(slug)!;
                return (
                  <Link key={slug} href={`/notes/${slug}`}
                    className="rounded-lg border border-line bg-sunk px-2.5 py-1.5 text-[12px] font-semibold text-body transition hover:border-mint hover:text-mint">
                    {c.emoji} {c.title}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* right: a real sheet, peeking in */}
          <div className="relative min-h-[300px] overflow-hidden bg-sunk p-6 sm:p-8">
            <div className="paper absolute inset-x-6 top-7 rotate-[-1.4deg] rounded-lg px-5 py-5 shadow-lift sm:inset-x-8">
              <div className="paper-margin pl-4">
                <p className="font-hand text-[13px] leading-tight text-[#7A8C9E]">Class 12 · Chapter 4 · Algebra</p>
                <p className="font-hand text-[26px] font-bold leading-tight text-[#12314F]">Determinants</p>
                <div className="mt-0.5 h-[3px] w-28 rounded-full bg-[#F0B8B8]" />

                <p className="mt-4 font-hand text-[19px] font-bold leading-tight text-[#0F4C81]">INVERSE ka raasta</p>
                <div className="mt-2 rounded border-2 border-dashed border-[#9FC0D8] bg-white/70 px-3 py-2">
                  <p className="font-hand text-[13px] leading-none text-[#5B7C95]">|A| ≠ 0 zaroori</p>
                  <Formula tex="A^{-1} = \tfrac{1}{|A|}\,\text{adj}(A)" />
                </div>
                <p className="mt-2.5 font-hand text-[16px] font-semibold leading-snug text-[#C0392B]">
                  ⚠ TRANSPOSE lena mat bhoolna adjoint mein
                </p>
                <p className="mt-2 font-hand text-[16px] font-semibold leading-snug text-[#B45309]">
                  ★ 5-marker: AX = B → |A| → cofactors → adj A → A⁻¹ → X
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-sunk to-transparent" />
          </div>
        </div>
      </section>

      {/* ---------- WEIGHTAGE + PATTERN ---------- */}
      <div className="mt-10 grid gap-4 lg:grid-cols-5">
        <Card className="p-5 lg:col-span-3">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="font-display text-[19px] font-bold text-head">Kaunse unit ke kitne marks</h2>
            <Pill>80 marks</Pill>
          </div>
          <p className="mb-5 text-[12.5px] text-muted">
            CBSE sirf unit-wise marks deta hai, chapter-wise nahi. Calculus sabse bada — aadhe se zyada paper wahin se.
          </p>
          <div className="space-y-3.5">
            {UNITS.map((u) => (
              <div key={u.name}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-semibold text-body">{u.name}</span>
                  <span className="shrink-0 text-xs font-bold" style={{ color: u.color }}>{u.marks}</span>
                </div>
                <Bar value={u.marks} max={35} color={u.color} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <h2 className="font-display text-[19px] font-bold text-head">Paper ka pattern</h2>
          <p className="mb-4 mt-1 text-[12.5px] text-muted">38 questions · 3 ghante · 80 marks</p>
          <div className="space-y-2">
            {PAPER_PATTERN.map((s) => (
              <div key={s.section} className="flex items-center gap-3 rounded-lg border border-line bg-sunk px-3 py-2">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary text-[11px] font-bold text-white">
                  {s.section}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-semibold leading-tight text-head">{s.desc}</span>
                  <span className="text-[11px] text-faint">Q{s.qs} · {s.each} mark each</span>
                </span>
                <span className="shrink-0 text-[13px] font-bold text-muted">{s.total}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ---------- MOCK PAPERS ---------- */}
      <div className="mb-4 mt-10 flex items-end justify-between">
        <h2 className="font-display text-[20px] font-bold tracking-[-0.01em] text-head">Exam ki practice</h2>
        <Link href="/exam" className="text-xs font-semibold text-primary hover:underline">saare papers →</Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {MOCKS.slice(0, 2).map((m) => (
          <Link key={m.id} href={`/exam/${m.id}`}>
            <Card className="card-hover h-full p-5">
              <div className="mb-2 flex items-center gap-2">
                <Pill color="#B26A00">{m.badge}</Pill>
                <span className="flex items-center gap-1 text-xs text-faint">
                  <Clock size={11} /> {m.minutes} min · {m.marks} marks
                </span>
              </div>
              <p className="font-display text-[17px] font-bold text-head">{m.title}</p>
              <p className="mt-1.5 text-[13px] leading-snug text-muted">{m.subtitle}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* ---------- CHAPTERS ---------- */}
      <div className="mb-4 mt-10 flex items-end justify-between">
        <h2 className="font-display text-[20px] font-bold tracking-[-0.01em] text-head">Saare chapters</h2>
        <Link href="/chapters" className="text-xs font-semibold text-primary hover:underline">poori list →</Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CHAPTERS.map((c) => (
          <Link key={c.slug} href={`/chapters/${c.slug}`}>
            <Card className="card-hover h-full p-4">
              <span className="block text-2xl">{c.emoji}</span>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: c.color }}>
                Ch {c.n}
              </p>
              <p className="mt-0.5 text-[13px] font-bold leading-snug text-head">{c.title}</p>
              <p className="mt-1 font-hand text-[15px] leading-none text-muted">{c.hinglish}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
