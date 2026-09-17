export type Video = {
  id: string;          // YouTube video id
  title: string;
  by: string;
  mins?: number;
  covers?: string;     // which part of the chapter
};

export type Chapter = {
  n: number;
  slug: string;
  title: string;
  hinglish: string;      // fun Hinglish subtitle
  unit: string;
  unitMarks: number;
  emoji: string;
  color: string;         // tailwind-ish hex for accents
  blurb: string;         // Hinglish hook, 1-2 lines
  difficulty: 1 | 2 | 3; // 1 easy, 3 tough
  estMins: number;
  topics: string[];
  scoring: string;       // what typically comes in the board paper
  videos: Video[];
  searchQuery: string;   // fallback YouTube search
};

export const CHAPTERS: Chapter[] = [
  {
    n: 1,
    slug: "relations-and-functions",
    title: "Relations and Functions",
    hinglish: "Rishte aur Rules",
    unit: "Relations and Functions",
    unitMarks: 8,
    emoji: "🔗",
    color: "#7C5CFF",
    blurb: "Socho ki poora class ek set hai. Kaun kiska dost hai — wahi relation hai. Aur function? Woh vending machine jo har button ka ek hi snack deta hai.",
    difficulty: 2,
    estMins: 150,
    topics: [
      "Types of relations: reflexive, symmetric, transitive",
      "Equivalence relations and equivalence classes",
      "One-one (injective) and onto (surjective) functions",
      "Bijective functions",
    ],
    scoring:
      "Almost guaranteed: ek 5-marker 'show that R is an equivalence relation' ya 'prove f is bijective'. Sirf definitions ratt lo aur proof ka format pakad lo — 5 marks pakke.",
    videos: [
      { id: "GyNe-4asNgE", title: "Relation And Function Class 12 One Shot | Complete Chapter", by: "Deepak Sir", covers: "Full chapter" },
      { id: "NYCjVHSSNKM", title: "Relations and Functions — Super One Shot", by: "Ushank Sir", covers: "Full chapter" },
      { id: "O-5Fmwvxn7w", title: "Relations & Functions + Inverse Trig — Board Marathon", by: "Board Marathon", covers: "Ch 1 + Ch 2" },
    ],
    searchQuery: "class 12 maths relations and functions one shot cbse",
  },
  {
    n: 2,
    slug: "inverse-trigonometric-functions",
    title: "Inverse Trigonometric Functions",
    hinglish: "Ulta Trigonometry",
    unit: "Relations and Functions",
    unitMarks: 8,
    emoji: "🔄",
    color: "#38BDF8",
    blurb: "sin ne answer de diya, ab tumhe angle wapas dhoondhna hai. Ek hi shart — har inverse ka apna ilaaka (principal branch) hota hai, usse bahar mat jao.",
    difficulty: 2,
    estMins: 120,
    topics: [
      "Definition, domain, range, principal value branches",
      "Graphs of inverse trigonometric functions",
      "Principal value problems",
      "Simplification using identities",
    ],
    scoring:
      "1 aur 2 markers ki factory. Principal value nikalne wale sawaal har saal aate hain. Range table yaad = free marks.",
    videos: [
      { id: "4Aml6yd4tDY", title: "Inverse Trigonometric Functions in ONE SHOT | Full Chapter", by: "Physics Wallah", covers: "Full chapter" },
      { id: "y5EZR1ObfNE", title: "Inverse Trigonometry Full Chapter in One Shot | CBSE 2026", by: "One Shot", covers: "Full chapter" },
      { id: "JDEod1lmAwg", title: "Inverse Trigonometric Function — Super One Shot", by: "Ushank Sir", covers: "Full chapter" },
      { id: "Djife9uhmkM", title: "Inverse Trig One Shot | NCERT Revision", by: "Vijeta 2026", covers: "Revision" },
    ],
    searchQuery: "class 12 maths inverse trigonometric functions one shot cbse principal value",
  },
  {
    n: 3,
    slug: "matrices",
    title: "Matrices",
    hinglish: "Number ka Chakravyuh",
    unit: "Algebra",
    unitMarks: 10,
    emoji: "🧮",
    color: "#22D3A5",
    blurb: "Matrix matlab numbers ki fauj, rows aur columns mein khadi. Sabse aasaan chapter hai board mein — bas multiplication ka order mat bhoolna.",
    difficulty: 1,
    estMins: 130,
    topics: [
      "Types of matrices, equality of matrices",
      "Addition, scalar multiplication, matrix multiplication",
      "Transpose, symmetric and skew-symmetric matrices",
      "Invertible matrices and uniqueness of inverse",
    ],
    scoring:
      "Sabse safe marks. Symmetric + skew-symmetric mein todna (A = ½(A+A') + ½(A−A')) ek classic 3-marker hai.",
    videos: [
      { id: "GuCCuLbcSho", title: "Relations, Inverse Trig, Matrices & Determinants — One Shot", by: "One Shot", covers: "Ch 1–4 combined" },
      { id: "4Eab7N6KT9E", title: "Complete Class 12th Maths — ALL Chapters in One Video", by: "Full Marathon", covers: "Whole syllabus" },
    ],
    searchQuery: "class 12 maths matrices one shot full chapter cbse",
  },
  {
    n: 4,
    slug: "determinants",
    title: "Determinants",
    hinglish: "Matrix ka Aadhaar Number",
    unit: "Algebra",
    unitMarks: 10,
    emoji: "🎯",
    color: "#FFB020",
    blurb: "Har square matrix ka ek single number — uski pehchaan. Agar woh zero hai, matrix ka inverse hi nahi banega. Poori kahani ek number mein.",
    difficulty: 2,
    estMins: 150,
    topics: [
      "Determinant of a square matrix (up to 3×3), properties",
      "Area of a triangle using determinants",
      "Minors, cofactors, adjoint of a matrix",
      "Inverse of a matrix, consistency of a system",
      "Solving a system of linear equations in 3 variables (matrix method)",
    ],
    scoring:
      "5-marker almost fixed: A⁻¹ nikaal ke 3 equations solve karo. Ek baar steps ratt liye to har saal wahi marks.",
    videos: [
      { id: "GuCCuLbcSho", title: "Relations, Inverse Trig, Matrices & Determinants — One Shot", by: "One Shot", covers: "Ch 1–4 combined" },
      { id: "4Eab7N6KT9E", title: "Complete Class 12th Maths — ALL Chapters in One Video", by: "Full Marathon", covers: "Whole syllabus" },
    ],
    searchQuery: "class 12 maths determinants one shot adjoint inverse system of equations cbse",
  },
  {
    n: 5,
    slug: "continuity-and-differentiability",
    title: "Continuity and Differentiability",
    hinglish: "Bina Pen Uthaye",
    unit: "Calculus",
    unitMarks: 35,
    emoji: "📈",
    color: "#FF5470",
    blurb: "Continuous matlab graph bina pen uthaye ban jaaye. Differentiable matlab usme koi nukkeela mod (sharp corner) bhi na ho. Har continuous cheez differentiable nahi hoti — yahi twist hai.",
    difficulty: 3,
    estMins: 220,
    topics: [
      "Continuity, algebra of continuous functions",
      "Differentiability, chain rule",
      "Derivatives of inverse trigonometric functions",
      "Implicit differentiation, logarithmic differentiation",
      "Derivatives of functions in parametric form",
      "Second order derivatives",
    ],
    scoring:
      "Calculus unit ka 35 marks ka darwaza. Continuity at a point (LHL = RHL = f(a)) aur second order derivative — dono har paper mein.",
    videos: [
      { id: "cIxHoVCUN1M", title: "Continuity and Differentiability in ONE SHOT | Full Chapter", by: "Physics Wallah", covers: "Full chapter" },
      { id: "cnpv-t2DGiw", title: "Continuity & Differentiability One Shot — Full NCERT with PYQs", by: "Ushank Sir", covers: "Full chapter + PYQ" },
      { id: "PBg4P0XFtXo", title: "Continuity And Differentiability One Shot | NCERT Revision", by: "Vijeta 2026", covers: "Revision" },
      { id: "SUG00SexJHA", title: "Continuity And Differentiability One Shot | Class 12th Boards", by: "Boards Special", covers: "Board focus" },
    ],
    searchQuery: "class 12 maths continuity and differentiability one shot cbse",
  },
  {
    n: 6,
    slug: "application-of-derivatives",
    title: "Application of Derivatives",
    hinglish: "Derivative ka Asli Kaam",
    unit: "Calculus",
    unitMarks: 35,
    emoji: "⛰️",
    color: "#A78BFA",
    blurb: "Derivative sirf formula nahi — yeh batata hai cheez badh rahi hai ya ghat rahi, aur pahaad ki choti (maximum) kahaan hai. Board mein iska word problem 5 marks ka hota hai.",
    difficulty: 3,
    estMins: 200,
    topics: [
      "Rate of change of quantities",
      "Increasing and decreasing functions",
      "Maxima and minima (first and second derivative test)",
      "Simple word problems on maxima and minima",
    ],
    scoring:
      "Maxima–minima ka word problem (dabba banao, area maximise karo) — 5 marks ka regular mehmaan. Increasing/decreasing interval 3-marker.",
    videos: [
      { id: "xFN4Yrwjv5c", title: "Application Of Derivatives + Continuity & Differentiability | Board 2026", by: "Board Special", covers: "Ch 5 + Ch 6" },
      { id: "4Eab7N6KT9E", title: "Complete Class 12th Maths — ALL Chapters in One Video", by: "Full Marathon", covers: "Whole syllabus" },
    ],
    searchQuery: "class 12 maths application of derivatives one shot maxima minima cbse",
  },
  {
    n: 7,
    slug: "integrals",
    title: "Integrals",
    hinglish: "Ulta Derivative, Double Marks",
    unit: "Calculus",
    unitMarks: 35,
    emoji: "∫",
    color: "#F472B6",
    blurb: "Integration matlab differentiation ka ulta safar. Sabse zyada marks isi chapter se aate hain — aur sabse zyada log yahi chhod dete hain. Tum mat chhodna.",
    difficulty: 3,
    estMins: 300,
    topics: [
      "Integration as inverse of differentiation",
      "Integration by substitution",
      "Integration by partial fractions",
      "Integration by parts",
      "Standard integral types",
      "Definite integrals and their properties",
      "Evaluation of definite integrals",
    ],
    scoring:
      "Sabse bhaari chapter. Har paper mein kam se kam 12–15 marks. Properties of definite integrals (∫₀ᵃ f(x) = ∫₀ᵃ f(a−x)) ek baar samajh lo, life set.",
    videos: [
      { id: "4Eab7N6KT9E", title: "Complete Class 12th Maths — ALL Chapters in One Video", by: "Full Marathon", covers: "Whole syllabus" },
      { id: "lnR343-9vFY", title: "Application of Integrals One Shot — Full NCERT", by: "Ushank Sir", covers: "Ch 8 (next step)" },
    ],
    searchQuery: "class 12 maths integrals one shot full chapter integration by parts partial fractions cbse",
  },
  {
    n: 8,
    slug: "application-of-integrals",
    title: "Application of Integrals",
    hinglish: "Curve ke Neeche ka Area",
    unit: "Calculus",
    unitMarks: 35,
    emoji: "📐",
    color: "#34D399",
    blurb: "Integration se ab hum shape ka area nikalenge — circle, parabola, ellipse. Graph banao, limits pakdo, integrate karo. Bas teen step.",
    difficulty: 2,
    estMins: 120,
    topics: [
      "Area under simple curves (lines, circles, parabolas, ellipses)",
      "Area bounded between a curve and a line",
    ],
    scoring:
      "Ek 3 ya 5 marker guaranteed. Graph zaroor banao — diagram ke bina full marks nahi milte, aur diagram ke saath step marks mil jaate hain.",
    videos: [
      { id: "lnR343-9vFY", title: "Application of Integrals One Shot — Full NCERT", by: "Ushank Sir", covers: "Full chapter" },
      { id: "4Eab7N6KT9E", title: "Complete Class 12th Maths — ALL Chapters in One Video", by: "Full Marathon", covers: "Whole syllabus" },
    ],
    searchQuery: "class 12 maths application of integrals area under curve one shot cbse",
  },
  {
    n: 9,
    slug: "differential-equations",
    title: "Differential Equations",
    hinglish: "Equation jisme Derivative Chhupa Hai",
    unit: "Calculus",
    unitMarks: 35,
    emoji: "🌱",
    color: "#60A5FA",
    blurb: "Yahan equation mein x, y ke saath dy/dx bhi baitha hai. Kaam simple — dy/dx ko hatao aur y nikaalo. Population growth se lekar cooling tak, sab yahi hai.",
    difficulty: 3,
    estMins: 180,
    topics: [
      "Order and degree of a differential equation",
      "General and particular solutions",
      "Solution by variable separable method",
      "Homogeneous differential equations",
      "Linear differential equations (integrating factor)",
    ],
    scoring:
      "Order/degree ka 1-marker, variable separable ka 3-marker, aur linear DE (IF method) ka 5-marker — teeno pattern fix hain.",
    videos: [
      { id: "4Eab7N6KT9E", title: "Complete Class 12th Maths — ALL Chapters in One Video", by: "Full Marathon", covers: "Whole syllabus" },
    ],
    searchQuery: "class 12 maths differential equations one shot integrating factor homogeneous cbse",
  },
  {
    n: 10,
    slug: "vector-algebra",
    title: "Vector Algebra",
    hinglish: "Arrow wala Maths",
    unit: "Vectors and Three-Dimensional Geometry",
    unitMarks: 14,
    emoji: "➡️",
    color: "#FB923C",
    blurb: "Number sirf 'kitna' batata hai. Vector 'kitna aur kis taraf' — dono. Dot product ek number deta hai, cross product ek naya vector. Yahi do hathiyaar kaafi hain.",
    difficulty: 2,
    estMins: 150,
    topics: [
      "Vectors and scalars, magnitude and direction",
      "Direction cosines and direction ratios",
      "Types of vectors, position vector, components",
      "Addition of vectors, scalar multiplication",
      "Scalar (dot) product, projection of a vector",
      "Vector (cross) product",
    ],
    scoring:
      "Scoring aur short. Dot/cross product ke 2 aur 3 markers pakke. Area of triangle/parallelogram ek favourite sawaal hai.",
    videos: [
      { id: "ljJvExRoxxo", title: "Vector Algebra + Three Dimensional Geometry in One Shot", by: "One Shot", covers: "Ch 10 + Ch 11" },
      { id: "ceAXKAjMB8o", title: "Vector, 3D, LPP & Probability Revision in One Shot | Boards", by: "Board Revision", covers: "Ch 10–13" },
      { id: "6pjnGm0ZpEU", title: "Vector Algebra & 3-D Geometry | Most Expected Questions", by: "Board 2025-26", covers: "Expected Qs" },
    ],
    searchQuery: "class 12 maths vector algebra one shot dot product cross product cbse",
  },
  {
    n: 11,
    slug: "three-dimensional-geometry",
    title: "Three Dimensional Geometry",
    hinglish: "Space mein Line",
    unit: "Vectors and Three-Dimensional Geometry",
    unitMarks: 14,
    emoji: "🧊",
    color: "#818CF8",
    blurb: "Ab paper se nikal ke hawa mein aa gaye. Lines space mein ghoom rahi hain — kabhi milti hain, kabhi nahi (skew). Formula sheet ke bina yeh chapter adhoora hai.",
    difficulty: 2,
    estMins: 150,
    topics: [
      "Direction cosines and direction ratios of a line",
      "Equation of a line in space (vector and cartesian form)",
      "Angle between two lines",
      "Skew lines and shortest distance between two lines",
    ],
    scoring:
      "Shortest distance between skew lines — classic 5-marker. Formula yaad hai to answer 4 line mein khatam.",
    videos: [
      { id: "ljJvExRoxxo", title: "Vector Algebra + Three Dimensional Geometry in One Shot", by: "One Shot", covers: "Ch 10 + Ch 11" },
      { id: "ceAXKAjMB8o", title: "Vector, 3D, LPP & Probability Revision in One Shot | Boards", by: "Board Revision", covers: "Ch 10–13" },
      { id: "6pjnGm0ZpEU", title: "Vector Algebra & 3-D Geometry | Most Expected Questions", by: "Board 2025-26", covers: "Expected Qs" },
    ],
    searchQuery: "class 12 maths three dimensional geometry one shot shortest distance skew lines cbse",
  },
  {
    n: 12,
    slug: "linear-programming",
    title: "Linear Programming",
    hinglish: "Maximum Profit ka Formula",
    unit: "Linear Programming",
    unitMarks: 5,
    emoji: "📊",
    color: "#2DD4BF",
    blurb: "Factory chalani hai, limited raw material hai, maximum profit chahiye. Graph banao, corner points nikalo, value check karo. Poora chapter 5 marks, aur sabse aasaan 5 marks.",
    difficulty: 1,
    estMins: 90,
    topics: [
      "Introduction, related terminology (constraints, objective function, optimisation)",
      "Graphical method of solution for problems in two variables",
      "Feasible and infeasible regions (bounded)",
      "Feasible and infeasible solutions, optimal feasible solutions (up to three non-trivial constraints)",
    ],
    scoring:
      "Guaranteed 5 marks, guaranteed easy. Sirf graph saaf banao aur corner point table zaroor likho — marking scheme usi table ko marks deta hai.",
    videos: [
      { id: "ceAXKAjMB8o", title: "Vector, 3D, LPP & Probability Revision in One Shot | Boards", by: "Board Revision", covers: "Ch 10–13" },
      { id: "79F0cMRgbfw", title: "Vector, 3D, LPP — Competency-Based Questions", by: "Competency Special", covers: "New pattern Qs" },
      { id: "jxL4iypbgFE", title: "Vectors, 3D, LPP & Probability Important Questions One Shot", by: "CBSE 2026", covers: "Important Qs" },
    ],
    searchQuery: "class 12 maths linear programming one shot graphical method corner point cbse",
  },
  {
    n: 13,
    slug: "probability",
    title: "Probability",
    hinglish: "Kismat ka Ganit",
    unit: "Probability",
    unitMarks: 8,
    emoji: "🎲",
    color: "#F59E0B",
    blurb: "Kya chance hai ki baarish hogi? Yeh chapter chance ko number mein badal deta hai. Bayes' theorem pehli baar dimaag ghumata hai, phir addiction ban jaata hai.",
    difficulty: 2,
    estMins: 150,
    topics: [
      "Conditional probability",
      "Multiplication theorem on probability",
      "Independent events",
      "Total probability",
      "Bayes' theorem",
      "Random variable and its probability distribution, mean of a random variable",
    ],
    scoring:
      "Bayes' theorem ka 5-marker almost fixed hai (do factory, kaunsi se bulb aaya type). Tree diagram bana lo — aadha kaam wahin ho jaata hai.",
    videos: [
      { id: "ceAXKAjMB8o", title: "Vector, 3D, LPP & Probability Revision in One Shot | Boards", by: "Board Revision", covers: "Ch 10–13" },
      { id: "jxL4iypbgFE", title: "Vectors, 3D, LPP & Probability Important Questions One Shot", by: "CBSE 2026", covers: "Important Qs" },
    ],
    searchQuery: "class 12 maths probability one shot bayes theorem conditional probability cbse",
  },
];

export const UNITS = [
  { name: "Relations and Functions", marks: 8, chapters: [1, 2], color: "#7C5CFF" },
  { name: "Algebra", marks: 10, chapters: [3, 4], color: "#22D3A5" },
  { name: "Calculus", marks: 35, chapters: [5, 6, 7, 8, 9], color: "#FF5470" },
  { name: "Vectors and Three-Dimensional Geometry", marks: 14, chapters: [10, 11], color: "#FB923C" },
  { name: "Linear Programming", marks: 5, chapters: [12], color: "#2DD4BF" },
  { name: "Probability", marks: 8, chapters: [13], color: "#F59E0B" },
];

export const PLAYLISTS = [
  { id: "PLPFrn0ppwwkTlUKtGb4DPt46ijWEMNFZL", title: "Class 12 Maths NCERT Solutions — All Chapters (Hindi/English)", by: "LearnoHub" },
  { id: "PL65T2neerQz-lVQjXWI1j-Um4lNrcAmpq", title: "Maths | Full Chapter One Shot | Class 12", by: "One Shot Series" },
  { id: "PLqjFFrfKcY5w1RNfgkgUjaNK18RZGe0Cv", title: "NCERT Class 12 Maths in 1 Shot", by: "1 Shot Series" },
  { id: "PLPFrn0ppwwkSnjP1QNkOTGVI8_RYB85vx", title: "All Concepts — Class 12 Maths", by: "LearnoHub" },
  { id: "PL5rBp3kXkJdCGFT6yK2mZTke5Iu7tBEWr", title: "CBSE Class 12 | Maths", by: "CBSE Series" },
];

export function getChapter(slug: string) {
  return CHAPTERS.find((c) => c.slug === slug);
}

export const TOTAL_THEORY_MARKS = 80;
export const INTERNAL_MARKS = 20;
