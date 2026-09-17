"use client";

import Link from "next/link";
import { OFFICIAL_PAPERS, BOARD_PAPERS, COMPARTMENT_PAPERS, SYLLABUS_PDF, CBSE_PYQ_PAGE, CBSE_SQP_ARCHIVE, ALL_PAPERS_PAGE } from "@/lib/data/papers";
import { PageHead, Card, Pill } from "@/components/ui";
import { FileText, Download, ExternalLink, BookMarked, FolderArchive, Trophy } from "lucide-react";

export default function PapersPage() {
  return (
    <div>
      <PageHead
        eyebrow="Question papers"
        title="Previous year & sample papers"
        sub="Saare links CBSE ki official website se hain - koi third-party copy nahi. Question paper ke saath marking scheme bhi hai, taaki pata chale ki examiner marks kaise deta hai."
      />

      {/* ---------- ASLI BOARD PAPERS ---------- */}
      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        <Trophy size={18} className="text-saffron" />
        <h2 className="font-display text-[20px] font-bold tracking-[-0.01em] text-head">Asli board papers</h2>
        <Pill color="#FFB020">PYQ · Real exam</Pill>
      </div>
      <p className="mb-4 text-[13.5px] leading-relaxed text-muted">
        Yeh sample papers nahi hain - yeh <strong className="text-head">wahi papers hain jo asli board exam mein aaye the</strong>.
        Har ZIP mein us saal ke saare sets hain (65-1-1, 65-2-1, 65-4-1 …), matlab ek download mein 15-20 poore papers.
        Seedha CBSE ki apni website se.
      </p>

      <div className="space-y-3">
        {BOARD_PAPERS.map((b, i) => (
          <Card key={b.id} className={`p-5 ${i === 0 ? "border-saffron/30" : ""}`}>
            <div className="flex flex-wrap items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-saffronSoft text-saffron">
                <FolderArchive size={20} />
              </span>
              <div className="min-w-[220px] flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-[22px] font-extrabold leading-none text-head">{b.year}</span>
                  {i === 0 && <Pill color="#FFB020">LATEST</Pill>}
                  <span className="text-[11px] text-faint">{b.sizeMB} MB · {b.sets}</span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{b.note}</p>
              </div>
              <a href={b.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-saffron px-4 py-2.5 text-xs font-bold text-white hover:brightness-110">
                <Download size={13} /> Download ZIP
              </a>
            </div>
          </Card>
        ))}
      </div>

      <details className="group mt-3">
        <summary className="cursor-pointer rounded-xl border border-line bg-card px-4 py-3 text-[13px] font-semibold text-muted hover:text-head">
          Compartment exam ke papers bhi chahiye? (aur {COMPARTMENT_PAPERS.length} papers)
        </summary>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {COMPARTMENT_PAPERS.map((c) => (
            <a key={c.id} href={c.url} target="_blank" rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-line bg-card p-3.5 transition hover:border-saffron/40">
              <FolderArchive size={15} className="shrink-0 text-saffron/70" />
              <span className="flex-1 text-[13px] text-body">{c.year} Compartment</span>
              <span className="text-[11px] text-faint">{c.sizeMB} MB</span>
              <Download size={13} className="shrink-0 text-faint" />
            </a>
          ))}
        </div>
      </details>

      {/* ---------- SAMPLE PAPERS ---------- */}
      <h2 className="font-display text-[20px] font-bold tracking-[-0.01em] text-head">Sample papers + marking scheme</h2>
      <p className="mb-3 text-[13.5px] leading-relaxed text-muted">
        Board papers ke saath marking scheme nahi aati. Par sample paper ki marking scheme milti hai - aur
        examiner dono ko <strong className="text-head">bilkul ek hi tareeke se</strong> check karta hai. Isliye yeh zaroor padho:
        isse pata chalta hai kis step ke kitne marks hain.
      </p>
      <div className="space-y-3">
        {OFFICIAL_PAPERS.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex flex-wrap items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-skySoft text-sky">
                <FileText size={19} />
              </span>
              <div className="min-w-[220px] flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill color="#38BDF8">{p.year}</Pill>
                  {p.id === "sqp-2025-26" && <Pill color="#FFB020">SABSE ZAROORI</Pill>}
                </div>
                <p className="mt-1.5 font-display text-[16px] font-bold text-head">{p.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{p.note}</p>
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
                    className="flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-xs font-bold text-body hover:bg-sunk">
                    <BookMarked size={12} /> Marking Scheme
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <ExtLink href={ALL_PAPERS_PAGE} label="Saare subjects ke board papers" sub="cbse.gov.in ka official archive" />
        <ExtLink href={CBSE_SQP_ARCHIVE} label="Purane sample papers" sub="Aur bhi saal, aur bhi practice" />
        <ExtLink href={SYLLABUS_PDF} label="Official syllabus PDF" sub="2025-26 Mathematics (041)" />
      </div>


      <Card className="mt-9 p-5">
        <h2 className="font-display text-lg font-bold text-head">Papers ko sahi tareeke se kaise use karein</h2>
        <ol className="mt-3 space-y-2.5">
          {[
            "Pehle 2025-26 ka sample paper solve karo - poore 3 ghante, ek baithak mein, ghadi laga ke. Isse pattern samajh aata hai.",
            "Khud se check mat karo. Pehle marking scheme padho, phir apni copy check karo - dekho examiner kis step ka mark deta hai.",
            "Jo sawaal galat hue, unke chapter ka lesson dobara padho. Sirf answer dekhna kaafi nahi.",
            "Ab ASLI board papers pakdo - 2026 aur 2025 wale. ZIP mein 15-20 sets hain, roz ek set solve karo. Yahi asli difficulty hai.",
            "Aakhri hafte mein sirf notes aur formula sheet - naya kuch mat padho.",
          ].map((t, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/20 text-[11px] font-bold text-primary">{i + 1}</span>
              <span className="text-[13.5px] leading-relaxed text-body">{t}</span>
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
          <p className="truncate text-[13px] font-semibold text-head">{label}</p>
          <p className="text-[11px] text-faint">{sub}</p>
        </div>
        <ExternalLink size={13} className="shrink-0 text-faint" />
      </Card>
    </a>
  );
}
