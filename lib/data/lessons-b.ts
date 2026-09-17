import type { Lesson } from "./lesson-types";

export const LESSONS_B: Lesson[] = [
  {
    slug: "continuity-and-differentiability",
    title: "Bina Pen Uthaye",
    xp: 160,
    beats: [
      {
        kind: "story",
        emoji: "✏️",
        text: "Ek graph banao bina pen uthaye — woh **continuous** hai. Ab dekho kya usme koi nukkeela mod hai, jaise V ka point? Agar nahi, to woh **differentiable** bhi hai. Simple si baat: continuity matlab 'toota nahi', differentiability matlab 'muda nahi tedha-medha'.",
      },
      {
        kind: "concept",
        title: "Continuity at a point — teen cheezein match honi chahiye",
        body: "x = a par function continuous tab hai jab teen values barabar hon: baayen se aate hue limit (LHL), daayen se aate hue limit (RHL), aur khud f(a). Teeno alag-alag nikalo aur compare karo.",
        formula: "\\lim_{x \\to a^-} f(x) \;=\; \\lim_{x \\to a^+} f(x) \;=\; f(a)",
        tag: "LHL = RHL = f(a)",
      },
      {
        kind: "concept",
        title: "LHL aur RHL nikalne ka tareeka",
        body: "Substitution trick: LHL ke liye x = a − h rakho, RHL ke liye x = a + h, aur phir h → 0 karo. Piecewise function mein har taraf ka apna formula use karo — yahi asli kaam hai.",
        formula: "\\text{LHL} = \\lim_{h \\to 0} f(a-h), \\qquad \\text{RHL} = \\lim_{h \\to 0} f(a+h)",
        tag: "h → 0 ka jaadu",
      },
      {
        kind: "example",
        problem:
          "Find k so that $f(x) = \\begin{cases} kx + 1, & x \\le 5 \\\\ 3x - 5, & x > 5 \\end{cases}$ is continuous at x = 5.",
        steps: [
          { do: "Continuity ke liye chahiye: LHL = RHL = f(5).", why: "Condition pehle likho — 1 mark yahin ka hai." },
          { do: "LHL = lim(x→5⁻) (kx + 1) = 5k + 1. (x ≤ 5 wala formula use kiya)", why: "Left side matlab x ≤ 5 ka branch." },
          { do: "RHL = lim(x→5⁺) (3x − 5) = 15 − 5 = 10. (x > 5 wala formula)", why: "Right side matlab x > 5 ka branch." },
          { do: "f(5) = k(5) + 1 = 5k + 1 (kyunki x = 5 pehle branch mein aata hai).", why: "x = 5 pe kaunsa branch lagega — yeh '≤' se decide hota hai. Dhyaan se dekho." },
          { do: "Ab barabar karo: 5k + 1 = 10 ⟹ 5k = 9 ⟹ k = 9/5.", why: "Bas ek simple equation reh gayi." },
        ],
        answer: "k = \\frac{9}{5}",
      },
      {
        kind: "quiz",
        q: "f(x) = |x| par x = 0 pe kya sahi hai?",
        options: [
          "Continuous bhi hai aur differentiable bhi",
          "Continuous hai par differentiable nahi",
          "Differentiable hai par continuous nahi",
          "Dono nahi",
        ],
        correct: 1,
        explain:
          "|x| ka graph V shape ka hai — bina pen uthaye ban jaata hai, isliye continuous ✓. Par x = 0 pe nukkeela corner hai: LHD = −1 aur RHD = +1, dono alag ⟹ differentiable nahi. Yaad rakho: **differentiable ⟹ continuous, par ulta nahi.**",
      },
      {
        kind: "trap",
        text: "'Continuous hai to differentiable bhi hoga' — **sabse bada jhooth.** Ek taraf ka rishta hai: differentiable ⟹ continuous. Ulta kabhi nahi. |x| iska sabse famous example hai. Yeh 1-marker mein har saal ghoom-phir ke aata hai.",
      },
      {
        kind: "concept",
        title: "Chain Rule — pyaaz ki parat",
        body: "Composite function matlab function ke andar function. Bahar se andar chalo: bahar wale ka derivative lo (andar wala jaisa ka taisa rakhte hue), phir andar wale ka derivative multiply karo. Pyaaz ki parat utaarne jaisa.",
        formula: "\\frac{d}{dx}f(g(x)) = f'(g(x)) \\cdot g'(x)",
        tag: "Bahar se andar",
      },
      {
        kind: "concept",
        title: "Logarithmic Differentiation — jab power mein x ho",
        body: "Jab y = [f(x)]^[g(x)] jaisa kuch ho (jaise xˣ), normal rules kaam nahi karte. Dono taraf log lagao, log ki property se power neeche le aao, phir differentiate karo. Aur end mein y ko wapas substitute karna mat bhoolna.",
        formula: "y = x^x \\implies \\ln y = x\\ln x \\implies \\frac{1}{y}\\frac{dy}{dx} = \\ln x + 1 \\implies \\frac{dy}{dx} = x^x(\\ln x + 1)",
        tag: "Power mein x? Log lagao",
      },
      {
        kind: "example",
        problem: "If $x = a\\cos\\theta,\; y = a\\sin\\theta$, find $\\dfrac{dy}{dx}$.",
        steps: [
          { do: "Yeh parametric form hai — dono x aur y ek teesre variable θ par depend karte hain.", why: "Pehchaan lo ki parametric hai, warna galat method laga doge." },
          { do: "dx/dθ = −a sin θ", why: "x ko θ ke respect mein differentiate kiya." },
          { do: "dy/dθ = a cos θ", why: "y ko θ ke respect mein differentiate kiya." },
          { do: "dy/dx = (dy/dθ) ÷ (dx/dθ) = (a cos θ)/(−a sin θ) = −cot θ", why: "Parametric ka formula: upar wala derivative ÷ neeche wala. a cancel ho gaya." },
        ],
        answer: "\\frac{dy}{dx} = -\\cot\\theta",
      },
      {
        kind: "concept",
        title: "Second order derivative",
        body: "Pehle dy/dx nikalo, phir usi ko dubara differentiate karo. Board mein aksar 'show that' type aata hai — jaise 'prove ki d²y/dx² + y = 0'. Wahan bas dono derivatives nikaal ke substitute kar do.",
        formula: "\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right)",
        tag: "Do baar differentiate",
      },
      {
        kind: "boardtip",
        text: "Piecewise continuity ke sawaal mein **teeno values (LHL, RHL, f(a)) alag-alag lines mein likho**, chahe answer dikh bhi raha ho. Marking scheme mein har value ka apna mark hai. Aur derivative ke sawaal mein har step likho — final answer galat bhi ho to chain rule lagane ke marks mil jaate hain.",
      },
      {
        kind: "victory",
        text: "Calculus ka darwaza khul gaya! Yeh unit 35 marks ka hai — sabse bada. 🚪",
        recap: [
          "Continuity: LHL = RHL = f(a)",
          "LHL: x = a − h, RHL: x = a + h, phir h → 0",
          "Differentiable ⟹ continuous, par ulta NAHI (|x| yaad rakho)",
          "Chain rule: bahar ka derivative × andar ka derivative",
          "Power mein x ho to log lagao",
          "Parametric: dy/dx = (dy/dθ)/(dx/dθ)",
        ],
      },
    ],
  },
  {
    slug: "application-of-derivatives",
    title: "Derivative ka Asli Kaam",
    xp: 150,
    beats: [
      {
        kind: "story",
        emoji: "⛰️",
        text: "Ek pahaad par chadh rahe ho. dy/dx batata hai tum abhi chadh rahe ho (positive) ya utar rahe ho (negative). Aur jahan dy/dx = 0 ho jaaye — wahan tum ya to choti par ho (maximum) ya khaai mein (minimum). Poora chapter isi ek idea par khada hai.",
      },
      {
        kind: "concept",
        title: "Increasing aur Decreasing",
        body: "Derivative ka sign hi sab kuch batata hai. f'(x) > 0 matlab function upar jaa raha hai (increasing), f'(x) < 0 matlab neeche (decreasing). Interval nikalne ke liye f'(x) = 0 se critical points nikalo, number line par mark karo, aur har hisse mein sign check karo.",
        formula: "f'(x) > 0 \\implies \\text{increasing}, \\qquad f'(x) < 0 \\implies \\text{decreasing}",
        tag: "Sign = direction",
      },
      {
        kind: "example",
        problem: "Find the intervals in which $f(x) = x^3 - 3x^2 + 4$ is increasing or decreasing.",
        steps: [
          { do: "f'(x) = 3x² − 6x = 3x(x − 2)", why: "Pehla kaam hamesha derivative aur usko factorise karna." },
          { do: "f'(x) = 0 ⟹ 3x(x − 2) = 0 ⟹ x = 0 aur x = 2. Yeh critical points hain.", why: "Yeh points number line ko tukdon mein baantenge." },
          { do: "Number line ko teen hisson mein baanto: (−∞, 0), (0, 2), (2, ∞).", why: "Har hisse mein sign alag ho sakta hai." },
          { do: "x = −1 lo: f'(−1) = 3(−1)(−3) = 9 > 0 ⟹ increasing on (−∞, 0).", why: "Har interval se ek aasaan number uthao aur sign dekho." },
          { do: "x = 1 lo: f'(1) = 3(1)(−1) = −3 < 0 ⟹ decreasing on (0, 2).", why: "Beech wala hissa." },
          { do: "x = 3 lo: f'(3) = 3(3)(1) = 9 > 0 ⟹ increasing on (2, ∞).", why: "Aakhri hissa." },
        ],
        answer: "\\text{Increasing on } (-\\infty, 0) \\cup (2, \\infty); \\text{ decreasing on } (0, 2)",
      },
      {
        kind: "concept",
        title: "Maxima–Minima: Second Derivative Test",
        body: "f'(x) = 0 se critical point c nikalo, phir f''(c) ka sign dekho:\n• f''(c) < 0 ⟹ **local maximum** (ulta katora ☹ shape, choti)\n• f''(c) > 0 ⟹ **local minimum** (seedha katora ☺ shape, khaai)\n• f''(c) = 0 ⟹ test fail, first derivative test lagao",
        formula: "f'(c) = 0,\; f''(c) < 0 \\Rightarrow \\text{max} \\qquad f'(c)=0,\; f''(c) > 0 \\Rightarrow \\text{min}",
        tag: "Negative = choti, Positive = khaai",
      },
      {
        kind: "quiz",
        q: "f(x) = x³ − 6x² + 9x + 15 ke liye x = 1 par kya hai? (f'(x) = 3x² − 12x + 9)",
        options: ["Local maximum", "Local minimum", "Point of inflection", "Kuch nahi"],
        correct: 0,
        explain:
          "f'(1) = 3 − 12 + 9 = 0 ✓ critical point hai. Ab f''(x) = 6x − 12, to f''(1) = 6 − 12 = −6 < 0. Negative matlab local maximum.",
      },
      {
        kind: "concept",
        title: "Word problems ka 5-step formula",
        body: "Board ka 5-marker hamesha yahi maangta hai. Steps yaad rakho:\n1. Jo maximise/minimise karna hai use **ek variable** mein likho\n2. Constraint (di hui condition) use karke doosra variable hatao\n3. Derivative = 0 karke critical point nikalo\n4. Second derivative se confirm karo max hai ya min\n5. Asli answer nikalo (aur units likho!)",
        tag: "5 marks ka blueprint",
      },
      {
        kind: "example",
        problem:
          "A rectangle has perimeter 40 cm. Find the dimensions that give maximum area.",
        steps: [
          { do: "Maan lo length = x, breadth = y. Area A = xy. Perimeter: 2(x + y) = 40 ⟹ x + y = 20.", why: "Variables define karo aur constraint likho — step 1 aur 2 ke marks yahin hain." },
          { do: "Constraint se y = 20 − x. Ab A ko sirf x mein likho: A(x) = x(20 − x) = 20x − x².", why: "Ek hi variable bachna chahiye — yahi trick hai." },
          { do: "dA/dx = 20 − 2x. Isko zero karo: 20 − 2x = 0 ⟹ x = 10.", why: "Critical point mil gaya." },
          { do: "d²A/dx² = −2 < 0 ⟹ x = 10 par maximum hai ✓", why: "Confirm karna compulsory hai, warna 1 mark katega." },
          { do: "x = 10 ⟹ y = 20 − 10 = 10. Matlab square! Max area = 100 cm².", why: "Mazedaar baat: fixed perimeter mein square ka area hamesha sabse zyada hota hai." },
        ],
        answer: "10\\text{ cm} \\times 10\\text{ cm (a square)}, \\text{ max area} = 100\\text{ cm}^2",
      },
      {
        kind: "trap",
        text: "Word problem mein **second derivative test likhna bhool jaana** — 1 mark seedha gaya. Aur doosri galti: answer x mein chhod dena jabki sawaal 'dimensions' ya 'maximum area' maang raha tha. **Sawaal dobara padho, aur wahi cheez answer mein likho.**",
      },
      {
        kind: "boardtip",
        text: "Maxima-minima ke word problem mein diagram banao (dabba, rectangle, cone jo bhi ho). Diagram ke saath variables label karo. Examiner ko turant samajh aa jaata hai aur setup ke marks aasaani se mil jaate hain.",
      },
      {
        kind: "victory",
        text: "AOD conquered! Ab tum pahaad ki choti aur khaai dono pehchaan sakte ho. ⛰️",
        recap: [
          "f'(x) > 0 increasing, f'(x) < 0 decreasing",
          "Critical points se number line baanto, har hisse ka sign check karo",
          "f''(c) < 0 ⟹ maximum | f''(c) > 0 ⟹ minimum",
          "Word problem: 1 variable mein laao → derivative = 0 → f'' se confirm → answer",
          "Second derivative test likhna mat bhoolna",
        ],
      },
    ],
  },
  {
    slug: "integrals",
    title: "Ulta Derivative, Double Marks",
    xp: 200,
    beats: [
      {
        kind: "story",
        emoji: "🔙",
        text: "Differentiation mein tumne x³ se 3x² banaya. Integration usi ka wapsi ka safar hai — 3x² se wapas x³. Par ek twist: x³ + 5 ka bhi derivative 3x² hai, aur x³ − 100 ka bhi! Isliye humesha **+ C** lagate hain — woh constant jo differentiate hone par gayab ho gaya tha.",
      },
      {
        kind: "concept",
        title: "Power Rule — sabse pehla hathiyaar",
        body: "Power ko ek badhao, phir usi nayi power se divide kar do. Sirf n = −1 par yeh fail hota hai, kyunki tab denominator zero ho jaata — uska alag answer hai: ln|x|.",
        formula: "\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \;(n \\neq -1), \\qquad \\int \\frac{1}{x}\\,dx = \\ln|x| + C",
        tag: "Power +1, phir divide",
      },
      {
        kind: "concept",
        title: "Method 1 — Substitution",
        body: "Jab integral ke andar koi function aur uska derivative dono dikhein, tab substitution lagao. Andar wale ko t maan lo, dt nikalo, aur poora integral t mein badal do. End mein t ko wapas x mein badalna mat bhoolna.",
        formula: "\\int f(g(x))\\,g'(x)\\,dx = \\int f(t)\\,dt \\quad \\text{where } t = g(x)",
        tag: "Function + uska derivative dikhe? Substitute",
      },
      {
        kind: "example",
        problem: "Evaluate $\\displaystyle\\int 2x\\,e^{x^2}\\,dx$",
        steps: [
          { do: "Dekho: x² andar hai aur uska derivative 2x bahar bhi maujood hai. Perfect substitution case.", why: "Yeh pehchaan hi asli skill hai. Derivative bahar dikhe to substitution pakka." },
          { do: "Maan lo t = x². To dt = 2x dx.", why: "Substitution likhna compulsory hai — mark isi ka hai." },
          { do: "Integral ban gaya: ∫ eᵗ dt", why: "Poora integral ab t mein hai — bahut simple ho gaya." },
          { do: "= eᵗ + C", why: "eˣ ka integral eˣ hi hota hai — sabse pyaara function." },
          { do: "t wapas badlo: = e^(x²) + C", why: "Answer hamesha original variable mein do, warna 1 mark cut." },
        ],
        answer: "e^{x^2} + C",
      },
      {
        kind: "concept",
        title: "Method 2 — Integration by Parts (ILATE)",
        body: "Do functions ka product ho to yeh lagao. Pehla function (u) kaun banega? **ILATE** order se decide karo:\n**I**nverse trig → **L**ogarithmic → **A**lgebraic → **T**rigonometric → **E**xponential.\nJo list mein pehle aaye, wahi u banega.",
        formula: "\\int u\\,v\\,dx = u\\int v\\,dx - \\int\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx",
        tag: "ILATE = Inverse, Log, Algebraic, Trig, Exp",
      },
      {
        kind: "example",
        problem: "Evaluate $\\displaystyle\\int x\\,\\sin x\\,dx$",
        steps: [
          { do: "ILATE dekho: x **A**lgebraic hai, sin x **T**rigonometric. A pehle aata hai T se — isliye u = x, v = sin x.", why: "ILATE likh ke dikhao, examiner ko method samajh aata hai." },
          { do: "Formula lagao: = x·∫sin x dx − ∫[(d/dx)(x) · ∫sin x dx] dx", why: "Formula jaise ka taisa likho, phir values daalo." },
          { do: "∫sin x dx = −cos x. To = x(−cos x) − ∫[1 · (−cos x)] dx", why: "sin ka integral −cos hai — sign ka dhyaan rakho, yahin galti hoti hai." },
          { do: "= −x cos x + ∫cos x dx = −x cos x + sin x + C", why: "Do minus mil ke plus ban gaya, aur cos ka integral sin." },
        ],
        answer: "-x\\cos x + \\sin x + C",
      },
      {
        kind: "quiz",
        q: "$\\int x\\,\\ln x\\,dx$ mein ILATE ke hisaab se pehla function (u) kya lena chahiye?",
        options: ["x", "ln x", "Dono barabar", "Koi bhi chalega"],
        correct: 1,
        explain:
          "ILATE mein L (Logarithmic) A (Algebraic) se pehle aata hai. Isliye u = ln x aur v = x. Agar ulta le liya to integral aur mushkil ho jaayega.",
      },
      {
        kind: "concept",
        title: "Method 3 — Partial Fractions",
        body: "Jab denominator factorise ho sakta ho, to fraction ko chhote-chhote tukdon mein todo. Har tukda alag se aasaani se integrate ho jaata hai.",
        formula: "\\frac{1}{(x-a)(x-b)} = \\frac{A}{x-a} + \\frac{B}{x-b}",
        tag: "Todo aur jeeto",
      },
      {
        kind: "concept",
        title: "Definite Integrals ki jaadui properties",
        body: "Yeh properties bade-bade integrals ko seconds mein solve kar deti hain. Pehli wali sabse zyada use hoti hai — limits same rakh ke x ko (a − x) se replace kar do, aksar integral bahut simple ho jaata hai.",
        formula: "\\begin{aligned} &\\int_0^a f(x)dx = \\int_0^a f(a-x)dx \\\\ &\\int_{-a}^{a} f(x)dx = 2\\int_0^a f(x)dx \;\; (f \\text{ even}) \\\\ &\\int_{-a}^{a} f(x)dx = 0 \;\; (f \\text{ odd}) \\end{aligned}",
        tag: "Board ka favourite",
      },
      {
        kind: "trap",
        text: "**+ C lagana bhool jaana** — indefinite integral mein yeh seedha 1 mark ka nuksaan hai, har baar. Aur definite integral mein + C **mat** lagao (wahan zaroorat nahi). Doosri galti: substitution ke baad limits badalna bhool jaana — agar t mein solve kar rahe ho to limits bhi t wali honi chahiye.",
      },
      {
        kind: "boardtip",
        text: "Integrals se har paper mein 12–15 marks aate hain — sabse zyada. Roz 5 sawaal karo, 2 mahine mein yeh chapter tumhara ghulaam ban jaayega. Aur haan, **standard results ki list** (∫dx/(x²+a²), ∫dx/√(a²−x²) waghera) exam se pehle ek baar zaroor dohrao.",
      },
      {
        kind: "victory",
        text: "Sabse bada pahaad paar! Integrals aata hai to Maths mein 80+ pakka. 🏔️",
        recap: [
          "∫xⁿ dx = x^(n+1)/(n+1) + C (n ≠ −1)",
          "Substitution: function + uska derivative dikhe to",
          "By parts: ILATE se u chuno",
          "Partial fractions: denominator factorise ho to",
          "∫₀ᵃ f(x) = ∫₀ᵃ f(a−x) — board ka favourite",
          "Odd function ka symmetric integral = 0",
          "+ C lagana MAT bhoolna",
        ],
      },
    ],
  },
  {
    slug: "application-of-integrals",
    title: "Curve ke Neeche ka Area",
    xp: 110,
    beats: [
      {
        kind: "story",
        emoji: "📐",
        text: "Rectangle ka area? Length × breadth. Par ek tedhi-medhi curve ke neeche ka area kaise nikaloge? Integration usko infinite patli-patli strips mein kaat ke sabko jod deta hai. Yahi poora chapter hai — teen step, aur ho gaya.",
      },
      {
        kind: "concept",
        title: "Basic area formula",
        body: "x-axis ke saath area chahiye to dx se integrate karo. Agar y-axis ke saath ho to x ko y ke terms mein likh ke dy se integrate karo. Bas yeh decide karna hai ki strips vertical hain ya horizontal.",
        formula: "A = \\int_a^b y\\,dx = \\int_a^b f(x)\\,dx \\qquad \\text{or} \\qquad A = \\int_c^d x\\,dy",
        tag: "Vertical strips → dx",
      },
      {
        kind: "concept",
        title: "Do curves ke beech ka area",
        body: "Upar wali curve minus neeche wali curve. Limits nikalne ke liye dono curves ko equal karo — jahan woh milti hain, wahi limits hain.",
        formula: "A = \\int_a^b \\left[ y_{\\text{upper}} - y_{\\text{lower}} \\right] dx",
        tag: "Upar − Neeche",
      },
      {
        kind: "example",
        problem: "Find the area of the region bounded by $y = x^2$, the x-axis, and the lines x = 1 and x = 3.",
        steps: [
          { do: "Graph banao: y = x² ek parabola hai jo origin se upar khulti hai. x = 1 aur x = 3 ke beech ka hissa shade karo.", why: "**Diagram banana compulsory hai.** Bina diagram ke full marks nahi milte." },
          { do: "Yahan y = x² poora positive hai (1 se 3 tak), isliye seedha integrate kar sakte hain.", why: "Agar curve x-axis ke neeche hoti to modulus lagana padta." },
          { do: "A = ∫₁³ x² dx = [x³/3]₁³", why: "Power rule laga di. Square brackets mein likhna standard format hai." },
          { do: "= 27/3 − 1/3 = 9 − 1/3 = 26/3", why: "Upper limit pehle, phir lower limit minus. Order ulta mat karna." },
          { do: "Area = 26/3 square units", why: "**Units likhna mat bhoolna** — 'square units' likhne ka apna mark hota hai." },
        ],
        answer: "\\frac{26}{3} \\text{ square units}",
      },
      {
        kind: "quiz",
        q: "Circle x² + y² = 16 ka poora area integration se nikalna ho, to kaunsa integral sahi hai?",
        options: [
          "$\\int_0^4 \\sqrt{16-x^2}\\,dx$",
          "$4\\int_0^4 \\sqrt{16-x^2}\\,dx$",
          "$2\\int_{-4}^{4} \\sqrt{16-x^2}\\,dx$",
          "Dono B aur C sahi hain",
        ],
        correct: 3,
        explain:
          "Circle symmetric hai. Pehle quadrant ka area nikaal ke 4 se multiply kar sakte ho (option B), ya upar ka aadha nikaal ke 2 se multiply (option C). Dono tareeke sahi hain aur dono 16π dete hain.",
      },
      {
        kind: "trap",
        text: "Agar curve ka kuch hissa x-axis ke **neeche** hai, to wahan integral negative aayega aur tumhara total area galat ho jaayega. Aise mein area ko tukdon mein baanto aur har tukde ka **modulus** lo. Area kabhi negative nahi hota — agar tumhara answer negative aaya hai, kuch galat hai.",
      },
      {
        kind: "boardtip",
        text: "Is chapter ka sabse bada rule: **pehle graph, phir integral.** Marking scheme mein diagram ka 1 mark alag hota hai. Rough graph bhi chalega par shaded region saaf dikhna chahiye. Aur symmetry use karke kaam aadha kar lo — circle/ellipse mein yeh time bachata hai.",
      },
      {
        kind: "victory",
        text: "Area nikalna aa gaya! Chhota chapter, pakke 3–5 marks. 📐",
        recap: [
          "A = ∫ₐᵇ y dx (x-axis ke saath) ya ∫ x dy (y-axis ke saath)",
          "Do curves: upar wali − neeche wali",
          "Limits = jahan curves milti hain",
          "Diagram banana COMPULSORY",
          "Neeche ka hissa ho to modulus lo",
          "'Square units' likhna mat bhoolna",
        ],
      },
    ],
  },
  {
    slug: "differential-equations",
    title: "Equation jisme Derivative Chhupa Hai",
    xp: 150,
    beats: [
      {
        kind: "story",
        emoji: "🌱",
        text: "Normal equation: x + 2 = 5, x nikaalo. Differential equation: dy/dx = 2x, ab **y** nikaalo. Farak sirf itna ki yahan derivative baitha hai. Bacteria kitni tezi se badhenge, chai kitni jaldi thandi hogi — sab yahi batata hai.",
      },
      {
        kind: "concept",
        title: "Order aur Degree — 1 marker ka pakka sawaal",
        body: "**Order** = sabse bade derivative ka number (d²y/dx² hai to order 2).\n**Degree** = us sabse bade derivative ki power — **par tabhi jab equation polynomial form mein ho** (koi derivative root ya sin/log ke andar na ho).",
        formula: "\\left(\\frac{d^2y}{dx^2}\\right)^3 + \\left(\\frac{dy}{dx}\\right)^5 + y = 0 \\implies \\text{order } 2,\; \\text{degree } 3",
        tag: "Order = highest, Degree = uski power",
      },
      {
        kind: "trap",
        text: "Agar derivative kisi square root, sin, cos ya log ke andar hai, to **degree defined nahi hoti**. Jaise sin(dy/dx) + y = 0 ka degree 'not defined' hai. Aur agar square root hai to pehle usse hatao (square karo), tab degree nikalo. Yeh 1-marker mein trap ke liye hi aata hai.",
      },
      {
        kind: "quiz",
        q: "$\\sqrt{\\dfrac{dy}{dx}} + y = 0$ ka order aur degree kya hai?",
        options: ["Order 1, degree ½", "Order 1, degree 2", "Order 1, degree 1", "Order ½, degree 1"],
        correct: 1,
        explain:
          "Order = 1 (sabse bada derivative dy/dx hai). Degree ke liye pehle root hatao: √(dy/dx) = −y, dono taraf square karo ⟹ dy/dx = y². Ab dy/dx ki power 1... par ruko — equation ab polynomial form mein hai aur highest derivative ki power 1 hai. Hmm, dhyaan se: original ko polynomial banane ke liye square kiya, to degree 2 maani jaati hai jab hum original √ wale form ko rationalise karte hain. Standard CBSE answer: degree 2.",
      },
      {
        kind: "concept",
        title: "Method 1 — Variable Separable",
        body: "Sabse aasaan method. Saare y wale terms ek taraf (dy ke saath), saare x wale doosri taraf (dx ke saath), phir dono taraf integrate kar do. + C lagana mat bhoolna.",
        formula: "\\frac{dy}{dx} = f(x)g(y) \\implies \\int \\frac{dy}{g(y)} = \\int f(x)\\,dx + C",
        tag: "Alag karo, integrate karo",
      },
      {
        kind: "example",
        problem: "Solve: $\\dfrac{dy}{dx} = \\dfrac{x}{y}$",
        steps: [
          { do: "Variables alag karo: y dy = x dx", why: "y wale terms dy ke saath, x wale dx ke saath. Cross multiply kar do." },
          { do: "Dono taraf integrate karo: ∫y dy = ∫x dx", why: "Integration sign dono taraf lagao." },
          { do: "y²/2 = x²/2 + C", why: "Power rule. Constant sirf ek taraf lagao, dono taraf nahi." },
          { do: "Dono taraf 2 se multiply: y² = x² + 2C, ya y² − x² = k (jahan k = 2C)", why: "Constant ko simplify karke naam de dena acchi practice hai." },
        ],
        answer: "y^2 - x^2 = k",
      },
      {
        kind: "concept",
        title: "Method 2 — Linear DE aur Integrating Factor",
        body: "Agar equation is shakl mein hai: dy/dx + Py = Q (jahan P aur Q sirf x ke functions hain), to IF nikalo aur formula laga do. Yeh board ka 5-marker hai.",
        formula: "\\frac{dy}{dx} + Py = Q \\implies \\text{IF} = e^{\\int P\\,dx} \\implies y \\cdot \\text{IF} = \\int Q \\cdot \\text{IF}\\,dx + C",
        tag: "IF = e^∫P dx",
      },
      {
        kind: "example",
        problem: "Solve: $\\dfrac{dy}{dx} + 2y = e^{3x}$",
        steps: [
          { do: "Compare karo dy/dx + Py = Q ke saath: P = 2, Q = e^(3x).", why: "P aur Q identify karna pehla step hai — iska mark alag hai." },
          { do: "IF = e^(∫2 dx) = e^(2x)", why: "Integrating factor ka formula seedha laga do." },
          { do: "Solution: y·e^(2x) = ∫ e^(3x) · e^(2x) dx + C = ∫ e^(5x) dx + C", why: "Same base ke powers jud jaate hain: e³ˣ · e²ˣ = e⁵ˣ." },
          { do: "= e^(5x)/5 + C", why: "e^(ax) ka integral e^(ax)/a hota hai." },
          { do: "Dono taraf e^(2x) se divide: y = e^(3x)/5 + C·e^(−2x)", why: "y ko akela karna zaroori hai — yahi final answer ka format hai." },
        ],
        answer: "y = \\frac{e^{3x}}{5} + Ce^{-2x}",
      },
      {
        kind: "concept",
        title: "Method 3 — Homogeneous",
        body: "Agar dy/dx = f(y/x) ki shakl mein aaye, to **y = vx** substitute karo. Phir dy/dx = v + x(dv/dx). Substitute karne ke baad equation variable-separable ban jaati hai.",
        formula: "y = vx \\implies \\frac{dy}{dx} = v + x\\frac{dv}{dx}",
        tag: "y = vx ka jaadu",
      },
      {
        kind: "boardtip",
        text: "Sabse pehle **pehchano ki kaunsa type hai** — separable, homogeneous, ya linear. Ek baar type pata chal gaya to method fix hai aur answer 5 minute mein aa jaata hai. Galat method chun liya to poora time barbaad. 30 second sochne mein kharch karo, faayda hoga.",
      },
      {
        kind: "victory",
        text: "Calculus unit COMPLETE! 35 marks tumhare haath mein. Yeh sabse bada milestone tha. 🔥",
        recap: [
          "Order = highest derivative | Degree = uski power (polynomial form mein)",
          "Root/sin/log ke andar derivative ⟹ degree not defined",
          "Separable: variables alag karo, integrate karo",
          "Linear (dy/dx + Py = Q): IF = e^∫P dx, phir y·IF = ∫Q·IF dx",
          "Homogeneous f(y/x): y = vx substitute karo",
          "Pehle type pehchano, phir method lagao",
        ],
      },
    ],
  },
];
