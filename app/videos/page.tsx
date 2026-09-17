"use client";

import Link from "next/link";
import { CHAPTERS, PLAYLISTS } from "@/lib/data/chapters";
import { KHAN_VIDEOS, KHAN_CHANNELS, KHAN_COURSE_HUB, topicVideosFor } from "@/lib/data/videos";
import { PageHead, Card, Pill } from "@/components/ui";
import { PlayCircle, ExternalLink, Youtube } from "lucide-react";

export default function VideosHome() {
  return (
    <div>
      <PageHead
        eyebrow="Video lessons"
        title="Dekhke samjho"
        sub="Har chapter ke liye Khan Academy ke free videos aur topic-wise links. Khan Academy India ka poora NCERT Class 12 course free hai — videos ke saath practice exercises bhi."
      />

      <Card className="mb-7 border-primary/25 bg-primary/[0.06] p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-[240px] flex-1">
            <p className="font-display text-base font-bold text-white">Khan Academy — poora course, bilkul free</p>
            <p className="mt-1 text-[13px] leading-relaxed text-white/60">
              Khan Sir (Patna wale) Class 12 Maths nahi padhate — woh competitive exams ke liye GS padhate hain.
              Class 12 Maths ke liye <strong className="text-white">Khan Academy India</strong> hai, jo NCERT ke exact
              chapters par chalta hai, Hindi aur English dono mein.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a href={KHAN_COURSE_HUB} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primaryDim">
              Course kholo <ExternalLink size={12} />
            </a>
            {KHAN_CHANNELS.map((c) => (
              <a key={c.url} href={c.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-xs font-semibold text-white/60 hover:text-white">
                <Youtube size={12} /> {c.name}
              </a>
            ))}
          </div>
        </div>
      </Card>

      <h2 className="mb-3 font-display text-xl font-bold text-white">Chapter chuno</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {CHAPTERS.map((c) => {
          const khan = KHAN_VIDEOS[c.slug] ?? [];
          const topics = topicVideosFor(c.slug);
          const count = khan.length + c.videos.length + topics.length;
          return (
            <Link key={c.slug} href={`/videos/${c.slug}`}>
              <Card className="card-hover flex h-full items-start gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl"
                  style={{ background: `${c.color}1c` }}>{c.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: c.color }}>Chapter {c.n}</p>
                  <p className="mt-0.5 font-display text-[15.5px] font-bold leading-snug text-white">{c.title}</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-white/40">
                    <PlayCircle size={12} /> {count} video links · {c.topics.length} topics
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <h2 className="mb-3 mt-9 font-display text-xl font-bold text-white">Full-syllabus playlists</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {PLAYLISTS.map((pl) => (
          <a key={pl.id} href={`https://www.youtube.com/playlist?list=${pl.id}`} target="_blank" rel="noreferrer">
            <Card className="card-hover flex h-full items-center gap-3 p-4">
              <Youtube size={20} className="shrink-0 text-rose" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-white">{pl.title}</p>
                <p className="text-[11px] text-white/40">{pl.by}</p>
              </div>
              <ExternalLink size={13} className="shrink-0 text-white/25" />
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
