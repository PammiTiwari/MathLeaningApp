"use client";

import Link from "next/link";
import { CHAPTERS, UNITS } from "@/lib/data/chapters";
import { useProgress } from "@/lib/progress";
import { PageHead, Card, Pill, Bar } from "@/components/ui";
import { getLesson } from "@/lib/data/lessons";
import { Clock, CheckCircle2 } from "lucide-react";

export default function ChaptersPage() {
  const { p } = useProgress();

  return (
    <div>
      <PageHead
        eyebrow="Poora syllabus"
        title="13 Chapters, 80 Marks"
        sub="Har chapter Hinglish mein samjhaya gaya hai — kahani se shuru, formula ke saath, aur board tips ke saath khatam. Unit ke hisaab se grouped hai taaki pata rahe kis par kitna time dena hai."
      />

      {UNITS.map((unit) => {
        const chs = CHAPTERS.filter((c) => unit.chapters.includes(c.n));
        const doneCount = chs.filter((c) => p.lessonDone.includes(c.slug)).length;
        return (
          <section key={unit.name} className="mb-9">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h2 className="font-display text-lg font-bold text-head">{unit.name}</h2>
              <Pill color={unit.color}>{unit.marks} marks</Pill>
              <span className="text-xs text-faint">{doneCount}/{chs.length} done</span>
              <div className="ml-auto w-28"><Bar value={doneCount} max={chs.length} color={unit.color} /></div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {chs.map((c) => {
                const lesson = getLesson(c.slug);
                const beats = p.lessonBeats[c.slug] ?? 0;
                const total = lesson?.beats.length ?? 1;
                const finished = p.lessonDone.includes(c.slug);
                return (
                  <Link key={c.slug} href={`/chapters/${c.slug}`}>
                    <Card className="card-hover h-full p-5">
                      <div className="flex items-start gap-4">
                        <span
                          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl"
                          style={{ background: `${c.color}1c` }}
                        >
                          {c.emoji}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: c.color }}>
                              Chapter {c.n}
                            </span>
                            {finished && <CheckCircle2 size={13} className="text-mint" />}
                          </div>
                          <h3 className="mt-0.5 font-display text-[16px] font-bold leading-snug text-head">
                            {c.title}
                          </h3>
                          <p className="font-hand text-[17px] leading-none text-saffron/70">{c.hinglish}</p>
                          <p className="mt-2 text-[12.5px] leading-relaxed text-muted line-clamp-2">{c.blurb}</p>

                          <div className="mt-3 flex items-center gap-3 text-[11px] text-faint">
                            <span className="flex items-center gap-1"><Clock size={11} /> ~{Math.round(c.estMins / 60)}h</span>
                            <span>{"🔥".repeat(c.difficulty)}</span>
                            <span>{c.topics.length} topics</span>
                          </div>

                          {beats > 0 && !finished && (
                            <div className="mt-2.5">
                              <Bar value={beats} max={total} color={c.color} />
                              <p className="mt-1 text-[10px] text-faint">{beats}/{total} steps</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
