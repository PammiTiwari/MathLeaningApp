import Link from "next/link";
import { IMAGES, PHOTO_CREDIT } from "@/lib/images";
import { ArrowRight, FileText } from "lucide-react";

/**
 * Full-bleed hero. Breaks out of the page container with a 50vw margin trick so
 * the photograph runs edge to edge while the text stays on the same grid as the
 * rest of the page.
 */
export default function Hero() {
  const img = IMAGES.hero;
  return (
    <section
      className="relative left-1/2 right-1/2 -mx-[50vw] -mt-[57px] w-screen overflow-hidden"
      style={{ background: img.fallback }}
    >
      {/* photograph */}
      <picture>
        <source media="(min-width: 1280px)" srcSet={img.src(2000)} />
        <source media="(min-width: 640px)" srcSet={img.src(1400)} />
        <img
          src={img.src(800)}
          alt={img.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.55]"
        />
      </picture>

      {/* legibility: darken overall, then deepen top and bottom */}
      <div className="absolute inset-0 bg-[#0E0D18]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0D18]/85 via-transparent to-[#0E0D18]/90" />

      <div className="relative mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-5 pb-24 pt-[120px] text-center sm:min-h-[84vh]">
        <span className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
          CBSE Class 12 · Mathematics (041)
        </span>

        <h1 className="mt-7 font-display text-[40px] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[62px]">
          Himmat rakh,
          <br />
          <span className="bg-gradient-to-r from-[#C9B8FF] via-white to-[#FFD79A] bg-clip-text text-transparent">
            Maths ho jayega.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-[16px] leading-[1.75] text-white/80 sm:text-[17px]">
          Poora syllabus, 13 chapters, 80 marks. Har chapter basics se shuru hota hai
          aur derivations aur board-level tough questions tak jaata hai.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/chapters"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[14px] font-bold text-head shadow-lg transition hover:bg-white/90"
          >
            Padhna shuru karo <ArrowRight size={16} />
          </Link>
          <Link
            href="/papers"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-[14px] font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <FileText size={16} /> Board papers
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/65">
          {[
            ["13", "chapters"],
            ["94", "formulas"],
            ["73", "note sections"],
            ["5", "board paper years"],
          ].map(([n, label]) => (
            <span key={label} className="flex items-baseline gap-1.5">
              <span className="font-display text-[20px] font-extrabold text-white">{n}</span>
              <span className="text-[12.5px]">{label}</span>
            </span>
          ))}
        </div>
      </div>

      <span className="absolute bottom-3 right-4 text-[10px] text-white/35">
        photo: {PHOTO_CREDIT}
      </span>
    </section>
  );
}
