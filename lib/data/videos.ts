import { CHAPTERS } from "./chapters";

export type KAVideo = {
  id: string;            // YouTube video id (embeddable)
  title: string;
  by: string;
  covers: string;
};

/**
 * Khan Academy course pages (topic-wise videos + free practice exercises).
 * Path pattern confirmed from Khan Academy's own listings for the
 * "Class 12 math (India) — NCERT" course.
 */
const KA_BASE = "https://www.khanacademy.org/math/in-in-grade-12-ncert/xd340c21e718214c5:";

const KA_SLUG: Record<string, string> = {
  "relations-and-functions": "relations-and-functions",
  "inverse-trigonometric-functions": "inverse-trigonometric-functions",
  matrices: "matrices",
  determinants: "determinants",
  "continuity-and-differentiability": "continuity-differentiability",
  "application-of-derivatives": "application-of-derivatives",
  integrals: "integrals",
  "application-of-integrals": "application-of-integrals",
  "differential-equations": "differential-equations",
  "vector-algebra": "vector-algebra",
  "three-dimensional-geometry": "three-dimensional-geometry",
  "linear-programming": "linear-programming",
  probability: "probability",
};

export function khanAcademyUrl(chapterSlug: string) {
  const slug = KA_SLUG[chapterSlug];
  return slug ? KA_BASE + slug : "https://www.khanacademy.org/math/in-in-grade-12-ncert";
}

export function khanAcademySearch(q: string) {
  return `https://www.khanacademy.org/search?page_search_query=${encodeURIComponent(q)}`;
}

/** Khan Academy India videos confirmed to exist on YouTube. These embed directly. */
export const KHAN_VIDEOS: Record<string, KAVideo[]> = {
  "relations-and-functions": [
    { id: "2S5D94fCztI", title: "Relations and Functions — Full Chapter | Board Exam", by: "Khan Academy India", covers: "Poora chapter" },
    { id: "YqT-DAmvi3I", title: "One-to-one and Onto Functions | Class XII", by: "Khan Academy", covers: "Injective & surjective" },
  ],
  matrices: [
    { id: "CekHJ--bR0A", title: "Matrices and Determinants | Board Exam", by: "Khan Academy India", covers: "Ch 3 + Ch 4" },
  ],
  determinants: [
    { id: "CekHJ--bR0A", title: "Matrices and Determinants | Board Exam", by: "Khan Academy India", covers: "Ch 3 + Ch 4" },
  ],
  "vector-algebra": [
    { id: "faHlx3mzAuA", title: "Vector Algebra — Full Chapter | Board Exam", by: "Khan Academy India", covers: "Poora chapter" },
  ],
  "three-dimensional-geometry": [
    { id: "faHlx3mzAuA", title: "Vector Algebra — Full Chapter | Board Exam", by: "Khan Academy India", covers: "Vectors ka base (3D se pehle dekho)" },
  ],
};

export const KHAN_PLAYLISTS: Record<string, { id: string; title: string }[]> = {
  "relations-and-functions": [
    { id: "PL7eKoJuwryW4m_y6qaedBpGNDEy2gABZx", title: "Relations and Functions, Class XII — Khan Academy (full playlist)" },
  ],
};

/**
 * Every single topic of every chapter gets its own Khan Academy video link.
 * This is the "har topic ki video" layer — nothing dead-ends.
 */
export function topicVideoLink(chapterTitle: string, topic: string) {
  const clean = topic.split("(")[0].split(":").slice(-1)[0].trim();
  const q = `Khan Academy class 12 ${chapterTitle} ${clean}`;
  return {
    topic: clean,
    youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
    khan: khanAcademySearch(`${clean} class 12`),
  };
}

export function topicVideosFor(chapterSlug: string) {
  const ch = CHAPTERS.find((c) => c.slug === chapterSlug);
  if (!ch) return [];
  return ch.topics.map((t) => topicVideoLink(ch.title, t));
}

export const KHAN_CHANNELS = [
  { name: "Khan Academy India — Hindi", url: "https://www.youtube.com/channel/UCU0kWLAbhVGxXarmE3b8rHg" },
  { name: "Khan Academy India — English", url: "https://www.youtube.com/c/KhanAcademyIndiaEnglish" },
];

export const KHAN_COURSE_HUB = "https://www.khanacademy.org/math/in-in-grade-12-ncert";
