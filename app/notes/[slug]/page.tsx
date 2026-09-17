"use client";

import Link from "next/link";
import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import { getChapter, CHAPTERS } from "@/lib/data/chapters";
import { notesFor } from "@/lib/data/notes";
import { useProgress } from "@/lib/progress";
import { Formula } from "@/components/Tex";
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
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-white/60 hover:bg-white/5"
        >
          <Printer size={13} /> Print
        </button>
      </div>

      {note.pages.map((page, pi) => (
        <div key={pi} className="paper mt-5 rounded-lg px-6 py-7 sm:px-10 sm:py-9">
          <div className="paper-margin pl-5 sm:pl-7">
            {pi === 0 && (
              <>
                <p className="font-hand text-[15px] text-[#7A8C9E]">Class 12 · Chapter {ch.n} · {ch.unit}</p>
                <h1 className="font-hand text-[34px] font-bold leading-tight text-[#12314F] underline decoration-[#F2A7A7] decoration-2 underline-offset-4">
                  {note.title}
                </h1>
              </>
            )}
            {pi > 0 && (
              <p className="font-hand text-[22px] text-[#12314F]">…{note.title} (page {pi + 1})</p>
            )}

            <div className="mt-5 space-y-3.5">
              {page.map((b, i) => {
                if (b.t === "h")
                  return (
                    <h2 key={i} className="mt-5 font-hand text-[25px] font-bold leading-tight text-[#0F4C81] first:mt-0">
                      {b.text}
                    </h2>
                  );
                if (b.t === "p")
                  return (
                    <p key={i} className="font-hand text-[19px] leading-snug text-[#1A2733]">
                      {b.text}
                    </p>
                  );
                if (b.t === "star")
                  return (
                    <p key={i} className="font-hand text-[19px] font-semibold leading-snug text-[#B45309]">
                      ★ {b.text}
                    </p>
                  );
                if (b.t === "warn")
                  return (
                    <p key={i} className="font-hand text-[19px] font-semibold leading-snug text-[#C0392B]">
                      ⚠ {b.text}
                    </p>
                  );
                return (
                  <div key={i} className="my-2 rounded border-2 border-dashed border-[#9FC0D8] bg-white/60 px-4 py-2.5">
                    {b.label && <p className="mb-0.5 font-hand text-[15px] text-[#5B7C95]">{b.label}</p>}
                    <Formula tex={b.tex} />
                  </div>
                );
              })}
            </div>

            <p className="mt-8 text-right font-hand text-[16px] text-[#7A8C9E]">— himmat rakh ✍️</p>
          </div>
        </div>
      ))}

      <div className="no-print mt-6 flex gap-3 pb-6">
        <Link href={`/learn/${slug}`} className="flex-1 rounded-xl border border-line py-3 text-center text-sm font-bold text-white/70 hover:bg-white/5">
          Poora lesson padho
        </Link>
        {next && (
          <Link href={`/notes/${next.slug}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white"
            style={{ background: ch.color }}>
            Ch {next.n} ke notes <ArrowRight size={15} />
          </Link>
        )}
      </div>
    </div>
  );
}
