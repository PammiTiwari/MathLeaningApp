import { LESSONS_A } from "./lessons-a";
import { LESSONS_B } from "./lessons-b";
import { LESSONS_C } from "./lessons-c";
import type { Lesson } from "./lesson-types";

export const LESSONS: Lesson[] = [...LESSONS_A, ...LESSONS_B, ...LESSONS_C];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export type { Lesson, Beat } from "./lesson-types";
