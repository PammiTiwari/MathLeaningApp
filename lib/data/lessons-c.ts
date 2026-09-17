import type { Lesson } from "./lesson-types";

export const LESSONS_C: Lesson[] = [
  {
    slug: "vector-algebra",
    title: "Arrow wala Maths",
    xp: 130,
    beats: [
      {
        kind: "story",
        emoji: "➡️",
        text: "Koi puche 'kitni door hai?' - jawab '5 km'. Yeh scalar hai. Par 'kahaan hai?' - '5 km **north**'. Yeh vector hai. Magnitude ke saath direction. Bas itna sa farak hai, aur isi par poora chapter khada hai.",
      },
      {
        kind: "concept",
        title: "Vector ki magnitude aur unit vector",
        body: "Vector ki lambai hi uski magnitude hai - Pythagoras 3D mein. Unit vector matlab wahi direction, par lambai exactly 1. Vector ko uski apni magnitude se divide kar do, unit vector mil jaayega.",
        formula: "\\vec{a} = a_1\\hat{i} + a_2\\hat{j} + a_3\\hat{k}, \\quad |\\vec{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2}, \\quad \\hat{a} = \\frac{\\vec{a}}{|\\vec{a}|}",
        tag: "Hat (^) matlab unit vector",
      },
      {
        kind: "concept",
        title: "Dot Product - answer ek NUMBER",
        body: "Do vectors ko dot karo to ek scalar (simple number) milta hai. Do formule hain - components wala calculation ke liye, cos wala angle nikalne ke liye. Aur sabse kaam ki baat: agar dot product 0 aa gaya, matlab dono vectors **perpendicular** hain.",
        formula: "\\vec{a}\\cdot\\vec{b} = a_1b_1 + a_2b_2 + a_3b_3 = |\\vec{a}||\\vec{b}|\\cos\\theta; \\quad \\vec{a}\\cdot\\vec{b}=0 \\iff \\vec{a}\\perp\\vec{b}",
        tag: "Dot = number",
      },
      {
        kind: "concept",
        title: "Cross Product - answer ek naya VECTOR",
        body: "Cross product ek naya vector deta hai jo dono ke perpendicular hota hai. Determinant se nikalta hai. Iski magnitude parallelogram ka area hai - aur yahi board mein sabse zyada poocha jaata hai.",
        formula: "\\vec{a}\\times\\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}, \\quad |\\vec{a}\\times\\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta",
        tag: "Cross = vector",
      },
      {
        kind: "trap",
        text: "Dot product ka answer **number** hota hai, cross product ka **vector**. Agar tumne dot product ke answer mein î ĵ k̂ likh diya - seedha mark cut. Aur cross product commutative nahi hai: a × b = −(b × a). Order badla to sign badal gaya.",
      },
      {
        kind: "quiz",
        q: "Agar $\\vec{a}\\cdot\\vec{b} = 0$ aur dono vectors non-zero hain, to unke beech ka angle kya hai?",
        options: ["0°", "45°", "90°", "180°"],
        correct: 2,
        explain:
          "a·b = |a||b|cos θ = 0. Dono vectors non-zero hain, isliye cos θ = 0 hona chahiye, matlab θ = 90°. Dono perpendicular hain.",
      },
      {
        kind: "example",
        problem:
          "Find the area of the triangle with vertices A(1,1,1), B(2,3,5) and C(1,5,5).",
        steps: [
          { do: "Do side vectors banao: AB = B − A = (1, 2, 4) aur AC = C − A = (0, 4, 4).", why: "Hamesha ek hi point (yahan A) se dono vectors banao." },
          {
            do: "AB × AC = |î ĵ k̂; 1 2 4; 0 4 4| = î(2·4 − 4·4) − ĵ(1·4 − 4·0) + k̂(1·4 − 2·0)",
            why: "Determinant expand karo - ĵ ke saath minus sign lagana mat bhoolna.",
          },
          { do: "= î(8 − 16) − ĵ(4 − 0) + k̂(4 − 0) = −8î − 4ĵ + 4k̂", why: "Har bracket alag solve karo, jaldbaazi mein galti hoti hai." },
          { do: "|AB × AC| = √(64 + 16 + 16) = √96 = 4√6", why: "Magnitude nikali. √96 ko simplify karo: 96 = 16 × 6." },
          { do: "Triangle ka area = ½ |AB × AC| = ½ · 4√6 = 2√6 square units", why: "**Triangle ke liye ½ lagana zaroori hai.** Parallelogram ke liye poora lete hain." },
        ],
        answer: "2\\sqrt{6} \\text{ square units}",
      },
      {
        kind: "boardtip",
        text: "Triangle ka area = ½|a × b|, parallelogram ka area = |a × b|. Yeh ½ bhoolna sabse common mistake hai. Aur projection ka formula alag se yaad rakho: a ka b par projection = (a·b)/|b|.",
      },
      {
        kind: "victory",
        text: "Vectors clear! Ab 3D geometry aasaan lagegi, kyunki wahan yahi tools use honge. ➡️",
        recap: [
          "|a| = √(a₁² + a₂² + a₃²), unit vector = a/|a|",
          "Dot product → NUMBER | Cross product → VECTOR",
          "a·b = 0 ⟹ perpendicular",
          "Triangle area = ½|a × b|, parallelogram = |a × b|",
          "a × b = −(b × a) - order matters",
        ],
      },
    ],
  },
  {
    slug: "three-dimensional-geometry",
    title: "Space mein Line",
    xp: 130,
    beats: [
      {
        kind: "story",
        emoji: "🧊",
        text: "Ab tak sab kuch paper par tha - do dimensions. Ab kamre mein aa jao. Ek machhar ud raha hai - uski position batane ke liye ab teen numbers chahiye (x, y, z). Aur do machhar ki udaan lines kabhi milti hain, kabhi bina mile nikal jaati hain - unhe **skew lines** kehte hain.",
      },
      {
        kind: "concept",
        title: "Direction Cosines aur Direction Ratios",
        body: "Line kis taraf jaa rahi hai, yeh batane ka tareeka. **DRs** (a, b, c) koi bhi proportional numbers ho sakte hain. **DCs** (l, m, n) unhe normalise karke milte hain - aur unka square sum hamesha 1 hota hai.",
        formula: "l = \\frac{a}{\\sqrt{a^2+b^2+c^2}},\; m = \\frac{b}{\\sqrt{\\cdot}},\; n = \\frac{c}{\\sqrt{\\cdot}}; \\qquad l^2 + m^2 + n^2 = 1",
        tag: "DC ka square sum = 1",
      },
      {
        kind: "concept",
        title: "Line ka equation - do roop",
        body: "Ek point se guzarti aur ek direction mein jaati line. Vector form chhota hai, cartesian form calculation ke liye aasaan. Dono aane chahiye - sawaal kisi bhi form mein aa sakta hai.",
        formula: "\\text{Vector: } \\vec{r} = \\vec{a} + \\lambda\\vec{b} \\qquad \\text{Cartesian: } \\frac{x-x_1}{a} = \\frac{y-y_1}{b} = \\frac{z-z_1}{c}",
        tag: "Point + direction",
      },
      {
        kind: "concept",
        title: "Do lines ke beech ka angle",
        body: "Lines ke direction vectors ka dot product lo - wahi angle de dega. Modulus lagana zaroori hai, kyunki angle acute maanga jaata hai.",
        formula: "\\cos\\theta = \\left|\\frac{\\vec{b_1}\\cdot\\vec{b_2}}{|\\vec{b_1}||\\vec{b_2}|}\\right|",
        tag: "Sirf direction vectors chahiye",
      },
      {
        kind: "quiz",
        q: "Do lines parallel hain agar unke direction ratios (a₁,b₁,c₁) aur (a₂,b₂,c₂) mein kya rishta ho?",
        options: [
          "a₁a₂ + b₁b₂ + c₁c₂ = 0",
          "a₁/a₂ = b₁/b₂ = c₁/c₂",
          "a₁ + a₂ = b₁ + b₂ = c₁ + c₂",
          "a₁a₂ = b₁b₂ = c₁c₂",
        ],
        correct: 1,
        explain:
          "Parallel matlab direction same - DRs proportional hone chahiye: a₁/a₂ = b₁/b₂ = c₁/c₂. Option A perpendicular ki condition hai (dot product zero).",
      },
      {
        kind: "concept",
        title: "Shortest Distance between Skew Lines",
        body: "Skew lines matlab jo na milti hain na parallel hain. Unke beech ki sabse choti doori ka formula yeh hai. Yeh 5-marker ka classic sawaal hai - formula yaad hai to 4 line mein answer.",
        formula: "d = \\left|\\frac{(\\vec{a_2}-\\vec{a_1})\\cdot(\\vec{b_1}\\times\\vec{b_2})}{|\\vec{b_1}\\times\\vec{b_2}|}\\right|",
        tag: "Board ka favourite 5-marker",
      },
      {
        kind: "example",
        problem:
          "Find the shortest distance between the lines $\\vec{r} = \\hat{i}+\\hat{j} + \\lambda(2\\hat{i}-\\hat{j}+\\hat{k})$ and $\\vec{r} = 2\\hat{i}+\\hat{j}-\\hat{k} + \\mu(3\\hat{i}-5\\hat{j}+2\\hat{k})$.",
        steps: [
          { do: "Identify karo: a₁ = (1,1,0), b₁ = (2,−1,1), a₂ = (2,1,−1), b₂ = (3,−5,2).", why: "Pehle saare vectors alag likh lo - confusion nahi hogi." },
          { do: "a₂ − a₁ = (1, 0, −1)", why: "Do points ka difference - simple subtraction." },
          {
            do: "b₁ × b₂ = |î ĵ k̂; 2 −1 1; 3 −5 2| = î(−2 + 5) − ĵ(4 − 3) + k̂(−10 + 3) = 3î − ĵ − 7k̂",
            why: "Cross product - ĵ ka minus sign dhyaan se.",
          },
          { do: "|b₁ × b₂| = √(9 + 1 + 49) = √59", why: "Magnitude nikali - yeh denominator banega." },
          { do: "(a₂ − a₁)·(b₁ × b₂) = (1)(3) + (0)(−1) + (−1)(−7) = 3 + 0 + 7 = 10", why: "Dot product - yeh numerator banega." },
          { do: "d = |10/√59| = 10/√59 units", why: "Modulus lagana mat bhoolna - distance kabhi negative nahi hota." },
        ],
        answer: "d = \\frac{10}{\\sqrt{59}} \\text{ units}",
      },
      {
        kind: "trap",
        text: "Agar shortest distance **zero** aa gaya, to lines skew nahi hain - woh intersect kar rahi hain! Aur agar b₁ × b₂ = 0 aa gaya, to lines parallel hain aur yeh formula lagega hi nahi (parallel lines ka alag formula hai). Answer likhne se pehle ek second sochо ki matlab kya hai.",
      },
      {
        kind: "boardtip",
        text: "Is chapter mein poora khel formula yaad hone ka hai. Ek A4 page par saare formulas likho - line ka equation (dono form), angle, shortest distance, parallel/perpendicular conditions - aur roz subah 2 minute dekho. Exam se pehle wahi page dohrao.",
      },
      {
        kind: "victory",
        text: "3D fateh! Vectors + 3D = 14 marks, aur dono mein formula hi asli hero hai. 🧊",
        recap: [
          "l² + m² + n² = 1 (direction cosines)",
          "Line: r = a + λb (vector) ya (x−x₁)/a = (y−y₁)/b = (z−z₁)/c",
          "Angle: cos θ = |b₁·b₂| / (|b₁||b₂|)",
          "Parallel: DRs proportional | Perpendicular: dot product = 0",
          "Shortest distance = |(a₂−a₁)·(b₁×b₂)| / |b₁×b₂|",
        ],
      },
    ],
  },
  {
    slug: "linear-programming",
    title: "Maximum Profit ka Formula",
    xp: 90,
    beats: [
      {
        kind: "story",
        emoji: "🏭",
        text: "Tumhari factory hai. Do cheezein banti hain - kursi aur mez. Lakdi limited hai, time limited hai, par profit maximum chahiye. Kitni kursi, kitni mez? Yahi LPP hai. Aur mazedaar baat - answer hamesha graph ke kisi **kone** par milta hai, beech mein kabhi nahi.",
      },
      {
        kind: "concept",
        title: "Teen shabd, poora chapter",
        body: "**Objective function** - jo maximise/minimise karna hai (jaise Z = 5x + 3y, profit).\n**Constraints** - jo limits hain (lakdi, time, paisa) - inequalities ki shakl mein.\n**Feasible region** - graph ka woh hissa jahan saare constraints ek saath satisfy hote hain.",
        formula: "\\text{Maximise } Z = ax + by \\quad \\text{subject to constraints and } x \\ge 0,\; y \\ge 0",
        tag: "x ≥ 0, y ≥ 0 likhna mat bhoolna",
      },
      {
        kind: "concept",
        title: "Corner Point Theorem - poora chapter isi par",
        body: "Yeh theorem kehta hai: agar optimal value exist karti hai, to woh feasible region ke kisi **corner point (vertex)** par hi milegi. Isliye bas saare corners nikalo, har ek par Z calculate karo, aur sabse bada/chhota chun lo. Bas.",
        tag: "Corners check karo, khatam",
      },
      {
        kind: "example",
        problem:
          "Maximise Z = 5x + 3y subject to 3x + 5y ≤ 15, 5x + 2y ≤ 10, x ≥ 0, y ≥ 0.",
        steps: [
          {
            do: "Har inequality ko equation maan ke line banao. 3x + 5y = 15 → points (5,0) aur (0,3). 5x + 2y = 10 → points (2,0) aur (0,5).",
            why: "x = 0 aur y = 0 daal ke intercepts nikalo - line banane ka sabse fast tareeka.",
          },
          {
            do: "Graph par dono lines kheencho. '≤' hai to origin wali side shade karo (check: 0 ≤ 15 ✓ sach hai).",
            why: "Origin test sabse aasaan hai. Agar origin inequality satisfy kare, to usi taraf shade karo.",
          },
          {
            do: "Corner points nikalo: O(0,0), A(2,0), B(intersection), C(0,3).",
            why: "Feasible region ke saare kone list karo - ek bhi chhoota to answer galat." },
          {
            do: "Intersection ke liye dono equations solve karo: 3x + 5y = 15 aur 5x + 2y = 10 ⟹ x = 20/19, y = 45/19.",
            why: "Elimination method se solve karo - dhyaan se, yahin calculation errors hote hain.",
          },
          {
            do: "Ab table banao - har corner par Z = 5x + 3y:\nO(0,0): Z = 0\nA(2,0): Z = 10\nB(20/19, 45/19): Z = 100/19 + 135/19 = 235/19 ≈ 12.37\nC(0,3): Z = 9",
            why: "**Yeh table likhna compulsory hai.** Marking scheme mein iske alag marks hain.",
          },
          { do: "Sabse bada Z = 235/19 ≈ 12.37 at point B(20/19, 45/19).", why: "Maximum wala corner chun lo aur point ke saath likho." },
        ],
        answer: "Z_{max} = \\frac{235}{19} \\approx 12.37 \\text{ at } \\left(\\tfrac{20}{19}, \\tfrac{45}{19}\\right)",
      },
      {
        kind: "quiz",
        q: "LPP mein optimal solution hamesha kahaan milta hai?",
        options: [
          "Feasible region ke beech mein",
          "Feasible region ke corner point par",
          "Origin par",
          "Kahin bhi ho sakta hai",
        ],
        correct: 1,
        explain:
          "Corner Point Theorem: agar optimal value exist karti hai, to woh feasible region ke kisi vertex (corner) par hi hogi. Isliye sirf corners check karna kaafi hai - beech ke points dekhne ki zaroorat hi nahi.",
      },
      {
        kind: "trap",
        text: "**x ≥ 0, y ≥ 0 likhna bhool jaana** - yeh non-negativity constraints hain aur inke bina feasible region galat ban jaata hai. Aur doosri galti: corner points ka table na banana. Sirf 'answer yeh hai' likh dene se poore marks nahi milte, chahe answer sahi ho.",
      },
      {
        kind: "boardtip",
        text: "Yeh poore syllabus ka sabse aasaan 5 marks hai. **Graph paper ya scale se saaf lines banao**, feasible region shade karo, corner points label karo (A, B, C), aur Z ka table banao. Bas - 5/5. Yeh chapter kabhi mat chhodna.",
      },
      {
        kind: "victory",
        text: "LPP done - poora unit, poore 5 marks, aur sabse kam mehnat. 📊",
        recap: [
          "Objective function = jo maximise/minimise karna hai",
          "Constraints ko lines banao, origin test se shade karo",
          "Corner Point Theorem: answer hamesha vertex par",
          "Saare corners ka Z table banao - compulsory",
          "x ≥ 0, y ≥ 0 likhna mat bhoolna",
        ],
      },
    ],
  },
  {
    slug: "probability",
    title: "Kismat ka Ganit",
    xp: 140,
    beats: [
      {
        kind: "story",
        emoji: "🎲",
        text: "Ek dost kehta hai 'kal baarish hogi'. Tum pucho 'pakka?' Woh kehta hai '70% chance'. Bas yahi probability hai - kismat ko number mein badalna. Aur is chapter ka sabse powerful tool - **Bayes' theorem** - ulta sawaal poochta hai: 'baarish ho gayi, to kitna chance hai ki uska andaza sahi tha?'",
      },
      {
        kind: "concept",
        title: "Conditional Probability",
        body: "P(A|B) matlab: 'B ho chuka hai, ab A ka kya chance hai?' Jaankari mil jaane se chance badal jaata hai. Yeh poore chapter ki neev hai.",
        formula: "P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) \\neq 0",
        tag: "Diya hua | Pehle",
      },
      {
        kind: "concept",
        title: "Independent Events",
        body: "Do events independent hain agar ek ke hone se doosre ka chance badalta hi nahi. Jaise do alag sikke uchhalna. Test simple hai: agar P(A ∩ B) = P(A)·P(B) ho, to independent.",
        formula: "P(A \\cap B) = P(A) \\cdot P(B)",
        tag: "Multiply kar do",
      },
      {
        kind: "trap",
        text: "**Independent aur mutually exclusive alag cheezein hain!** Mutually exclusive matlab dono saath ho hi nahi sakte (P(A∩B) = 0). Independent matlab ek doosre ko affect nahi karte. Do non-zero probability wale mutually exclusive events kabhi independent nahi ho sakte. Yeh 1-marker mein confuse karne ke liye aata hai.",
      },
      {
        kind: "concept",
        title: "Total Probability",
        body: "Agar poora sample space kuch hisson (E₁, E₂, E₃...) mein bata hua hai, to kisi event A ka total chance nikalne ke liye har raaste ka chance jodo.",
        formula: "P(A) = \\sum_{i} P(E_i)\\,P(A|E_i)",
        tag: "Har raaste ko jodo",
      },
      {
        kind: "concept",
        title: "Bayes' Theorem - ulta sawaal",
        body: "Normal sawaal: 'Factory A se bulb aaya, kharaab hone ka chance?' **Ulta sawaal** (Bayes): 'Bulb kharaab nikla, woh Factory A se aaya hoga - kitna chance?' Effect se cause tak wapas jaana. Yeh board ka 5-marker hai.",
        formula: "P(E_i|A) = \\frac{P(E_i)\\,P(A|E_i)}{\\sum_j P(E_j)\\,P(A|E_j)}",
        tag: "Effect se cause tak",
      },
      {
        kind: "example",
        problem:
          "Do bags hain. Bag I mein 3 red, 4 black balls. Bag II mein 5 red, 6 black. Ek bag randomly chuna gaya aur ek ball nikali gayi - woh red nikli. Kya probability hai ki woh Bag I se aayi thi?",
        steps: [
          {
            do: "Events define karo: E₁ = Bag I chuna, E₂ = Bag II chuna, A = red ball nikli. P(E₁) = P(E₂) = ½ (randomly chuna gaya).",
            why: "Events ko naam dena pehla step hai - 1 mark iska hai. Iske bina examiner confuse hota hai.",
          },
          { do: "P(A|E₁) = 3/7 (Bag I mein total 7 balls, 3 red).", why: "Bag I ke andar ka chance." },
          { do: "P(A|E₂) = 5/11 (Bag II mein total 11 balls, 5 red).", why: "Bag II ke andar ka chance." },
          {
            do: "Bayes lagao: P(E₁|A) = [P(E₁)·P(A|E₁)] / [P(E₁)·P(A|E₁) + P(E₂)·P(A|E₂)]",
            why: "Formula poora likho - yeh 1 mark ka hai, chahe aage calculation galat ho jaaye.",
          },
          {
            do: "= (½ × 3/7) / (½ × 3/7 + ½ × 5/11) = (3/14) / (3/14 + 5/22)",
            why: "Values daal do. ½ har jagah hai, chahe to cancel kar sakte ho.",
          },
          {
            do: "LCM 154: 3/14 = 33/154, 5/22 = 35/154. To = (33/154) / (68/154) = 33/68",
            why: "Fractions ka LCM le ke solve karo - decimal mein mat karo, marks kat sakte hain.",
          },
        ],
        answer: "P(E_1|A) = \\frac{33}{68}",
      },
      {
        kind: "quiz",
        q: "P(A) = 0.6, P(B) = 0.5, aur P(A ∩ B) = 0.3. Kya A aur B independent hain?",
        options: [
          "Haan, kyunki 0.6 × 0.5 = 0.3 ✓",
          "Nahi, kyunki 0.6 + 0.5 ≠ 0.3",
          "Nahi, kyunki P(A ∩ B) ≠ 0",
          "Pata nahi chal sakta",
        ],
        correct: 0,
        explain:
          "Independence ka test: P(A ∩ B) = P(A) × P(B). Yahan 0.6 × 0.5 = 0.30, aur diya hua P(A ∩ B) = 0.3. Barabar hai ⟹ independent ✓",
      },
      {
        kind: "concept",
        title: "Random Variable aur Mean",
        body: "Random variable X har outcome ko ek number de deta hai. Uski probability distribution ek table hai. Mean (expected value) nikalne ke liye har value ko uski probability se multiply karke jodo.",
        formula: "E(X) = \\mu = \\sum x_i\\,p_i, \\qquad \\sum p_i = 1",
        tag: "Multiply karo, jodo",
      },
      {
        kind: "boardtip",
        text: "Bayes ke sawaal mein **tree diagram bana lo** - do branches, phir har branch se do aur. Poora sawaal aankhon ke saamne aa jaata hai aur galti ka chance aadha ho jaata hai. Aur events ko E₁, E₂, A naam dena mat bhoolna - presentation ke marks alag hote hain.",
      },
      {
        kind: "victory",
        text: "POORA SYLLABUS KHATAM! 13 chapters, 80 marks, sab tumhare haath mein. Ab practice ka time. 🎓🔥",
        recap: [
          "P(A|B) = P(A∩B)/P(B)",
          "Independent: P(A∩B) = P(A)·P(B)",
          "Independent ≠ Mutually exclusive",
          "Total probability: har raaste ko jodo",
          "Bayes: effect se cause tak - tree diagram banao",
          "Mean E(X) = Σ xᵢpᵢ",
        ],
      },
    ],
  },
];
