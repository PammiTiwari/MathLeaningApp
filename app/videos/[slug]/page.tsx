"use client";

import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { getChapter } from "@/lib/data/chapters";
import { KHAN_VIDEOS, KHAN_PLAYLISTS, khanAcademyUrl, topicVideosFor } from "@/lib/data/videos";
import { Card, Pill } from "@/components/ui";
import { ArrowLeft, ExternalLink, PlayCircle, Youtube, GraduationCap } from "lucide-react";

export default function ChapterVideos({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const ch = getChapter(slug);
  if (!ch) notFound();

  const khan = KHAN_VIDEOS[slug] ?? [];
  const playlists = KHAN_PLAYLISTS[slug] ?? [];
  const topics = topicVideosFor(slug);

  return (
    <div>
      <Link href="/videos" className="mt-4 inline-block text-xs font-semibold text-faint hover:text-head">
        <ArrowLeft size={13} className="mr-1 inline" /> saare chapters
      </Link>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-3xl">{ch.emoji}</span>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ch.color }}>Chapter {ch.n} videos</p>
          <h1 className="font-display text-[28px] font-extrabold leading-tight text-head">{ch.title}</h1>
        </div>
      </div>

      {/* Khan Academy course link */}
      <Card className="mt-5 border-primary/25 bg-primarySoft p-5">
        <div className="flex flex-wrap items-center gap-3">
          <GraduationCap size={20} className="text-primary" />
          <div className="min-w-[200px] flex-1">
            <p className="text-[14px] font-bold text-head">Khan Academy - is chapter ka poora course</p>
            <p className="text-[12.5px] text-muted">Har topic ki alag video + free practice exercises + unit test.</p>
          </div>
          <a href={khanAcademyUrl(slug)} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primaryDim">
            Kholo <ExternalLink size={12} />
          </a>
        </div>
      </Card>

      {/* Khan Academy embedded videos */}
      {khan.length > 0 && (
        <>
          <h2 className="mb-4 mt-9 font-display text-lg font-bold text-head">Khan Academy ke videos</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {khan.map((v) => (
              <VideoCard key={v.id + v.title} v={v} />
            ))}
          </div>
        </>
      )}

      {/* One-shot videos */}
      {ch.videos.length > 0 && (
        <>
          <h2 className="mb-2 mt-9 font-display text-lg font-bold text-head">Full chapter one-shots</h2>
          <p className="mb-3 text-xs text-faint">Revision ke liye - ek hi video mein poora chapter.</p>
          <div className="grid gap-4 md:grid-cols-2">
            {ch.videos.map((v) => (
              <VideoCard key={v.id + v.title} v={v} />
            ))}
          </div>
        </>
      )}

      {/* Topic-wise links */}
      <h2 className="mb-2 mt-9 font-display text-lg font-bold text-head">Topic-wise videos</h2>
      <p className="mb-3 text-xs text-faint">
        Is chapter ka har topic - har ek ke liye alag video. Kisi ek topic mein atke ho to seedha wahi kholo.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {topics.map((t, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-line bg-card p-3.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[11px] font-bold"
              style={{ background: `${ch.color}22`, color: ch.color }}>{i + 1}</span>
            <span className="min-w-0 flex-1 text-[13px] leading-snug text-body">{t.topic}</span>
            <a href={t.youtube} target="_blank" rel="noreferrer" title="YouTube par dekho"
              className="shrink-0 rounded-lg bg-roseSoft p-1.5 text-rose transition hover:bg-rose/25">
              <Youtube size={14} />
            </a>
            <a href={t.khan} target="_blank" rel="noreferrer" title="Khan Academy par dekho"
              className="shrink-0 rounded-lg bg-primarySoft p-1.5 text-primary transition hover:bg-primary/25">
              <GraduationCap size={14} />
            </a>
          </div>
        ))}
      </div>

      {playlists.length > 0 && (
        <>
          <h2 className="mb-4 mt-9 font-display text-lg font-bold text-head">Poori playlist</h2>
          <div className="space-y-2">
            {playlists.map((pl) => (
              <a key={pl.id} href={`https://www.youtube.com/playlist?list=${pl.id}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-line bg-card p-4 transition hover:border-rose/30">
                <Youtube size={18} className="text-rose" />
                <span className="flex-1 text-[13.5px] text-body">{pl.title}</span>
                <ExternalLink size={13} className="text-faint" />
              </a>
            ))}
          </div>
        </>
      )}

      <div className="mt-8 flex gap-3">
        <Link href={`/learn/${slug}`} className="flex-1 rounded-xl border border-line py-3 text-center text-sm font-bold text-body hover:bg-sunk">
          Lesson padho
        </Link>
        <Link href={`/notes/${slug}`} className="flex-1 rounded-xl py-3 text-center text-sm font-bold text-head"
          style={{ background: ch.color }}>
          Notes dekho
        </Link>
      </div>
    </div>
  );
}

function VideoCard({ v }: { v: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${v.id}`}
          title={v.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="p-4">
        <p className="text-[13.5px] font-semibold leading-snug text-head">{v.title}</p>
        <p className="mt-1.5 text-[11px] text-faint">{v.by} · {v.covers}</p>
      </div>
    </Card>
  );
}
