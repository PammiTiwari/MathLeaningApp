import type { Note } from "./note-types";

export const NOTES_B: Note[] = [
  // ============================= CH 6 =============================
  {
    slug: "application-of-derivatives",
    title: "Application of Derivatives",
    pages: [
      [
        { t: "h", text: "1. RATE OF CHANGE" },
        { t: "p", text: "dy/dx matlab: x badalne par y kitni tezi se badal raha hai. Do cheezein time ke saath badal rahi hon to chain rule lagao." },
        { t: "f", tex: "\\frac{dy}{dt} = \\frac{dy}{dx}\\cdot\\frac{dx}{dt}", label: "chain rule with time" },
        { t: "p", text: "Common formulas jo kaam aate hain:" },
        { t: "fl", items: [
          { tex: "\\text{Circle: } A = \\pi r^2,\; C = 2\\pi r" },
          { tex: "\\text{Sphere: } V = \\tfrac43\\pi r^3,\; S = 4\\pi r^2" },
          { tex: "\\text{Cube: } V = x^3,\; S = 6x^2" },
          { tex: "\\text{Cone: } V = \\tfrac13\\pi r^2 h" },
        ]},
        { t: "warn", text: "'Increasing at the rate of' matlab positive, 'decreasing' matlab NEGATIVE value daalni hai. Sign ka dhyaan rakho." },

        { t: "h", text: "2. INCREASING / DECREASING" },
        { t: "fl", items: [
          { tex: "f'(x) > 0 \\Rightarrow \\text{strictly increasing}" },
          { tex: "f'(x) < 0 \\Rightarrow \\text{strictly decreasing}" },
          { tex: "f'(x) = 0 \\Rightarrow \\text{constant}" },
        ]},
        { t: "steps", title: "★ Intervals nikalne ke 4 steps", items: [
          "f′(x) nikalo aur **factorise** karo",
          "f′(x) = 0 rakh ke **critical points** nikalo",
          "In points se **number line ko tukdon mein baanto**",
          "Har tukde se ek aasaan number uthao, f′ mein daalo, **sign** dekho. Positive = increasing, negative = decreasing",
        ]},
        { t: "ex", q: "f(x) = x³ − 3x² + 4 ke intervals", sol: [
          "f′(x) = 3x² − 6x = 3x(x − 2)",
          "f′ = 0 ⟹ x = 0, 2  →  tukde: (−∞,0), (0,2), (2,∞)",
          "x = −1: f′ = 3(−1)(−3) = 9 > 0 ⟹ increasing",
          "x = 1: f′ = 3(1)(−1) = −3 < 0 ⟹ decreasing",
          "x = 3: f′ = 3(3)(1) = 9 > 0 ⟹ increasing",
          "Ans: ↑ on (−∞,0) ∪ (2,∞),  ↓ on (0,2)",
        ]},
      ],
      [
        { t: "h", text: "3. MAXIMA & MINIMA" },
        { t: "def", term: "Critical point", text: "Woh point jahan f′(c) = 0 ho (ya f′ exist na kare). Max/min yahin milta hai." },
        { t: "fl", items: [
          { tex: "f'(c)=0,\; f''(c) < 0 \\Rightarrow \\text{LOCAL MAXIMUM}", label: "ulta katora ∩ — choti" },
          { tex: "f'(c)=0,\; f''(c) > 0 \\Rightarrow \\text{LOCAL MINIMUM}", label: "seedha katora ∪ — khaai" },
          { tex: "f'(c)=0,\; f''(c) = 0 \\Rightarrow \\text{test fail}", label: "first derivative test lagao" },
        ]},
        { t: "p", text: "First derivative test: critical point ke aas-paas f′ ka sign dekho. + se − ⟹ maximum. − se + ⟹ minimum. Sign na badle ⟹ point of inflection." },

        { t: "h", text: "4. ABSOLUTE MAX/MIN (closed interval [a,b])" },
        { t: "steps", title: "Method", items: [
          "f′(x) = 0 se saare critical points nikalo jo [a,b] ke andar hain",
          "In critical points par f ka value nikalo",
          "**Endpoints** f(a) aur f(b) ka value bhi nikalo",
          "Sab values compare karo — sabse bada = absolute max, sabse chhota = absolute min",
        ]},
        { t: "warn", text: "Closed interval mein endpoints check karna BHOOLNA nahi. Aksar absolute maximum wahin milta hai, critical point par nahi." },

        { t: "h", text: "5. ★ WORD PROBLEM — 5-marker blueprint" },
        { t: "steps", title: "5 steps, har baar wahi", items: [
          "**Diagram banao** aur variables define karo (let length = x, breadth = y …)",
          "Jo maximise/minimise karna hai uska equation likho (Area, Volume, Cost …)",
          "Di hui **constraint** use karke ek variable hatao — ab sab kuch ek hi variable mein",
          "Derivative = 0 karke **critical point** nikalo",
          "**Second derivative test** se confirm karo (max hai ya min), phir asli answer + **units** likho",
        ]},
        { t: "ex", q: "Perimeter 40 cm hai, maximum area wala rectangle?", sol: [
          "Let length = x, breadth = y. A = xy, aur 2(x+y) = 40 ⟹ x + y = 20",
          "y = 20 − x ⟹ A(x) = x(20 − x) = 20x − x²",
          "dA/dx = 20 − 2x = 0 ⟹ x = 10",
          "d²A/dx² = −2 < 0 ⟹ maximum ✓",
          "y = 10. Matlab SQUARE. Max area = 100 cm²",
        ]},
        { t: "star", text: "Yaad rakho: fixed perimeter mein square ka area sabse zyada. Fixed area mein square ka perimeter sabse kam." },
        { t: "warn", text: "Second derivative test likhna bhool gaye = 1 mark gaya. Aur sawaal dobara padho — 'dimensions' maanga tha ya 'maximum area'? Wahi likhna." },
      ],
    ],
  },

  // ============================= CH 7 =============================
  {
    slug: "integrals",
    title: "Integrals",
    pages: [
      [
        { t: "h", text: "1. BASIC FORMULAS" },
        { t: "fl", items: [
          { tex: "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C", label: "n ≠ −1" },
          { tex: "\\int \\frac{1}{x}dx = \\ln|x| + C" },
          { tex: "\\int e^x dx = e^x + C" },
          { tex: "\\int a^x dx = \\frac{a^x}{\\ln a} + C" },
        ]},
        { t: "fl", items: [
          { tex: "\\int \\sin x\\,dx = -\\cos x + C" },
          { tex: "\\int \\cos x\\,dx = \\sin x + C" },
          { tex: "\\int \\sec^2 x\\,dx = \\tan x + C" },
          { tex: "\\int \\csc^2 x\\,dx = -\\cot x + C" },
          { tex: "\\int \\sec x\\tan x\\,dx = \\sec x + C" },
          { tex: "\\int \\tan x\\,dx = -\\ln|\\cos x| + C" },
          { tex: "\\int \\sec x\\,dx = \\ln|\\sec x + \\tan x| + C" },
        ]},

        { t: "h", text: "2. ★ STANDARD INTEGRALS — ratt lo" },
        { t: "fl", items: [
          { tex: "\\int \\frac{dx}{x^2+a^2} = \\frac{1}{a}\\tan^{-1}\\frac{x}{a} + C" },
          { tex: "\\int \\frac{dx}{x^2-a^2} = \\frac{1}{2a}\\ln\\left|\\frac{x-a}{x+a}\\right| + C" },
          { tex: "\\int \\frac{dx}{a^2-x^2} = \\frac{1}{2a}\\ln\\left|\\frac{a+x}{a-x}\\right| + C" },
          { tex: "\\int \\frac{dx}{\\sqrt{a^2-x^2}} = \\sin^{-1}\\frac{x}{a} + C" },
          { tex: "\\int \\frac{dx}{\\sqrt{x^2 \\pm a^2}} = \\ln\\left|x+\\sqrt{x^2 \\pm a^2}\\right| + C" },
        ]},
        { t: "fl", items: [
          { tex: "\\int \\sqrt{a^2-x^2}\\,dx = \\frac{x}{2}\\sqrt{a^2-x^2} + \\frac{a^2}{2}\\sin^{-1}\\frac{x}{a} + C", label: "area wale sawaalon mein" },
        ]},
        { t: "star", text: "Denominator mein quadratic ho (ax²+bx+c) to pehle COMPLETE THE SQUARE karo — phir upar wala koi ek formula fit ho jaayega." },
      ],
      [
        { t: "h", text: "3. METHOD 1 — SUBSTITUTION" },
        { t: "p", text: "Kab lagao: jab integral mein koi function aur uska derivative dono dikhein." },
        { t: "steps", title: "Steps", items: [
          "Andar wale function ko t maan lo: t = g(x)",
          "dt nikalo: dt = g′(x) dx",
          "Poora integral t ke terms mein badal do — koi x nahi bachna chahiye",
          "Integrate karo",
          "**t wapas x mein badlo** (definite integral ho to limits bhi t wali karo)",
        ]},
        { t: "f", tex: "\\int \\frac{f'(x)}{f(x)}dx = \\ln|f(x)| + C", label: "upar neeche ka derivative = log" },

        { t: "h", text: "4. METHOD 2 — BY PARTS (ILATE)" },
        { t: "f", tex: "\\int u\\,v\\,dx = u\\!\\int\\! v\\,dx - \\int\\!\\left(\\frac{du}{dx}\\!\\int\\! v\\,dx\\right)dx" },
        { t: "p", text: "Pehla function (u) kaun? ILATE order se — jo pehle aaye wahi u:" },
        { t: "table", head: ["I", "L", "A", "T", "E"], rows: [
          ["Inverse", "Log", "Algebraic", "Trig", "Exponential"],
        ]},
        { t: "f", tex: "\\int e^x[f(x) + f'(x)]\\,dx = e^x f(x) + C", label: "★ shortcut, bahut kaam ka" },
        { t: "ex", q: "∫ x sin x dx", sol: [
          "ILATE: x है Algebraic, sin x है Trig. A pehle ⟹ u = x, v = sin x",
          "= x(−cos x) − ∫ 1·(−cos x) dx",
          "= −x cos x + ∫ cos x dx",
          "= −x cos x + sin x + C",
        ]},

        { t: "h", text: "5. METHOD 3 — PARTIAL FRACTIONS" },
        { t: "table", head: ["Denominator", "Todo aise"], rows: [
          ["(x−a)(x−b)", "A/(x−a) + B/(x−b)"],
          ["(x−a)²", "A/(x−a) + B/(x−a)²"],
          ["(x−a)(x²+bx+c)", "A/(x−a) + (Bx+C)/(x²+bx+c)"],
        ]},
        { t: "p", text: "A, B nikalne ka shortcut: dono taraf denominator se multiply karo, phir x mein aisi value daalo jo ek bracket zero kar de." },
        { t: "warn", text: "Agar numerator ki degree denominator se badi ya barabar ho to **pehle divide karo**, phir partial fractions." },
      ],
      [
        { t: "h", text: "6. DEFINITE INTEGRAL" },
        { t: "f", tex: "\\int_a^b f(x)\\,dx = F(b) - F(a)", label: "upper minus lower" },
        { t: "p", text: "Definite integral mein + C nahi lagta — woh cancel ho jaata hai." },

        { t: "h", text: "7. ★ PROPERTIES — paper ki jaan" },
        { t: "fl", items: [
          { tex: "\\int_a^b f(x)dx = -\\int_b^a f(x)dx" },
          { tex: "\\int_a^b f(x)dx = \\int_a^c f(x)dx + \\int_c^b f(x)dx" },
          { tex: "\\int_0^a f(x)dx = \\int_0^a f(a-x)dx", label: "★★ sabse zyada use hota hai" },
          { tex: "\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx" },
        ]},
        { t: "fl", items: [
          { tex: "\\int_{-a}^{a} f(x)dx = 2\\int_0^a f(x)dx", label: "f EVEN: f(−x) = f(x)" },
          { tex: "\\int_{-a}^{a} f(x)dx = 0", label: "f ODD: f(−x) = −f(x)" },
        ]},
        { t: "steps", title: "Property wale sawaal ka tareeka (King's rule)", items: [
          "Integral ko I naam do",
          "x ki jagah (a − x) ya (a + b − x) daal do — naya I likho",
          "Dono I ko JODO — aksar numerator + denominator barabar ho jaate hain",
          "2I = kuch simple mil jaata hai ⟹ I nikaal lo",
        ]},
        { t: "ex", q: "I = ∫₀^(π/2) sin x/(sin x + cos x) dx", sol: [
          "Property: I = ∫₀^(π/2) cos x/(cos x + sin x) dx",
          "Dono jodo: 2I = ∫₀^(π/2) (sin x + cos x)/(sin x + cos x) dx = ∫₀^(π/2) 1 dx",
          "2I = π/2 ⟹ I = π/4",
        ]},
        { t: "warn", text: "★ Indefinite integral mein + C lagana MAT bhoolna — har baar 1 mark ka nuksaan. Definite mein + C mat lagana. Aur substitution ke baad limits badalna yaad rakho." },
      ],
    ],
  },

  // ============================= CH 8 =============================
  {
    slug: "application-of-integrals",
    title: "Application of Integrals",
    pages: [
      [
        { t: "h", text: "1. AREA ke formulas" },
        { t: "fl", items: [
          { tex: "A = \\int_a^b y\\,dx", label: "x-axis ke saath (vertical strips)" },
          { tex: "A = \\int_c^d x\\,dy", label: "y-axis ke saath (horizontal strips)" },
          { tex: "A = \\int_a^b \\big(y_{\\text{upper}} - y_{\\text{lower}}\\big)dx", label: "do curves ke beech" },
        ]},

        { t: "steps", title: "★ 3 STEPS — har sawaal mein yahi", items: [
          "**Graph banao** aur jo region chahiye use shade karo (yeh compulsory hai, iska apna mark hai)",
          "**Limits nikalo** — do curves ho to unhe equal karke intersection points nikalo",
          "**Integrate karo** aur answer ke saath 'square units' likho",
        ]},

        { t: "h", text: "2. STANDARD CURVES" },
        { t: "table", head: ["Curve", "Shakl"], rows: [
          ["y² = 4ax", "Parabola, daayein khulti"],
          ["x² = 4ay", "Parabola, upar khulti"],
          ["x² + y² = a²", "Circle, centre origin, radius a"],
          ["x²/a² + y²/b² = 1", "Ellipse"],
        ]},
        { t: "fl", items: [
          { tex: "\\text{Circle } x^2+y^2=a^2:\;\; A = \\pi a^2", label: "verify: 4∫₀ᵃ√(a²−x²)dx" },
          { tex: "\\text{Ellipse:}\;\; A = \\pi ab" },
        ]},

        { t: "h", text: "3. SYMMETRY ka faayda" },
        { t: "p", text: "Circle aur ellipse chaaron quadrants mein symmetric hain. Pehle quadrant ka area nikaal ke 4 se multiply kar do — aadha kaam bach jaata hai aur galti bhi kam hoti hai." },

        { t: "ex", q: "y = x², x-axis, x = 1 se x = 3 tak ka area", sol: [
          "Graph: parabola, 1 se 3 tak ka hissa shade",
          "Poora curve positive hai isliye seedha integrate",
          "A = ∫₁³ x² dx = [x³/3]₁³",
          "= 27/3 − 1/3 = 26/3 square units",
        ]},
        { t: "warn", text: "Curve ka kuch hissa x-axis ke NEECHE ho to wahan integral negative aayega. Aise mein region ko tukdon mein baanto aur har tukde ka **modulus** lo. Area kabhi negative nahi hota — negative answer aaya to kuch galat hai." },
        { t: "star", text: "Rough graph bhi chalega, par shaded region saaf dikhna chahiye. Bina diagram ke full marks nahi milte." },
      ],
    ],
  },

  // ============================= CH 9 =============================
  {
    slug: "differential-equations",
    title: "Differential Equations",
    pages: [
      [
        { t: "h", text: "1. ORDER aur DEGREE" },
        { t: "def", term: "Order", text: "Equation mein sabse bade derivative ka number. d²y/dx² hai to order = 2." },
        { t: "def", term: "Degree", text: "Us sabse bade derivative ki power — par tabhi jab equation derivatives mein polynomial ho." },
        { t: "f", tex: "\\left(\\frac{d^2y}{dx^2}\\right)^{3} + \\left(\\frac{dy}{dx}\\right)^{5} + y = 0 \;\\Rightarrow\; \\text{order } 2,\; \\text{degree } 3" },
        { t: "warn", text: "Derivative kisi √, sin, cos, log ke ANDAR ho to degree **NOT DEFINED**. Jaise sin(dy/dx) + y = 0. Agar sirf square root hai to pehle square karke hatao, phir degree nikalo." },
        { t: "p", text: "Solution do tarah ke: General solution (arbitrary constants ke saath) aur Particular solution (di hui condition daal ke constants nikale hue)." },

        { t: "h", text: "2. METHOD 1 — VARIABLE SEPARABLE" },
        { t: "p", text: "Pehchaan: dy/dx = f(x)·g(y) — x aur y alag ho sakte hain." },
        { t: "steps", title: "Steps", items: [
          "Saare y wale terms dy ke saath ek taraf, saare x wale dx ke saath doosri taraf",
          "Dono taraf integration sign lagao",
          "Integrate karo",
          "Ek hi taraf + C lagao (dono taraf nahi)",
        ]},
        { t: "f", tex: "\\int \\frac{dy}{g(y)} = \\int f(x)\\,dx + C" },

        { t: "h", text: "3. METHOD 2 — HOMOGENEOUS" },
        { t: "p", text: "Pehchaan: dy/dx = f(y/x) — poora expression y/x ke terms mein likha ja sakta hai." },
        { t: "steps", title: "Steps", items: [
          "**y = vx** substitute karo",
          "dy/dx = v + x(dv/dx) — yeh product rule se aata hai",
          "Equation mein daal do — ab yeh variable separable ban jaayegi",
          "v aur x ko alag karke integrate karo",
          "**v = y/x wapas substitute karo**",
        ]},
        { t: "f", tex: "y = vx \;\\Rightarrow\; \\frac{dy}{dx} = v + x\\frac{dv}{dx}" },
      ],
      [
        { t: "h", text: "4. ★ METHOD 3 — LINEAR (5-marker)" },
        { t: "p", text: "Pehchaan: dy/dx + Py = Q, jahan P aur Q sirf x ke functions hain (ya constants)." },
        { t: "steps", title: "Steps", items: [
          "Equation ko standard form dy/dx + Py = Q mein laao",
          "**P aur Q identify karo** (alag likh do)",
          "**IF = e^(∫P dx)** nikalo",
          "Formula lagao: y × IF = ∫ (Q × IF) dx + C",
          "Integration karo aur **y ko akela** karo",
        ]},
        { t: "fl", items: [
          { tex: "\\text{IF} = e^{\\int P\\,dx}" },
          { tex: "y \\cdot \\text{IF} = \\int Q \\cdot \\text{IF}\\,dx + C", label: "★ yahi final formula hai" },
        ]},
        { t: "p", text: "Agar equation dx/dy + Px = Q ki shakl mein ho (x aur y ke roles ulte), to IF = e^(∫P dy) aur x·IF = ∫Q·IF dy + C." },

        { t: "ex", q: "dy/dx + 2y = e³ˣ solve karo", sol: [
          "P = 2, Q = e³ˣ",
          "IF = e^(∫2dx) = e²ˣ",
          "y·e²ˣ = ∫ e³ˣ · e²ˣ dx + C = ∫ e⁵ˣ dx + C",
          "y·e²ˣ = e⁵ˣ/5 + C",
          "y = e³ˣ/5 + C·e^(−2ˣ)",
        ]},

        { t: "h", text: "5. USEFUL INTEGRALS for IF" },
        { t: "fl", items: [
          { tex: "e^{\\int \\frac{1}{x}dx} = e^{\\ln x} = x" },
          { tex: "e^{\\int \\tan x\\,dx} = \\sec x" },
          { tex: "e^{\\int \\cot x\\,dx} = \\sin x" },
          { tex: "e^{-\\int \\frac{1}{x}dx} = \\frac{1}{x}" },
        ]},

        { t: "h", text: "6. Type kaise pehchanein — 30 second" },
        { t: "table", head: ["Dikhe to", "Method"], rows: [
          ["x aur y alag ho sakte hain", "Variable separable"],
          ["Sab kuch y/x ke terms mein", "Homogeneous (y = vx)"],
          ["dy/dx + Py = Q ki shakl", "Linear (IF)"],
        ]},
        { t: "star", text: "Pehle 30 second type pehchanne mein lagao. Sahi method chun liya to answer 5 minute mein aa jaata hai. Galat method = poora time barbaad." },
      ],
    ],
  },
];
