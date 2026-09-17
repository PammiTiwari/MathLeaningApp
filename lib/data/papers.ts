export type OfficialPaper = {
  id: string;
  year: string;
  title: string;
  kind: "sample" | "syllabus";
  sqp?: string;     // question paper PDF
  ms?: string;      // marking scheme PDF
  sqpHi?: string;   // Hindi version
  msHi?: string;
  note: string;
};

const CB = "https://cbseacademic.nic.in/web_material";

/** All links below were checked live against cbseacademic.nic.in. */
export const OFFICIAL_PAPERS: OfficialPaper[] = [
  {
    id: "sqp-2025-26",
    year: "2025–26",
    title: "CBSE Sample Question Paper — Mathematics (041)",
    kind: "sample",
    sqp: `${CB}/SQP/ClassXII_2025_26/Maths-SQP.pdf`,
    ms: `${CB}/SQP/ClassXII_2025_26/Maths-MS.pdf`,
    sqpHi: `${CB}/SQP/ClassXII_2025_26/Maths-SQP_hi.pdf`,
    msHi: `${CB}/SQP/ClassXII_2025_26/Maths-MS_hi.pdf`,
    note: "Sabse zaroori paper. Yeh CBSE ka apna official pattern hai — isse pehle solve karo, baaki baad mein.",
  },
  {
    id: "sqp-2024-25",
    year: "2024–25",
    title: "CBSE Sample Question Paper — Mathematics (041)",
    kind: "sample",
    sqp: `${CB}/SQP/ClassXII_2024_25/Maths-SQP.pdf`,
    ms: `${CB}/SQP/ClassXII_2024_25/Maths-MS.pdf`,
    note: "Pichle saal ka official sample paper. Pattern lagbhag same hai.",
  },
  {
    id: "sqp-2023-24",
    year: "2023–24",
    title: "CBSE Sample Question Paper — Mathematics (041)",
    kind: "sample",
    sqp: `${CB}/SQP/ClassXII_2023_24/Maths-SQP.pdf`,
    ms: `${CB}/SQP/ClassXII_2023_24/Maths-MS.pdf`,
    note: "38-question pattern yahin se shuru hua tha. Extra practice ke liye.",
  },
];

export const SYLLABUS_PDF = `${CB}/CurriculumMain26/SrSec/Maths_SrSec_2025-26.pdf`;
export const CBSE_PYQ_PAGE = "https://www.cbse.gov.in/cbsenew/question-paper.html";
export const CBSE_SQP_ARCHIVE = "https://cbseacademic.nic.in/sqp_archive.html";

/** In-app timed mock papers — attempt these inside the app and get AI-marked. */
export type MockPaper = {
  id: string;
  title: string;
  subtitle: string;
  minutes: number;
  marks: number;
  questionIds: string[];
  badge: string;
};

export const MOCK_PAPERS: MockPaper[] = [
  {
    id: "mock-1",
    title: "Full Board Mock — Paper 1",
    subtitle: "Poora 38-question paper, exact CBSE pattern. 3 ghante, 80 marks.",
    minutes: 180,
    marks: 80,
    badge: "FULL PAPER",
    questionIds: Array.from({ length: 38 }, (_, i) => `m1-q${i + 1}`),
  },
  {
    id: "quick-30",
    title: "30-Minute Speed Test",
    subtitle: "Section A ke 20 MCQ + Assertion-Reason. Timer tez, dimaag tez.",
    minutes: 30,
    marks: 20,
    badge: "QUICK",
    questionIds: Array.from({ length: 20 }, (_, i) => `m1-q${i + 1}`),
  },
  {
    id: "long-answers",
    title: "5-Marker Boss Battle",
    subtitle: "Sirf Section D — chaar 5-markers. Yahi marks banate ya bigaadte hain.",
    minutes: 60,
    marks: 20,
    badge: "HARD",
    questionIds: ["m1-q32", "m1-q33", "m1-q34", "m1-q35"],
  },
  {
    id: "case-based",
    title: "Case Study Challenge",
    subtitle: "Section E ke teeno case-based sawaal. Naya pattern, zaroori practice.",
    minutes: 45,
    marks: 12,
    badge: "NEW PATTERN",
    questionIds: ["m1-q36", "m1-q37", "m1-q38"],
  },
];

export const PAPER_PATTERN = [
  { section: "A", qs: "1–20", desc: "18 MCQ + 2 Assertion-Reason", each: 1, total: 20 },
  { section: "B", qs: "21–25", desc: "Very Short Answer (VSA)", each: 2, total: 10 },
  { section: "C", qs: "26–31", desc: "Short Answer (SA)", each: 3, total: 18 },
  { section: "D", qs: "32–35", desc: "Long Answer (LA)", each: 5, total: 20 },
  { section: "E", qs: "36–38", desc: "Case-based / Source-based", each: 4, total: 12 },
];
