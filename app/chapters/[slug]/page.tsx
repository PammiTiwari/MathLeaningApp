"use client";

import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { getChapter } from "@/lib/data/chapters";
import { getLesson } from "@/lib/data/lessons";
import { formulasFor } from "@/lib/data/formulas";
import { cardsFor } from "@/lib/data/flashcards";
import { questionsFor } from "@/lib/data/questions";
import { khanAcademyUrl, KHAN_VIDEOS, topicVideosFor } from "@/lib/data/videos";
import { useProgress } from "@/lib/progress";
import { Card, Pill, Bar } from "@/components/ui";
import { Rich, Formula } from "@/components/Tex";
import {
  BookOpen, PlayCircle, NotebookPen, Sparkles, Target, ArrowRight,
  Lightbulb, ExternalLink, Clock, CheckCircle2,
} from "lucide-react";

export default function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const ch = getChapter(slug);
  const { p } = useProgress();
  if (!ch) notFound();

  const lesson = getLesson(slug);
  const formulas = formulasFor(slug);
  const cards = cardsFor(slug);
  const qs = questionsFor(slug);
  const khan = KHAN_VIDEOS[slug] ?? [];
  const topicLinks = topicVideosFor(slug);
  const beats = p.lessonBeats[slug] ?? 0;
  const total = lesson?.beats.length ?? 1;
  const finished = p.lessonDone.includes(slug);

  return (
    <div>
      {/* header */}
      <div
        className="relative mt-4 overflow-hidden rounded-3xl border border-line p-6 sm:p-8"
        style={{ background: `linear-gradient(150deg, ${ch.color}14, #ffffff 58%)` }}
      >
        <div className="pointer-events-none absolute -right-8 -top-8 select-none text-[150px] opacity-[0.07]">{ch.emoji}</div>
        <Link href="/chapters" className="text-xs font-semibold text-faint hover:text-head">← saare chapters</Link>
        <div className="mt-3 flex items-center gap-2">
          <Pill color={ch.color}>Chapter {ch.n}</Pill>
          <Pill color="#6B6B7B">{ch.unit} · {ch.unitMarks} marks</Pill>
          {finished && <Pill color="#22D3A5">✓ Done</Pill>}
        </div>
        <h1 className="mt-3 font-display text-[32px] font-extrabold leading-tight tracking-tight text-head sm:text-[42px]">
          {ch.title}
        </h1>
        <p className="font-hand text-2xl text-saffron">{ch.hinglish}</p>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{ch.blurb}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-faint">
          <span className="flex items-center gap-1"><Clock size={12} /> ~{Math.round(ch.estMins / 60)} ghante</span>
          <span>Difficulty {"🔥".repeat(ch.difficulty)}</span>
          <span>{ch.topics.length} topics</span>
        </div>

        {beats > 0 && (
          <div className="mt-4 max-w-sm">
            <Bar value={finished ? total : beats} max={total} color={ch.color} />
            <p className="mt-1 text-[11px] text-faint">{finished ? "Poora ho gaya!" : `${beats}/${total} steps`}</p>
          </div>
        )}

        <Link
          href={`/learn/${slug}`}
          className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-head transition"
          style={{ background: ch.color }}
        >
          {beats > 0 ? (finished ? "Dobara padho" : "Continue lesson") : "Lesson shuru karo"}
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* board scoring tip */}
      <Card className="mt-4 border-saffron/30 bg-saffronSoft p-5">
        <div className="flex gap-3">
          <Lightbulb size={18} className="mt-0.5 shrink-0 text-saffron" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-saffron">Board mein isse kya aata hai</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-body">{ch.scoring}</p>
          </div>
        </div>
      </Card>

      {/* quick links */}
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile href={`/learn/${slug}`} icon={BookOpen} label="Fun lesson" sub={`${total} steps`} color={ch.color} />
        <Tile href={`/videos/${slug}`} icon={PlayCircle} label="Videos" sub={`${khan.length + topicLinks.length} links`} color="#FF5470" />
        <Tile href={`/notes/${slug}`} icon={NotebookPen} label="Notes" sub="1-page sheet" color="#22D3A5" />
        <Tile href={`/formulas#${slug}`} icon={Sparkles} label="Formulas" sub={`${formulas?.items.length ?? 0} formulas`} color="#F472B6" />
      </div>

      {/* topics */}
      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        <Card className="p-5 lg:col-span-3">
          <h2 className="font-display text-lg font-bold text-head">Is chapter mein kya-kya hai</h2>
          <p className="mb-4 mt-1 text-xs text-faint">NCERT ke hisaab se official topics — har topic ki apni video link hai.</p>
          <ol className="space-y-2.5">
            {ch.topics.map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold"
                  style={{ background: `${ch.color}25`, color: ch.color }}
                >
                  {i + 1}
                </span>
                <span className="flex-1 text-[13.5px] leading-snug text-body">{t}</span>
                <a
                  href={topicLinks[i]?.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-0.5 shrink-0 text-faint transition hover:text-rose"
                  title="Is topic ki video dekho"
                >
                  <PlayCircle size={15} />
                </a>
              </li>
            ))}
          </ol>
          <a
            href={khanAcademyUrl(slug)}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            Khan Academy par is chapter ka free course <ExternalLink size={12} />
          </a>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          {formulas && (
            <Card className="p-5">
              <h3 className="mb-3 font-display text-base font-bold text-head">Top formulas</h3>
              <div className="space-y-3">
                {formulas.items.slice(0, 4).map((f, i) => (
                  <div key={i}>
                    <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-faint">{f.name}</p>
                    <Formula tex={f.tex} className="text-head" />
                  </div>
                ))}
              </div>
              <Link href={`/formulas#${slug}`} className="mt-3 inline-block text-xs font-semibold text-primary hover:underline">
                saare {formulas.items.length} formulas →
              </Link>
            </Card>
          )}

          <Card className="p-5">
            <h3 className="mb-1 font-display text-base font-bold text-head">Practice</h3>
            <p className="mb-3 text-xs text-faint">Is chapter ke board-pattern sawaal.</p>
            <div className="space-y-2">
              <RowLink href="/exam" label={`${qs.length} questions is chapter se`} icon={Target} />
              <RowLink href="/flashcards" label={`${cards.length} flashcards`} icon={Sparkles} />
              <RowLink href="/doubt" label="Doubt pucho (AI tutor)" icon={Lightbulb} />
            </div>
          </Card>
        </div>
      </div>

      {/* lesson preview */}
      {lesson && (
        <Card className="mt-6 p-5">
          <h2 className="font-display text-lg font-bold text-head">Lesson ki jhalak</h2>
          <p className="mb-4 mt-1 text-xs text-faint">Yeh lesson ka pehla step hai — poora padhne ke liye niche click karo.</p>
          {lesson.beats[0].kind === "story" && (
            <div className="rounded-xl border border-line bg-sunk p-4">
              <span className="text-2xl">{(lesson.beats[0] as any).emoji}</span>
              <Rich text={(lesson.beats[0] as any).text} className="mt-2 text-[14px] leading-relaxed text-body" />
            </div>
          )}
          <Link
            href={`/learn/${slug}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            Poora lesson padho <ArrowRight size={14} />
          </Link>
        </Card>
      )}
    </div>
  );
}

function Tile({ href, icon: Icon, label, sub, color }: any) {
  return (
    <Link href={href}>
      <Card className="card-hover h-full p-4">
        <span className="mb-2.5 grid h-9 w-9 place-items-center rounded-xl" style={{ background: `${color}1f`, color }}>
          <Icon size={17} />
        </span>
        <p className="text-[13.5px] font-bold text-head">{label}</p>
        <p className="text-[11px] text-faint">{sub}</p>
      </Card>
    </Link>
  );
}

function RowLink({ href, label, icon: Icon }: any) {
  return (
    <Link href={href} className="flex items-center gap-2.5 rounded-lg border border-line bg-sunk px-3 py-2.5 text-[13px] text-body transition hover:border-primary/40 hover:text-head">
      <Icon size={14} className="text-primary" />
      <span className="flex-1">{label}</span>
      <ArrowRight size={13} className="text-faint" />
    </Link>
  );
}
