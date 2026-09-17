"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

/**
 * Minimal local state. No XP, no levels, no streaks — just the two things
 * the app genuinely needs: where you left off in a lesson, and your past
 * mock-exam attempts.
 */

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
  lessonBeats: Record<string, number>; // chapter slug -> furthest step reached
  attempts: ExamAttempt[];
};

const EMPTY: Progress = { lessonBeats: {}, attempts: [] };
const KEY = "himmat-rakh-v2";

type Ctx = {
  p: Progress;
  ready: boolean;
  setBeat: (slug: string, index: number) => void;
  addAttempt: (a: ExamAttempt) => void;
  clearAttempts: () => void;
};

const ProgressCtx = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [p, setP] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setP({ ...EMPTY, ...JSON.parse(raw) });
      localStorage.removeItem("himmat-rakh-progress-v1"); // drop the old XP/streak store
    } catch {}
    setReady(true);
  }, []);

  const save = useCallback((fn: (prev: Progress) => Progress) => {
    setP((prev) => {
      const next = fn(prev);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const value: Ctx = {
    p,
    ready,
    setBeat: (slug, index) =>
      save((s) => ({ ...s, lessonBeats: { ...s.lessonBeats, [slug]: Math.max(s.lessonBeats[slug] ?? 0, index) } })),
    addAttempt: (a) => save((s) => ({ ...s, attempts: [a, ...s.attempts].slice(0, 30) })),
    clearAttempts: () => save((s) => ({ ...s, attempts: [] })),
  };

  return <ProgressCtx.Provider value={value}>{children}</ProgressCtx.Provider>;
}

export function useProgress() {
  const c = useContext(ProgressCtx);
  if (!c) throw new Error("useProgress must be used inside ProgressProvider");
  return c;
}
