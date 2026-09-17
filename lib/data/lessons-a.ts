import type { Lesson } from "./lesson-types";

export const LESSONS_A: Lesson[] = [
  {
    slug: "relations-and-functions",
    title: "Rishte aur Rules",
    xp: 120,
    beats: [
      {
        kind: "story",
        emoji: "🏫",
        text: "Imagine karo tumhari class ke 40 bachhe ek **set A** hain. Ab main ek rule banata hoon: 'x R y agar x aur y ka same birthday month ho.' Bas - yeh ek **relation** hai. Relation matlab kuch nahi, sirf ek rule jo batata hai kaun kisse juda hai.",
      },
      {
        kind: "concept",
        title: "Relation kya hai, technically?",
        body: "Agar A aur B do sets hain, to A se B ka relation R matlab A×B ka koi bhi subset. Matlab R sirf jodiyon (ordered pairs) ka collection hai. Jab (a,b) ∈ R, hum likhte hain a R b - 'a related to b'.",
        formula: "R \\subseteq A \\times B, \\quad a\\,R\\,b \\iff (a,b) \\in R",
        tag: "Definition",
      },
      {
        kind: "concept",
        title: "Teen jaadui properties",
        body: "Board mein 90% sawaal inhi teen par hain. Ise ek kahani se yaad rakho - R, S, T:\n\n**Reflexive** - 'Main khud ka dost hoon.' Har a ke liye (a,a) ∈ R.\n\n**Symmetric** - 'Agar main tera dost, to tu mera dost.' (a,b) ∈ R ⟹ (b,a) ∈ R.\n\n**Transitive** - 'Tera dost mera dost.' (a,b) ∈ R aur (b,c) ∈ R ⟹ (a,c) ∈ R.",
        formula: "\\text{Reflexive: } (a,a)\\in R \;\;|\;\; \\text{Symmetric: } (a,b)\\in R \\Rightarrow (b,a)\\in R \;\;|\;\; \\text{Transitive: } (a,b),(b,c)\\in R \\Rightarrow (a,c)\\in R",
        tag: "Yaad rakho: R-S-T",
      },
      {
        kind: "trap",
        text: "Sabse badi galti: 'R symmetric hai aur transitive hai, isliye reflexive bhi hoga.' **Galat!** Agar koi element kisi se related hi nahi hai, to woh khud se bhi related nahi hoga. Empty relation on a non-empty set symmetric aur transitive dono hai, par reflexive nahi. Examiner yahi pakadta hai.",
      },
      {
        kind: "quiz",
        q: "Set A = {1, 2, 3} par R = {(1,1), (2,2), (1,2), (2,1)}. Yeh relation kya hai?",
        options: [
          "Reflexive, symmetric aur transitive - equivalence relation",
          "Symmetric aur transitive, par reflexive nahi",
          "Sirf reflexive",
          "Koi property nahi",
        ],
        correct: 1,
        explain:
          "(3,3) missing hai - isliye reflexive nahi. (1,2) ke saath (2,1) hai - symmetric ✓. (1,2) aur (2,1) se (1,1) chahiye, woh hai - transitive ✓. Isliye symmetric + transitive, par reflexive nahi.",
      },
      {
        kind: "concept",
        title: "Equivalence Relation - teeno ek saath",
        body: "Jab ek relation reflexive + symmetric + transitive teeno ho, usse **equivalence relation** kehte hain. Yeh set ko alag-alag dibbon (equivalence classes) mein baant deta hai, jaise sabko apne birthday-month wale group mein daal dena.",
        formula: "[a] = \\{x \\in A : x\\,R\\,a\\}",
        tag: "5-marker ka baap",
      },
      {
        kind: "example",
        problem:
          "Z par relation R aise define hai: a R b agar (a − b) 2 se divisible ho. Show that R is an equivalence relation.",
        steps: [
          {
            do: "Reflexive: a − a = 0, aur 0, 2 se divisible hai. Isliye (a,a) ∈ R for all a ∈ Z. ✓",
            why: "Har proof ki shuruaat reflexive se. Ek line mein ho jaata hai - free mark.",
          },
          {
            do: "Symmetric: maan lo (a,b) ∈ R, to a − b = 2k. Ab b − a = −2k = 2(−k), jo bhi 2 se divisible hai. Isliye (b,a) ∈ R. ✓",
            why: "Hamesha 'maan lo (a,b) ∈ R' se shuru karo, phir b−a ko a−b ke terms mein likho.",
          },
          {
            do: "Transitive: maan lo (a,b) ∈ R aur (b,c) ∈ R. To a − b = 2k aur b − c = 2m. Add karo: a − c = 2(k + m), jo 2 se divisible hai. Isliye (a,c) ∈ R. ✓",
            why: "Transitivity ka trick hamesha yahi hai - do equations ko jodo ya subtract karo, beech wala term cancel ho jaata hai.",
          },
          {
            do: "Teeno satisfy hue ⟹ R ek equivalence relation hai. Iske do equivalence classes hain: even numbers aur odd numbers.",
            why: "Conclusion line zaroor likho. Aur class bata do to examiner khush.",
          },
        ],
        answer: "R is an equivalence relation, with equivalence classes [0] = even integers and [1] = odd integers.",
      },
      {
        kind: "story",
        emoji: "🥤",
        text: "Ab **function** pe aate hain. Function ek vending machine hai. Tum ek button dabate ho (input x), aur machine ek hi cheez girati hai (output f(x)). Agar ek button dabane se kabhi Coke kabhi Pepsi giray - woh function nahi, kharaab machine hai.",
      },
      {
        kind: "concept",
        title: "One-one (Injective) - har button ka alag snack",
        body: "Do alag inputs kabhi same output na dein. Proof ka format: maan lo f(x₁) = f(x₂), phir dikhao x₁ = x₂.",
        formula: "f(x_1) = f(x_2) \\implies x_1 = x_2",
        tag: "Injective",
      },
      {
        kind: "concept",
        title: "Onto (Surjective) - machine ka har khaana khaali ho jaaye",
        body: "Codomain ka har element kisi na kisi input se aana chahiye - koi bhi snack machine mein bacha na rahe. Proof ka format: koi bhi y lo codomain se, aur ek x dhoondh ke dikhao jisse f(x) = y.",
        formula: "\\forall\\, y \\in B,\; \\exists\\, x \\in A \\text{ such that } f(x) = y",
        tag: "Surjective",
      },
      {
        kind: "example",
        problem: "f : R → R, f(x) = 3x + 5. Check whether f is one-one and onto.",
        steps: [
          {
            do: "One-one: maan lo f(x₁) = f(x₂) ⟹ 3x₁ + 5 = 3x₂ + 5 ⟹ 3x₁ = 3x₂ ⟹ x₁ = x₂. Isliye f one-one hai. ✓",
            why: "Linear function mein hamesha yeh 3 line mein khatam ho jaata hai.",
          },
          {
            do: "Onto: koi bhi y ∈ R lo. f(x) = y chahiye ⟹ 3x + 5 = y ⟹ x = (y − 5)/3.",
            why: "Yahan hum x ko y ke terms mein solve kar rahe hain - yahi onto ka asli kaam hai.",
          },
          {
            do: "Kyunki y real hai, (y − 5)/3 bhi real hai, matlab x domain R mein hai. Isliye har y ke liye ek x mil gaya ⟹ f onto hai. ✓",
            why: "Yeh line likhna zaroori hai - 'x domain mein hai' - warna 1 mark kat jaata hai.",
          },
          { do: "One-one + onto ⟹ f bijective hai.", why: "Final conclusion line." },
        ],
        answer: "f is one-one and onto, hence bijective.",
      },
      {
        kind: "quiz",
        q: "f : R → R, f(x) = x². Yeh function kaisa hai?",
        options: [
          "One-one aur onto dono",
          "One-one hai par onto nahi",
          "Onto hai par one-one nahi",
          "Na one-one, na onto",
        ],
        correct: 3,
        explain:
          "f(2) = 4 aur f(−2) = 4 - do alag inputs, same output ⟹ one-one nahi. Aur y = −4 kabhi nahi milega kyunki square kabhi negative nahi hota ⟹ onto bhi nahi. Isliye dono nahi.",
      },
      {
        kind: "boardtip",
        text: "5-marker mein proof ka format fix hai: heading likho (**Reflexive:**, **Symmetric:**, **Transitive:**), har ek ko alag line mein prove karo, aur last mein **'Hence R is an equivalence relation'** likho. Marking scheme har property ke 1-1.5 marks alag deta hai - ek property chhoot bhi jaaye to baaki ke marks bach jaate hain.",
      },
      {
        kind: "victory",
        text: "Chapter 1 clear! Yeh chapter chhota hai par 5 marks ka pakka customer hai. 🎉",
        recap: [
          "Relation = ordered pairs ka subset",
          "R-S-T: Reflexive (khud se), Symmetric (dono taraf), Transitive (dost ka dost)",
          "Teeno = Equivalence relation",
          "One-one: f(x₁) = f(x₂) ⟹ x₁ = x₂",
          "Onto: har y ke liye ek x dhoondho",
          "One-one + Onto = Bijective",
        ],
      },
    ],
  },
  {
    slug: "inverse-trigonometric-functions",
    title: "Ulta Trigonometry",
    xp: 100,
    beats: [
      {
        kind: "story",
        emoji: "🔍",
        text: "sin 30° = ½ - yeh tumhe pata hai. Ab ulta sawaal: 'kis angle ka sin ½ hota hai?' Jawab aaya 30°. Par ruko - sin 150° bhi ½ hai! Aur sin 390° bhi! Infinite answers. Isliye mathematicians ne ek rule banaya: **sirf ek ilaake ka answer maano.** Usi ilaake ko principal value branch kehte hain.",
      },
      {
        kind: "concept",
        title: "Principal Value Branch - sabse important table",
        body: "Yeh table ratt lo. Board ke 1-markers seedhe isse aate hain. Dhyaan do: sin⁻¹, tan⁻¹, cosec⁻¹ ka range negative se positive tak hai. Par cos⁻¹, cot⁻¹, sec⁻¹ ka range 0 se π tak (sab positive side).",
        formula: "\\begin{aligned} \\sin^{-1}x &: [-1,1] \\to [-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}] \\\\ \\cos^{-1}x &: [-1,1] \\to [0, \\pi] \\\\ \\tan^{-1}x &: \\mathbb{R} \\to (-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}) \\\\ \\cot^{-1}x &: \\mathbb{R} \\to (0, \\pi) \\\\ \\sec^{-1}x &: |x|\\ge 1 \\to [0,\\pi]\\setminus\\{\\tfrac{\\pi}{2}\\} \\\\ \\csc^{-1}x &: |x|\\ge 1 \\to [-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}]\\setminus\\{0\\} \\end{aligned}",
        tag: "Isko ratt lo - seriously",
      },
      {
        kind: "trap",
        text: "Sabse common blunder: cos⁻¹(−½) ka answer −60° likh dena. **Galat.** cos⁻¹ ka range [0, π] hai - answer kabhi negative nahi ho sakta. Sahi answer 2π/3 hai. Rule: negative input aaye to cos⁻¹, cot⁻¹, sec⁻¹ ka answer **second quadrant** mein jaata hai, aur sin⁻¹, tan⁻¹, cosec⁻¹ ka **negative** ho jaata hai.",
      },
      {
        kind: "example",
        problem: "Find the principal value of $\\sin^{-1}\\left(-\\tfrac{1}{2}\\right)$.",
        steps: [
          { do: "Maan lo sin⁻¹(−½) = θ, matlab sin θ = −½.", why: "Hamesha θ rakh ke shuru karo - presentation ke marks milte hain." },
          { do: "sin⁻¹ ka principal range hai [−π/2, π/2]. Isliye θ isi ke andar hona chahiye.", why: "Yahi woh line hai jiske liye examiner mark deta hai." },
          { do: "Hum jaante hain sin(π/6) = ½, isliye sin(−π/6) = −½.", why: "sin ek odd function hai: sin(−x) = −sin x." },
          { do: "−π/6 ∈ [−π/2, π/2] ✓ - isliye θ = −π/6.", why: "Range check karna mat bhoolna, yahi final verification hai." },
        ],
        answer: "-\\frac{\\pi}{6}",
      },
      {
        kind: "quiz",
        q: "$\\cos^{-1}\\left(-\\tfrac{1}{2}\\right)$ ka principal value kya hai?",
        options: ["$-\\frac{\\pi}{3}$", "$\\frac{2\\pi}{3}$", "$\\frac{4\\pi}{3}$", "$\\frac{\\pi}{3}$"],
        correct: 1,
        explain:
          "cos⁻¹ ka range [0, π] hai - negative answer allowed hi nahi. cos(2π/3) = −½ aur 2π/3 ∈ [0, π] ✓. Isliye answer 2π/3.",
      },
      {
        kind: "concept",
        title: "Kaam ke identities",
        body: "Yeh teen pair har simplification sawaal mein kaam aate hain. Pehla wala sabse zyada use hota hai - same input ke inverse pair ka sum constant hota hai.",
        formula: "\\begin{aligned} \\sin^{-1}x + \\cos^{-1}x &= \\tfrac{\\pi}{2} \\\\ \\tan^{-1}x + \\cot^{-1}x &= \\tfrac{\\pi}{2} \\\\ \\sec^{-1}x + \\csc^{-1}x &= \\tfrac{\\pi}{2} \\end{aligned}",
        tag: "Sab ka jawab π/2",
      },
      {
        kind: "concept",
        title: "tan⁻¹ addition formula",
        body: "Do tan⁻¹ jodne ka formula - par condition dhyaan se. Agar xy > 1 ho to π add karna padta hai (positive x ke liye). Board mein aksar xy < 1 hi rakhte hain, par condition likh dena safe hai.",
        formula: "\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\!\\left(\\frac{x+y}{1-xy}\\right), \\quad xy < 1",
        tag: "Conditions likhna mat bhoolna",
      },
      {
        kind: "example",
        problem: "Simplify: $\\tan^{-1}\\tfrac{1}{2} + \\tan^{-1}\\tfrac{1}{3}$",
        steps: [
          { do: "Check karo: xy = (½)(⅓) = 1/6 < 1 ✓, isliye seedha formula laga sakte hain.", why: "Condition check karne ka ½ mark alag milta hai." },
          { do: "Formula lagao: tan⁻¹[(½ + ⅓)/(1 − 1/6)]", why: "Bas values daal do, jaldi mat karo." },
          { do: "Numerator: ½ + ⅓ = 5/6. Denominator: 1 − 1/6 = 5/6.", why: "Fractions alag-alag solve karo, galti nahi hogi." },
          { do: "= tan⁻¹[(5/6)/(5/6)] = tan⁻¹(1) = π/4", why: "tan(π/4) = 1 - yeh standard value hai." },
        ],
        answer: "\\frac{\\pi}{4}",
      },
      {
        kind: "boardtip",
        text: "Principal value ke sawaal mein **hamesha range likho**. 2-marker mein 1 mark 'range mention karne' ka hota hai aur 1 mark final answer ka. Sirf answer likh dene se aadhe marks chale jaate hain.",
      },
      {
        kind: "victory",
        text: "Chapter 2 done! Yeh chapter chhota hai par har paper mein 3-4 marks deta hai. 🎯",
        recap: [
          "Principal branch table = sabse important cheez",
          "sin⁻¹, tan⁻¹, cosec⁻¹ → negative answers allowed",
          "cos⁻¹, cot⁻¹, sec⁻¹ → answer hamesha [0, π] mein",
          "sin⁻¹x + cos⁻¹x = π/2 (aur baaki do pairs bhi)",
          "tan⁻¹ addition mein xy < 1 condition check karo",
        ],
      },
    ],
  },
  {
    slug: "matrices",
    title: "Number ka Chakravyuh",
    xp: 100,
    beats: [
      {
        kind: "story",
        emoji: "🧮",
        text: "Socho tumhari class ke marks ek table mein hain - rows mein students, columns mein subjects. Bas, yeh table hi **matrix** hai. Numbers ki ek fauj, rows aur columns mein line-up. Aur maths ka sabse aasaan chapter - ismein sirf careful rehna hai, samajhna kam hai.",
      },
      {
        kind: "concept",
        title: "Order matlab shakl",
        body: "m × n matrix matlab m rows aur n columns. Likhne ka tareeka: **row pehle, column baad mein** (Row-Column, jaise 'RC'). Element aᵢⱼ matlab i-th row, j-th column ka number.",
        formula: "A = [a_{ij}]_{m \\times n}",
        tag: "Row pehle, hamesha",
      },
      {
        kind: "concept",
        title: "Multiplication ka golden rule",
        body: "A (m×n) aur B (p×q) ko multiply karne ke liye **n = p** hona hi chahiye - beech wale numbers match karne chahiye. Result ka order hoga m×q (bahar wale numbers). Aur yaad rakho: AB ≠ BA generally - order badalne se answer badal jaata hai.",
        formula: "A_{m\\times n} \\cdot B_{n \\times q} = C_{m \\times q}",
        tag: "Beech wale match, bahar wale answer",
      },
      {
        kind: "trap",
        text: "Matrix multiplication **commutative nahi** hai. AB aur BA alag hote hain - kabhi kabhi BA exist hi nahi karta! Aur ek aur: agar AB = 0 ho, to yeh zaroori nahi ki A = 0 ya B = 0 ho. Numbers mein yeh sach tha, matrices mein nahi. Yeh 1-marker mein aata hai.",
      },
      {
        kind: "quiz",
        q: "A ka order 2×3 hai aur B ka order 3×4. AB ka order kya hoga?",
        options: ["3×3", "2×4", "4×2", "Multiply nahi ho sakta"],
        correct: 1,
        explain:
          "Beech wale numbers 3 aur 3 match kar rahe hain ✓ isliye multiplication possible hai. Bahar wale numbers 2 aur 4 lo - answer ka order 2×4.",
      },
      {
        kind: "concept",
        title: "Symmetric aur Skew-Symmetric",
        body: "**Symmetric**: A' = A - matrix apne transpose ke barabar. Diagonal ke aar-paar mirror image.\n**Skew-symmetric**: A' = −A. Iska ek maze ka natija - skew-symmetric matrix ke saare diagonal elements **zero** hote hain (kyunki aᵢᵢ = −aᵢᵢ ⟹ aᵢᵢ = 0).",
        formula: "\\text{Symmetric: } A' = A \\qquad \\text{Skew-symmetric: } A' = -A,\; a_{ii}=0",
        tag: "Diagonal zero = skew ki pehchaan",
      },
      {
        kind: "example",
        problem:
          "Express $A = \\begin{bmatrix} 1 & 5 \\\\ -1 & 2 \\end{bmatrix}$ as the sum of a symmetric and a skew-symmetric matrix.",
        steps: [
          {
            do: "Formula: A = ½(A + A') + ½(A − A'). Pehla part symmetric, doosra skew-symmetric.",
            why: "Yeh formula likhna hi 1 mark ka hai. Hamesha pehle likho.",
          },
          {
            do: "A' = [[1, −1], [5, 2]] - rows ko columns bana do.",
            why: "Transpose matlab bas rows aur columns swap.",
          },
          {
            do: "A + A' = [[2, 4], [4, 4]], to P = ½(A + A') = [[1, 2], [2, 2]]. Check: P' = P ✓ symmetric.",
            why: "Check karna zaroori hai - aur examiner ko dikhta hai ki tumne samjha hai.",
          },
          {
            do: "A − A' = [[0, 6], [−6, 0]], to Q = ½(A − A') = [[0, 3], [−3, 0]]. Diagonal zero ✓ skew-symmetric.",
            why: "Diagonal zero dikhte hi confirm ho gaya ki skew-symmetric sahi bana.",
          },
          { do: "Isliye A = [[1,2],[2,2]] + [[0,3],[−3,0]].", why: "Final answer mein dono matrices dikhana zaroori hai." },
        ],
        answer: "A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 2 \\end{bmatrix} + \\begin{bmatrix} 0 & 3 \\\\ -3 & 0 \\end{bmatrix}",
      },
      {
        kind: "boardtip",
        text: "Matrices mein galtiyaan calculation ki hoti hain, concept ki nahi. Multiply karte waqt **ungli se row aur column trace karo** - row left-to-right, column top-to-bottom, multiply karo, jodo. Jaldi karne se hi marks jaate hain.",
      },
      {
        kind: "victory",
        text: "Chapter 3 fateh! Algebra unit ke 10 marks mein se aadhe yahin se aate hain, aur yeh sabse aasaan hai. 💪",
        recap: [
          "Order = rows × columns (row pehle)",
          "Multiplication: beech wale match karo, bahar wale se order banao",
          "AB ≠ BA generally",
          "Symmetric: A' = A | Skew: A' = −A, diagonal zero",
          "A = ½(A + A') + ½(A − A') - yeh formula ratt lo",
        ],
      },
    ],
  },
  {
    slug: "determinants",
    title: "Matrix ka Aadhaar Number",
    xp: 130,
    beats: [
      {
        kind: "story",
        emoji: "🎯",
        text: "Har square matrix ka ek single number hota hai - uska determinant. Yeh number chhota sa hai par bahut kuch batata hai: matrix ka inverse banega ya nahi, equations ka solution milega ya nahi, triangle ka area kya hai. Ek number, itni saari khabrein.",
      },
      {
        kind: "concept",
        title: "2×2 aur 3×3 determinant",
        body: "2×2 mein cross multiply karke subtract. 3×3 mein pehli row ke har element ko uske minor se multiply karo, aur **+ − +** ka sign pattern lagao.",
        formula: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc, \\qquad \\begin{vmatrix} a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\\\ a_3 & b_3 & c_3 \\end{vmatrix} = a_1(b_2c_3 - b_3c_2) - b_1(a_2c_3 - a_3c_2) + c_1(a_2b_3 - a_3b_2)",
        tag: "Sign pattern: + − +",
      },
      {
        kind: "concept",
        title: "Adjoint aur Inverse",
        body: "Adjoint = cofactor matrix ka transpose. Aur inverse formula ke liye |A| ≠ 0 hona zaroori hai. Agar |A| = 0 ho to matrix **singular** hai - uska inverse hota hi nahi.",
        formula: "A^{-1} = \\frac{1}{|A|}\\,\\text{adj}(A), \\qquad |A| \\neq 0",
        tag: "|A| = 0 ⟹ inverse nahi",
      },
      {
        kind: "trap",
        text: "Adjoint nikalte waqt **transpose lena bhool jaana** - yeh sabse common galti hai. Cofactor matrix banaya, khush ho gaye, aur transpose hi nahi kiya. adj(A) = (cofactor matrix)ᵀ. Aur cofactor mein sign pattern (−1)^(i+j) lagana bhi mat bhoolna.",
      },
      {
        kind: "quiz",
        q: "Agar A ek 3×3 matrix hai aur |A| = 5, to |adj A| kya hoga?",
        options: ["5", "15", "25", "125"],
        correct: 2,
        explain:
          "Formula: |adj A| = |A|^(n−1), jahan n matrix ka order hai. Yahan n = 3, isliye |adj A| = 5^(3−1) = 5² = 25.",
      },
      {
        kind: "concept",
        title: "System of equations - consistency ka faisla",
        body: "AX = B likho. Phir:\n• |A| ≠ 0 ⟹ **unique solution** hai (consistent). X = A⁻¹B se nikaal lo.\n• |A| = 0 aur (adj A)B ≠ 0 ⟹ **no solution** (inconsistent).\n• |A| = 0 aur (adj A)B = 0 ⟹ **infinitely many solutions** ya no solution.",
        formula: "AX = B \\implies X = A^{-1}B",
        tag: "5-marker ka blueprint",
      },
      {
        kind: "example",
        problem: "Solve using matrices: 2x + 3y = 5, 3x + 5y = 8",
        steps: [
          {
            do: "Matrix form: A = [[2,3],[3,5]], X = [x, y]ᵀ, B = [5, 8]ᵀ. AX = B.",
            why: "Matrix form likhna hi pehla mark hai. Chhodo mat.",
          },
          { do: "|A| = (2)(5) − (3)(3) = 10 − 9 = 1. |A| = 1 ≠ 0 ⟹ unique solution exists.", why: "Determinant check karna compulsory hai - 1 mark iska alag hai." },
          { do: "adj(A) = [[5, −3], [−3, 2]] (2×2 ka shortcut: diagonal swap karo, off-diagonal ke signs badlo).", why: "2×2 ke liye yeh shortcut time bachata hai." },
          { do: "A⁻¹ = (1/1)·adj(A) = [[5, −3], [−3, 2]].", why: "|A| = 1 tha, isliye division se koi farak nahi pada." },
          { do: "X = A⁻¹B = [[5,−3],[−3,2]]·[5,8]ᵀ = [25 − 24, −15 + 16]ᵀ = [1, 1]ᵀ.", why: "Matrix multiplication dhyaan se karo - yahin galtiyaan hoti hain." },
          { do: "Isliye x = 1, y = 1. Verify: 2(1) + 3(1) = 5 ✓ aur 3(1) + 5(1) = 8 ✓", why: "Verification likhne se examiner ko confidence aata hai, aur tumhe bhi." },
        ],
        answer: "x = 1,\; y = 1",
      },
      {
        kind: "concept",
        title: "Area of triangle",
        body: "Teen points ka area determinant se. Modulus lagana mat bhoolna - area kabhi negative nahi hota. Aur agar area zero aa jaaye, matlab teeno points ek hi line par hain (collinear).",
        formula: "\\text{Area} = \\frac{1}{2}\\left|\\begin{vmatrix} x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\\\ x_3 & y_3 & 1 \\end{vmatrix}\\right|",
        tag: "Area = 0 ⟹ collinear",
      },
      {
        kind: "boardtip",
        text: "3 equations wale 5-marker mein steps ka order fix hai: (1) AX = B likho, (2) |A| nikalo, (3) cofactors, (4) adj A = cofactorᵀ, (5) A⁻¹, (6) X = A⁻¹B. **Har step alag line mein likho.** Calculation galat bhi ho gayi to bhi 3-4 step marks mil jaate hain.",
      },
      {
        kind: "victory",
        text: "Determinants clear! Ab tumhare paas board ka sabse predictable 5-marker ka formula hai. 🏆",
        recap: [
          "2×2: ad − bc | 3×3: expand with + − + signs",
          "A⁻¹ = adj(A)/|A|, sirf jab |A| ≠ 0",
          "adj(A) = cofactor matrix ka TRANSPOSE",
          "|adj A| = |A|^(n−1)",
          "AX = B ⟹ X = A⁻¹B (unique solution jab |A| ≠ 0)",
          "Area = ½|determinant|, zero ⟹ collinear",
        ],
      },
    ],
  },
];
