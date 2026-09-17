"use client";

import Link from "next/link";
import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import { getChapter, CHAPTERS } from "@/lib/data/chapters";
import { notesFor } from "@/lib/data/notes";
import type { NoteBlock } from "@/lib/data/note-types";
import { useProgress } from "@/lib/progress";
import { Formula, Rich } from "@/components/Tex";
import { ArrowLeft, Printer, ArrowRight } from "lucide-react";

export default function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const ch = getChapter(slug);
  const note = notesFor(slug);
  const { markNote } = useProgress();

  useEffect(() => { markNote(slug); /* eslint-disable-next-line */ }, [slug]);

  if (!ch || !note) notFound();
  const next = CHAPTERS.find((c) => c.n === ch.n + 1);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="no-print mt-4 flex items-center justify-between">
        <Link href="/notes" className="text-xs font-semibold text-white/40 hover:text-white">
          <ArrowLeft size={13} className="mr-1 inline" /> saare notes
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/35">{note.pages.length} page{note.pages.length > 1 ? "s" : ""}</span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-white/60 hover:bg-white/5"
          >
            <Printer size={13} /> Print
          </button>
        </div>
      </div>

      {note.pages.map((page, pi) => (
        <div key={pi} className="paper mt-5 break-after-page rounded-lg px-5 py-7 sm:px-9 sm:py-9">
          <div className="paper-margin pl-4 sm:pl-7">
            {pi === 0 ? (
              <header className="mb-6">
                <p className="font-hand text-[16px] leading-tight text-[#7A8C9E]">
                  Class 12 · Chapter {ch.n} · {ch.unit} ({ch.unitMarks} marks)
                </p>
                <h1 className="font-hand text-[36px] font-bold leading-[1.1] text-[#12314F]">
                  {note.title}
                </h1>
                <div className="mt-1 h-[3px] w-40 rounded-full bg-[#F2A7A7]" />
              </header>
            ) : (
              <header className="mb-5">
                <p className="font-hand text-[21px] text-[#7A8C9E]">
                  …{note.title} <span className="text-[#B8C7D4]">· page {pi + 1}</span>
                </p>
              </header>
            )}

            <div className="space-y-3">
              {page.map((b, i) => <Block key={i} b={b} />)}
            </div>

            <p className="mt-9 text-right font-hand text-[17px] text-[#8FA0AF]">
              — himmat rakh ✍️
            </p>
          </div>
        </div>
      ))}

      <div className="no-print mt-6 flex flex-wrap gap-3 pb-6">
        <Link href={`/learn/${slug}`} className="flex-1 rounded-xl border border-line py-3 text-center text-sm font-bold text-white/70 hover:bg-white/5">
          Poora lesson padho
        </Link>
        <Link href={`/formulas#${slug}`} className="flex-1 rounded-xl border border-line py-3 text-center text-sm font-bold text-white/70 hover:bg-white/5">
          Formula sheet
        </Link>
        {next && (
          <Link href={`/notes/${next.slug}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white"
            style={{ background: ch.color }}>
            Ch {next.n} notes <ArrowRight size={15} />
          </Link>
        )}
      </div>
    </div>
  );
}

/* ---------- handwritten block renderer ---------- */

function Block({ b }: { b: NoteBlock }) {
  switch (b.t) {
    case "h":
      return (
        <h2 className="mt-6 font-hand text-[26px] font-bold leading-tight text-[#0F4C81] first:mt-0">
          {b.text}
        </h2>
      );

    case "p":
      return <p className="font-hand text-[19px] leading-[1.45] text-[#1A2733]">{b.text}</p>;

    case "def":
      return (
        <p className="font-hand text-[19px] leading-[1.45] text-[#1A2733]">
          <span className="font-bold text-[#0F4C81] underline decoration-[#9FC0D8] decoration-2 underline-offset-2">
            {b.term}
          </span>{" "}
          — {b.text}
        </p>
      );

    case "f":
      return (
        <div className="my-2 rounded border-2 border-dashed border-[#9FC0D8] bg-white/70 px-4 py-2.5">
          {b.label && <p className="mb-1 font-hand text-[15px] leading-none text-[#5B7C95]">{b.label}</p>}
          <Formula tex={b.tex} />
        </div>
      );

    case "fl":
      return (
        <div className="my-2 space-y-1.5 rounded border-2 border-dashed border-[#9FC0D8] bg-white/70 px-4 py-3">
          {b.items.map((it, i) => (
            <div key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <div className="min-w-0"><Formula tex={it.tex} /></div>
              {it.label && (
                <span className="font-hand text-[15px] leading-none text-[#5B7C95]">← {it.label}</span>
              )}
            </div>
          ))}
        </div>
      );

    case "steps":
      return (
        <div className="my-3 rounded-md border-l-[5px] border-[#0F4C81] bg-[#EAF2F8]/70 px-4 py-3">
          <p className="mb-2 font-hand text-[20px] font-bold leading-tight text-[#0F4C81]">{b.title}</p>
          <ol className="space-y-1.5">
            {b.items.map((s, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-[3px] grid h-[19px] w-[19px] shrink-0 place-items-center rounded-full bg-[#0F4C81] font-sans text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <Rich text={s} className="font-hand text-[18px] leading-[1.35] text-[#1A2733] [&_strong]:!text-[#0F4C81]" />
              </li>
            ))}
          </ol>
        </div>
      );

    case "ex":
      return (
        <div className="my-3 rounded-md border-l-[5px] border-[#B45309] bg-[#FEF6E7]/80 px-4 py-3">
          <p className="mb-1.5 font-hand text-[19px] font-bold leading-tight text-[#B45309]">
            Example: {b.q}
          </p>
          <div className="space-y-1">
            {b.sol.map((s, i) => (
              <p key={i} className="flex gap-2 font-hand text-[18px] leading-[1.35] text-[#3A2A10]">
                <span className="text-[#B45309]">→</span>
                <span className="flex-1">{s}</span>
              </p>
            ))}
          </div>
        </div>
      );

    case "table":
      return (
        <div className="my-3 overflow-x-auto">
          <table className="w-full border-collapse font-hand text-[18px]">
            <thead>
              <tr>
                {b.head.map((h, i) => (
                  <th key={i} className="border-b-2 border-[#0F4C81] px-3 py-1.5 text-left font-bold text-[#0F4C81]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-b border-[#C9DCEB]">
                  {r.map((c, j) => (
                    <td key={j} className={`px-3 py-1.5 align-top leading-snug ${j === 0 ? "font-semibold text-[#14314E]" : "text-[#1A2733]"}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "star":
      return (
        <p className="my-1 flex gap-2 font-hand text-[19px] font-semibold leading-[1.4] text-[#B45309]">
          <span className="shrink-0">★</span>
          <span className="flex-1">{b.text}</span>
        </p>
      );

    case "warn":
      return (
        <p className="my-1 flex gap-2 rounded bg-[#FDECEA]/70 px-3 py-1.5 font-hand text-[19px] font-semibold leading-[1.4] text-[#C0392B]">
          <span className="shrink-0">⚠</span>
          <span className="flex-1">{b.text}</span>
        </p>
      );
  }
}
