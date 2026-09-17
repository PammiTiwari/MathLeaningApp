/**
 * Photographs from Unsplash, hotlinked with sizing params so we only ever pull
 * the resolution we actually show. Each one was opened and checked before
 * being used here, so the subject genuinely matches the section it sits in.
 *
 * Every image sits on top of a CSS gradient in the same palette, so a slow or
 * blocked network degrades to a solid coloured panel rather than a white hole.
 *
 * Unsplash License: free to use, no attribution required (we credit anyway).
 */

const U = "https://images.unsplash.com";
const opt = (id: string, w: number, q = 70) =>
  `${U}/${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export const IMAGES = {
  /** Blackboard covered in integrals, matrices and diagrams. Dark, so white text reads on it. */
  hero: {
    src: (w: number) => opt("photo-1635070041078-e363dbe005cb", w),
    alt: "Blackboard covered in handwritten mathematical formulas and diagrams",
    credit: "Unsplash",
    fallback: "linear-gradient(150deg, #141326 0%, #1E1B3A 45%, #0E0D18 100%)",
  },
  /** A printed system of linear equations. Sits behind the notes section. */
  notes: {
    src: (w: number) => opt("photo-1509228468518-180dd4864904", w),
    alt: "A system of linear equations printed in a textbook",
    credit: "Unsplash",
    fallback: "linear-gradient(150deg, #EAF6F1 0%, #F7FBF9 100%)",
  },
  /** Library stacks. Sits with the board papers. */
  papers: {
    src: (w: number) => opt("photo-1498243691581-b145c3f54a5a", w),
    alt: "Rows of library shelves filled with books",
    credit: "Unsplash",
    fallback: "linear-gradient(150deg, #E6F0F7 0%, #F6FAFD 100%)",
  },
} as const;
