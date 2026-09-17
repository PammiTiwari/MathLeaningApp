"use client";

import Link from "next/link";
import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { notFound } from "next/navigation";
import { getMock, anyQuestion } from "@/lib/data/mocks";
import type { Question } from "@/lib/data/questions";
import { getChapter } from "@/lib/data/chapters";
import { useProgress } from "@/lib/progress";
import { Rich } from "@/components/Tex";
import { Card, Pill, Bar } from "@/components/ui";
import {
  Timer, Camera, X, Send, AlertTriangle, CheckCircle2, Loader2,
  ArrowLeft, ArrowRight, Trophy, RotateCcw,
} from "lucide-react";

type Ans = {
  text: string;
  parts?: Record<number, string>;            // case-study sub-answers
  imageName?: string;
  image?: { mime: string; dataB64: string };
};
type Marked = { qid: string; awarded: number; max: number; feedback: string };

const SECTION_OF = (q: Question) =>
  q.type === "mcq" || q.type === "ar" ? "A" : q.type === "vsa" ? "B" : q.type === "sa" ? "C" : q.type === "la" ? "D" : "E";

export default function ExamRunner({ params }: { params: Promise<{ paperId: string }> }) {
  const { paperId } = use(params);
  const paper = getMock(paperId);
  const { addAttempt } = useProgress();

  const questions = useMemo(
    () => (paper?.questionIds.map(anyQuestion).filter(Boolean) as Question[]) ?? [],
    [paper]
  );

  const [phase, setPhase] = useState<"brief" | "live" | "marking" | "result">("brief");
  const [deadline, setDeadline] = useState<number | null>(null);
  const [left, setLeft] = useState((paper?.minutes ?? 0) * 60);
  const [i, setI] = useState(0);
  const [ans, setAns] = useState<Record<string, Ans>>({});
  const [restored, setRestored] = useState(false);
  const [results, setResults] = useState<Marked[] | null>(null);
  const [overall, setOverall] = useState("");
  const [err, setErr] = useState("");
  const submitted = useRef(false);
  const ansRef = useRef<Record<string, Ans>>({});
  ansRef.current = ans;

  const SAVE_KEY = `himmat-exam-${paperId}`;

  const submit = useCallback(async () => {
    if (submitted.current) return;
    submitted.current = true;
    setPhase("marking");
    setErr("");
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissions: questions.map((q) => {
            const a = ansRef.current[q.id];
            // a case study's sub-answers are stitched into one labelled answer
            const text = q.parts
              ? q.parts
                  .map((pt, pi) => `(${pi + 1}) ${a?.parts?.[pi]?.trim() || "(not attempted)"}`)
                  .join("\n")
              : (a?.text ?? "");
            return { qid: q.id, answer: text, image: a?.image };
          }),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Evaluation fail ho gaya");
      setResults(data.results);
      setOverall(data.overall ?? "");
      addAttempt({
        id: `${paperId}-${Date.now()}`,
        paperId,
        paperTitle: paper!.title,
        date: new Date().toISOString(),
        scored: data.scored,
        total: data.total,
        perQuestion: data.results,
        overall: data.overall,
      });
      setPhase("result");
    } catch (e: any) {
      setErr(e?.message ?? "Kuch gadbad ho gayi");
      setPhase("live");
      submitted.current = false;
    }
    try { localStorage.removeItem(SAVE_KEY); } catch {}
  }, [questions, paperId, paper, addAttempt, SAVE_KEY]);

  // keep submit reachable from the timer without re-subscribing it
  const submitRef = useRef(submit);
  submitRef.current = submit;

  // ---- countdown: derived from a fixed deadline, so typing can't disturb it ----
  useEffect(() => {
    if (phase !== "live" || !deadline) return;
    const tick = () => {
      const secs = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setLeft(secs);
      if (secs === 0) submitRef.current();
    };
    tick();
    const t = setInterval(tick, 500);
    return () => clearInterval(t);
  }, [phase, deadline]);

  // ---- restore an interrupted attempt ----
  useEffect(() => {
    if (restored) return;
    setRestored(true);
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved?.deadline || saved.deadline <= Date.now()) { localStorage.removeItem(SAVE_KEY); return; }
      const mins = Math.ceil((saved.deadline - Date.now()) / 60000);
      if (confirm(`Is paper ka adhoora attempt mila hai — ${mins} minute bache the. Wahin se continue karein?`)) {
        setAns(saved.ans ?? {});
        setI(saved.i ?? 0);
        setDeadline(saved.deadline);
        setPhase("live");
      } else {
        localStorage.removeItem(SAVE_KEY);
      }
    } catch {}
  }, [restored, SAVE_KEY]);

  // ---- autosave while live ----
  useEffect(() => {
    if (phase !== "live" || !deadline) return;
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ deadline, ans, i })); } catch {}
  }, [phase, deadline, ans, i, SAVE_KEY]);

  // ---- warn before leaving mid-paper ----
  useEffect(() => {
    if (phase !== "live") return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [phase]);

  if (!paper) notFound();

  const q = questions[i];
  const attempted = (qid: string) => {
    const a = ans[qid];
    if (!a) return false;
    if (a.image) return true;
    if ((a.text ?? "").trim()) return true;
    return Object.values(a.parts ?? {}).some((t) => (t ?? "").trim());
  };
  const answeredCount = questions.filter((x) => attempted(x.id)).length;

  // ---------- BRIEF ----------
  if (phase === "brief") {
    return (
      <div className="mx-auto mt-6 max-w-2xl">
        <Link href="/exam" className="text-xs font-semibold text-faint hover:text-head">← saare papers</Link>
        <Card className="mt-4 p-7 text-center">
          <Pill color="#FFB020">{paper.badge}</Pill>
          <h1 className="mt-3 font-display text-[28px] font-extrabold leading-tight text-head">{paper.title}</h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">{paper.subtitle}</p>

          <div className="mx-auto mt-6 grid max-w-sm grid-cols-3 gap-3">
            <Box label="Questions" value={`${questions.length}`} />
            <Box label="Marks" value={`${paper.marks}`} />
            <Box label="Minutes" value={`${paper.minutes}`} />
          </div>

          <div className="mt-6 space-y-2 rounded-2xl border border-line bg-sunk p-4 text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-faint">Shuru karne se pehle</p>
            {[
              "Timer chalu ho jayega aur zero par paper apne aap submit ho jayega.",
              "MCQ mein option chuno. Baaki sawaalon mein poora solution likho — steps ke marks milte hain.",
              "Copy par likhna zyada aasaan lage to photo kheench ke upload kar do, AI use padh lega.",
              "Asli exam jaisa karo — calculator nahi, book nahi. Tabhi asli score pata chalega.",
            ].map((t, n) => (
              <p key={n} className="flex gap-2 text-[13px] leading-snug text-muted">
                <span className="text-primary">{n + 1}.</span> {t}
              </p>
            ))}
          </div>

          <button
            onClick={() => { setDeadline(Date.now() + paper.minutes * 60000); setPhase("live"); }}
            className="glow mt-6 w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition hover:bg-primaryDim"
          >
            Timer start karo — himmat rakh 💪
          </button>
        </Card>
      </div>
    );
  }

  // ---------- MARKING ----------
  if (phase === "marking") {
    return (
      <div className="mx-auto mt-24 max-w-md text-center">
        <Loader2 size={40} className="mx-auto animate-spin text-primary" />
        <p className="font-display text-[20px] font-bold tracking-[-0.01em] text-head">AI examiner tumhari copy check kar raha hai…</p>
        <p className="mt-2 text-sm text-faint">
          Har step ko marking scheme se mila raha hai. Thoda ruko — accha check karne mein time lagta hai.
        </p>
      </div>
    );
  }

  // ---------- RESULT ----------
  if (phase === "result" && results) {
    const scored = results.reduce((n, r) => n + r.awarded, 0);
    const total = results.reduce((n, r) => n + r.max, 0);
    const pct = Math.round((scored / total) * 100);
    const grade = pct >= 80 ? "Zabardast!" : pct >= 60 ? "Accha hai, aur ho sakta hai" : pct >= 33 ? "Pass, par mehnat chahiye" : "Abhi bahut kaam baaki hai";

    return (
      <div className="mx-auto mt-6 max-w-3xl">
        <Card className="p-7 text-center">
          <Trophy size={40} className="mx-auto text-saffron" />
          <p className="mt-4 font-display text-[52px] font-extrabold leading-none text-head">
            {scored}<span className="text-2xl text-faint">/{total}</span>
          </p>
          <p className={`mt-1 font-display text-lg font-bold ${pct >= 60 ? "text-mint" : pct >= 33 ? "text-saffron" : "text-rose"}`}>
            {pct}% · {grade}
          </p>
          <div className="mx-auto mt-4 max-w-sm"><Bar value={scored} max={total} color={pct >= 60 ? "#22D3A5" : pct >= 33 ? "#FFB020" : "#FF5470"} /></div>

          {overall && (
            <div className="mt-6 rounded-2xl border border-primary/30 bg-primarySoft p-4 text-left">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-primary">Examiner ki salah</p>
              <p className="text-[14px] leading-relaxed text-body">{overall}</p>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Link href="/exam" className="flex-1 rounded-xl border border-line py-3 text-sm font-bold text-body hover:bg-sunk">
              Aur papers
            </Link>
            <Link href="/chapters" className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primaryDim">
              Weak chapters padho
            </Link>
          </div>
        </Card>

        <h2 className="font-display text-[20px] font-bold tracking-[-0.01em] text-head">Sawaal-dar-sawaal check</h2>
        <div className="space-y-3">
          {questions.map((qq, n) => {
            const r = results.find((x) => x.qid === qq.id);
            if (!r) return null;
            const full = r.awarded >= r.max;
            const zero = r.awarded === 0;
            const my = ans[qq.id];
            return (
              <Card key={qq.id} className={`p-5 ${full ? "border-mint/35" : zero ? "border-rose/30" : "border-saffron/30"}`}>
                <div className="mb-2.5 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-faint">
                    Q{n + 1} · Section {SECTION_OF(qq)} · {getChapter(qq.ch)?.title}
                  </span>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${full ? "bg-mintSoft text-mint" : zero ? "bg-roseSoft text-rose" : "bg-saffronSoft text-saffron"}`}>
                    {r.awarded}/{r.max}
                  </span>
                </div>
                <Rich text={qq.q} className="text-[14px] leading-relaxed text-body" />

                {qq.options && (
                  <div className="mt-3 space-y-1">
                    {qq.options.map((o, oi) => {
                      const mine = parseInt(my?.text ?? "-1", 10) === oi;
                      const isRight = oi === qq.correct;
                      return (
                        <div
                          key={oi}
                          className={`flex items-start gap-2 rounded-lg px-3 py-1.5 text-[13px] ${
                            isRight ? "bg-mintSoft text-mint" : mine ? "bg-roseSoft text-rose" : "text-faint"
                          }`}
                        >
                          <span className="font-bold">{String.fromCharCode(97 + oi)})</span>
                          <Rich text={o} className="flex-1" />
                          {isRight && <CheckCircle2 size={13} className="mt-0.5 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                )}

                {qq.parts && my?.parts && (
                  <div className="mt-3 space-y-2">
                    {qq.parts.map((pt, pi) => (
                      <div key={pi} className="rounded-xl border border-line bg-sunk p-3">
                        <p className="mb-1 text-[11px] font-semibold text-muted">({pi + 1}) {pt.marks}m</p>
                        <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-body">
                          {my.parts?.[pi]?.trim() || "— nahi kiya —"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {!qq.options && !qq.parts && my?.text?.trim() && (
                  <div className="mt-3 rounded-xl border border-line bg-sunk p-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-faint">Tumhara answer</p>
                    <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-body">{my.text}</p>
                  </div>
                )}
                {!qq.options && my?.imageName && (
                  <p className="mt-2 text-[12px] text-faint">📎 {my.imageName} (photo se check kiya gaya)</p>
                )}

                <div className="mt-3 rounded-xl border border-line bg-sunk p-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">Examiner ka comment</p>
                  <p className="text-[13.5px] leading-relaxed text-body">{r.feedback}</p>
                </div>

                {!full && (
                  <details className="mt-2.5 group">
                    <summary className="cursor-pointer text-xs font-semibold text-saffron">Model answer dekho</summary>
                    <div className="mt-2 rounded-xl border border-saffron/30 bg-saffronSoft p-3">
                      <Rich text={qq.answer} className="text-[13.5px] leading-relaxed text-body" />
                      {qq.keySteps && (
                        <ul className="mt-2 space-y-1">
                          {qq.keySteps.map((k, ki) => (
                            <li key={ki} className="flex gap-2 text-[12.5px] text-muted">
                              <span className="text-saffron">•</span>
                              <Rich text={k} className="flex-1" />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </details>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------- LIVE ----------
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const lowTime = left < 300;

  return (
    <div className="mx-auto max-w-5xl">
      {/* timer bar */}
      <div className="sticky top-14 z-30 -mx-4 mb-5 border-b border-line/60 bg-sunk px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-display text-lg font-extrabold tabular-nums ${lowTime ? "bg-roseSoft text-rose" : "bg-sunk text-head"}`}>
            <Timer size={16} /> {mm}:{ss}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex justify-between text-[11px] text-faint">
              <span>{answeredCount}/{questions.length} attempt kiye</span>
              <span>{paper.marks} marks</span>
            </div>
            <div className="mt-1"><Bar value={answeredCount} max={questions.length} color="#22D3A5" /></div>
          </div>
          <button
            onClick={() => { if (confirm("Paper submit kar dein? Iske baad badal nahi sakte.")) submit(); }}
            className="shrink-0 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primaryDim"
          >
            Submit
          </button>
        </div>
      </div>

      {err && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-rose/30 bg-roseSoft p-3 text-[13px] text-rose">
          <AlertTriangle size={15} className="mt-0.5 shrink-0" /> <span>{err}</span>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1fr_190px]">
        {/* question */}
        <div>
          <Card className="p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <Pill>Q{i + 1}</Pill>
              <Pill color="#FFB020">Section {SECTION_OF(q)}</Pill>
              <span className="text-xs text-faint">{q.marks} {q.marks === 1 ? "mark" : "marks"}</span>
            </div>

            <Rich text={q.q} className="text-[16px] leading-relaxed text-head" />

            {/* MCQ */}
            {q.options ? (
              <div className="mt-5 space-y-2.5">
                {q.options.map((o, n) => {
                  const picked = ans[q.id]?.text === String(n);
                  return (
                    <button
                      key={n}
                      onClick={() => setAns((a) => ({ ...a, [q.id]: { text: String(n) } }))}
                      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
                        picked ? "border-primary bg-primarySoft" : "border-line bg-sunk hover:border-line2"
                      }`}
                    >
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold ${picked ? "bg-primary text-white" : "border border-line2 text-muted"}`}>
                        {String.fromCharCode(97 + n)}
                      </span>
                      <Rich text={o} className="flex-1 text-[14px] leading-snug text-body" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <SubjectiveAnswer q={q} value={ans[q.id]} onChange={(v) => setAns((a) => ({ ...a, [q.id]: v }))} />
            )}

            {/* case sub-parts */}
            {q.parts && (
              <div className="mt-4 space-y-2 rounded-xl border border-line bg-sunk p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-faint">Is case study ke parts</p>
                {q.parts.map((pt, pi) => (
                  <div key={pi} className="flex gap-2">
                    <span className="text-xs font-bold text-primary">({pi + 1})</span>
                    <Rich text={pt.q} className="flex-1 text-[13.5px] leading-snug text-body" />
                    <span className="shrink-0 text-xs text-faint">{pt.marks}m</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => { setI(Math.max(0, i - 1)); window.scrollTo({ top: 0 }); }}
              disabled={i === 0}
              className="rounded-xl border border-line px-4 py-3 text-muted disabled:opacity-25"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => { setI(Math.min(questions.length - 1, i + 1)); window.scrollTo({ top: 0 }); }}
              disabled={i === questions.length - 1}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sunk py-3 text-sm font-bold text-head transition hover:bg-line/60 disabled:opacity-25"
            >
              Agla sawaal <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* navigator */}
        <div>
          <Card className="sticky top-[124px] p-4">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-faint">Question map</p>
            <div className="grid grid-cols-5 gap-1.5">
              {questions.map((qq, n) => {
                const done = attempted(qq.id);
                const cur = n === i;
                return (
                  <button
                    key={qq.id}
                    onClick={() => { setI(n); window.scrollTo({ top: 0 }); }}
                    className={`grid h-8 place-items-center rounded-lg text-[11px] font-bold transition ${
                      cur ? "bg-primary text-white" : done ? "bg-mintSoft text-mint" : "bg-sunk text-faint hover:bg-line/60"
                    }`}
                  >
                    {n + 1}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 space-y-1.5 text-[11px] text-faint">
              <p className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded bg-mint/40" /> attempt kiya</p>
              <p className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded bg-primary" /> abhi khula hai</p>
              <p className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded bg-line/60" /> baaki hai</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CaseAnswer({
  q, value, onChange,
}: { q: Question; value?: Ans; onChange: (v: Ans) => void }) {
  const parts = q.parts ?? [];
  const set = (pi: number, text: string) =>
    onChange({ ...(value ?? { text: "" }), parts: { ...(value?.parts ?? {}), [pi]: text } });

  return (
    <div className="mt-5 space-y-4">
      <p className="text-[11px] font-bold uppercase tracking-wider text-faint">
        Har part ka answer alag likho
      </p>
      {parts.map((pt, pi) => (
        <div key={pi} className="rounded-xl border border-line bg-sunk p-4">
          <div className="mb-2.5 flex items-start gap-2">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">
              {pi + 1}
            </span>
            <Rich text={pt.q} className="flex-1 text-[14px] leading-snug text-head" />
            <span className="shrink-0 rounded bg-white px-1.5 py-0.5 text-[11px] font-semibold text-muted">
              {pt.marks}m
            </span>
          </div>
          <textarea
            value={value?.parts?.[pi] ?? ""}
            onChange={(e) => set(pi, e.target.value)}
            rows={pt.marks >= 2 ? 5 : 3}
            placeholder={`Part ${pi + 1} ka answer…`}
            className="w-full resize-y rounded-lg border border-line bg-card p-3 font-mono text-[13px] leading-relaxed text-head placeholder:text-faint focus:border-primary focus:outline-none"
          />
        </div>
      ))}
    </div>
  );
}

function SubjectiveAnswer({
  q, value, onChange,
}: { q: Question; value?: Ans; onChange: (v: Ans) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  async function pickFile(f: File) {
    if (f.size > 4 * 1024 * 1024) { alert("Photo 4MB se choti honi chahiye."); return; }
    const b64 = await new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result).split(",")[1]);
      r.onerror = rej;
      r.readAsDataURL(f);
    });
    onChange({ ...(value ?? { text: "" }), imageName: f.name, image: { mime: f.type, dataB64: b64 } });
  }

  return (
    <div className="mt-5">
      <textarea
        value={value?.text ?? ""}
        onChange={(e) => onChange({ ...(value ?? {}), text: e.target.value })}
        rows={q.marks >= 5 ? 12 : q.marks >= 3 ? 8 : 5}
        placeholder={`Apna poora solution yahan likho — har step alag line mein. ${q.marks} marks ka sawaal hai, isliye ${q.marks >= 5 ? "5-6" : q.marks >= 3 ? "3-4" : "2"} steps likhna.`}
        className="w-full resize-y rounded-xl border border-line bg-sunk p-4 font-mono text-[13.5px] leading-relaxed text-head placeholder:text-faint focus:border-primary focus:outline-none"
      />

      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && pickFile(e.target.files[0])}
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 rounded-lg border border-line bg-sunk px-3 py-2 text-xs font-semibold text-body transition hover:bg-line/60"
        >
          <Camera size={13} /> Copy ki photo lagao
        </button>
        {value?.imageName && (
          <span className="flex items-center gap-1.5 rounded-lg bg-mintSoft px-2.5 py-1.5 text-[11px] font-semibold text-mint">
            {value.imageName}
            <button onClick={() => onChange({ text: value.text ?? "" })} className="hover:text-head"><X size={11} /></button>
          </span>
        )}
        <span className="text-[11px] text-faint">Type karo ya photo — dono chalega</span>
      </div>
    </div>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-sunk p-3">
      <p className="font-display text-xl font-extrabold text-head">{value}</p>
      <p className="text-[11px] text-faint">{label}</p>
    </div>
  );
}
