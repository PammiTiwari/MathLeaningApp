"use client";

import Link from "next/link";
import { MOCK_PAPERS, PAPER_PATTERN } from "@/lib/data/papers";
import { useProgress } from "@/lib/progress";
import { PageHead, Card, Pill } from "@/components/ui";
import { Timer, ArrowRight, History, Sparkles } from "lucide-react";

export default function ExamHome() {
  const { p } = useProgress();

  return (
    <div>
      <PageHead
        eyebrow="Timed mock exams"
        title="Asli exam jaisa mahaul"
        sub="Timer chalega, paper CBSE ke exact pattern par hoga, aur tum apne answers likhoge — type karke ya copy ki photo kheench ke. Submit karte hi AI examiner tumhari copy check karega, step marks ke saath."
      />

      {/* pattern */}
      <Card className="mb-7 p-5">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="font-display text-lg font-bold text-head">CBSE paper ka pattern</h2>
          <Pill>38 Q · 80 marks · 3 hrs</Pill>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-wider text-faint">
                <th className="py-2 pr-4 font-semibold">Section</th>
                <th className="py-2 pr-4 font-semibold">Questions</th>
                <th className="py-2 pr-4 font-semibold">Type</th>
                <th className="py-2 pr-4 font-semibold">Each</th>
                <th className="py-2 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {PAPER_PATTERN.map((s) => (
                <tr key={s.section} className="border-b border-line/40 last:border-0">
                  <td className="py-2.5 pr-4 font-bold text-primary">{s.section}</td>
                  <td className="py-2.5 pr-4 text-body">{s.qs}</td>
                  <td className="py-2.5 pr-4 text-body">{s.desc}</td>
                  <td className="py-2.5 pr-4 text-muted">{s.each}m</td>
                  <td className="py-2.5 font-semibold text-head">{s.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-faint">
          Har section mein lagbhag 33% internal choice milti hai. Overall koi choice nahi hoti.
        </p>
      </Card>

      {/* papers */}
      <h2 className="font-display text-[20px] font-bold tracking-[-0.01em] text-head">Paper chuno</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {MOCK_PAPERS.map((m) => (
          <Link key={m.id} href={`/exam/${m.id}`}>
            <Card className="card-hover flex h-full flex-col p-5">
              <div className="mb-2.5 flex items-center gap-2">
                <Pill color={m.badge === "HARD" ? "#FF5470" : m.badge === "QUICK" ? "#22D3A5" : "#FFB020"}>
                  {m.badge}
                </Pill>
                <span className="flex items-center gap-1 text-xs text-faint">
                  <Timer size={12} /> {m.minutes} min · {m.marks} marks
                </span>
              </div>
              <p className="font-display text-[18px] font-bold leading-snug text-head">{m.title}</p>
              <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">{m.subtitle}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                Shuru karo <ArrowRight size={14} />
              </span>
            </Card>
          </Link>
        ))}
      </div>

      {/* AI note */}
      <Card className="mt-7 border-primary/25 bg-primarySoft p-5">
        <div className="flex gap-3">
          <Sparkles size={18} className="mt-0.5 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">AI examiner kaise check karta hai</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-body">
              MCQ turant check ho jaate hain — bina internet ke. Likhe hue answers CBSE marking scheme ke hisaab se
              check hote hain: method sahi hai to <strong className="text-head">step marks milte hain</strong> chahe final
              answer galat ho. Aur jahan marks kate, wahaan exact wajah batayi jaati hai — &ldquo;range likhna bhool gaye&rdquo;,
              &ldquo;+C nahi lagaya&rdquo;, &ldquo;second derivative test nahi kiya&rdquo;.
            </p>
          </div>
        </div>
      </Card>

      {/* history */}
      {p.attempts.length > 0 && (
        <>
          <h2 className="mb-4 mt-10 flex items-center gap-2 font-display text-xl font-bold text-head">
            <History size={18} className="text-faint" /> Pichle attempts
          </h2>
          <div className="space-y-2">
            {p.attempts.slice(0, 6).map((a) => {
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
