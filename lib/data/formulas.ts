export type Formula = { name: string; tex: string; note?: string };
export type FormulaGroup = { slug: string; chapter: string; items: Formula[] };

export const FORMULAS: FormulaGroup[] = [
  {
    slug: "relations-and-functions",
    chapter: "Relations and Functions",
    items: [
      { name: "Reflexive", tex: "(a,a) \\in R \;\; \\forall a \\in A", note: "Har element khud se related" },
      { name: "Symmetric", tex: "(a,b) \\in R \\Rightarrow (b,a) \\in R", note: "Dono taraf" },
      { name: "Transitive", tex: "(a,b),(b,c) \\in R \\Rightarrow (a,c) \\in R", note: "Dost ka dost" },
      { name: "One-one (injective)", tex: "f(x_1)=f(x_2) \\Rightarrow x_1=x_2" },
      { name: "Onto (surjective)", tex: "\\forall y \\in B,\; \\exists x \\in A: f(x)=y" },
      { name: "Equivalence class", tex: "[a] = \\{x \\in A : x\\,R\\,a\\}" },
      { name: "Number of relations", tex: "2^{mn}", note: "A mein m, B mein n elements" },
    ],
  },
  {
    slug: "inverse-trigonometric-functions",
    chapter: "Inverse Trigonometric Functions",
    items: [
      { name: "sin⁻¹ range", tex: "\\sin^{-1}: [-1,1] \\to \\left[-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}\\right]" },
      { name: "cos⁻¹ range", tex: "\\cos^{-1}: [-1,1] \\to [0,\\pi]", note: "Kabhi negative nahi" },
      { name: "tan⁻¹ range", tex: "\\tan^{-1}: \\mathbb{R} \\to \\left(-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}\\right)" },
      { name: "cot⁻¹ range", tex: "\\cot^{-1}: \\mathbb{R} \\to (0,\\pi)" },
      { name: "sec⁻¹ range", tex: "\\sec^{-1}: |x|\\ge1 \\to [0,\\pi]\\setminus\\{\\tfrac{\\pi}{2}\\}" },
      { name: "cosec⁻¹ range", tex: "\\csc^{-1}: |x|\\ge1 \\to \\left[-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}\\right]\\setminus\\{0\\}" },
      { name: "Complementary pairs", tex: "\\sin^{-1}x+\\cos^{-1}x = \\tan^{-1}x+\\cot^{-1}x = \\sec^{-1}x+\\csc^{-1}x = \\tfrac{\\pi}{2}" },
      { name: "Negative argument", tex: "\\sin^{-1}(-x) = -\\sin^{-1}x, \\quad \\cos^{-1}(-x) = \\pi - \\cos^{-1}x" },
      { name: "tan⁻¹ addition", tex: "\\tan^{-1}x+\\tan^{-1}y = \\tan^{-1}\\frac{x+y}{1-xy}", note: "xy < 1" },
      { name: "2 tan⁻¹ forms", tex: "2\\tan^{-1}x = \\sin^{-1}\\frac{2x}{1+x^2} = \\cos^{-1}\\frac{1-x^2}{1+x^2} = \\tan^{-1}\\frac{2x}{1-x^2}" },
    ],
  },
  {
    slug: "matrices",
    chapter: "Matrices",
    items: [
      { name: "Multiplication order", tex: "A_{m\\times n}B_{n\\times p} = C_{m\\times p}", note: "Beech wale match" },
      { name: "Transpose rules", tex: "(A')' = A,\; (AB)' = B'A',\; (kA)' = kA'" },
      { name: "Symmetric", tex: "A' = A" },
      { name: "Skew-symmetric", tex: "A' = -A,\; a_{ii} = 0" },
      { name: "Decomposition", tex: "A = \\tfrac{1}{2}(A+A') + \\tfrac{1}{2}(A-A')", note: "Symmetric + skew-symmetric" },
      { name: "Inverse property", tex: "(AB)^{-1} = B^{-1}A^{-1}" },
    ],
  },
  {
    slug: "determinants",
    chapter: "Determinants",
    items: [
      { name: "2×2 determinant", tex: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc" },
      { name: "Inverse", tex: "A^{-1} = \\frac{1}{|A|}\\text{adj}(A),\; |A| \\neq 0" },
      { name: "Adjoint identity", tex: "A(\\text{adj}A) = (\\text{adj}A)A = |A|\\,I" },
      { name: "Determinant of adjoint", tex: "|\\text{adj}A| = |A|^{n-1}" },
      { name: "Determinant of product", tex: "|AB| = |A||B|,\\quad |kA| = k^n|A|" },
      { name: "Area of triangle", tex: "\\Delta = \\tfrac{1}{2}\\left|\\begin{vmatrix} x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{vmatrix}\\right|", note: "Zero ⟹ collinear" },
      { name: "System of equations", tex: "AX = B \\Rightarrow X = A^{-1}B" },
    ],
  },
  {
    slug: "continuity-and-differentiability",
    chapter: "Continuity and Differentiability",
    items: [
      { name: "Continuity at a", tex: "\\lim_{x\\to a^-}f(x) = \\lim_{x\\to a^+}f(x) = f(a)" },
      { name: "Chain rule", tex: "\\frac{d}{dx}f(g(x)) = f'(g(x))\\cdot g'(x)" },
      { name: "Product rule", tex: "(uv)' = u'v + uv'" },
      { name: "Quotient rule", tex: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}" },
      { name: "sin⁻¹ derivative", tex: "\\frac{d}{dx}\\sin^{-1}x = \\frac{1}{\\sqrt{1-x^2}}" },
      { name: "cos⁻¹ derivative", tex: "\\frac{d}{dx}\\cos^{-1}x = \\frac{-1}{\\sqrt{1-x^2}}" },
      { name: "tan⁻¹ derivative", tex: "\\frac{d}{dx}\\tan^{-1}x = \\frac{1}{1+x^2}" },
      { name: "Log & exponential", tex: "\\frac{d}{dx}\\ln x = \\frac{1}{x},\\quad \\frac{d}{dx}e^x = e^x,\\quad \\frac{d}{dx}a^x = a^x\\ln a" },
      { name: "Parametric form", tex: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}" },
      { name: "Logarithmic diff.", tex: "y = [f(x)]^{g(x)} \\Rightarrow \\ln y = g(x)\\ln f(x)" },
    ],
  },
  {
    slug: "application-of-derivatives",
    chapter: "Application of Derivatives",
    items: [
      { name: "Rate of change", tex: "\\frac{dy}{dt} = \\frac{dy}{dx}\\cdot\\frac{dx}{dt}" },
      { name: "Increasing / decreasing", tex: "f'(x) > 0 \\Rightarrow \\text{increasing};\\quad f'(x) < 0 \\Rightarrow \\text{decreasing}" },
      { name: "Second derivative test", tex: "f'(c)=0,\; f''(c)<0 \\Rightarrow \\text{max};\\quad f''(c)>0 \\Rightarrow \\text{min}" },
      { name: "Absolute max/min", tex: "\\text{Compare } f(\\text{critical points}) \\text{ and } f(a), f(b)", note: "Closed interval [a,b]" },
    ],
  },
  {
    slug: "integrals",
    chapter: "Integrals",
    items: [
      { name: "Power rule", tex: "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C,\; n \\neq -1" },
      { name: "Reciprocal", tex: "\\int \\frac{1}{x}dx = \\ln|x| + C" },
      { name: "Exponential", tex: "\\int e^x dx = e^x + C,\\quad \\int a^x dx = \\frac{a^x}{\\ln a} + C" },
      { name: "Trigonometric", tex: "\\int \\sin x\\,dx = -\\cos x + C,\\quad \\int \\cos x\\,dx = \\sin x + C" },
      { name: "sec² and cosec²", tex: "\\int \\sec^2x\\,dx = \\tan x + C,\\quad \\int \\csc^2x\\,dx = -\\cot x + C" },
      { name: "Standard I", tex: "\\int \\frac{dx}{x^2+a^2} = \\frac{1}{a}\\tan^{-1}\\frac{x}{a} + C" },
      { name: "Standard II", tex: "\\int \\frac{dx}{\\sqrt{a^2-x^2}} = \\sin^{-1}\\frac{x}{a} + C" },
      { name: "Standard III", tex: "\\int \\frac{dx}{x^2-a^2} = \\frac{1}{2a}\\ln\\left|\\frac{x-a}{x+a}\\right| + C" },
      { name: "Standard IV", tex: "\\int \\frac{dx}{\\sqrt{x^2 \\pm a^2}} = \\ln\\left|x + \\sqrt{x^2 \\pm a^2}\\right| + C" },
      { name: "By parts (ILATE)", tex: "\\int uv\\,dx = u\\int v\\,dx - \\int\\left(u'\\int v\\,dx\\right)dx" },
      { name: "Special eˣ form", tex: "\\int e^x[f(x)+f'(x)]dx = e^x f(x) + C" },
      { name: "Definite property 1", tex: "\\int_0^a f(x)dx = \\int_0^a f(a-x)dx", note: "Board favourite" },
      { name: "Definite property 2", tex: "\\int_{-a}^{a} f(x)dx = \\begin{cases} 2\\int_0^a f(x)dx & f \\text{ even} \\\\ 0 & f \\text{ odd}\\end{cases}" },
      { name: "Definite property 3", tex: "\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx" },
    ],
  },
  {
    slug: "application-of-integrals",
    chapter: "Application of Integrals",
    items: [
      { name: "Area under curve", tex: "A = \\int_a^b y\\,dx = \\int_a^b f(x)\\,dx" },
      { name: "Area w.r.t. y-axis", tex: "A = \\int_c^d x\\,dy" },
      { name: "Between two curves", tex: "A = \\int_a^b (y_{\\text{upper}} - y_{\\text{lower}})\\,dx" },
      { name: "Circle area", tex: "A = 4\\int_0^a \\sqrt{a^2-x^2}\\,dx = \\pi a^2", note: "Symmetry use karo" },
    ],
  },
  {
    slug: "differential-equations",
    chapter: "Differential Equations",
    items: [
      { name: "Order & degree", tex: "\\text{Order} = \\text{highest derivative};\; \\text{Degree} = \\text{its power}", note: "Polynomial form mein hi" },
      { name: "Variable separable", tex: "\\int \\frac{dy}{g(y)} = \\int f(x)\\,dx + C" },
      { name: "Homogeneous", tex: "y = vx \\Rightarrow \\frac{dy}{dx} = v + x\\frac{dv}{dx}" },
      { name: "Linear in y", tex: "\\frac{dy}{dx} + Py = Q,\; \\text{IF} = e^{\\int P dx},\; y\\cdot\\text{IF} = \\int Q\\cdot\\text{IF}\\,dx + C" },
      { name: "Linear in x", tex: "\\frac{dx}{dy} + Px = Q,\; \\text{IF} = e^{\\int P dy}" },
    ],
  },
  {
    slug: "vector-algebra",
    chapter: "Vector Algebra",
    items: [
      { name: "Magnitude", tex: "|\\vec{a}| = \\sqrt{a_1^2+a_2^2+a_3^2}" },
      { name: "Unit vector", tex: "\\hat{a} = \\frac{\\vec{a}}{|\\vec{a}|}" },
      { name: "Dot product", tex: "\\vec{a}\\cdot\\vec{b} = a_1b_1+a_2b_2+a_3b_3 = |\\vec{a}||\\vec{b}|\\cos\\theta", note: "Answer = number" },
      { name: "Perpendicular test", tex: "\\vec{a}\\cdot\\vec{b} = 0 \\iff \\vec{a} \\perp \\vec{b}" },
      { name: "Projection", tex: "\\text{Projection of } \\vec{a} \\text{ on } \\vec{b} = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}" },
      { name: "Cross product", tex: "\\vec{a}\\times\\vec{b} = \\begin{vmatrix}\\hat{i}&\\hat{j}&\\hat{k}\\\\a_1&a_2&a_3\\\\b_1&b_2&b_3\\end{vmatrix}", note: "Answer = vector" },
      { name: "Triangle area", tex: "A = \\tfrac{1}{2}|\\vec{a}\\times\\vec{b}|" },
      { name: "Parallelogram area", tex: "A = |\\vec{a}\\times\\vec{b}|" },
      { name: "Section formula", tex: "\\vec{r} = \\frac{m\\vec{b}+n\\vec{a}}{m+n}", note: "Internal division" },
    ],
  },
  {
    slug: "three-dimensional-geometry",
    chapter: "Three Dimensional Geometry",
    items: [
      { name: "Direction cosines", tex: "l^2+m^2+n^2 = 1" },
      { name: "DCs from DRs", tex: "l = \\frac{a}{\\sqrt{a^2+b^2+c^2}},\; m = \\frac{b}{\\sqrt{\\cdot}},\; n = \\frac{c}{\\sqrt{\\cdot}}" },
      { name: "Line - vector form", tex: "\\vec{r} = \\vec{a} + \\lambda\\vec{b}" },
      { name: "Line - cartesian form", tex: "\\frac{x-x_1}{a} = \\frac{y-y_1}{b} = \\frac{z-z_1}{c}" },
      { name: "Line through 2 points", tex: "\\frac{x-x_1}{x_2-x_1} = \\frac{y-y_1}{y_2-y_1} = \\frac{z-z_1}{z_2-z_1}" },
      { name: "Angle between lines", tex: "\\cos\\theta = \\left|\\frac{\\vec{b_1}\\cdot\\vec{b_2}}{|\\vec{b_1}||\\vec{b_2}|}\\right|" },
      { name: "Shortest distance (skew)", tex: "d = \\left|\\frac{(\\vec{a_2}-\\vec{a_1})\\cdot(\\vec{b_1}\\times\\vec{b_2})}{|\\vec{b_1}\\times\\vec{b_2}|}\\right|" },
      { name: "Distance (parallel lines)", tex: "d = \\left|\\frac{\\vec{b}\\times(\\vec{a_2}-\\vec{a_1})}{|\\vec{b}|}\\right|" },
    ],
  },
  {
    slug: "linear-programming",
    chapter: "Linear Programming",
    items: [
      { name: "Standard form", tex: "\\text{Max/Min } Z = ax+by \\text{ s.t. constraints},\; x\\ge0,\; y\\ge0" },
      { name: "Corner Point Theorem", tex: "\\text{Optimal value occurs at a vertex of the feasible region}", note: "Saare corners ka table banao" },
    ],
  },
  {
    slug: "probability",
    chapter: "Probability",
    items: [
      { name: "Conditional probability", tex: "P(A|B) = \\frac{P(A\\cap B)}{P(B)},\; P(B)\\neq0" },
      { name: "Multiplication theorem", tex: "P(A\\cap B) = P(B)P(A|B) = P(A)P(B|A)" },
      { name: "Independent events", tex: "P(A\\cap B) = P(A)P(B)" },
      { name: "Addition theorem", tex: "P(A\\cup B) = P(A)+P(B)-P(A\\cap B)" },
      { name: "Total probability", tex: "P(A) = \\sum_i P(E_i)P(A|E_i)" },
      { name: "Bayes' theorem", tex: "P(E_i|A) = \\frac{P(E_i)P(A|E_i)}{\\sum_j P(E_j)P(A|E_j)}", note: "5-marker" },
      { name: "Mean of random variable", tex: "E(X) = \\mu = \\sum x_i p_i,\\quad \\sum p_i = 1" },
    ],
  },
];

export function formulasFor(slug: string) {
  return FORMULAS.find((f) => f.slug === slug);
}

export const ALL_FORMULA_COUNT = FORMULAS.reduce((n, g) => n + g.items.length, 0);
