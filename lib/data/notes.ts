export type NoteBlock =
  | { t: "h"; text: string }                       // heading
  | { t: "p"; text: string }                       // plain line
  | { t: "f"; tex: string; label?: string }        // boxed formula
  | { t: "star"; text: string }                    // starred important point
  | { t: "warn"; text: string };                   // red-pen warning

export type Note = { slug: string; title: string; pages: NoteBlock[][] };

export const NOTES: Note[] = [
  {
    slug: "relations-and-functions",
    title: "Relations & Functions — Revision Sheet",
    pages: [
      [
        { t: "h", text: "RELATION ki 3 properties" },
        { t: "p", text: "R ⊆ A × B. Agar (a,b) ∈ R to likhte hain a R b" },
        { t: "f", tex: "(a,a) \\in R", label: "Reflexive — khud se" },
        { t: "f", tex: "(a,b)\\in R \\Rightarrow (b,a)\\in R", label: "Symmetric — dono taraf" },
        { t: "f", tex: "(a,b),(b,c)\\in R \\Rightarrow (a,c)\\in R", label: "Transitive — dost ka dost" },
        { t: "star", text: "Teeno = EQUIVALENCE RELATION (5 marks ka sawaal)" },
        { t: "warn", text: "Symmetric + Transitive ≠ Reflexive! Empty relation iska proof hai" },
        { t: "h", text: "FUNCTION" },
        { t: "f", tex: "f(x_1)=f(x_2) \\Rightarrow x_1=x_2", label: "One-one (injective)" },
        { t: "f", tex: "\\forall y \\in B, \\exists x: f(x)=y", label: "Onto (surjective)" },
        { t: "p", text: "One-one + Onto = BIJECTIVE" },
        { t: "star", text: "Proof format: heading likho → prove karo → 'Hence...' likho" },
      ],
    ],
  },
  {
    slug: "inverse-trigonometric-functions",
    title: "Inverse Trig — Revision Sheet",
    pages: [
      [
        { t: "h", text: "PRINCIPAL VALUE BRANCHES (ratt lo!)" },
        { t: "f", tex: "\\sin^{-1}x \\in [-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}]" },
        { t: "f", tex: "\\cos^{-1}x \\in [0,\\pi]", label: "kabhi negative nahi" },
        { t: "f", tex: "\\tan^{-1}x \\in (-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2})" },
        { t: "f", tex: "\\cot^{-1}x \\in (0,\\pi)" },
        { t: "star", text: "sin, tan, cosec → negative allowed | cos, cot, sec → 0 se π tak" },
        { t: "h", text: "IDENTITIES" },
        { t: "f", tex: "\\sin^{-1}x + \\cos^{-1}x = \\tfrac{\\pi}{2}" },
        { t: "f", tex: "\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\tfrac{x+y}{1-xy}", label: "xy < 1" },
        { t: "f", tex: "\\cos^{-1}(-x) = \\pi - \\cos^{-1}x" },
        { t: "warn", text: "cos⁻¹(−½) = 2π/3, NOT −π/3. Range check karo!" },
      ],
    ],
  },
  {
    slug: "matrices",
    title: "Matrices — Revision Sheet",
    pages: [
      [
        { t: "h", text: "BASICS" },
        { t: "p", text: "Order = m × n (rows pehle, columns baad mein)" },
        { t: "f", tex: "A_{m\\times n}B_{n\\times p} = C_{m\\times p}", label: "beech match, bahar answer" },
        { t: "warn", text: "AB ≠ BA! Aur AB = 0 ka matlab A = 0 ya B = 0 NAHI hai" },
        { t: "h", text: "TRANSPOSE" },
        { t: "f", tex: "(AB)' = B'A'", label: "order ulta ho jaata hai" },
        { t: "f", tex: "A' = A", label: "Symmetric" },
        { t: "f", tex: "A' = -A,\; a_{ii}=0", label: "Skew-symmetric" },
        { t: "star", text: "A = ½(A+A') + ½(A−A')  ← 3-marker, har saal aata hai" },
      ],
    ],
  },
  {
    slug: "determinants",
    title: "Determinants — Revision Sheet",
    pages: [
      [
        { t: "h", text: "DETERMINANT" },
        { t: "f", tex: "\\begin{vmatrix} a&b\\\\c&d \\end{vmatrix} = ad-bc" },
        { t: "p", text: "3×3: pehli row expand karo, signs + − +" },
        { t: "h", text: "INVERSE ka raasta" },
        { t: "p", text: "Minors → Cofactors → adj(A) = cofactor matrix ka TRANSPOSE → A⁻¹" },
        { t: "f", tex: "A^{-1} = \\tfrac{1}{|A|}\\text{adj}(A)", label: "|A| ≠ 0 zaroori" },
        { t: "f", tex: "|\\text{adj}A| = |A|^{n-1}" },
        { t: "f", tex: "A(\\text{adj}A) = |A|I" },
        { t: "warn", text: "TRANSPOSE lena mat bhoolna adjoint mein — sabse common galti" },
        { t: "h", text: "5-MARKER BLUEPRINT" },
        { t: "p", text: "1. AX = B likho  2. |A| nikalo  3. cofactors  4. adj A  5. A⁻¹  6. X = A⁻¹B" },
        { t: "f", tex: "\\Delta = \\tfrac{1}{2}\\left|\\begin{vmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{vmatrix}\\right|", label: "Area; 0 ⟹ collinear" },
      ],
    ],
  },
  {
    slug: "continuity-and-differentiability",
    title: "Continuity & Differentiability — Revision Sheet",
    pages: [
      [
        { t: "h", text: "CONTINUITY at x = a" },
        { t: "f", tex: "\\lim_{x\\to a^-}f(x) = \\lim_{x\\to a^+}f(x) = f(a)" },
        { t: "p", text: "LHL: x = a − h | RHL: x = a + h | phir h → 0" },
        { t: "warn", text: "Differentiable ⟹ Continuous. ULTA NAHI! |x| at x=0 ka example yaad rakho" },
        { t: "h", text: "DERIVATIVES ki list" },
        { t: "f", tex: "\\frac{d}{dx}\\sin^{-1}x = \\frac{1}{\\sqrt{1-x^2}}" },
        { t: "f", tex: "\\frac{d}{dx}\\tan^{-1}x = \\frac{1}{1+x^2}" },
        { t: "f", tex: "\\frac{d}{dx}a^x = a^x\\ln a" },
        { t: "f", tex: "(uv)' = u'v+uv'", label: "Product rule" },
        { t: "h", text: "SPECIAL METHODS" },
        { t: "f", tex: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}", label: "Parametric" },
        { t: "star", text: "Power mein x ho (jaise xˣ)? → dono taraf log lagao" },
      ],
    ],
  },
  {
    slug: "application-of-derivatives",
    title: "Application of Derivatives — Revision Sheet",
    pages: [
      [
        { t: "h", text: "INCREASING / DECREASING" },
        { t: "f", tex: "f'(x)>0 \\Rightarrow \\uparrow,\\qquad f'(x)<0 \\Rightarrow \\downarrow" },
        { t: "p", text: "f'(x) = 0 se critical points → number line → har hisse ka sign" },
        { t: "h", text: "MAXIMA / MINIMA" },
        { t: "f", tex: "f'(c)=0,\; f''(c)<0 \\Rightarrow \\text{MAX}" },
        { t: "f", tex: "f'(c)=0,\; f''(c)>0 \\Rightarrow \\text{MIN}" },
        { t: "star", text: "Word problem ke 5 steps: 1 variable mein laao → f'=0 → f'' se check → answer + units" },
        { t: "warn", text: "f'' test likhna bhool gaye = 1 mark gaya. Aur diagram zaroor banao" },
      ],
    ],
  },
  {
    slug: "integrals",
    title: "Integrals — Revision Sheet",
    pages: [
      [
        { t: "h", text: "BASIC INTEGRALS" },
        { t: "f", tex: "\\int x^n dx = \\frac{x^{n+1}}{n+1}+C", label: "n ≠ −1" },
        { t: "f", tex: "\\int \\frac{dx}{x} = \\ln|x|+C" },
        { t: "f", tex: "\\int \\frac{dx}{x^2+a^2} = \\frac{1}{a}\\tan^{-1}\\frac{x}{a}+C" },
        { t: "f", tex: "\\int \\frac{dx}{\\sqrt{a^2-x^2}} = \\sin^{-1}\\frac{x}{a}+C" },
        { t: "f", tex: "\\int \\frac{dx}{x^2-a^2} = \\frac{1}{2a}\\ln\\left|\\frac{x-a}{x+a}\\right|+C" },
        { t: "h", text: "3 METHODS" },
        { t: "p", text: "1. Substitution — function + uska derivative dikhe" },
        { t: "p", text: "2. By parts — ILATE se u chuno" },
        { t: "p", text: "3. Partial fractions — denominator factorise ho" },
        { t: "f", tex: "\\int uv\\,dx = u\\int v\\,dx - \\int(u'\\int v\\,dx)dx" },
        { t: "star", text: "ILATE = Inverse, Log, Algebraic, Trig, Exponential" },
      ],
      [
        { t: "h", text: "DEFINITE INTEGRAL PROPERTIES" },
        { t: "f", tex: "\\int_0^a f(x)dx = \\int_0^a f(a-x)dx", label: "★ Board favourite" },
        { t: "f", tex: "\\int_{-a}^a f(x)dx = 2\\int_0^a f(x)dx", label: "f even" },
        { t: "f", tex: "\\int_{-a}^a f(x)dx = 0", label: "f odd" },
        { t: "f", tex: "\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx" },
        { t: "f", tex: "\\int e^x[f(x)+f'(x)]dx = e^xf(x)+C", label: "★ shortcut" },
        { t: "warn", text: "+C lagana MAT bhoolna (indefinite mein). Substitution ke baad limits bhi badlo!" },
      ],
    ],
  },
  {
    slug: "application-of-integrals",
    title: "Application of Integrals — Revision Sheet",
    pages: [
      [
        { t: "h", text: "AREA" },
        { t: "f", tex: "A = \\int_a^b y\\,dx", label: "x-axis ke saath" },
        { t: "f", tex: "A = \\int_c^d x\\,dy", label: "y-axis ke saath" },
        { t: "f", tex: "A = \\int_a^b (y_{upper}-y_{lower})dx", label: "do curves ke beech" },
        { t: "star", text: "3 STEPS: graph banao → limits nikalo (curves ko equal karo) → integrate" },
        { t: "warn", text: "DIAGRAM banana compulsory hai. 'Square units' likhna mat bhoolna" },
        { t: "p", text: "Curve x-axis ke neeche ho → modulus lo, area kabhi negative nahi" },
        { t: "p", text: "Circle/ellipse mein symmetry use karo — aadha kaam bach jaata hai" },
      ],
    ],
  },
  {
    slug: "differential-equations",
    title: "Differential Equations — Revision Sheet",
    pages: [
      [
        { t: "h", text: "ORDER & DEGREE" },
        { t: "p", text: "Order = sabse bada derivative | Degree = uski power" },
        { t: "warn", text: "Derivative root/sin/log ke andar ho → degree NOT DEFINED" },
        { t: "h", text: "3 METHODS — pehle type pehchano" },
        { t: "f", tex: "\\int\\frac{dy}{g(y)} = \\int f(x)dx + C", label: "1. Variable separable" },
        { t: "f", tex: "y = vx \\Rightarrow \\frac{dy}{dx} = v + x\\frac{dv}{dx}", label: "2. Homogeneous f(y/x)" },
        { t: "f", tex: "\\frac{dy}{dx}+Py = Q,\; IF = e^{\\int P dx}", label: "3. Linear" },
        { t: "f", tex: "y\\cdot IF = \\int Q\\cdot IF\\,dx + C", label: "Linear ka solution" },
        { t: "star", text: "30 second type pehchanne mein lagao — galat method = poora time barbaad" },
      ],
    ],
  },
  {
    slug: "vector-algebra",
    title: "Vector Algebra — Revision Sheet",
    pages: [
      [
        { t: "h", text: "BASICS" },
        { t: "f", tex: "|\\vec{a}| = \\sqrt{a_1^2+a_2^2+a_3^2}" },
        { t: "f", tex: "\\hat{a} = \\vec{a}/|\\vec{a}|", label: "unit vector" },
        { t: "h", text: "DOT vs CROSS" },
        { t: "f", tex: "\\vec{a}\\cdot\\vec{b} = a_1b_1+a_2b_2+a_3b_3 = |a||b|\\cos\\theta", label: "= NUMBER" },
        { t: "f", tex: "\\vec{a}\\times\\vec{b} = \\begin{vmatrix}\\hat{i}&\\hat{j}&\\hat{k}\\\\a_1&a_2&a_3\\\\b_1&b_2&b_3\\end{vmatrix}", label: "= VECTOR" },
        { t: "f", tex: "\\vec{a}\\cdot\\vec{b}=0 \\iff \\perp" },
        { t: "f", tex: "\\text{Proj of }\\vec{a}\\text{ on }\\vec{b} = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}" },
        { t: "star", text: "Triangle = ½|a×b|  |  Parallelogram = |a×b|  ← ½ mat bhoolna!" },
        { t: "warn", text: "a × b = −(b × a). Order badla to sign badla" },
      ],
    ],
  },
  {
    slug: "three-dimensional-geometry",
    title: "3D Geometry — Revision Sheet",
    pages: [
      [
        { t: "h", text: "DIRECTION" },
        { t: "f", tex: "l^2+m^2+n^2 = 1", label: "direction cosines" },
        { t: "h", text: "LINE" },
        { t: "f", tex: "\\vec{r} = \\vec{a}+\\lambda\\vec{b}", label: "vector form" },
        { t: "f", tex: "\\frac{x-x_1}{a}=\\frac{y-y_1}{b}=\\frac{z-z_1}{c}", label: "cartesian form" },
        { t: "f", tex: "\\cos\\theta = \\left|\\frac{\\vec{b_1}\\cdot\\vec{b_2}}{|\\vec{b_1}||\\vec{b_2}|}\\right|", label: "angle" },
        { t: "h", text: "★ SHORTEST DISTANCE (5-marker)" },
        { t: "f", tex: "d = \\left|\\frac{(\\vec{a_2}-\\vec{a_1})\\cdot(\\vec{b_1}\\times\\vec{b_2})}{|\\vec{b_1}\\times\\vec{b_2}|}\\right|" },
        { t: "p", text: "Parallel: DRs proportional | Perpendicular: dot = 0" },
        { t: "warn", text: "d = 0 aaya? Lines skew nahi, woh intersect kar rahi hain" },
      ],
    ],
  },
  {
    slug: "linear-programming",
    title: "Linear Programming — Revision Sheet",
    pages: [
      [
        { t: "h", text: "LPP ke 3 shabd" },
        { t: "p", text: "Objective function Z = ax + by (maximise/minimise karna hai)" },
        { t: "p", text: "Constraints = inequalities (limits)" },
        { t: "p", text: "Feasible region = jahan sab constraints satisfy hote hain" },
        { t: "h", text: "METHOD (5 steps)" },
        { t: "p", text: "1. Inequality → equation → line banao (intercepts se)" },
        { t: "p", text: "2. Origin test se shade karo" },
        { t: "p", text: "3. Feasible region ke saare CORNER POINTS nikalo" },
        { t: "p", text: "4. Har corner par Z ka TABLE banao" },
        { t: "p", text: "5. Sabse bada/chhota Z chuno" },
        { t: "star", text: "Corner Point Theorem: answer hamesha vertex par milta hai" },
        { t: "warn", text: "x ≥ 0, y ≥ 0 likhna mat bhoolna! Aur table banana compulsory hai" },
      ],
    ],
  },
  {
    slug: "probability",
    title: "Probability — Revision Sheet",
    pages: [
      [
        { t: "h", text: "CONDITIONAL" },
        { t: "f", tex: "P(A|B) = \\frac{P(A\\cap B)}{P(B)}" },
        { t: "f", tex: "P(A\\cap B) = P(A)P(B)", label: "Independent" },
        { t: "warn", text: "Independent ≠ Mutually exclusive! Dono bilkul alag cheez hain" },
        { t: "h", text: "TOTAL PROBABILITY" },
        { t: "f", tex: "P(A) = \\sum_i P(E_i)P(A|E_i)", label: "har raaste ko jodo" },
        { t: "h", text: "★ BAYES (5-marker)" },
        { t: "f", tex: "P(E_i|A) = \\frac{P(E_i)P(A|E_i)}{\\sum_j P(E_j)P(A|E_j)}" },
        { t: "star", text: "TREE DIAGRAM banao — aadha sawaal wahin solve ho jaata hai" },
        { t: "h", text: "RANDOM VARIABLE" },
        { t: "f", tex: "E(X) = \\sum x_i p_i,\\qquad \\sum p_i = 1" },
      ],
    ],
  },
];

export function notesFor(slug: string) {
  return NOTES.find((n) => n.slug === slug);
}
