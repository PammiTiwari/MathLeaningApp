import type { Note } from "./note-types";

export const NOTES_A: Note[] = [
  // ============================= CH 1 =============================
  {
    slug: "relations-and-functions",
    title: "Relations & Functions",
    pages: [
      [
        { t: "h", text: "1. RELATION kya hai" },
        { t: "def", term: "Relation", text: "A se B ka relation R matlab A × B ka koi bhi subset. (a,b) ∈ R ho to likhte hain a R b." },
        { t: "fl", items: [
          { tex: "R \\subseteq A \\times B", label: "definition" },
          { tex: "n(A)=m,\; n(B)=n \\Rightarrow 2^{mn}\\text{ relations}", label: "kitne relations" },
        ]},
        { t: "p", text: "Khaas relations: Empty (R = φ, koi juda nahi) · Universal (R = A×A, sab jude) · Identity (R = {(a,a)}, sirf khud se)" },

        { t: "h", text: "2. TEEN PROPERTIES - R · S · T" },
        { t: "fl", items: [
          { tex: "(a,a) \\in R \;\; \\forall a \\in A", label: "Reflexive - har cheez khud se judi" },
          { tex: "(a,b) \\in R \\Rightarrow (b,a) \\in R", label: "Symmetric - rishta dono taraf" },
          { tex: "(a,b),(b,c) \\in R \\Rightarrow (a,c) \\in R", label: "Transitive - dost ka dost dost" },
        ]},
        { t: "warn", text: "Symmetric + Transitive se Reflexive NAHI aata. Empty relation dono hai par reflexive nahi - yahi counter-example likhna." },

        { t: "h", text: "3. EQUIVALENCE RELATION" },
        { t: "p", text: "Teeno properties ek saath = equivalence relation. Yeh set ko alag-alag dibbon mein baant deta hai." },
        { t: "f", tex: "[a] = \\{x \\in A : x\\,R\\,a\\}", label: "equivalence class of a" },
        { t: "p", text: "Do classes ya to bilkul same hoti hain ya bilkul alag - beech ka kuch nahi. Sabko milao to poora set ban jaata hai." },

        { t: "steps", title: "★ 5-MARKER: 'Show R is an equivalence relation'", items: [
          "**Reflexive:** 'Let a ∈ A' likho. Dikhao ki (a,a) condition satisfy karta hai.",
          "**Symmetric:** 'Let (a,b) ∈ R' se shuru. Condition likho, use ulta karke (b,a) ∈ R dikhao.",
          "**Transitive:** 'Let (a,b) ∈ R and (b,c) ∈ R.' Dono conditions likho, jodo ya subtract karo - beech ka term cancel hoga, (a,c) ∈ R aa jayega.",
          "**Conclusion:** 'Hence R is reflexive, symmetric and transitive, so R is an equivalence relation.'",
          "Agar poocha ho to equivalence classes bhi likh do - bonus impression.",
        ]},
        { t: "ex", q: "Z par a R b ⟺ (a−b) 2 se divisible. Prove equivalence relation.", sol: [
          "Reflexive: a − a = 0 = 2(0) ✓ divisible",
          "Symmetric: a − b = 2k ⟹ b − a = 2(−k) ✓",
          "Transitive: a−b = 2k, b−c = 2m ⟹ jodo ⟹ a−c = 2(k+m) ✓",
          "Classes: [0] = even numbers, [1] = odd numbers",
        ]},
      ],
      [
        { t: "h", text: "4. FUNCTION" },
        { t: "def", term: "Function", text: "f : A → B matlab A ke har element ko B mein exactly ek element mile. Ek input, ek hi output." },

        { t: "h", text: "5. ONE-ONE (Injective)" },
        { t: "f", tex: "f(x_1) = f(x_2) \\implies x_1 = x_2", label: "definition" },
        { t: "steps", title: "One-one prove karne ka tareeka", items: [
          "'Let f(x₁) = f(x₂)' likho.",
          "Function ka formula dono taraf daalo.",
          "Simplify karke x₁ = x₂ pe pahuncho.",
          "'Hence f is one-one' likho.",
        ]},
        { t: "p", text: "Galat sabit karna ho to bas ek counter-example do - jaise f(x) = x² mein f(2) = f(−2) = 4." },

        { t: "h", text: "6. ONTO (Surjective)" },
        { t: "f", tex: "\\forall\\, y \\in B,\; \\exists\\, x \\in A \\text{ such that } f(x) = y", label: "definition" },
        { t: "steps", title: "Onto prove karne ka tareeka", items: [
          "'Let y ∈ B (codomain) be arbitrary' likho.",
          "f(x) = y rakho aur x ko y ke terms mein solve karo.",
          "**Check karo ki woh x domain mein aata hai** - yeh line ka apna mark hai.",
          "'Hence for every y there exists x, so f is onto' likho.",
        ]},
        { t: "p", text: "Onto ka matlab: Range = Codomain. Agar range chhoti reh gayi to onto nahi." },

        { t: "h", text: "7. BIJECTIVE" },
        { t: "p", text: "One-one + Onto dono = bijective. Aisa function invertible hota hai." },
        { t: "table", head: ["Function", "One-one?", "Onto? (R→R)"], rows: [
          ["f(x) = 3x + 5", "Haan", "Haan (bijective)"],
          ["f(x) = x²", "Nahi", "Nahi"],
          ["f(x) = x³", "Haan", "Haan"],
          ["f(x) = |x|", "Nahi", "Nahi"],
        ]},
        { t: "star", text: "Finite sets mein n(A) = n(B) ho to one-one ⟺ onto. Ek prove kar diya, doosra automatic." },

        { t: "h", text: "8. GINTI ke formulas" },
        { t: "fl", items: [
          { tex: "2^{mn}", label: "A→B relations, n(A)=m, n(B)=n" },
          { tex: "n^m", label: "total functions A→B" },
          { tex: "n! \;\;(\\text{if } m=n)", label: "bijective functions" },
        ]},
        { t: "warn", text: "Domain aur codomain change hone se answer badal jaata hai! f(x)=x² R→R par onto nahi, par R→[0,∞) par onto hai. Sawaal mein set dhyaan se padho." },
      ],
    ],
  },

  // ============================= CH 2 =============================
  {
    slug: "inverse-trigonometric-functions",
    title: "Inverse Trigonometric Functions",
    pages: [
      [
        { t: "h", text: "1. Inverse chahiye hi kyun" },
        { t: "p", text: "sin θ = ½ ke infinite answers hain (30°, 150°, 390°…). Ek hi answer fix karne ke liye har inverse ka ek chhota ilaaka tay kiya gaya - usi ko principal value branch kehte hain." },

        { t: "h", text: "2. ★ RANGE TABLE - sabse zaroori cheez" },
        { t: "table", head: ["Function", "Domain", "Range (Principal)"], rows: [
          ["sin⁻¹x", "[−1, 1]", "[−π/2, π/2]"],
          ["cos⁻¹x", "[−1, 1]", "[0, π]"],
          ["tan⁻¹x", "R", "(−π/2, π/2)"],
          ["cot⁻¹x", "R", "(0, π)"],
          ["sec⁻¹x", "|x| ≥ 1", "[0, π] − {π/2}"],
          ["cosec⁻¹x", "|x| ≥ 1", "[−π/2, π/2] − {0}"],
        ]},
        { t: "star", text: "Yaad rakhne ka tareeka: sin, tan, cosec ka ghar −π/2 se π/2 (negative allowed). cos, cot, sec ka ghar 0 se π (sirf positive side)." },

        { t: "h", text: "3. NEGATIVE input aaye to" },
        { t: "fl", items: [
          { tex: "\\sin^{-1}(-x) = -\\sin^{-1}x" },
          { tex: "\\tan^{-1}(-x) = -\\tan^{-1}x" },
          { tex: "\\csc^{-1}(-x) = -\\csc^{-1}x", label: "ye teen: minus bahar aa jaata hai" },
          { tex: "\\cos^{-1}(-x) = \\pi - \\cos^{-1}x" },
          { tex: "\\cot^{-1}(-x) = \\pi - \\cot^{-1}x" },
          { tex: "\\sec^{-1}(-x) = \\pi - \\sec^{-1}x", label: "ye teen: π mein se ghatao" },
        ]},
        { t: "warn", text: "cos⁻¹(−½) = 2π/3 hai, −π/3 NAHI. cos⁻¹ ka answer kabhi negative nahi ho sakta - range [0, π] hai." },

        { t: "steps", title: "Principal value nikalne ke 4 steps", items: [
          "Maan lo sin⁻¹(x) = θ ⟹ sin θ = x",
          "**Range likho** - 'θ ∈ [−π/2, π/2]' (iska apna mark hai)",
          "Standard table se θ ka value dhoondho",
          "Check karo ki θ range ke andar hai, phir answer likho",
        ]},
      ],
      [
        { t: "h", text: "4. IDENTITIES" },
        { t: "fl", items: [
          { tex: "\\sin^{-1}x + \\cos^{-1}x = \\tfrac{\\pi}{2}" },
          { tex: "\\tan^{-1}x + \\cot^{-1}x = \\tfrac{\\pi}{2}" },
          { tex: "\\sec^{-1}x + \\csc^{-1}x = \\tfrac{\\pi}{2}", label: "teeno pairs ka jawab π/2" },
        ]},
        { t: "fl", items: [
          { tex: "\\sin^{-1}\\tfrac1x = \\csc^{-1}x" },
          { tex: "\\cos^{-1}\\tfrac1x = \\sec^{-1}x" },
          { tex: "\\tan^{-1}\\tfrac1x = \\cot^{-1}x \;(x>0)", label: "reciprocal ulta kar deta hai" },
        ]},

        { t: "h", text: "5. ADDITION formulas" },
        { t: "fl", items: [
          { tex: "\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\!\\left(\\frac{x+y}{1-xy}\\right)", label: "jab xy < 1" },
          { tex: "\\tan^{-1}x - \\tan^{-1}y = \\tan^{-1}\\!\\left(\\frac{x-y}{1+xy}\\right)", label: "jab xy > −1" },
        ]},
        { t: "p", text: "Agar xy > 1 aur x, y > 0 ho to answer mein + π lagta hai. Condition likhna mat bhoolna - uska alag mark hota hai." },

        { t: "h", text: "6. DOUBLE ANGLE (2 tan⁻¹x)" },
        { t: "fl", items: [
          { tex: "2\\tan^{-1}x = \\sin^{-1}\\frac{2x}{1+x^2}", label: "|x| ≤ 1" },
          { tex: "2\\tan^{-1}x = \\cos^{-1}\\frac{1-x^2}{1+x^2}", label: "x ≥ 0" },
          { tex: "2\\tan^{-1}x = \\tan^{-1}\\frac{2x}{1-x^2}", label: "|x| < 1" },
        ]},
        { t: "star", text: "Simplification mein x = tan θ substitute karna sabse bada hathiyaar hai - poora expression ek line mein simple ho jaata hai." },

        { t: "ex", q: "tan⁻¹(½) + tan⁻¹(⅓) = ?", sol: [
          "Check: xy = (½)(⅓) = 1/6 < 1 ✓ formula lag sakta hai",
          "= tan⁻¹[(½ + ⅓) / (1 − 1/6)]",
          "= tan⁻¹[(5/6) / (5/6)] = tan⁻¹(1)",
          "= π/4",
        ]},
        { t: "warn", text: "2-marker mein 1 mark range likhne ka aur 1 mark answer ka hota hai. Sirf answer likhne se aadhe marks chale jaate hain." },
      ],
    ],
  },

  // ============================= CH 3 =============================
  {
    slug: "matrices",
    title: "Matrices",
    pages: [
      [
        { t: "h", text: "1. BASICS" },
        { t: "def", term: "Matrix", text: "Numbers ka rectangular arrangement. Order = m × n matlab m rows, n columns. ROW pehle, COLUMN baad mein." },
        { t: "f", tex: "A = [a_{ij}]_{m \\times n}", label: "aᵢⱼ = i-th row, j-th column" },
        { t: "p", text: "m × n matrix mein total mn elements hote hain." },

        { t: "h", text: "2. TYPES" },
        { t: "table", head: ["Type", "Matlab"], rows: [
          ["Row matrix", "Sirf 1 row (1 × n)"],
          ["Column matrix", "Sirf 1 column (m × 1)"],
          ["Square matrix", "rows = columns (n × n)"],
          ["Diagonal", "Diagonal ke alawa sab 0"],
          ["Scalar", "Diagonal matrix jismein sab diagonal same"],
          ["Identity (I)", "Diagonal mein sab 1, baaki 0"],
          ["Zero matrix", "Saare elements 0"],
        ]},
        { t: "p", text: "Do matrices barabar tabhi jab order same ho AUR har corresponding element same ho." },

        { t: "h", text: "3. OPERATIONS" },
        { t: "p", text: "Addition/subtraction: sirf same order wali matrices mein, element-by-element." },
        { t: "f", tex: "A_{m\\times n} \\cdot B_{n \\times p} = C_{m \\times p}", label: "★ beech wale match, bahar wale answer" },
        { t: "p", text: "Multiplication ka tareeka: C ka (i,j) element = A ki i-th ROW × B ke j-th COLUMN (multiply karke jodo)." },
        { t: "warn", text: "AB ≠ BA generally! Aur AB = 0 ka matlab A = 0 ya B = 0 NAHI hota - numbers wala rule yahan nahi chalta." },
        { t: "fl", items: [
          { tex: "A(BC) = (AB)C", label: "associative ✓" },
          { tex: "A(B+C) = AB + AC", label: "distributive ✓" },
          { tex: "AI = IA = A", label: "identity ka kaam" },
        ]},
      ],
      [
        { t: "h", text: "4. TRANSPOSE (A′)" },
        { t: "p", text: "Rows ko columns bana do. m×n ka transpose n×m ho jaata hai." },
        { t: "fl", items: [
          { tex: "(A')' = A" },
          { tex: "(A+B)' = A' + B'" },
          { tex: "(kA)' = kA'" },
          { tex: "(AB)' = B'A'", label: "★ order ULTA ho jaata hai" },
        ]},

        { t: "h", text: "5. SYMMETRIC & SKEW-SYMMETRIC" },
        { t: "fl", items: [
          { tex: "A' = A", label: "Symmetric" },
          { tex: "A' = -A,\;\; a_{ii} = 0", label: "Skew-symmetric - diagonal sab ZERO" },
        ]},
        { t: "p", text: "Skew mein diagonal zero kyun? Kyunki aᵢᵢ = −aᵢᵢ ⟹ 2aᵢᵢ = 0 ⟹ aᵢᵢ = 0." },

        { t: "steps", title: "★ 3-MARKER: A ko symmetric + skew mein todo", items: [
          "Formula likho: A = ½(A + A′) + ½(A − A′)",
          "A′ nikalo (rows ↔ columns)",
          "P = ½(A + A′) - yeh symmetric hoga. Check: P′ = P",
          "Q = ½(A − A′) - yeh skew hoga. Check: diagonal zero hai",
          "Answer mein dono matrices likho: A = P + Q",
        ]},
        { t: "ex", q: "A = [[1, 5], [−1, 2]] ko todo", sol: [
          "A′ = [[1, −1], [5, 2]]",
          "A + A′ = [[2, 4], [4, 4]] ⟹ P = [[1, 2], [2, 2]]  (symmetric ✓)",
          "A − A′ = [[0, 6], [−6, 0]] ⟹ Q = [[0, 3], [−3, 0]]  (diagonal zero ✓)",
          "A = [[1,2],[2,2]] + [[0,3],[−3,0]]",
        ]},

        { t: "h", text: "6. INVERTIBLE MATRIX" },
        { t: "p", text: "Agar AB = BA = I ho to B ko A ka inverse kehte hain, likhte hain A⁻¹. Inverse hamesha unique hota hai." },
        { t: "f", tex: "(AB)^{-1} = B^{-1}A^{-1}", label: "order ulta (transpose jaisa)" },
        { t: "star", text: "Inverse tabhi exist karta hai jab |A| ≠ 0. Poora hisaab Chapter 4 mein hai." },
        { t: "warn", text: "Matrices mein galtiyaan concept ki nahi, calculation ki hoti hain. Multiply karte waqt ungli se row aur column trace karo - jaldbaazi hi dushman hai." },
      ],
    ],
  },

  // ============================= CH 4 =============================
  {
    slug: "determinants",
    title: "Determinants",
    pages: [
      [
        { t: "h", text: "1. DETERMINANT nikalna" },
        { t: "f", tex: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc", label: "2 × 2" },
        { t: "f", tex: "\\begin{vmatrix} a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\\\ a_3 & b_3 & c_3 \\end{vmatrix} = a_1(b_2c_3 - b_3c_2) - b_1(a_2c_3 - a_3c_2) + c_1(a_2b_3 - a_3b_2)", label: "3 × 3, signs + − +" },
        { t: "p", text: "Sirf SQUARE matrix ka determinant hota hai. Expansion kisi bhi row ya column se ho sakta hai - jahan zyada zero ho wahi chuno, kaam aasaan." },

        { t: "h", text: "2. PROPERTIES (calculation bachate hain)" },
        { t: "p", text: "• Rows aur columns aapas mein badal do - determinant nahi badalta" },
        { t: "p", text: "• Do rows/columns swap karo - sign badal jaata hai" },
        { t: "p", text: "• Do rows/columns bilkul same ⟹ determinant = 0" },
        { t: "p", text: "• Ek row ko k se multiply ⟹ determinant k guna" },
        { t: "p", text: "• Ek row mein doosri row ka multiple jodo - determinant nahi badalta (yeh sabse kaam ka hai)" },
        { t: "fl", items: [
          { tex: "|AB| = |A|\\,|B|" },
          { tex: "|kA| = k^n |A|", label: "n = order" },
          { tex: "|A'| = |A|" },
        ]},

        { t: "h", text: "3. MINOR, COFACTOR, ADJOINT" },
        { t: "def", term: "Minor Mᵢⱼ", text: "i-th row aur j-th column hata ke jo determinant bache." },
        { t: "f", tex: "A_{ij} = (-1)^{i+j} M_{ij}", label: "Cofactor = sign × minor" },
        { t: "f", tex: "\\text{adj}(A) = [A_{ij}]^{T}", label: "★ cofactor matrix ka TRANSPOSE" },
        { t: "warn", text: "Sabse common galti: cofactor matrix bana ke transpose lena BHOOL jaana. adj(A) = cofactor matrix ka transpose. Har baar check karo." },
      ],
      [
        { t: "h", text: "4. INVERSE" },
        { t: "fl", items: [
          { tex: "A^{-1} = \\frac{1}{|A|}\\,\\text{adj}(A)", label: "sirf jab |A| ≠ 0" },
          { tex: "A(\\text{adj}A) = (\\text{adj}A)A = |A|\\,I" },
          { tex: "|\\text{adj}A| = |A|^{\\,n-1}" },
          { tex: "|A^{-1}| = \\frac{1}{|A|}" },
        ]},
        { t: "p", text: "|A| = 0 ⟹ matrix SINGULAR hai, inverse hai hi nahi. |A| ≠ 0 ⟹ non-singular, inverse milega." },

        { t: "h", text: "5. AREA OF TRIANGLE" },
        { t: "f", tex: "\\Delta = \\frac{1}{2}\\left|\\begin{vmatrix} x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\\\ x_3 & y_3 & 1 \\end{vmatrix}\\right|" },
        { t: "star", text: "Modulus zaroori hai - area negative nahi hota. Agar determinant 0 aaya to teeno points COLLINEAR hain." },

        { t: "h", text: "6. ★ SYSTEM OF EQUATIONS - 5-marker" },
        { t: "steps", title: "Matrix method ke 6 steps", items: [
          "Equations ko **AX = B** form mein likho (A = coefficients, X = variables, B = constants)",
          "**|A| nikalo.** Agar ≠ 0 to likho 'unique solution exists'",
          "Saare 9 **cofactors** nikalo (3×3 ke liye)",
          "**adj A** = cofactor matrix ka transpose",
          "**A⁻¹ = adj(A) / |A|**",
          "**X = A⁻¹B** - multiply karke x, y, z nikaalo. Ek equation mein daal ke verify karo.",
        ]},
        { t: "p", text: "Har step alag line mein likho. Calculation galat bhi ho gayi to 3-4 step marks bach jaate hain." },

        { t: "h", text: "7. CONSISTENCY - kaunsa case" },
        { t: "table", head: ["Condition", "Matlab"], rows: [
          ["|A| ≠ 0", "Unique solution (consistent)"],
          ["|A| = 0, (adj A)B ≠ 0", "No solution (inconsistent)"],
          ["|A| = 0, (adj A)B = 0", "Infinitely many ya no solution"],
        ]},
        { t: "warn", text: "Determinant nikalna step 2 hai, skip mat karna - uska apna 1 mark hai, chahe answer aage galat ho jaye." },
      ],
    ],
  },

  // ============================= CH 5 =============================
  {
    slug: "continuity-and-differentiability",
    title: "Continuity & Differentiability",
    pages: [
      [
        { t: "h", text: "1. CONTINUITY at x = a" },
        { t: "f", tex: "\\lim_{x \\to a^{-}} f(x) \;=\; \\lim_{x \\to a^{+}} f(x) \;=\; f(a)", label: "LHL = RHL = f(a)" },
        { t: "p", text: "Teeno cheezein exist bhi karni chahiye aur barabar bhi honi chahiye. Ek bhi gadbad = discontinuous." },
        { t: "fl", items: [
          { tex: "\\text{LHL} = \\lim_{h \\to 0} f(a - h)", label: "x = a − h rakho" },
          { tex: "\\text{RHL} = \\lim_{h \\to 0} f(a + h)", label: "x = a + h rakho" },
        ]},
        { t: "steps", title: "Piecewise function mein continuity check", items: [
          "LHL nikalo - x ≤ a wala branch use karo, x = a − h rakh ke h → 0",
          "RHL nikalo - x > a wala branch use karo, x = a + h rakh ke h → 0",
          "f(a) nikalo - dekho ki '≤' kis branch mein hai, wahi use karo",
          "Teeno barabar karo. k nikalna ho to equation solve kar lo",
        ]},
        { t: "ex", q: "f(x) = kx+1 (x ≤ 5), 3x−5 (x > 5) continuous at x = 5. k = ?", sol: [
          "LHL = lim (kx + 1) = 5k + 1",
          "RHL = lim (3x − 5) = 15 − 5 = 10",
          "f(5) = 5k + 1  (x = 5 pehle branch mein aata hai kyunki '≤')",
          "5k + 1 = 10 ⟹ k = 9/5",
        ]},
        { t: "p", text: "Polynomial, sin, cos, eˣ har jagah continuous hain. tan x, sec x, 1/x apne 'undefined' points par nahi." },

        { t: "h", text: "2. DIFFERENTIABILITY" },
        { t: "fl", items: [
          { tex: "\\text{LHD} = \\lim_{h\\to0}\\frac{f(a-h)-f(a)}{-h}" },
          { tex: "\\text{RHD} = \\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}", label: "LHD = RHD ho to differentiable" },
        ]},
        { t: "warn", text: "★ Differentiable ⟹ Continuous. Par ULTA NAHI! |x| at x = 0 continuous hai (bina pen uthaye bana) par differentiable nahi (nukkeela corner, LHD = −1, RHD = +1). Har saal 1-marker mein aata hai." },
      ],
      [
        { t: "h", text: "3. DERIVATIVES - poori list" },
        { t: "fl", items: [
          { tex: "\\tfrac{d}{dx}(x^n) = nx^{n-1}" },
          { tex: "\\tfrac{d}{dx}(\\sin x) = \\cos x" },
          { tex: "\\tfrac{d}{dx}(\\cos x) = -\\sin x" },
          { tex: "\\tfrac{d}{dx}(\\tan x) = \\sec^2 x" },
          { tex: "\\tfrac{d}{dx}(\\cot x) = -\\csc^2 x" },
          { tex: "\\tfrac{d}{dx}(\\sec x) = \\sec x\\tan x" },
          { tex: "\\tfrac{d}{dx}(\\csc x) = -\\csc x\\cot x" },
        ]},
        { t: "fl", items: [
          { tex: "\\tfrac{d}{dx}(e^x) = e^x" },
          { tex: "\\tfrac{d}{dx}(a^x) = a^x \\ln a" },
          { tex: "\\tfrac{d}{dx}(\\ln x) = \\tfrac1x" },
        ]},
        { t: "fl", items: [
          { tex: "\\tfrac{d}{dx}(\\sin^{-1}x) = \\tfrac{1}{\\sqrt{1-x^2}}" },
          { tex: "\\tfrac{d}{dx}(\\cos^{-1}x) = \\tfrac{-1}{\\sqrt{1-x^2}}" },
          { tex: "\\tfrac{d}{dx}(\\tan^{-1}x) = \\tfrac{1}{1+x^2}" },
          { tex: "\\tfrac{d}{dx}(\\cot^{-1}x) = \\tfrac{-1}{1+x^2}" },
          { tex: "\\tfrac{d}{dx}(\\sec^{-1}x) = \\tfrac{1}{|x|\\sqrt{x^2-1}}" },
        ]},
        { t: "star", text: "Pattern: 'co' wale (cos, cot, cosec, cos⁻¹, cot⁻¹) ke derivatives mein MINUS lagta hai." },

        { t: "h", text: "4. RULES" },
        { t: "fl", items: [
          { tex: "(uv)' = u'v + uv'", label: "Product" },
          { tex: "\\left(\\tfrac{u}{v}\\right)' = \\tfrac{u'v - uv'}{v^2}", label: "Quotient" },
          { tex: "\\tfrac{d}{dx}f(g(x)) = f'(g(x))\\cdot g'(x)", label: "Chain - bahar × andar" },
        ]},

        { t: "h", text: "5. SPECIAL METHODS" },
        { t: "steps", title: "Implicit (x aur y mile hue hain)", items: [
          "Dono taraf x ke respect mein differentiate karo",
          "y ko differentiate karo to dy/dx saath mein lagao (chain rule)",
          "Saare dy/dx wale terms ek taraf karo, baaki doosri taraf",
          "dy/dx ko common le kar solve karo",
        ]},
        { t: "steps", title: "Logarithmic (power mein x ho, jaise xˣ)", items: [
          "Dono taraf ln lagao: ln y = g(x)·ln f(x)",
          "Log property se power neeche le aao",
          "Differentiate karo - left side (1/y)(dy/dx) banega",
          "Dono taraf y se multiply karo aur y wapas substitute karo",
        ]},
        { t: "f", tex: "y = x^x \\Rightarrow \\frac{dy}{dx} = x^x(1 + \\ln x)", label: "yaad rakhne layak result" },
        { t: "f", tex: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}", label: "Parametric - dono t ke terms mein" },

        { t: "h", text: "6. SECOND ORDER" },
        { t: "f", tex: "\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right)", label: "pehla derivative dobara differentiate" },
        { t: "warn", text: "Parametric mein d²y/dx² nikalte waqt: pehle dy/dx nikalo, phir usko t ke respect differentiate karo, PHIR dx/dt se divide karo. Seedha dobara t se differentiate mat kar dena." },
      ],
    ],
  },
];
