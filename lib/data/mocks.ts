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

const paperOf = (qid: string) => qid.replace(/-q\d+$/, "");

const marksOf = (ids: string[]) =>
  ids.reduce((sum, id) => sum + (anyQuestion(id)?.marks ?? 0), 0);

/* ------------------------------------------------------------------ *
 * 1. FULL PAPERS — one per real board set, exactly as it was sat
 * ------------------------------------------------------------------ */
const inPool = new Set(BOARD_QUESTIONS.map((q) => q.id));

const FULL: Mock[] = [...BOARD_PAPERS]
  // number the papers the way CBSE prints them: 65/1/1 is Mock Paper 01
  .sort((a, b) => (a.year + a.set).localeCompare(b.year + b.set))
  .map((p, i) => {
    // a question validation pulled from the pool cannot be sat or marked, so
    // it is left out and the paper honestly reports the smaller total
    const ids = p.questions.map((q) => `${p.id}-q${q.n}`).filter((id) => inPool.has(id));
    const dropped = p.questions.length - ids.length;
    return {
      id: `board-${p.id}`,
      no: i + 1,
      title: `Mock Paper ${String(i + 1).padStart(2, "0")}`,
      subtitle:
        `CBSE ${p.year} board exam, Set ${setLabel(p.set)} — jaisa asli paper tha. ` +
        `${ids.length} questions, poore 3 ghante.` +
        (dropped ? ` (${dropped} sawaal hata diya — uske options asli paper se theek se nahi padhe ja sake.)` : ""),
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
  // take at most `perPaper` from each set so one paper can't dominate the drill
  const takenPerPaper = new Map<string, number>();
  const picked: string[] = [];
  for (const q of BOARD_QUESTIONS) {
    if (!filter(q)) continue;
    const paper = paperOf(q.id);
    const taken = takenPerPaper.get(paper) ?? 0;
    if (taken >= perPaper) continue;
    takenPerPaper.set(paper, taken + 1);
    picked.push(q.id);
  }
  if (picked.length < 3) return null;
  const marks = marksOf(picked);
  return {
    id, title, subtitle, badge, kind: "section",
    minutes: Math.max(20, Math.round(marks * minutesPerMark)),
    marks,
    questionIds: picked,
    source: `${takenPerPaper.size} board set${takenPerPaper.size > 1 ? "s" : ""} se`,
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
  /** sets contributing questions, including ones only partly solved */
  contributingSets: new Set(BOARD_QUESTIONS.map((q) => paperOf(q.id))).size,
  fullPapers: FULL.length,
  questions: ALL_QUESTIONS.length,
  boardQuestions: BOARD_QUESTIONS.length,
  boardSets: BOARD_PAPERS.length,
};
