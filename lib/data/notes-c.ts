import type { Note } from "./note-types";

export const NOTES_C: Note[] = [
  // ============================= CH 10 =============================
  {
    slug: "vector-algebra",
    title: "Vector Algebra",
    pages: [
      [
        { t: "h", text: "1. BASICS" },
        { t: "def", term: "Vector", text: "Woh quantity jismein magnitude aur direction dono hon. Scalar mein sirf magnitude hoti hai." },
        { t: "fl", items: [
          { tex: "\\vec{a} = a_1\\hat i + a_2\\hat j + a_3\\hat k" },
          { tex: "|\\vec a| = \\sqrt{a_1^2 + a_2^2 + a_3^2}", label: "magnitude" },
          { tex: "\\hat a = \\frac{\\vec a}{|\\vec a|}", label: "unit vector — lambai exactly 1" },
        ]},
        { t: "table", head: ["Type", "Matlab"], rows: [
          ["Zero vector", "Magnitude 0, direction koi bhi"],
          ["Unit vector", "Magnitude exactly 1"],
          ["Equal vectors", "Same magnitude AUR same direction"],
          ["Collinear", "Ek hi line ke parallel"],
          ["Position vector", "Origin se us point tak"],
        ]},

        { t: "h", text: "2. DIRECTION COSINES / RATIOS" },
        { t: "fl", items: [
          { tex: "l = \\cos\\alpha,\; m = \\cos\\beta,\; n = \\cos\\gamma" },
          { tex: "l^2 + m^2 + n^2 = 1", label: "★ hamesha" },
          { tex: "l = \\frac{a}{\\sqrt{a^2+b^2+c^2}}", label: "DRs (a,b,c) se DCs" },
        ]},

        { t: "h", text: "3. OPERATIONS" },
        { t: "p", text: "Addition: corresponding components jod do. Triangle law aur parallelogram law dono yahi kehte hain." },
        { t: "fl", items: [
          { tex: "\\vec{AB} = \\vec{OB} - \\vec{OA}", label: "★ do points ka vector = end − start" },
          { tex: "\\vec r = \\frac{m\\vec b + n\\vec a}{m+n}", label: "section formula (internal, m:n)" },
          { tex: "\\vec r = \\frac{m\\vec b - n\\vec a}{m-n}", label: "external division" },
          { tex: "\\vec r = \\frac{\\vec a + \\vec b}{2}", label: "midpoint" },
        ]},
      ],
      [
        { t: "h", text: "4. DOT PRODUCT — answer ek NUMBER" },
        { t: "fl", items: [
          { tex: "\\vec a \\cdot \\vec b = a_1b_1 + a_2b_2 + a_3b_3", label: "components se" },
          { tex: "\\vec a \\cdot \\vec b = |\\vec a||\\vec b|\\cos\\theta", label: "angle nikalne ke liye" },
          { tex: "\\cos\\theta = \\frac{\\vec a \\cdot \\vec b}{|\\vec a||\\vec b|}" },
        ]},
        { t: "f", tex: "\\vec a \\cdot \\vec b = 0 \\iff \\vec a \\perp \\vec b", label: "★ perpendicular ka test" },
        { t: "f", tex: "\\text{Projection of }\\vec a\\text{ on }\\vec b = \\frac{\\vec a \\cdot \\vec b}{|\\vec b|}", label: "★ yaad rakho: neeche JIS PAR project kar rahe ho" },
        { t: "p", text: "Dot product commutative hai: a·b = b·a. Aur î·î = ĵ·ĵ = k̂·k̂ = 1, î·ĵ = ĵ·k̂ = k̂·î = 0." },

        { t: "h", text: "5. CROSS PRODUCT — answer ek VECTOR" },
        { t: "f", tex: "\\vec a \\times \\vec b = \\begin{vmatrix} \\hat i & \\hat j & \\hat k \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}" },
        { t: "fl", items: [
          { tex: "|\\vec a \\times \\vec b| = |\\vec a||\\vec b|\\sin\\theta" },
          { tex: "\\vec a \\times \\vec b = \\vec 0 \\iff \\vec a \\parallel \\vec b", label: "parallel ka test" },
          { tex: "\\vec a \\times \\vec b = -(\\vec b \\times \\vec a)", label: "★ order badla, sign badla" },
        ]},
        { t: "p", text: "Result dono vectors ke perpendicular hota hai. î×ĵ = k̂, ĵ×k̂ = î, k̂×î = ĵ (cycle mein aage = positive, ulta = negative)." },

        { t: "h", text: "6. ★ AREA" },
        { t: "fl", items: [
          { tex: "\\text{Triangle} = \\tfrac{1}{2}\\,|\\vec a \\times \\vec b|", label: "★ ½ mat bhoolna" },
          { tex: "\\text{Parallelogram} = |\\vec a \\times \\vec b|", label: "adjacent sides" },
          { tex: "\\text{Parallelogram} = \\tfrac{1}{2}|\\vec d_1 \\times \\vec d_2|", label: "diagonals se" },
        ]},
        { t: "ex", q: "A(1,1,1), B(2,3,5), C(1,5,5) ka triangle area", sol: [
          "AB = B − A = (1, 2, 4),  AC = C − A = (0, 4, 4)",
          "AB × AC = î(8−16) − ĵ(4−0) + k̂(4−0) = −8î − 4ĵ + 4k̂",
          "|AB × AC| = √(64+16+16) = √96 = 4√6",
          "Area = ½ × 4√6 = 2√6 square units",
        ]},
        { t: "warn", text: "Dot ka answer NUMBER hai — usmein î ĵ k̂ likh diya to mark cut. Cross ka answer VECTOR hai — usmein î ĵ k̂ zaroori hai. Aur triangle mein ½ lagana mat bhoolna." },
      ],
    ],
  },

  // ============================= CH 11 =============================
  {
    slug: "three-dimensional-geometry",
    title: "Three Dimensional Geometry",
    pages: [
      [
        { t: "h", text: "1. DIRECTION COSINES & RATIOS" },
        { t: "fl", items: [
          { tex: "l^2 + m^2 + n^2 = 1", label: "★ DCs ka square sum hamesha 1" },
          { tex: "(l, m, n) = \\left(\\frac{a}{\\sqrt{\\Sigma}}, \\frac{b}{\\sqrt{\\Sigma}}, \\frac{c}{\\sqrt{\\Sigma}}\\right)", label: "Σ = a²+b²+c²" },
        ]},
        { t: "p", text: "DRs unique nahi hote — (1,2,3) aur (2,4,6) same direction batate hain. DCs unique hote hain (sign chhod ke)." },
        { t: "p", text: "Do points ke beech ki line ke DRs: (x₂−x₁, y₂−y₁, z₂−z₁)." },

        { t: "h", text: "2. LINE ka equation" },
        { t: "fl", items: [
          { tex: "\\vec r = \\vec a + \\lambda \\vec b", label: "vector form: point + direction" },
          { tex: "\\frac{x-x_1}{a} = \\frac{y-y_1}{b} = \\frac{z-z_1}{c}", label: "cartesian form" },
        ]},
        { t: "f", tex: "\\frac{x-x_1}{x_2-x_1} = \\frac{y-y_1}{y_2-y_1} = \\frac{z-z_1}{z_2-z_1}", label: "do points se guzarti line" },
        { t: "star", text: "Cartesian se vector: denominators hi direction vector b hain, numerators se point a milta hai. Dono form mein convert karna aana chahiye." },

        { t: "h", text: "3. ANGLE between two lines" },
        { t: "f", tex: "\\cos\\theta = \\left|\\frac{\\vec b_1 \\cdot \\vec b_2}{|\\vec b_1||\\vec b_2|}\\right|", label: "sirf direction vectors chahiye" },
        { t: "f", tex: "\\cos\\theta = |l_1l_2 + m_1m_2 + n_1n_2|", label: "DCs se" },
        { t: "fl", items: [
          { tex: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}", label: "PARALLEL: DRs proportional" },
          { tex: "a_1a_2 + b_1b_2 + c_1c_2 = 0", label: "PERPENDICULAR: dot = 0" },
        ]},
        { t: "p", text: "Modulus isliye lagate hain kyunki angle hamesha acute maanga jaata hai." },
      ],
      [
        { t: "h", text: "4. ★ SHORTEST DISTANCE — 5-marker" },
        { t: "def", term: "Skew lines", text: "Woh lines jo na milti hain na parallel hain — alag-alag planes mein hain." },
        { t: "f", tex: "d = \\left|\\frac{(\\vec a_2 - \\vec a_1)\\cdot(\\vec b_1 \\times \\vec b_2)}{|\\vec b_1 \\times \\vec b_2|}\\right|", label: "SKEW lines" },
        { t: "f", tex: "d = \\left|\\frac{\\vec b \\times (\\vec a_2 - \\vec a_1)}{|\\vec b|}\\right|", label: "PARALLEL lines" },

        { t: "steps", title: "Steps (skew lines)", items: [
          "Dono lines se a₁, b₁, a₂, b₂ **alag-alag likh lo** (confusion nahi hogi)",
          "a₂ − a₁ nikalo (simple subtraction)",
          "b₁ × b₂ nikalo (determinant — ĵ ka minus sign dhyaan se)",
          "|b₁ × b₂| nikalo — yeh denominator hai",
          "(a₂ − a₁) · (b₁ × b₂) nikalo — yeh numerator hai",
          "Divide karo aur **modulus** lagao. 'units' likhna mat bhoolna",
        ]},
        { t: "ex", q: "r = (î+2ĵ+k̂) + λ(î−ĵ+k̂) aur r = (2î−ĵ−k̂) + μ(2î+ĵ+2k̂)", sol: [
          "a₁ = (1,2,1), b₁ = (1,−1,1);  a₂ = (2,−1,−1), b₂ = (2,1,2)",
          "a₂ − a₁ = (1, −3, −2)",
          "b₁ × b₂ = î(−2−1) − ĵ(2−2) + k̂(1+2) = −3î + 0ĵ + 3k̂",
          "|b₁ × b₂| = √(9+0+9) = √18 = 3√2",
          "(a₂−a₁)·(b₁×b₂) = −3 + 0 − 6 = −9",
          "d = |−9| / 3√2 = 3/√2 units",
        ]},
        { t: "warn", text: "d = 0 aa gaya? Matlab lines skew nahi hain — woh INTERSECT kar rahi hain. Aur b₁ × b₂ = 0 aa gaya? Matlab lines PARALLEL hain, yeh formula lagega hi nahi — parallel wala formula use karo." },
        { t: "star", text: "Is chapter mein poora khel formula yaad hone ka hai. Ek A4 page par saare formulas likho aur roz subah 2 minute dekho — exam tak yaad ho jayenge." },
      ],
    ],
  },

  // ============================= CH 12 =============================
  {
    slug: "linear-programming",
    title: "Linear Programming",
    pages: [
      [
        { t: "h", text: "1. TERMINOLOGY" },
        { t: "def", term: "Objective function", text: "Jo maximise ya minimise karna hai — Z = ax + by (profit, cost waghera)." },
        { t: "def", term: "Constraints", text: "Jo limits di hui hain — inequalities ki shakl mein (raw material, time, paisa)." },
        { t: "def", term: "Non-negativity constraints", text: "x ≥ 0, y ≥ 0. Yeh hamesha hote hain — likhna MAT bhoolna." },
        { t: "def", term: "Feasible region", text: "Graph ka woh hissa jahan saare constraints ek saath satisfy hote hain." },
        { t: "def", term: "Feasible solution", text: "Feasible region ka koi bhi point. Optimal feasible solution = jahan Z best ho." },

        { t: "h", text: "2. ★ CORNER POINT THEOREM" },
        { t: "p", text: "Agar optimal value exist karti hai, to woh feasible region ke kisi CORNER POINT (vertex) par hi milegi — beech mein kabhi nahi." },
        { t: "star", text: "Isliye poora chapter itna aasaan hai: bas saare corners nikalo, har ek par Z calculate karo, sabse bada/chhota chun lo. Bas." },

        { t: "steps", title: "★ 5-marker ke 5 steps", items: [
          "Har inequality ko equation maan ke **line banao**. Intercepts se: x=0 daal ke y-intercept, y=0 daal ke x-intercept",
          "**Origin test** se shade karo: (0,0) inequality mein daalo. Sach hai to origin wali side, jhooth hai to doosri side",
          "**Feasible region** ke saare **corner points** nikalo (lines ke intersection solve karke)",
          "**TABLE banao** — har corner par Z ka value",
          "Sabse bada (maximise) ya sabse chhota (minimise) Z chuno, **point ke saath** answer likho",
        ]},

        { t: "h", text: "3. BOUNDED vs UNBOUNDED" },
        { t: "table", head: ["Region", "Matlab"], rows: [
          ["Bounded", "Circle ke andar aa jaaye — max aur min dono milenge"],
          ["Unbounded", "Khula hua — ho sakta hai max ya min na mile"],
        ]},
        { t: "p", text: "Unbounded region mein: maximum M claim karne se pehle check karo ki ax + by > M ka koi common point to nahi. Minimum m ke liye ax + by < m check karo. Common point mila to woh optimal value exist nahi karti." },

        { t: "ex", q: "Max Z = 5x + 3y, s.t. 3x+5y ≤ 15, 5x+2y ≤ 10, x,y ≥ 0", sol: [
          "Line 1: 3x+5y=15 → (5,0) aur (0,3).  Line 2: 5x+2y=10 → (2,0) aur (0,5)",
          "Origin test: 0 ≤ 15 ✓ aur 0 ≤ 10 ✓ — dono mein origin wali side shade",
          "Corners: O(0,0), A(2,0), B(20/19, 45/19), C(0,3)",
          "TABLE → Z(O)=0, Z(A)=10, Z(B)=235/19≈12.37, Z(C)=9",
          "Z max = 235/19 at B(20/19, 45/19)",
        ]},
        { t: "warn", text: "Do galtiyaan jo marks khaati hain: (1) x ≥ 0, y ≥ 0 likhna bhool jaana, (2) corner points ka TABLE na banana. Sirf answer likhne se poore marks nahi milte, chahe answer sahi ho." },
        { t: "star", text: "Yeh poore syllabus ka sabse aasaan 5 marks hai. Graph scale se saaf banao, region shade karo, corners label karo (A, B, C), table banao — 5/5 pakka. Yeh chapter kabhi mat chhodna." },
      ],
    ],
  },

  // ============================= CH 13 =============================
  {
    slug: "probability",
    title: "Probability",
    pages: [
      [
        { t: "h", text: "1. CONDITIONAL PROBABILITY" },
        { t: "f", tex: "P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) \\neq 0", label: "'B ho chuka hai, ab A ka chance?'" },
        { t: "fl", items: [
          { tex: "0 \\le P(A|B) \\le 1" },
          { tex: "P(A'|B) = 1 - P(A|B)" },
          { tex: "P(S|B) = P(B|B) = 1" },
        ]},

        { t: "h", text: "2. MULTIPLICATION THEOREM" },
        { t: "f", tex: "P(A \\cap B) = P(B)\\,P(A|B) = P(A)\\,P(B|A)" },
        { t: "f", tex: "P(A \\cap B \\cap C) = P(A)\\,P(B|A)\\,P(C|A \\cap B)", label: "teen events" },

        { t: "h", text: "3. INDEPENDENT EVENTS" },
        { t: "f", tex: "P(A \\cap B) = P(A) \\cdot P(B)", label: "★ yahi test hai" },
        { t: "p", text: "Independent ho to P(A|B) = P(A) — matlab B hone se A ka chance badalta hi nahi." },
        { t: "warn", text: "★ Independent aur Mutually Exclusive BILKUL ALAG hain. Mutually exclusive: P(A∩B) = 0 (dono saath ho hi nahi sakte). Independent: ek doosre ko affect nahi karte. Do non-zero probability wale mutually exclusive events kabhi independent nahi ho sakte." },
        { t: "f", tex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)", label: "addition theorem" },

        { t: "h", text: "4. TOTAL PROBABILITY" },
        { t: "f", tex: "P(A) = \\sum_i P(E_i)\\,P(A|E_i)", label: "har raaste ka chance jodo" },
        { t: "p", text: "Use tab karo jab poora sample space alag-alag hisson (E₁, E₂, E₃…) mein bata ho — jaise teen machines, do bags." },
      ],
      [
        { t: "h", text: "5. ★ BAYES' THEOREM — 5-marker" },
        { t: "p", text: "Normal sawaal: 'Factory A se bulb aaya, kharaab hone ka chance?' Bayes ka ULTA sawaal: 'Bulb kharaab nikla — woh Factory A se aaya hoga, kitna chance?' Effect se cause tak wapas." },
        { t: "f", tex: "P(E_i|A) = \\frac{P(E_i)\\,P(A|E_i)}{\\sum_j P(E_j)\\,P(A|E_j)}" },
        { t: "steps", title: "Steps", items: [
          "**Events ko naam do**: E₁, E₂, E₃ = causes, A = jo observe hua. (Iska apna mark hai)",
          "Prior probabilities likho: P(E₁), P(E₂), P(E₃)",
          "Conditional probabilities likho: P(A|E₁), P(A|E₂), P(A|E₃)",
          "**Tree diagram bana lo** — poora sawaal saamne aa jaata hai",
          "Bayes formula **poora likho**, phir values daalo",
          "Fractions ka LCM le kar solve karo (decimal mein mat karo)",
        ]},
        { t: "ex", q: "Bag I: 3 red, 4 black. Bag II: 5 red, 6 black. Ek bag chuna, red ball nikli. Bag I se hone ka chance?", sol: [
          "E₁ = Bag I, E₂ = Bag II, A = red ball.  P(E₁) = P(E₂) = ½",
          "P(A|E₁) = 3/7,  P(A|E₂) = 5/11",
          "P(E₁|A) = (½ × 3/7) / (½ × 3/7 + ½ × 5/11)",
          "= (3/14) / (3/14 + 5/22);  LCM 154 → 33/154 aur 35/154",
          "= (33/154) / (68/154) = 33/68",
        ]},

        { t: "h", text: "6. RANDOM VARIABLE" },
        { t: "def", term: "Random variable X", text: "Har outcome ko ek number de deta hai. Jaise do sikke uchhaalne par 'heads ki ginti' = 0, 1 ya 2." },
        { t: "p", text: "Probability distribution ek table hota hai: X ki values aur unki probabilities." },
        { t: "fl", items: [
          { tex: "\\sum p_i = 1", label: "★ saari probabilities ka sum hamesha 1" },
          { tex: "E(X) = \\mu = \\sum x_i\\,p_i", label: "Mean / Expected value" },
        ]},
        { t: "steps", title: "Distribution banane ka tareeka", items: [
          "X ki saari possible values list karo",
          "Har value ki probability nikalo",
          "Table banao: upar X, neeche P(X)",
          "Check karo ki Σpᵢ = 1 (verification ka mark milta hai)",
          "Mean chahiye to har xᵢ ko pᵢ se multiply karke jodo",
        ]},
        { t: "star", text: "Bayes ke sawaal mein tree diagram sabse bada hathiyaar hai — do branches, phir har branch se do aur. Galti ka chance aadha ho jaata hai." },
      ],
    ],
  },
];
