"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MOCKS, MOCK_STATS, type Mock } from "@/lib/data/mocks";
import { PAPER_PATTERN } from "@/lib/data/papers";
import { useProgress } from "@/lib/progress";
import { PageHead, Card, Pill } from "@/components/ui";
import { Timer, ArrowRight, History, Sparkles, Search, X, FileText, Layers, Zap } from "lucide-react";

type Tab = { key: string; label: string; icon: any; match: (m: Mock) => boolean; blurb: string };

const TABS: Tab[] = [
  {
    key: "full", label: "Full papers", icon: FileText,
    match: (m) => m.kind === "full",
    blurb: "Poora 38-question board paper, 3 ghante. Har paper asli CBSE exam ka ek alag set hai — jaisa students ne diya tha.",
  },
  {
    key: "section", label: "Section drills", icon: Zap,
    match: (m) => m.kind === "section",
    blurb: "Ek hi tarah ke sawaal, saare papers se ikattha. Jis section mein kamzor ho usi ki practice karo.",
  },
  {
    key: "chapter", label: "Chapter tests", icon: Layers,
    match: (m) => m.kind === "chapter",
    blurb: "Sirf ek chapter ke board questions. Chapter padhne ke turant baad yahi do.",
  },
];

export default function ExamHome() {
  const { p, clearAttempts } = useProgress();
  const [tab, setTab] = useState("full");
  const [q, setQ] = useState("");

  const active = TABS.find((t) => t.key === tab)!;
  const list = useMemo(() => {
    const base = MOCKS.filter(active.match);
    if (!q.trim()) return base;
    const s = q.toLowerCase();
    return base.filter((m) => (m.title + m.subtitle + m.source).toLowerCase().includes(s));
  }, [tab, q, active]);

  return (
    <div>
      <PageHead
        eyebrow="Timed mock exams"
        title={`${MOCK_STATS.papers} papers, sab timed`}
        sub={`${MOCK_STATS.boardQuestions} asli board questions ${MOCK_STATS.contributingSets} CBSE sets se. Timer chalega, tum answers likhoge — type karke ya copy ki photo kheench ke — aur submit karte hi AI examiner step marks ke saath check karega.`}
      />

      {/* pattern */}
      <Card className="mb-8 p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 className="font-display text-[18px] font-bold text-head">CBSE paper ka pattern</h2>
          <Pill>38 Q · 80 marks · 3 hrs</Pill>
        </div>
        <div className="grid gap-2 sm:grid-cols-5">
          {PAPER_PATTERN.map((s) => (
            <div key={s.section} className="rounded-lg border border-line bg-sunk p-3">
              <div className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded bg-primary text-[10px] font-bold text-white">
                  {s.section}
                </span>
                <span className="text-[11px] font-bold text-muted">Q{s.qs}</span>
              </div>
              <p className="mt-1.5 text-[11.5px] font-semibold leading-tight text-head">{s.desc}</p>
              <p className="mt-0.5 text-[11px] text-faint">{s.each}m each · {s.total} total</p>
            </div>
          ))}
        </div>
      </Card>

      {/* tabs */}
      <div className="mb-3 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const n = MOCKS.filter(t.match).length;
          if (!n) return null;
          return (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setQ(""); }}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-bold transition ${
                tab === t.key
                  ? "bg-primary text-white shadow-soft"
                  : "border border-line bg-card text-body hover:border-line2 hover:bg-sunk"
              }`}
            >
              <t.icon size={15} /> {t.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10.5px] ${tab === t.key ? "bg-white/25" : "bg-sunk text-muted"}`}>
                {n}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mb-4 text-[13px] leading-relaxed text-muted">{active.blurb}</p>

      {/* search */}
      {MOCKS.filter(active.match).length > 6 && (
        <div className="relative mb-4">
          <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Paper dhoondho… (set number, chapter ka naam)"
            className="w-full rounded-xl border border-line bg-card py-2.5 pl-11 pr-10 text-sm text-head placeholder:text-faint focus:border-primary focus:outline-none"
          />
          {q && (
            <button onClick={() => setQ("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-faint hover:text-head">
              <X size={15} />
            </button>
          )}
        </div>
      )}

      {/* papers */}
      {list.length === 0 ? (
        <Card className="p-10 text-center text-sm text-muted">
          {q ? `"${q}" ke liye kuch nahi mila.` : "Yahaan abhi koi paper nahi hai."}
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((m) => (
            <Link key={m.id} href={`/exam/${m.id}`}>
              <Card className="card-hover flex h-full flex-col p-5">
                <div className="mb-2.5 flex flex-wrap items-center gap-2">
                  <Pill color={m.kind === "full" ? "#5B3FD6" : m.kind === "chapter" ? "#0B8A64" : "#B26A00"}>
                    {m.badge}
                  </Pill>
                  <span className="flex items-center gap-1 text-xs font-semibold text-muted">
                    <Timer size={12} /> {m.minutes} min
                  </span>
                  <span className="text-xs text-faint">· {m.marks} marks · {m.questionIds.length} Q</span>
                </div>
                <p className="font-display text-[17px] font-bold leading-snug text-head">{m.title}</p>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">{m.subtitle}</p>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-[11px] font-medium text-faint">{m.source}</span>
                  <span className="inline-flex items-center gap-1 text-[13px] font-bold text-primary">
                    Shuru karo <ArrowRight size={13} />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* AI note */}
      <Card className="mt-8 border-primary/25 bg-primarySoft p-5">
        <div className="flex gap-3">
          <Sparkles size={18} className="mt-0.5 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">AI examiner kaise check karta hai</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-body">
              MCQ turant check ho jaate hain — bina internet ke. Likhe hue answers CBSE marking scheme ke hisaab se
              check hote hain: method sahi hai to <strong className="text-head">step marks milte hain</strong> chahe final
              answer galat ho. Aur jahan marks kate, wahin exact wajah batayi jaati hai — &ldquo;range likhna bhool gaye&rdquo;,
              &ldquo;+C nahi lagaya&rdquo;, &ldquo;second derivative test nahi kiya&rdquo;.
            </p>
          </div>
        </div>
      </Card>

      {/* history */}
      {p.attempts.length > 0 && (
        <>
          <div className="mb-4 mt-10 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-[20px] font-bold text-head">
              <History size={18} className="text-faint" /> Pichle attempts
            </h2>
            <button
              onClick={() => { if (confirm("Saari history mit jayegi. Pakka?")) clearAttempts(); }}
              className="text-xs font-semibold text-faint hover:text-rose"
            >
              clear
            </button>
          </div>
          <div className="space-y-2">
            {p.attempts.map((a) => {
              const pct = Math.round((a.scored / a.total) * 100);
              return (
                <Card key={a.id} className="flex items-center gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-head">{a.paperTitle}</p>
                    <p className="text-xs text-faint">{new Date(a.date).toLocaleString("en-IN")}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-display text-xl font-extrabold ${pct >= 60 ? "text-mint" : pct >= 33 ? "text-saffron" : "text-rose"}`}>
                      {a.scored}<span className="text-sm text-faint">/{a.total}</span>
                    </p>
                    <p className="text-[11px] text-faint">{pct}%</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
