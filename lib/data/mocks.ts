import { CHAPTERS } from "./chapters";
import { BOARD_PAPERS, BOARD_QUESTIONS, setLabel } from "./board";
import { QUESTIONS } from "./questions";
import type { Question } from "./questions";

export type MockKind = "full" | "section" | "chapter" | "speed";

export type Mock = {
  id: string;
  no: number | null;          // "Mock Paper 01" numbering, full papers only
  title: string;
  subtitle: string;
  minutes: number;            // every mock is timed
  marks: number;
  questionIds: string[];
  badge: string;
  kind: MockKind;
  source: string;             // where the questions come from
};

/** Every question the app can draw on: real board sets + the in-house set. */
export const ALL_QUESTIONS: Question[] = [...BOARD_QUESTIONS, ...QUESTIONS];

export function anyQuestion(id: string) {
  return ALL_QUESTIONS.find((q) => q.id === id);
}

const marksOf = (ids: string[]) =>
  ids.reduce((sum, id) => sum + (anyQuestion(id)?.marks ?? 0), 0);

/* ------------------------------------------------------------------ *
 * 1. FULL PAPERS — one per real board set, exactly as it was sat
 * ------------------------------------------------------------------ */
const FULL: Mock[] = BOARD_PAPERS.map((p, i) => {
  const ids = p.questions.map((q) => `${p.id}-q${q.n}`);
  return {
    id: `board-${p.id}`,
    no: i + 1,
    title: `Mock Paper ${String(i + 1).padStart(2, "0")}`,
    subtitle: `CBSE ${p.year} board exam, Set ${setLabel(p.set)} — jaisa asli paper tha. 38 questions, poore 3 ghante.`,
    minutes: 180,
    marks: marksOf(ids),
    questionIds: ids,
    badge: "FULL PAPER",
    kind: "full",
    source: `CBSE ${p.year} · Set ${setLabel(p.set)}`,
  };
});

/* ------------------------------------------------------------------ *
 * 2. SECTION DRILLS — pooled across every board set
 * ------------------------------------------------------------------ */
const pool = (fn: (q: Question) => boolean) => BOARD_QUESTIONS.filter(fn);

function sectionMock(
  id: string, title: string, subtitle: string, badge: string,
  filter: (q: Question) => boolean, perPaper: number, minutesPerMark: number
): Mock | null {
  const picked: string[] = [];
  for (const p of BOARD_PAPERS) {
    const mine = p.questions
      .map((q) => `${p.id}-q${q.n}`)
      .filter((qid) => { const q = anyQuestion(qid); return q && filter(q); })
      .slice(0, perPaper);
    picked.push(...mine);
  }
  if (picked.length < 3) return null;
  const marks = marksOf(picked);
  return {
    id, title, subtitle, badge, kind: "section",
    minutes: Math.max(20, Math.round(marks * minutesPerMark)),
    marks,
    questionIds: picked,
    source: `${BOARD_PAPERS.length} board sets se`,
  } as Mock;
}

const SECTIONS: Mock[] = [
  sectionMock(
    "drill-mcq", "MCQ Rapid Fire",
    "Section A ke sirf objective questions, saare board sets se. Speed banane ke liye.",
    "SPEED", (q) => q.type === "mcq" || q.type === "ar", 8, 1.2
  ),
  sectionMock(
    "drill-vsa", "2-Markers Drill",
    "Section B — chhote sawaal, par inhi mein careless mistakes hoti hain.",
    "SECTION B", (q) => q.type === "vsa", 3, 2.5
  ),
  sectionMock(
    "drill-sa", "3-Markers Drill",
    "Section C — method likhna aur step marks batorna yahin se seekhoge.",
    "SECTION C", (q) => q.type === "sa", 3, 2.5
  ),
  sectionMock(
    "drill-la", "5-Marker Boss Battle",
    "Section D ke sabse bhaari sawaal. Yahi marks banate ya bigaadte hain.",
    "HARDEST", (q) => q.type === "la", 2, 2.5
  ),
  sectionMock(
    "drill-case", "Case Study Challenge",
    "Section E — naya pattern, real-life situations. Har part alag se marked.",
    "NEW PATTERN", (q) => q.type === "case", 2, 2.5
  ),
].filter(Boolean) as Mock[];

/* ------------------------------------------------------------------ *
 * 3. CHAPTER TESTS — every chapter that has enough board questions
 * ------------------------------------------------------------------ */
const CHAPTER_TESTS: Mock[] = CHAPTERS.map((c) => {
  const ids = pool((q) => q.ch === c.slug).map((q) => q.id).slice(0, 14);
  if (ids.length < 4) return null;
  const marks = marksOf(ids);
  return {
    id: `chapter-${c.slug}`,
    no: null,
    title: `${c.title} — Chapter Test`,
    subtitle: `Sirf is chapter ke board questions. ${ids.length} sawaal, asli papers se chune hue.`,
    minutes: Math.max(20, Math.round(marks * 2.2)),
    marks,
    questionIds: ids,
    badge: `CH ${c.n}`,
    kind: "chapter",
    source: `${c.unit} · ${c.unitMarks} marks unit`,
  } as Mock;
}).filter(Boolean) as Mock[];

/* ------------------------------------------------------------------ */

export const MOCKS: Mock[] = [...FULL, ...SECTIONS, ...CHAPTER_TESTS];

export function getMock(id: string) {
  return MOCKS.find((m) => m.id === id);
}

export const MOCK_STATS = {
  papers: MOCKS.length,
  fullPapers: FULL.length,
  questions: ALL_QUESTIONS.length,
  boardQuestions: BOARD_QUESTIONS.length,
  boardSets: BOARD_PAPERS.length,
};
