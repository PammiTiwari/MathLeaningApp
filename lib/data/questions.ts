export type QType = "mcq" | "ar" | "vsa" | "sa" | "la" | "case";

export type Question = {
  id: string;
  ch: string;              // chapter slug
  type: QType;
  marks: number;
  q: string;               // question text (LaTeX inside $...$)
  options?: string[];      // for mcq / assertion-reason
  correct?: number;        // index of correct option
  answer: string;          // model answer
  keySteps?: string[];     // marking-scheme step points — used by the AI evaluator
  parts?: { q: string; marks: number; answer: string }[]; // for case-based
  needsFigure?: boolean;   // original paper prints a figure we cannot reproduce
  paperSource?: string;    // e.g. "CBSE 2025 · Set 65/1/1 · Q18"
  paperPdf?: string;       // link to the official paper
};

export const AR_OPTIONS = [
  "Both (A) and (R) are true and (R) is the correct explanation of (A)",
  "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
  "(A) is true but (R) is false",
  "(A) is false but (R) is true",
];

export const QUESTIONS: Question[] = [
  // ---------------- SECTION A : MCQ (1 mark) ----------------
  {
    id: "m1-q1", ch: "relations-and-functions", type: "mcq", marks: 1,
    q: "Let $R$ be a relation on the set $A=\\{1,2,3\\}$ given by $R=\\{(1,1),(2,2),(3,3),(1,2),(2,1)\\}$. Then $R$ is",
    options: ["reflexive and symmetric but not transitive", "an equivalence relation", "symmetric and transitive but not reflexive", "reflexive but neither symmetric nor transitive"],
    correct: 1,
    answer: "An equivalence relation. Reflexive: (1,1),(2,2),(3,3) present. Symmetric: (1,2) and (2,1) both present. Transitive: (1,2),(2,1) gives (1,1) which is present. All three hold.",
  },
  {
    id: "m1-q2", ch: "inverse-trigonometric-functions", type: "mcq", marks: 1,
    q: "The principal value of $\\cos^{-1}\\left(-\\frac{\\sqrt{3}}{2}\\right)$ is",
    options: ["$\\frac{\\pi}{6}$", "$\\frac{5\\pi}{6}$", "$-\\frac{\\pi}{6}$", "$\\frac{7\\pi}{6}$"],
    correct: 1,
    answer: "$\\frac{5\\pi}{6}$. The range of $\\cos^{-1}$ is $[0,\\pi]$, and $\\cos\\frac{5\\pi}{6}=-\\frac{\\sqrt3}{2}$.",
  },
  {
    id: "m1-q3", ch: "matrices", type: "mcq", marks: 1,
    q: "If $A$ is a $3\\times 4$ matrix and $B$ is a matrix such that $A'B$ and $BA'$ are both defined, then the order of $B$ is",
    options: ["$3\\times 4$", "$4\\times 3$", "$3\\times 3$", "$4\\times 4$"],
    correct: 0,
    answer: "$3\\times 4$. $A'$ is $4\\times3$. For $A'B$ to be defined, $B$ must have 3 rows. For $BA'$ to be defined, $B$ must have 4 columns. So $B$ is $3\\times4$.",
  },
  {
    id: "m1-q4", ch: "matrices", type: "mcq", marks: 1,
    q: "If $A=\\begin{bmatrix} 0 & a \\\\ -a & 0\\end{bmatrix}$, then $A$ is",
    options: ["symmetric", "skew-symmetric", "identity matrix", "scalar matrix"],
    correct: 1,
    answer: "Skew-symmetric. $A'=\\begin{bmatrix}0&-a\\\\a&0\\end{bmatrix}=-A$, and all diagonal entries are 0.",
  },
  {
    id: "m1-q5", ch: "determinants", type: "mcq", marks: 1,
    q: "If $A$ is a square matrix of order 3 with $|A|=4$, then $|2A|$ equals",
    options: ["8", "16", "32", "64"],
    correct: 2,
    answer: "32. $|kA|=k^n|A|$ with $n=3$, so $|2A|=2^3\\times4=32$.",
  },
  {
    id: "m1-q6", ch: "determinants", type: "mcq", marks: 1,
    q: "If $A$ is a $3\\times3$ matrix with $|A| = 5$, then $|\\text{adj}\\,A|$ is",
    options: ["5", "25", "125", "$\\frac{1}{5}$"],
    correct: 1,
    answer: "25. $|\\text{adj}A| = |A|^{n-1} = 5^{2} = 25$.",
  },
  {
    id: "m1-q7", ch: "continuity-and-differentiability", type: "mcq", marks: 1,
    q: "The function $f(x)=|x-3|$ is",
    options: ["continuous and differentiable at $x=3$", "continuous but not differentiable at $x=3$", "differentiable but not continuous at $x=3$", "neither continuous nor differentiable at $x=3$"],
    correct: 1,
    answer: "Continuous but not differentiable at $x=3$. The modulus graph has a sharp corner at $x=3$: LHD $=-1$, RHD $=+1$.",
  },
  {
    id: "m1-q8", ch: "continuity-and-differentiability", type: "mcq", marks: 1,
    q: "If $y=\\log(\\sin x)$, then $\\frac{dy}{dx}$ is",
    options: ["$\\tan x$", "$\\cot x$", "$\\frac{1}{\\sin x}$", "$-\\cot x$"],
    correct: 1,
    answer: "$\\cot x$. By chain rule: $\\frac{1}{\\sin x}\\cdot\\cos x=\\cot x$.",
  },
  {
    id: "m1-q9", ch: "application-of-derivatives", type: "mcq", marks: 1,
    q: "The function $f(x)=x^2-4x+6$ is strictly increasing on the interval",
    options: ["$(-\\infty,2)$", "$(2,\\infty)$", "$(-\\infty,\\infty)$", "$(0,2)$"],
    correct: 1,
    answer: "$(2,\\infty)$. $f'(x)=2x-4>0 \\Rightarrow x>2$.",
  },
  {
    id: "m1-q10", ch: "application-of-derivatives", type: "mcq", marks: 1,
    q: "The maximum value of $f(x)=\\sin x + \\cos x$ is",
    options: ["1", "2", "$\\sqrt2$", "$\\frac{1}{\\sqrt2}$"],
    correct: 2,
    answer: "$\\sqrt2$. Writing $\\sin x+\\cos x=\\sqrt2\\sin\\left(x+\\frac{\\pi}{4}\\right)$, the maximum value is $\\sqrt2$.",
  },
  {
    id: "m1-q11", ch: "integrals", type: "mcq", marks: 1,
    q: "$\\displaystyle\\int \\frac{dx}{1+x^2}$ equals",
    options: ["$\\log|1+x^2|+C$", "$\\tan^{-1}x+C$", "$\\sin^{-1}x+C$", "$\\frac{1}{2}\\tan^{-1}x+C$"],
    correct: 1,
    answer: "$\\tan^{-1}x+C$ — a standard result.",
  },
  {
    id: "m1-q12", ch: "integrals", type: "mcq", marks: 1,
    q: "$\\displaystyle\\int_{-\\pi/2}^{\\pi/2} \\sin^3 x\\,dx$ equals",
    options: ["0", "1", "2", "$\\frac{2}{3}$"],
    correct: 0,
    answer: "0. $\\sin^3x$ is an odd function and the limits are symmetric about the origin, so the integral is 0.",
  },
  {
    id: "m1-q13", ch: "application-of-integrals", type: "mcq", marks: 1,
    q: "The area bounded by the curve $y=x^2$, the x-axis and the lines $x=0$, $x=3$ is",
    options: ["3 sq units", "9 sq units", "27 sq units", "$\\frac{27}{3}=9$ sq units"],
    correct: 1,
    answer: "9 sq units. $\\int_0^3 x^2dx=\\left[\\frac{x^3}{3}\\right]_0^3=9$.",
  },
  {
    id: "m1-q14", ch: "differential-equations", type: "mcq", marks: 1,
    q: "The degree of the differential equation $\\left(\\frac{d^2y}{dx^2}\\right)^2+\\left(\\frac{dy}{dx}\\right)^3+y=0$ is",
    options: ["1", "2", "3", "not defined"],
    correct: 1,
    answer: "2. The highest order derivative is $\\frac{d^2y}{dx^2}$ and its power is 2, and the equation is polynomial in derivatives.",
  },
  {
    id: "m1-q15", ch: "differential-equations", type: "mcq", marks: 1,
    q: "The integrating factor of $\\frac{dy}{dx}+\\frac{y}{x}=x^2$ is",
    options: ["$x$", "$\\frac{1}{x}$", "$\\log x$", "$e^x$"],
    correct: 0,
    answer: "$x$. Here $P=\\frac1x$, so IF $=e^{\\int \\frac1x dx}=e^{\\log x}=x$.",
  },
  {
    id: "m1-q16", ch: "vector-algebra", type: "mcq", marks: 1,
    q: "If $\\vec a=2\\hat i+\\hat j-\\hat k$ and $\\vec b=\\hat i-\\hat j+\\hat k$, then $\\vec a\\cdot\\vec b$ is",
    options: ["0", "2", "$-2$", "4"],
    correct: 0,
    answer: "0. $\\vec a\\cdot\\vec b=(2)(1)+(1)(-1)+(-1)(1)=2-1-1=0$, so the vectors are perpendicular.",
  },
  {
    id: "m1-q17", ch: "three-dimensional-geometry", type: "mcq", marks: 1,
    q: "The direction cosines of the line joining $(1,0,0)$ and $(0,1,0)$ are",
    options: ["$\\left(\\frac{1}{\\sqrt2},\\frac{-1}{\\sqrt2},0\\right)$", "$(1,-1,0)$", "$\\left(\\frac{-1}{\\sqrt2},\\frac{1}{\\sqrt2},1\\right)$", "$(0,0,1)$"],
    correct: 0,
    answer: "$\\left(\\frac{1}{\\sqrt2},\\frac{-1}{\\sqrt2},0\\right)$. DRs are $(0-1,1-0,0-0)=(-1,1,0)$; dividing by $\\sqrt2$ gives the DCs (either sign set is acceptable).",
  },
  {
    id: "m1-q18", ch: "linear-programming", type: "mcq", marks: 1,
    q: "The optimal value of the objective function in a linear programming problem is attained at",
    options: ["the centre of the feasible region", "any point of the feasible region", "a corner point of the feasible region", "the origin only"],
    correct: 2,
    answer: "A corner point (vertex) of the feasible region, by the Corner Point Theorem.",
  },
  // ---------------- SECTION A : Assertion-Reason (1 mark) ----------------
  {
    id: "m1-q19", ch: "probability", type: "ar", marks: 1,
    q: "**Assertion (A):** If $P(A)=0.5$, $P(B)=0.4$ and $P(A\\cap B)=0.2$, then $A$ and $B$ are independent events.\n\n**Reason (R):** Two events $A$ and $B$ are independent if $P(A\\cap B)=P(A)\\cdot P(B)$.",
    options: AR_OPTIONS,
    correct: 0,
    answer: "Option (a). $P(A)\\cdot P(B)=0.5\\times0.4=0.2=P(A\\cap B)$, so A is true; R is the correct definition and explains A.",
  },
  {
    id: "m1-q20", ch: "continuity-and-differentiability", type: "ar", marks: 1,
    q: "**Assertion (A):** The function $f(x)=|x|$ is continuous at $x=0$.\n\n**Reason (R):** Every differentiable function is continuous.",
    options: AR_OPTIONS,
    correct: 1,
    answer: "Option (b). (A) is true — $|x|$ is continuous everywhere. (R) is also a true theorem. But (R) does not explain (A), because $|x|$ is NOT differentiable at $x=0$, so its continuity there cannot be deduced from (R).",
  },

  // ---------------- SECTION B : VSA (2 marks) ----------------
  {
    id: "m1-q21", ch: "inverse-trigonometric-functions", type: "vsa", marks: 2,
    q: "Find the principal value of $\\tan^{-1}(1)+\\cos^{-1}\\left(-\\frac12\\right)+\\sin^{-1}\\left(-\\frac12\\right)$.",
    answer: "$\\frac{3\\pi}{4}$",
    keySteps: [
      "$\\tan^{-1}(1)=\\frac{\\pi}{4}$ (range $(-\\frac\\pi2,\\frac\\pi2)$) — ½ mark",
      "$\\cos^{-1}(-\\frac12)=\\frac{2\\pi}{3}$ (range $[0,\\pi]$) — ½ mark",
      "$\\sin^{-1}(-\\frac12)=-\\frac{\\pi}{6}$ (range $[-\\frac\\pi2,\\frac\\pi2]$) — ½ mark",
      "Sum $=\\frac{\\pi}{4}+\\frac{2\\pi}{3}-\\frac{\\pi}{6}=\\frac{3\\pi+8\\pi-2\\pi}{12}=\\frac{9\\pi}{12}=\\frac{3\\pi}{4}$ — ½ mark",
    ],
  },
  {
    id: "m1-q22", ch: "application-of-derivatives", type: "vsa", marks: 2,
    q: "The radius of a circle is increasing at the rate of 0.7 cm/s. Find the rate of increase of its circumference.",
    answer: "$1.4\\pi$ cm/s",
    keySteps: [
      "Circumference $C=2\\pi r$ — ½ mark",
      "$\\frac{dC}{dt}=2\\pi\\frac{dr}{dt}$ — ½ mark",
      "Substitute $\\frac{dr}{dt}=0.7$: $\\frac{dC}{dt}=2\\pi(0.7)=1.4\\pi$ — ½ mark",
      "State answer with units: $1.4\\pi$ cm/s — ½ mark",
    ],
  },
  {
    id: "m1-q23", ch: "vector-algebra", type: "vsa", marks: 2,
    q: "Find a unit vector in the direction of $\\vec a = 2\\hat i - 3\\hat j + 6\\hat k$.",
    answer: "$\\hat a = \\frac{1}{7}\\left(2\\hat i-3\\hat j+6\\hat k\\right)$",
    keySteps: [
      "$|\\vec a|=\\sqrt{4+9+36}=\\sqrt{49}=7$ — 1 mark",
      "$\\hat a = \\frac{\\vec a}{|\\vec a|} = \\frac{2\\hat i-3\\hat j+6\\hat k}{7}$ — 1 mark",
    ],
  },
  {
    id: "m1-q24", ch: "integrals", type: "vsa", marks: 2,
    q: "Evaluate: $\\displaystyle\\int \\frac{\\sec^2 x}{\\sqrt{\\tan x}}\\,dx$",
    answer: "$2\\sqrt{\\tan x}+C$",
    keySteps: [
      "Substitute $t=\\tan x \\Rightarrow dt=\\sec^2x\\,dx$ — 1 mark",
      "Integral becomes $\\int t^{-1/2}dt = 2t^{1/2}$ — ½ mark",
      "Back-substitute: $2\\sqrt{\\tan x}+C$ (constant of integration required) — ½ mark",
    ],
  },
  {
    id: "m1-q25", ch: "matrices", type: "vsa", marks: 2,
    q: "If $A=\\begin{bmatrix}2&3\\\\1&-4\\end{bmatrix}$ and $B=\\begin{bmatrix}1&-2\\\\-1&3\\end{bmatrix}$, verify that $(AB)'=B'A'$.",
    answer: "Both sides equal $\\begin{bmatrix}-1&5\\\\5&-14\\end{bmatrix}$.",
    keySteps: [
      "$AB=\\begin{bmatrix}2-3 & -4+9\\\\1+4 & -2-12\\end{bmatrix}=\\begin{bmatrix}-1&5\\\\5&-14\\end{bmatrix}$ — 1 mark",
      "$(AB)'=\\begin{bmatrix}-1&5\\\\5&-14\\end{bmatrix}$ — ½ mark",
      "$B'A'=\\begin{bmatrix}1&-1\\\\-2&3\\end{bmatrix}\\begin{bmatrix}2&1\\\\3&-4\\end{bmatrix}=\\begin{bmatrix}-1&5\\\\5&-14\\end{bmatrix}$, hence verified — ½ mark",
    ],
  },

  // ---------------- SECTION C : SA (3 marks) ----------------
  {
    id: "m1-q26", ch: "integrals", type: "sa", marks: 3,
    q: "Evaluate: $\\displaystyle\\int x\\,e^{x}\\,dx$",
    answer: "$e^x(x-1)+C$",
    keySteps: [
      "Identify integration by parts; by ILATE take $u=x$ (Algebraic), $v=e^x$ (Exponential) — ½ mark",
      "Apply $\\int uv\\,dx = u\\int v\\,dx - \\int (u'\\int v\\,dx)dx$ — 1 mark",
      "$= xe^x - \\int 1\\cdot e^x dx$ — ½ mark",
      "$= xe^x - e^x + C = e^x(x-1)+C$ — 1 mark",
    ],
  },
  {
    id: "m1-q27", ch: "differential-equations", type: "sa", marks: 3,
    q: "Solve the differential equation: $\\frac{dy}{dx} = \\frac{1+y^2}{1+x^2}$",
    answer: "$\\tan^{-1}y = \\tan^{-1}x + C$",
    keySteps: [
      "Recognise variable separable form — ½ mark",
      "Separate: $\\frac{dy}{1+y^2}=\\frac{dx}{1+x^2}$ — 1 mark",
      "Integrate both sides: $\\tan^{-1}y=\\tan^{-1}x+C$ — 1 mark",
      "Constant of integration present — ½ mark",
    ],
  },
  {
    id: "m1-q28", ch: "probability", type: "sa", marks: 3,
    q: "A die is thrown twice and the sum of the numbers appearing is observed to be 6. What is the conditional probability that the number 4 has appeared at least once?",
    answer: "$\\frac{2}{5}$",
    keySteps: [
      "Let $B$ = sum is 6: $B=\\{(1,5),(2,4),(3,3),(4,2),(5,1)\\}$, so $P(B)=\\frac{5}{36}$ — 1 mark",
      "Let $A$ = 4 appears at least once. $A\\cap B=\\{(2,4),(4,2)\\}$, so $P(A\\cap B)=\\frac{2}{36}$ — 1 mark",
      "$P(A|B)=\\frac{P(A\\cap B)}{P(B)}=\\frac{2/36}{5/36}=\\frac{2}{5}$ — 1 mark",
    ],
  },
  {
    id: "m1-q29", ch: "continuity-and-differentiability", type: "sa", marks: 3,
    q: "Find $\\frac{dy}{dx}$ if $y = x^{\\sin x}$, $x>0$.",
    answer: "$\\frac{dy}{dx}=x^{\\sin x}\\left(\\frac{\\sin x}{x}+\\cos x\\cdot\\log x\\right)$",
    keySteps: [
      "Take log both sides: $\\log y = \\sin x\\,\\log x$ — 1 mark",
      "Differentiate: $\\frac{1}{y}\\frac{dy}{dx} = \\cos x\\log x + \\sin x\\cdot\\frac1x$ — 1 mark",
      "Multiply by $y=x^{\\sin x}$ to get the final answer — 1 mark",
    ],
  },
  {
    id: "m1-q30", ch: "linear-programming", type: "sa", marks: 3,
    q: "Solve graphically: Maximise $Z = 3x + 4y$ subject to $x+y\\le 4$, $x\\ge0$, $y\\ge0$.",
    answer: "$Z_{max}=16$ at $(0,4)$",
    keySteps: [
      "Draw line $x+y=4$ with intercepts $(4,0)$ and $(0,4)$; shade feasible region — 1 mark",
      "Corner points: $O(0,0)$, $A(4,0)$, $B(0,4)$ — 1 mark",
      "Table: $Z(0,0)=0$, $Z(4,0)=12$, $Z(0,4)=16$; maximum $Z=16$ at $(0,4)$ — 1 mark",
    ],
  },
  {
    id: "m1-q31", ch: "integrals", type: "sa", marks: 3,
    q: "Evaluate: $\\displaystyle\\int_0^{\\pi/2} \\frac{\\sin x}{\\sin x+\\cos x}\\,dx$",
    answer: "$\\frac{\\pi}{4}$",
    keySteps: [
      "Let $I=\\int_0^{\\pi/2}\\frac{\\sin x}{\\sin x+\\cos x}dx$. Use $\\int_0^a f(x)dx=\\int_0^a f(a-x)dx$ — 1 mark",
      "Then $I=\\int_0^{\\pi/2}\\frac{\\cos x}{\\cos x+\\sin x}dx$ — 1 mark",
      "Adding: $2I=\\int_0^{\\pi/2}1\\,dx=\\frac{\\pi}{2}$, so $I=\\frac{\\pi}{4}$ — 1 mark",
    ],
  },

  // ---------------- SECTION D : LA (5 marks) ----------------
  {
    id: "m1-q32", ch: "determinants", type: "la", marks: 5,
    q: "Solve the following system of equations by the matrix method:\n$$2x - 3y + 5z = 11,\\quad 3x + 2y - 4z = -5,\\quad x + y - 2z = -3$$",
    answer: "$x=1,\; y=2,\; z=3$",
    keySteps: [
      "Write $AX=B$ with $A=\\begin{bmatrix}2&-3&5\\\\3&2&-4\\\\1&1&-2\\end{bmatrix}$ — 1 mark",
      "Compute $|A| = 2(-4+4)+3(-6+4)+5(3-2) = 0-6+5 = -1 \\neq 0$, so a unique solution exists — 1 mark",
      "Find all nine cofactors and form $\\text{adj}A$ (transpose of the cofactor matrix) — 1.5 marks",
      "$A^{-1}=\\frac{1}{|A|}\\text{adj}A$ — ½ mark",
      "$X=A^{-1}B$ gives $x=1,\\,y=2,\\,z=3$; verify in one equation — 1 mark",
    ],
  },
  {
    id: "m1-q33", ch: "application-of-derivatives", type: "la", marks: 5,
    q: "Show that of all the rectangles inscribed in a circle of radius $a$, the square has the maximum area.",
    answer: "The rectangle of maximum area is the square of side $a\\sqrt2$, with area $2a^2$.",
    keySteps: [
      "Let the sides be $x$ and $y$; the diagonal is the diameter: $x^2+y^2=4a^2$ — 1 mark",
      "Area $A=xy = x\\sqrt{4a^2-x^2}$; maximise $A^2=x^2(4a^2-x^2)$ — 1 mark",
      "Differentiate and set to zero: $\\frac{d(A^2)}{dx}=8a^2x-4x^3=0 \\Rightarrow x^2=2a^2 \\Rightarrow x=a\\sqrt2$ — 1.5 marks",
      "Second derivative test: $\\frac{d^2(A^2)}{dx^2}=8a^2-12x^2 = -16a^2 <0$ at $x=a\\sqrt2$, hence maximum — 1 mark",
      "Then $y=\\sqrt{4a^2-2a^2}=a\\sqrt2=x$, so the rectangle is a square — ½ mark",
    ],
  },
  {
    id: "m1-q34", ch: "three-dimensional-geometry", type: "la", marks: 5,
    q: "Find the shortest distance between the lines $\\vec r = (\\hat i+2\\hat j+\\hat k)+\\lambda(\\hat i-\\hat j+\\hat k)$ and $\\vec r = (2\\hat i-\\hat j-\\hat k)+\\mu(2\\hat i+\\hat j+2\\hat k)$.",
    answer: "$d = \\dfrac{9}{3\\sqrt2} = \\dfrac{3}{\\sqrt2}$ units",
    keySteps: [
      "Identify $\\vec a_1=(1,2,1)$, $\\vec b_1=(1,-1,1)$, $\\vec a_2=(2,-1,-1)$, $\\vec b_2=(2,1,2)$ — 1 mark",
      "$\\vec a_2-\\vec a_1=(1,-3,-2)$ — ½ mark",
      "$\\vec b_1\\times\\vec b_2 = \\begin{vmatrix}\\hat i&\\hat j&\\hat k\\\\1&-1&1\\\\2&1&2\\end{vmatrix} = -3\\hat i + 0\\hat j + 3\\hat k$ — 1.5 marks",
      "$|\\vec b_1\\times\\vec b_2| = \\sqrt{9+0+9}=3\\sqrt2$ — ½ mark",
      "$(\\vec a_2-\\vec a_1)\\cdot(\\vec b_1\\times\\vec b_2) = -3+0-6 = -9$ — ½ mark",
      "$d=\\left|\\frac{-9}{3\\sqrt2}\\right| = \\frac{3}{\\sqrt2}$ units — 1 mark",
    ],
  },
  {
    id: "m1-q35", ch: "application-of-integrals", type: "la", marks: 5,
    q: "Using integration, find the area of the region bounded by the circle $x^2+y^2=16$ and the line $y=x$ in the first quadrant.",
    answer: "$2\\pi$ square units",
    keySteps: [
      "Draw the circle of radius 4 and the line $y=x$; shade the region in the first quadrant — 1 mark",
      "Point of intersection: $2x^2=16\\Rightarrow x=2\\sqrt2$ — 1 mark",
      "Area $=\\int_0^{2\\sqrt2} x\\,dx + \\int_{2\\sqrt2}^{4}\\sqrt{16-x^2}\\,dx$ — 1 mark",
      "First integral $=\\left[\\frac{x^2}{2}\\right]_0^{2\\sqrt2}=4$ — ½ mark",
      "Second integral $=\\left[\\frac{x}{2}\\sqrt{16-x^2}+8\\sin^{-1}\\frac x4\\right]_{2\\sqrt2}^{4} = 4\\pi - (4+2\\pi) = 2\\pi-4$ — 1 mark",
      "Total area $= 4 + 2\\pi - 4 = 2\\pi$ square units — ½ mark",
    ],
  },

  // ---------------- SECTION E : Case-based (4 marks) ----------------
  {
    id: "m1-q36", ch: "application-of-derivatives", type: "case", marks: 4,
    q: "**Case Study:** A window is in the shape of a rectangle surmounted by a semicircle. The total perimeter of the window is 10 m. Let the width of the rectangle be $2x$ m and its height $y$ m, so the semicircle has radius $x$.",
    parts: [
      { q: "Express the perimeter of the window in terms of $x$ and $y$.", marks: 1, answer: "$P = 2x + 2y + \\pi x = 10$" },
      { q: "Express the area $A$ of the window as a function of $x$ alone.", marks: 1, answer: "$y=\\frac{10-2x-\\pi x}{2}$, so $A = 2xy + \\frac{\\pi x^2}{2} = 10x - 2x^2 - \\frac{\\pi x^2}{2}$" },
      { q: "Find the value of $x$ for which the area is maximum.", marks: 2, answer: "$\\frac{dA}{dx}=10-4x-\\pi x=0 \\Rightarrow x=\\frac{10}{4+\\pi}$. Since $\\frac{d^2A}{dx^2}=-4-\\pi<0$, this gives the maximum." },
    ],
    answer: "$x = \\frac{10}{4+\\pi}$ m gives maximum area.",
  },
  {
    id: "m1-q37", ch: "probability", type: "case", marks: 4,
    q: "**Case Study:** A factory has three machines A, B and C producing 50%, 30% and 20% of the total output respectively. Of their output, 1%, 2% and 3% respectively are defective. An item is picked at random from the total output and found to be defective.",
    parts: [
      { q: "Write the probability that a randomly chosen item comes from machine A and is defective.", marks: 1, answer: "$P(A)\\cdot P(D|A) = 0.5\\times0.01 = 0.005$" },
      { q: "Find the total probability that a randomly chosen item is defective.", marks: 1, answer: "$P(D)=0.5(0.01)+0.3(0.02)+0.2(0.03)=0.005+0.006+0.006=0.017$" },
      { q: "Using Bayes' theorem, find the probability that the defective item was produced by machine C.", marks: 2, answer: "$P(C|D)=\\frac{0.2\\times0.03}{0.017}=\\frac{0.006}{0.017}=\\frac{6}{17}$" },
    ],
    answer: "$P(D)=0.017$ and $P(C|D)=\\frac{6}{17}$",
  },
  {
    id: "m1-q38", ch: "relations-and-functions", type: "case", marks: 4,
    q: "**Case Study:** A school arranges students in groups. Let $A$ be the set of all students of a school and define a relation $R$ on $A$ by: $(x,y)\\in R$ if and only if $x$ and $y$ study in the same class.",
    parts: [
      { q: "Show that $R$ is reflexive.", marks: 1, answer: "Every student studies in the same class as themselves, so $(x,x)\\in R$ for all $x\\in A$." },
      { q: "Show that $R$ is symmetric.", marks: 1, answer: "If $x$ and $y$ study in the same class then $y$ and $x$ do too, so $(x,y)\\in R \\Rightarrow (y,x)\\in R$." },
      { q: "Show that $R$ is transitive, and hence state what kind of relation $R$ is. What do its equivalence classes represent?", marks: 2, answer: "If $x,y$ are in the same class and $y,z$ are in the same class, then $x,z$ are in the same class, so $R$ is transitive. Hence $R$ is an equivalence relation, and its equivalence classes are precisely the classes (sections) of the school." },
    ],
    answer: "$R$ is an equivalence relation; its equivalence classes are the classes of the school.",
  },
];

export function questionsFor(chapterSlug: string) {
  return QUESTIONS.filter((q) => q.ch === chapterSlug);
}
export function getQuestion(id: string) {
  return QUESTIONS.find((q) => q.id === id);
}
