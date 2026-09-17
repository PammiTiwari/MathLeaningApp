"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type ExamAttempt = {
  id: string;
  paperId: string;
  paperTitle: string;
  date: string;
  scored: number;
  total: number;
  perQuestion: { qid: string; awarded: number; max: number; feedback: string }[];
  overall?: string;
};

export type Progress = {
  xp: number;
  streak: number;
  lastActive: string;          // yyyy-mm-dd
  lessonBeats: Record<string, number>;   // chapterSlug -> beats completed
  lessonDone: string[];        // chapter slugs fully finished
  notesRead: string[];
  videosWatched: string[];
  quizStats: Record<string, { right: number; wrong: number }>; // chapterSlug
  attempts: ExamAttempt[];
  cardsMastered: string[];
  examDate: string | null;     // board exam date for countdown
  name: string;
};

const EMPTY: Progress = {
  xp: 0,
  streak: 0,
  lastActive: "",
  lessonBeats: {},
  lessonDone: [],
  notesRead: [],
  videosWatched: [],
  quizStats: {},
  attempts: [],
  cardsMastered: [],
  examDate: null,
  name: "",
};

const KEY = "himmat-rakh-progress-v1";

type Ctx = {
  p: Progress;
  ready: boolean;
  addXp: (n: number) => void;
  setBeat: (slug: string, index: number) => void;
  finishLesson: (slug: string, xp: number) => void;
  markNote: (slug: string) => void;
  markVideo: (id: string) => void;
  recordQuiz: (slug: string, right: boolean) => void;
  addAttempt: (a: ExamAttempt) => void;
  toggleCard: (key: string) => void;
  setExamDate: (d: string | null) => void;
  setName: (n: string) => void;
  reset: () => void;
};

const ProgressCtx = createContext<Ctx | null>(null);

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [p, setP] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      let next = raw ? { ...EMPTY, ...JSON.parse(raw) } : { ...EMPTY };
      // streak logic
      const t = today();
      if (next.lastActive !== t) {
        const yest = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        next.streak = next.lastActive === yest ? next.streak + 1 : next.lastActive ? 1 : 1;
        next.lastActive = t;
      }
      setP(next);
    } catch {
      setP({ ...EMPTY, lastActive: today(), streak: 1 });
    }
    setReady(true);
  }, []);

  const save = useCallback((updater: (prev: Progress) => Progress) => {
    setP((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const value: Ctx = {
    p,
    ready,
    addXp: (n) => save((s) => ({ ...s, xp: s.xp + n })),
    setBeat: (slug, index) =>
      save((s) => ({
        ...s,
        lessonBeats: { ...s.lessonBeats, [slug]: Math.max(s.lessonBeats[slug] ?? 0, index) },
      })),
    finishLesson: (slug, xp) =>
      save((s) => ({
        ...s,
        xp: s.lessonDone.includes(slug) ? s.xp : s.xp + xp,
        lessonDone: s.lessonDone.includes(slug) ? s.lessonDone : [...s.lessonDone, slug],
      })),
    markNote: (slug) =>
      save((s) => (s.notesRead.includes(slug) ? s : { ...s, notesRead: [...s.notesRead, slug], xp: s.xp + 10 })),
    markVideo: (id) =>
      save((s) => (s.videosWatched.includes(id) ? s : { ...s, videosWatched: [...s.videosWatched, id], xp: s.xp + 15 })),
    recordQuiz: (slug, right) =>
      save((s) => {
        const cur = s.quizStats[slug] ?? { right: 0, wrong: 0 };
        return {
          ...s,
          xp: s.xp + (right ? 5 : 1),
          quizStats: {
            ...s.quizStats,
            [slug]: right ? { ...cur, right: cur.right + 1 } : { ...cur, wrong: cur.wrong + 1 },
          },
        };
      }),
    addAttempt: (a) => save((s) => ({ ...s, attempts: [a, ...s.attempts].slice(0, 40), xp: s.xp + 50 })),
    toggleCard: (key) =>
      save((s) => ({
        ...s,
        cardsMastered: s.cardsMastered.includes(key)
          ? s.cardsMastered.filter((k) => k !== key)
          : [...s.cardsMastered, key],
      })),
    setExamDate: (d) => save((s) => ({ ...s, examDate: d })),
    setName: (n) => save((s) => ({ ...s, name: n })),
    reset: () => {
      try { localStorage.removeItem(KEY); } catch {}
      setP({ ...EMPTY, lastActive: today(), streak: 1 });
    },
  };

  return <ProgressCtx.Provider value={value}>{children}</ProgressCtx.Provider>;
}

export function useProgress() {
  const c = useContext(ProgressCtx);
  if (!c) throw new Error("useProgress must be used inside ProgressProvider");
  return c;
}

/** XP → level, with a fun Hinglish rank name */
export function levelOf(xp: number) {
  const level = Math.floor(xp / 250) + 1;
  const names = [
    "Shuruaat", "Padhaku", "Tez Dimaag", "Formula Master", "Calculus Warrior",
    "Board Ready", "Topper Zone", "Maths Ka Baadshah",
  ];
  return { level, name: names[Math.min(level - 1, names.length - 1)], into: xp % 250, need: 250 };
}
