import { LESSONS_A } from "./lessons-a";
import { LESSONS_B } from "./lessons-b";
import { LESSONS_C } from "./lessons-c";
import { deepFor } from "./deep";
import type { Lesson } from "./lesson-types";

const BASE: Lesson[] = [...LESSONS_A, ...LESSONS_B, ...LESSONS_C];

/**
 * Each lesson = the intuition pass, then the depth pass (derivations,
 * rigorous theory, real board-level hard problems), then the recap.
 */
export const LESSONS: Lesson[] = BASE.map((l) => {
  const extra = deepFor(l.slug);
  if (!extra.length) return l;
  const vi = l.beats.findIndex((b) => b.kind === "victory");
  const cut = vi === -1 ? l.beats.length : vi;
  return {
    ...l,
    xp: l.xp + extra.length * 25,
    beats: [...l.beats.slice(0, cut), ...extra, ...l.beats.slice(cut)],
  };
});

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

/** Index of the first depth beat — used to show the "Deep dive" marker. */
export function deepStartIndex(slug: string): number {
  const l = getLesson(slug);
  if (!l) return -1;
  return l.beats.findIndex((b) => b.kind === "derive" || b.kind === "deep" || b.kind === "hard");
}

export type { Lesson, Beat } from "./lesson-types";
