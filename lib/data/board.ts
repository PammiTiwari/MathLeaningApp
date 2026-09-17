import type { Question, QType } from "./questions";
import { AR_OPTIONS } from "./questions";

/**
 * Real CBSE board-paper question sets.
 *
 * Each JSON file in ./board-papers is one complete set transcribed from the
 * official PDF on cbse.gov.in, with a CBSE-style marking scheme attached.
 * Dropping a new file into that folder adds a new mock paper — no code change.
 */

type RawQuestion = {
  n: number;
  section: "A" | "B" | "C" | "D" | "E";
  marks: number;
  q: string;
  options?: string[];
  correct?: number;
  orAlternative?: string;
  parts?: { q: string; marks: number }[];
  answer?: string;
  keySteps?: string[];
  chapter?: string;
};

type RawPaper = { id: string; year: string; set: string; questions: RawQuestion[] };

import { RAW_PAPERS } from "./board-papers/index";

const RAW: RawPaper[] = RAW_PAPERS as RawPaper[];

const TYPE_OF: Record<string, QType> = { A: "mcq", B: "vsa", C: "sa", D: "la", E: "case" };

const VALID_CHAPTERS = new Set([
  "relations-and-functions", "inverse-trigonometric-functions", "matrices", "determinants",
  "continuity-and-differentiability", "application-of-derivatives", "integrals",
  "application-of-integrals", "differential-equations", "vector-algebra",
  "three-dimensional-geometry", "linear-programming", "probability",
]);

function looksLikeAssertionReason(q: RawQuestion) {
  return /assertion\s*\(a\)/i.test(q.q) && /reason\s*\(r\)/i.test(q.q);
}

/** A board paper is usable only if every question carries a worked answer. */
export const BOARD_PAPERS: RawPaper[] = RAW
  .filter((p) => p?.questions?.length === 38 && p.questions.every((q) => q.answer))
  .sort((a, b) => (b.year + b.set).localeCompare(a.year + a.set));

/** Flattened into the app's Question shape, with globally unique ids. */
export const BOARD_QUESTIONS: Question[] = BOARD_PAPERS.flatMap((p) =>
  p.questions.map((q): Question => {
    const isAR = q.section === "A" && looksLikeAssertionReason(q);
    const body = q.orAlternative
      ? `${q.q}\n\n**OR**\n\n${q.orAlternative}`
      : q.q;
    return {
      id: `${p.id}-q${q.n}`,
      ch: q.chapter && VALID_CHAPTERS.has(q.chapter) ? q.chapter : "integrals",
      type: isAR ? "ar" : TYPE_OF[q.section],
      marks: q.marks,
      q: body,
      options: q.options ?? (isAR ? AR_OPTIONS : undefined),
      correct: q.correct,
      answer: q.answer ?? "",
      keySteps: q.keySteps,
      parts: q.parts?.map((pt) => ({ ...pt, answer: "" })),
    };
  })
);

export function boardQuestion(id: string) {
  return BOARD_QUESTIONS.find((q) => q.id === id);
}

/** Human label for a set: "65/1/1" reads the way CBSE prints it. */
export function setLabel(set: string) {
  return set.replace(/-/g, "/");
}
