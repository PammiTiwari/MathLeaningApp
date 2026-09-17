import type { Img } from "@/lib/images";
import { PHOTO_CREDIT } from "@/lib/images";

/**
 * Photographic header for a section page. Full-bleed like the home hero, with
 * a dark scrim so the white type stays readable whatever the photo does.
 */
export default function PageBanner({
  image, eyebrow, title, sub, children,
}: {
  image: Img;
  eyebrow?: string;
  title: string;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className="full-bleed under-nav relative mb-8 overflow-hidden"
      style={{ background: image.fallback }}
    >
      <picture>
        <source media="(min-width: 1536px)" srcSet={image.src(2400)} />
        <source media="(min-width: 640px)" srcSet={image.src(1600)} />
        <img
          src={image.src(800)}
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.45]"
        />
      </picture>
      <div className="absolute inset-0 bg-[#0E0D18]/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0D18]/80 via-transparent to-[#0E0D18]/75" />

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-[132px] lg:pb-14 lg:pt-[152px] sm:px-6">
        {eyebrow && (
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.025em] text-white sm:text-[40px]">
          {title}
        </h1>
        {sub && (
          <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-white/75">{sub}</p>
        )}
        {children}
      </div>

      <span className="absolute bottom-2.5 right-4 text-[10px] text-white/30">
        photo: {PHOTO_CREDIT}
      </span>
    </section>
  );
}
