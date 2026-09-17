/**
 * Photographs from Unsplash, hotlinked with sizing params so we only ever pull
 * the resolution we actually show. Every one was downloaded and looked at
 * before being used here, so the subject genuinely matches its section.
 *
 * Each sits on top of a CSS gradient in the same palette, so a slow or blocked
 * network degrades to a coloured panel rather than a white hole.
 *
 * Unsplash License: free to use, no attribution required (credited anyway).
 */

const U = "https://images.unsplash.com";
const opt = (id: string, w: number, q = 70) => `${U}/${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export type Img = {
  src: (w: number) => string;
  alt: string;
  fallback: string;
};

const make = (id: string, alt: string, fallback: string): Img => ({
  src: (w: number) => opt(id, w),
  alt,
  fallback,
});

const INK = "linear-gradient(150deg, #141326 0%, #1E1B3A 45%, #0E0D18 100%)";

export const IMAGES = {
  /** Blackboard covered in integrals, matrices and diagrams. Dark. */
  hero: make(
    "photo-1635070041078-e363dbe005cb",
    "Blackboard covered in handwritten mathematical formulas and diagrams",
    INK
  ),
  /** A real classroom blackboard with differential equations in chalk. */
  login: make(
    "photo-1453733190371-0a9bedd82893",
    "A classroom blackboard with differential equations written in chalk",
    INK
  ),
  /** A printed system of linear equations. */
  notes: make(
    "photo-1509228468518-180dd4864904",
    "A system of linear equations printed in a textbook",
    "linear-gradient(150deg, #EAF6F1 0%, #F7FBF9 100%)"
  ),
  /** Library stacks. */
  papers: make(
    "photo-1498243691581-b145c3f54a5a",
    "Rows of library shelves filled with books",
    "linear-gradient(150deg, #1B2430 0%, #0E1620 100%)"
  ),
  /** A long library wall lit by hanging bulbs. */
  chapters: make(
    "photo-1481627834876-b7833e8f5570",
    "A long library wall of books lit by hanging bulbs",
    "linear-gradient(150deg, #241C2E 0%, #120E18 100%)"
  ),
  /** Graph paper with a hand-drawn plot, pens and a ruler. */
  graph: make(
    "photo-1543286386-713bdd548da4",
    "Graph paper with a hand-drawn plot, pens and a ruler on a desk",
    "linear-gradient(150deg, #2A2119 0%, #16110C 100%)"
  ),
} as const;

export const PHOTO_CREDIT = "Unsplash";
