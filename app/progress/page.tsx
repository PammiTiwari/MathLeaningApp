"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CHAPTERS, UNITS } from "@/lib/data/chapters";
import { getLesson } from "@/lib/data/lessons";
import { FLASHCARDS } from "@/lib/data/flashcards";
import { useProgress, levelOf } from "@/lib/progress";
import { PageHead, Card, Bar, Pill, Empty } from "@/components/ui";
import { Flame, Trophy, Target, TrendingUp, AlertTriangle, RotateCcw, CalendarDays } from "lucide-react";

export default function ProgressPage() {
  const { p, ready, reset, setExamDate } = useProgress();
  const lvl = levelOf(p.xp);

  const weak = useMemo(() => {
    return CHAPTERS.map((c) => {
      const s = p.quizStats[c.slug];
      const attempts = (s?.right ?? 0) + (s?.wrong ?? 0);
      const acc = attempts ? (s!.right / attempts) * 100 : null;
      const learned = p.lessonDone.includes(c.slug);
      return { c, acc, attempts, learned };
    })
      .filter((x) => !x.learned || (x.acc !== null && x.acc < 70))
      .slice(0, 5);
  }, [p]);

  const avgScore = p.attempts.length
    ? Math.round(p.attempts.reduce((n, a) => n + (a.scored / a.total) * 100, 0) / p.attempts.length)
    : null;

  const daysLeft = p.examDate ? Math.ceil((new Date(p.examDate).getTime() - Date.now()) / 86400000) : null;

  if (!ready) return null;

  return (
    <div>
      <PageHead
        eyebrow="Tumhari progress"
        title="Kitna ho gaya, kitna baaki"
        sub="Sab kuch tumhare apne browser mein save hota hai — koi account nahi, koi server nahi."
        right={
          <button
            onClick={() => { if (confirm("Saari progress mit jayegi. Pakka?")) reset(); }}
            className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-faint hover:text-rose"
          >
            <RotateCcw size={12} /> Reset
          </button>
        }
      />

      {/* headline stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Big icon={Trophy} color="#7C5CFF" value={`${p.xp}`} label={`XP · Level ${lvl.level}`} note={lvl.name} />
        <Big icon={Flame} color="#FFB020" value={`${p.streak}`} label="din ka streak" note={p.streak >= 7 ? "Zabardast!" : "Roz aao"} />
        <Big icon={Target} color="#22D3A5" value={`${p.lessonDone.length}/13`} label="chapters done" note={`${Math.round((p.lessonDone.length / 13) * 100)}% syllabus`} />
        <Big icon={TrendingUp} color="#FF5470" value={avgScore !== null ? `${avgScore}%` : "—"} label="mock exam average" note={`${p.attempts.length} attempts`} />
      </div>

      {/* level bar */}
      <Card className="mt-4 p-5">
        <div className="mb-2 flex items-baseline justify-between">
          <p className="font-display text-base font-bold text-head">Level {lvl.level} · <span className="text-primary">{lvl.name}</span></p>
          <p className="text-xs text-faint">{lvl.into}/{lvl.need} XP</p>
        </div>
        <Bar value={lvl.into} max={lvl.need} />
      </Card>

      {/* exam countdown */}
      <Card className="mt-4 p-5">
        <div className="flex flex-wrap items-center gap-4">
          <CalendarDays size={20} className="text-rose" />
          <div className="min-w-[180px] flex-1">
            <p className="font-display text-base font-bold text-head">
              {daysLeft !== null
                ? daysLeft > 0 ? `Board exam mein ${daysLeft} din baaki` : "Exam aa gaya — himmat rakh!"
                : "Board exam ki date set karo"}
            </p>
            <p className="text-xs text-faint">
              {daysLeft !== null && daysLeft > 0
                ? `Roz ${Math.max(1, Math.ceil((13 - p.lessonDone.length) / Math.max(1, Math.floor(daysLeft / 3))))} chapter ka target rakho.`
                : "Countdown dekh ke padhai ka josh alag hi hota hai."}
            </p>
          </div>
          <input
            type="date"
            defaultValue={p.examDate ?? ""}
            onChange={(e) => setExamDate(e.target.value || null)}
            className="rounded-lg border border-line bg-page px-3 py-2 text-sm text-head"
          />
        </div>
      </Card>

      {/* unit progress */}
      <h2 className="font-display text-[20px] font-bold tracking-[-0.01em] text-head">Unit ke hisaab se</h2>
      <Card className="p-5">
        <div className="space-y-4">
          {UNITS.map((u) => {
            const chs = CHAPTERS.filter((c) => u.chapters.includes(c.n));
            const done = chs.filter((c) => p.lessonDone.includes(c.slug)).length;
            return (
              <div key={u.name}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-semibold text-body">{u.name}</span>
                  <span className="shrink-0 text-xs text-faint">
                    {done}/{chs.length} · <span style={{ color: u.color }}>{u.marks}m</span>
                  </span>
                </div>
                <Bar value={done} max={chs.length} color={u.color} />
              </div>
            );
          })}
        </div>
      </Card>

      {/* chapter detail */}
      <h2 className="font-display text-[20px] font-bold tracking-[-0.01em] text-head">Chapter-by-chapter</h2>
      <div className="grid gap-2.5 md:grid-cols-2">
        {CHAPTERS.map((c) => {
          const lesson = getLesson(c.slug);
          const beats = p.lessonBeats[c.slug] ?? 0;
          const total = lesson?.beats.length ?? 1;
          const done = p.lessonDone.includes(c.slug);
          const s = p.quizStats[c.slug];
          const att = (s?.right ?? 0) + (s?.wrong ?? 0);
          const acc = att ? Math.round((s!.right / att) * 100) : null;
          const cards = FLASHCARDS.filter((f) => f.ch === c.slug).length;
          const mastered = FLASHCARDS.map((f, i) => ({ f, key: `${f.ch}-${i}` }))
            .filter((x) => x.f.ch === c.slug && p.cardsMastered.includes(x.key)).length;

          return (
            <Link key={c.slug} href={`/chapters/${c.slug}`}>
              <Card className="card-hover p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{c.emoji}</span>
                  <p className="min-w-0 flex-1 truncate text-[13.5px] font-bold text-head">{c.title}</p>
                  {done && <Pill color="#22D3A5">done</Pill>}
                </div>
                <div className="mt-2.5"><Bar value={done ? total : beats} max={total} color={c.color} /></div>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-faint">
                  <span>lesson {done ? total : beats}/{total}</span>
                  {acc !== null && <span className={acc >= 70 ? "text-mint" : "text-saffron"}>quiz {acc}%</span>}
                  {cards > 0 && <span>cards {mastered}/{cards}</span>}
                  {p.notesRead.includes(c.slug) && <span className="text-mint">notes ✓</span>}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* weak areas */}
      {weak.length > 0 && (
        <>
          <h2 className="mb-2 mt-10 flex items-center gap-2 font-display text-xl font-bold text-head">
            <AlertTriangle size={17} className="text-saffron" /> Yahan dhyaan do
          </h2>
          <p className="mb-3 text-[13px] text-muted">Yeh chapters ya to abhi bache hain, ya inke quiz mein 70% se kam aaya.</p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {weak.map(({ c, acc, learned }) => (
              <Link key={c.slug} href={`/learn/${c.slug}`}>
                <Card className="card-hover flex items-center gap-3 border-saffron/30 p-4">
                  <span className="text-xl">{c.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-bold text-head">{c.title}</p>
                    <p className="text-[11.5px] text-faint">
                      {!learned ? "Abhi shuru nahi kiya" : `Quiz accuracy ${acc}% — dobara padho`}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-bold" style={{ color: c.color }}>{c.unitMarks}m</span>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* attempts */}
      <h2 className="font-display text-[20px] font-bold tracking-[-0.01em] text-head">Mock exam history</h2>
      {p.attempts.length === 0 ? (
        <Empty
          title="Abhi tak koi mock nahi diya"
          sub="Ek timed paper do — asli level pata chalega, aur AI batayega kahaan marks kat rahe hain."
          cta={{ href: "/exam", label: "Mock exam do" }}
        />
      ) : (
        <div className="space-y-2">
          {p.attempts.map((a) => {
            const pct = Math.round((a.scored / a.total) * 100);
            return (
              <Card key={a.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-head">{a.paperTitle}</p>
                    <p className="text-[11px] text-faint">{new Date(a.date).toLocaleString("en-IN")}</p>
                  </div>
                  <div className="w-24"><Bar value={a.scored} max={a.total} color={pct >= 60 ? "#22D3A5" : pct >= 33 ? "#FFB020" : "#FF5470"} /></div>
                  <p className={`w-16 shrink-0 text-right font-display text-lg font-extrabold ${pct >= 60 ? "text-mint" : pct >= 33 ? "text-saffron" : "text-rose"}`}>
                    {a.scored}<span className="text-xs text-faint">/{a.total}</span>
                  </p>
                </div>
                {a.overall && <p className="mt-2 border-t border-line/50 pt-2 text-[12.5px] leading-relaxed text-muted">{a.overall}</p>}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Big({ icon: Icon, value, label, note, color }: any) {
  return (
    <Card className="p-4">
      <Icon size={17} style={{ color }} />
      <p className="mt-2 font-display text-[28px] font-extrabold leading-none text-head">{value}</p>
      <p className="mt-1.5 text-[11.5px] text-faint">{label}</p>
      <p className="text-[11px] font-semibold" style={{ color }}>{note}</p>
    </Card>
  );
}
