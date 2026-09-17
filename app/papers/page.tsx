"use client";

import Link from "next/link";
import { OFFICIAL_PAPERS, SYLLABUS_PDF, CBSE_PYQ_PAGE, CBSE_SQP_ARCHIVE, MOCK_PAPERS } from "@/lib/data/papers";
import { PageHead, Card, Pill } from "@/components/ui";
import { FileText, Download, ExternalLink, Timer, BookMarked, Languages } from "lucide-react";

export default function PapersPage() {
  return (
    <div>
      <PageHead
        eyebrow="Question papers"
        title="Previous year & sample papers"
        sub="Saare links CBSE ki official website se hain — koi third-party copy nahi. Question paper ke saath marking scheme bhi hai, taaki pata chale ki examiner marks kaise deta hai."
      />

      <h2 className="mb-3 font-display text-xl font-bold text-white">CBSE ke official papers</h2>
      <div className="space-y-3">
        {OFFICIAL_PAPERS.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex flex-wrap items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sky/15 text-sky">
                <FileText size={19} />
              </span>
              <div className="min-w-[220px] flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill color="#38BDF8">{p.year}</Pill>
                  {p.id === "sqp-2025-26" && <Pill color="#FFB020">SABSE ZAROORI</Pill>}
                </div>
                <p className="mt-1.5 font-display text-[16px] font-bold text-white">{p.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/50">{p.note}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.sqp && (
                  <a href={p.sqp} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-white hover:bg-primaryDim">
                    <Download size={12} /> Question Paper
                  </a>
                )}
                {p.ms && (
                  <a href={p.ms} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-xs font-bold text-white/70 hover:bg-white/5">
                    <BookMarked size={12} /> Marking Scheme
                  </a>
                )}
                {p.sqpHi && (
                  <a href={p.sqpHi} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-xs font-bold text-white/50 hover:bg-white/5">
                    <Languages size={12} /> हिंदी
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <ExtLink href={CBSE_PYQ_PAGE} label="CBSE previous year papers" sub="cbse.gov.in ka official archive" />
        <ExtLink href={CBSE_SQP_ARCHIVE} label="Purane sample papers" sub="Aur bhi saal, aur bhi practice" />
        <ExtLink href={SYLLABUS_PDF} label="Official syllabus PDF" sub="2025–26 Mathematics (041)" />
      </div>

      <h2 className="mb-1 mt-9 font-display text-xl font-bold text-white">App ke andar likh ke do</h2>
      <p className="mb-3 text-[13px] text-white/50">
        PDF download karne ki zaroorat nahi — yeh papers app mein hi attempt karo, timer ke saath. Submit karte hi AI check kar dega.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {MOCK_PAPERS.map((m) => (
          <Link key={m.id} href={`/exam/${m.id}`}>
            <Card className="card-hover flex h-full items-start gap-3 p-4">
              <Timer size={17} className="mt-0.5 shrink-0 text-saffron" />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-bold text-white">{m.title}</p>
                <p className="text-[12px] text-white/45">{m.minutes} min · {m.marks} marks</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-9 p-5">
        <h2 className="font-display text-lg font-bold text-white">Papers ko sahi tareeke se kaise use karein</h2>
        <ol className="mt-3 space-y-2.5">
          {[
            "Pehle 2025–26 ka sample paper solve karo — poore 3 ghante, ek baithak mein, ghadi laga ke.",
            "Khud se check mat karo. Pehle marking scheme padho, phir apni copy check karo — dekho examiner kis step ka mark deta hai.",
            "Jo sawaal galat hue, unke chapter ka lesson dobara padho. Sirf answer dekhna kaafi nahi.",
            "Phir 2024-25 aur 2023-24 solve karo. Teen paper ke baad pattern aankhon mein bas jaayega.",
            "Aakhri hafte mein sirf notes aur formula sheet — naya kuch mat padho.",
          ].map((t, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/20 text-[11px] font-bold text-primary">{i + 1}</span>
              <span className="text-[13.5px] leading-relaxed text-white/70">{t}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

function ExtLink({ href, label, sub }: { href: string; label: string; sub: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <Card className="card-hover flex h-full items-center gap-3 p-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-white">{label}</p>
          <p className="text-[11px] text-white/40">{sub}</p>
        </div>
        <ExternalLink size={13} className="shrink-0 text-white/25" />
      </Card>
    </a>
  );
}
