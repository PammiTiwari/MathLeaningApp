"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

/**
 * The only thing worth remembering: how far through a lesson you got, so a
 * chapter reopens where you left it. Nothing else is stored.
 */

export type Progress = {
  lessonBeats: Record<string, number>; // chapter slug -> furthest step reached
};

const EMPTY: Progress = { lessonBeats: {} };
const KEY = "himmat-rakh-v3";

type Ctx = {
  p: Progress;
  ready: boolean;
  setBeat: (slug: string, index: number) => void;
};

const ProgressCtx = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [p, setP] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setP({ ...EMPTY, ...JSON.parse(raw) });
      // clear the stores this replaced
      localStorage.removeItem("himmat-rakh-progress-v1");
      localStorage.removeItem("himmat-rakh-v2");
    } catch {}
    setReady(true);
  }, []);

  const setBeat = useCallback((slug: string, index: number) => {
    setP((prev) => {
      const next = {
        ...prev,
        lessonBeats: { ...prev.lessonBeats, [slug]: Math.max(prev.lessonBeats[slug] ?? 0, index) },
      };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  return <ProgressCtx.Provider value={{ p, ready, setBeat }}>{children}</ProgressCtx.Provider>;
}

export function useProgress() {
  const c = useContext(ProgressCtx);
  if (!c) throw new Error("useProgress must be used inside ProgressProvider");
  return c;
}
