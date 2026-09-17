import type { Beat } from "./lesson-types";

/** Depth layer — derivations, rigorous theory, and real board-level hard problems. */
export const DEEP_A: Record<string, Beat[]> = {
  "relations-and-functions": [
    {
      kind: "derive",
      title: "Equivalence relation set ko baant kyun deta hai?",
      claim: "Do equivalence classes ya to BILKUL same hoti hain, ya unmein ek bhi element common nahi hota. Beech ka koi case hai hi nahi.",
      steps: [
        { do: "Maan lo [a] aur [b] do classes hain jinmein kam se kam ek element common hai — usse c kehte hain.", why: "Hum yeh maan ke chal rahe hain ki thoda overlap hai, aur dikhayenge ki phir poora overlap hona hi padega." },
        { do: "c ∈ [a] matlab c R a. Aur c ∈ [b] matlab c R b.", why: "Class ki definition: [a] = {x : x R a}." },
        { do: "Symmetry se: a R c. Ab a R c aur c R b hai, to transitivity se **a R b**.", why: "Yahi woh pal hai jahan S aur T dono ek saath kaam karte hain." },
        { do: "Ab koi bhi x ∈ [a] lo. To x R a. Aur a R b hai. Transitivity se x R b, matlab x ∈ [b]. Isliye [a] ⊆ [b].", why: "Ek taraf ka containment sabit ho gaya." },
        { do: "Bilkul yahi dalil ulta chala ke [b] ⊆ [a] mil jaata hai. Dono milkar ⟹ [a] = [b].", why: "Do sets ek doosre ke subset hon to woh barabar hote hain." },
      ],
      note: "Isi wajah se equivalence relation ko 'partition' kehte hain — woh set ko aise dibbon mein baant deta hai jo overlap karte hi nahi, aur milkar poora set banate hain.",
    },
    {
      kind: "deep",
      title: "Invertible hona aur bijective hona — ek hi baat hai",
      body: "Function f : A → B ka inverse tabhi banta hai jab f bijective ho. Dono taraf socho:\n\n**One-one zaroori kyun?** Agar f(2) = f(5) = 7 ho, to f⁻¹(7) kya hoga — 2 ya 5? Jawab do ho gaye, matlab f⁻¹ function hi nahi raha.\n\n**Onto zaroori kyun?** Agar koi y ∈ B kisi bhi x se nahi aata, to f⁻¹(y) ka koi jawab hi nahi. Function ko har input ka jawab dena padta hai.\n\nDono chahiye — tabhi f⁻¹ ek sahi function banega.",
      formula: "f^{-1}\\text{ exists} \\iff f \\text{ is bijective}; \\quad (f^{-1})^{-1} = f",
      tag: "Deep insight",
    },
    {
      kind: "hard",
      label: "Board-level 5-marker",
      problem: "Show that $f : \\mathbb{R} - \\{3\\} \\to \\mathbb{R} - \\{1\\}$ defined by $f(x) = \\dfrac{x-2}{x-3}$ is a bijection, and find $f^{-1}$.",
      steps: [
        { do: "**One-one:** maan lo f(x₁) = f(x₂) ⟹ (x₁−2)/(x₁−3) = (x₂−2)/(x₂−3). Cross-multiply karo.", why: "Rational function mein hamesha cross-multiplication se shuru karo." },
        { do: "(x₁−2)(x₂−3) = (x₂−2)(x₁−3) ⟹ x₁x₂ − 3x₁ − 2x₂ + 6 = x₁x₂ − 3x₂ − 2x₁ + 6", why: "Dono taraf poora expand karo — x₁x₂ aur 6 dono taraf hain." },
        { do: "x₁x₂ aur 6 cancel: −3x₁ − 2x₂ = −3x₂ − 2x₁ ⟹ −x₁ = −x₂ ⟹ **x₁ = x₂** ✓ one-one", why: "Sab kuch ek taraf laao — sirf x₁ aur x₂ bachte hain." },
        { do: "**Onto:** koi y ∈ R−{1} lo. y = (x−2)/(x−3) ⟹ y(x−3) = x−2 ⟹ yx − 3y = x − 2", why: "Ab x ko y ke terms mein nikalna hai." },
        { do: "x wale terms ek taraf: yx − x = 3y − 2 ⟹ x(y−1) = 3y−2 ⟹ **x = (3y−2)/(y−1)**", why: "x ko common lo. Yahan (y−1) denominator mein aa gaya." },
        { do: "y ≠ 1 hai (codomain se hata diya gaya), isliye x defined hai. Aur x = 3 nahi ho sakta: agar (3y−2)/(y−1) = 3 hota to 3y−2 = 3y−3, matlab −2 = −3 — jo asambhav hai. Isliye x ∈ R−{3} ✓ onto", why: "★ Yahi woh step hai jahan zyadatar students marks khote hain — yeh dikhana ki x domain ke andar hi aata hai." },
        { do: "One-one + onto ⟹ bijective. Aur f⁻¹(y) = (3y−2)/(y−1), yaani **f⁻¹(x) = (3x−2)/(x−3+2)... theek se: f⁻¹(x) = (3x−2)/(x−1)**", why: "Onto ki calculation hi inverse de deti hai — alag se mehnat nahi." },
      ],
      answer: "f \\text{ is a bijection and } f^{-1}(x) = \\frac{3x-2}{x-1}, \; x \\neq 1",
    },
  ],

  "inverse-trigonometric-functions": [
    {
      kind: "derive",
      title: "sin⁻¹x + cos⁻¹x = π/2 — sabit karo",
      claim: "Yeh identity har x ∈ [−1, 1] ke liye sach hai. Ratt ne ki zaroorat nahi, 4 line ka proof hai.",
      steps: [
        { do: "Maan lo sin⁻¹x = θ. To sin θ = x, aur θ ∈ [−π/2, π/2].", why: "Range likhna zaroori hai — aage yahi kaam aayega." },
        { do: "Hum jaante hain sin θ = cos(π/2 − θ). Isliye x = cos(π/2 − θ).", why: "Complementary angle wali basic identity." },
        { do: "Ab check karo: θ ∈ [−π/2, π/2] ⟹ (π/2 − θ) ∈ [0, π]. Aur [0, π] to cos⁻¹ ka principal range hai!", why: "★ Yahi proof ki jaan hai. Agar range match na karta to hum cos⁻¹ nahi le sakte the." },
        { do: "Isliye cos⁻¹x = π/2 − θ = π/2 − sin⁻¹x, matlab sin⁻¹x + cos⁻¹x = π/2 ∎", why: "Range sahi hone ki wajah se hum cos⁻¹ le paaye." },
      ],
      note: "Bilkul yahi dalil tan⁻¹+cot⁻¹ aur sec⁻¹+cosec⁻¹ ke liye bhi chalti hai. Ek proof samajh liya, teen identities samajh gaye.",
    },
    {
      kind: "deep",
      title: "tan⁻¹ addition mein xy < 1 ki shart kyun?",
      body: "tan⁻¹x + tan⁻¹y ka asli jawab hamesha (−π, π) mein ho sakta hai. Par tan⁻¹ ka range sirf (−π/2, π/2) hai — usse chhota. To agar asli sum us range se bahar chala jaaye, formula jhooth bolne lagta hai.\n\n**Kab bahar jaata hai?** Jab xy > 1. Tab dono angles kaafi bade hote hain aur unka sum π/2 paar kar jaata hai. Us waqt formula ka answer π jitna kam pad jaata hai — isliye + π (ya x,y < 0 ho to − π) lagana padta hai.\n\nExample se dekho: tan⁻¹(2) + tan⁻¹(3). Yahan xy = 6 > 1. Formula deta hai tan⁻¹(5/(1−6)) = tan⁻¹(−1) = −π/4. Par dono angles positive the, unka sum negative kaise hoga? Asli jawab −π/4 + π = **3π/4**.",
      formula: "\\tan^{-1}x + \\tan^{-1}y = \\begin{cases} \\tan^{-1}\\frac{x+y}{1-xy} & xy < 1 \\\\ \\pi + \\tan^{-1}\\frac{x+y}{1-xy} & xy > 1,\; x,y > 0 \\\\ -\\pi + \\tan^{-1}\\frac{x+y}{1-xy} & xy > 1,\; x,y < 0 \\end{cases}",
      tag: "Yeh sirf shart nahi, wajah hai",
    },
    {
      kind: "hard",
      label: "Board-level 4-marker",
      problem: "Solve for $x$: $\;\\tan^{-1}\\dfrac{x-1}{x-2} + \\tan^{-1}\\dfrac{x+1}{x+2} = \\dfrac{\\pi}{4}$",
      steps: [
        { do: "Addition formula lagao: tan⁻¹[ (A + B) / (1 − AB) ] = π/4, jahan A = (x−1)/(x−2), B = (x+1)/(x+2).", why: "Do tan⁻¹ ko ek mein milao — phir tan lagana aasaan ho jaayega." },
        { do: "Numerator: A + B = [(x−1)(x+2) + (x+1)(x−2)] / [(x−2)(x+2)] = [(x²+x−2) + (x²−x−2)] / (x²−4) = (2x² − 4)/(x²−4)", why: "Dono fractions ka LCM lo aur upar expand karo — beech ke x terms cancel ho jaate hain." },
        { do: "Denominator: 1 − AB = 1 − [(x−1)(x+1)] / [(x−2)(x+2)] = 1 − (x²−1)/(x²−4) = [(x²−4) − (x²−1)]/(x²−4) = −3/(x²−4)", why: "AB mein bhi (a−b)(a+b) pattern hai — jaldi simplify ho jaata hai." },
        { do: "Bhaag karo: (2x²−4)/(x²−4) ÷ [−3/(x²−4)] = (2x² − 4)/(−3). Ab (x²−4) cancel ho gaya.", why: "Yahi is sawaal ki khubsurti hai — bada expression ek line mein simple ho gaya." },
        { do: "tan⁻¹[(2x²−4)/(−3)] = π/4 ⟹ (2x²−4)/(−3) = tan(π/4) = 1", why: "Dono taraf tan lagao. tan(π/4) = 1 standard value hai." },
        { do: "2x² − 4 = −3 ⟹ 2x² = 1 ⟹ x² = 1/2 ⟹ **x = ± 1/√2**", why: "Dono roots valid hain — check kar lo ki x ≠ 2 aur x ≠ −2, jo sach hai." },
      ],
      answer: "x = \\pm\\frac{1}{\\sqrt{2}}",
    },
  ],

  matrices: [
    {
      kind: "derive",
      title: "(AB)′ = B′A′ — order ulta kyun ho jaata hai",
      claim: "Transpose product ka order palat deta hai. Yeh koi rule ratt ne ki cheez nahi — index likhte hi saaf dikh jaata hai.",
      steps: [
        { do: "(AB) ka (i,j) element = A ki i-th row × B ka j-th column = Σₖ aᵢₖ bₖⱼ", why: "Matrix multiplication ki definition." },
        { do: "Transpose lene par: (AB)′ ka (i,j) element = (AB) ka (j,i) element = Σₖ aⱼₖ bₖᵢ", why: "Transpose matlab i aur j swap kar do." },
        { do: "Ab doosri taraf dekho: B′ ka (i,k) element = bₖᵢ, aur A′ ka (k,j) element = aⱼₖ", why: "Har transpose apne indices ulte kar deta hai." },
        { do: "To (B′A′) ka (i,j) element = Σₖ (B′)ᵢₖ (A′)ₖⱼ = Σₖ bₖᵢ aⱼₖ = Σₖ aⱼₖ bₖᵢ", why: "Yeh numbers hain, inka multiplication commutative hai — isliye reorder kar sakte hain." },
        { do: "Dono taraf ka (i,j) element bilkul same nikla ⟹ (AB)′ = B′A′ ∎", why: "Har element barabar = matrices barabar." },
      ],
      note: "Bilkul yahi logic inverse par bhi lagta hai: (AB)⁻¹ = B⁻¹A⁻¹. Jab bhi koi operation 'ulta' karta hai, order palat jaata hai — jurrabein aur joote pehne the, utaarte waqt joote pehle utrenge.",
    },
    {
      kind: "deep",
      title: "AB ≠ BA — isme geometry chhupi hai",
      body: "Matrix sirf numbers ka table nahi, woh ek **transformation** hai — space ko ghumati, khinchti, palatti hai. AB ka matlab: pehle B lagao, phir A.\n\nAb socho: ek kagaz ko pehle 90° ghumao, phir usko horizontally palat do. Ab ulta karo — pehle palto, phir ghumao. **Dono ka result alag aayega.** Bas yahi AB ≠ BA hai.\n\nIsi tarah AB = 0 hone ka matlab A = 0 ya B = 0 nahi hota. B pure space ko ek line par squash kar sakta hai, aur A us line ko zero par bhej sakta hai — dono alag-alag zero nahi hain, par milkar sab kuch mita dete hain.",
      formula: "A = \\begin{bmatrix} 1 & 0 \\\\ 0 & 0\\end{bmatrix},\; B = \\begin{bmatrix} 0 & 0 \\\\ 0 & 1\\end{bmatrix} \\Rightarrow AB = \\mathbf{0},\; A \\neq \\mathbf{0},\; B \\neq \\mathbf{0}",
      tag: "Kyun, sirf kya nahi",
    },
    {
      kind: "hard",
      label: "Board-level 5-marker",
      problem: "If $A = \\begin{bmatrix} 3 & 1 \\\\ -1 & 2 \\end{bmatrix}$, show that $A^2 - 5A + 7I = O$. Hence find $A^{-1}$.",
      steps: [
        { do: "A² = A·A = [[3,1],[−1,2]]·[[3,1],[−1,2]]. Pehla element: 3(3) + 1(−1) = 8.", why: "Row × column, dhyaan se. Har element alag likho." },
        { do: "Poora A² = [[8, 5], [−5, 3]]", why: "Baaki: 3(1)+1(2)=5 · (−1)(3)+2(−1)=−5 · (−1)(1)+2(2)=3" },
        { do: "5A = [[15, 5], [−5, 10]] aur 7I = [[7, 0], [0, 7]]", why: "Scalar multiplication — har element ko multiply." },
        { do: "A² − 5A + 7I = [[8−15+7, 5−5+0], [−5+5+0, 3−10+7]] = [[0,0],[0,0]] = O ✓", why: "Element-by-element jodo/ghatao. Sab zero — pehla hissa sabit." },
        { do: "Ab yahi equation use karo: A² − 5A + 7I = O ⟹ 7I = 5A − A²", why: "★ Yahaan se asli trick shuru hoti hai — inverse bina adjoint ke nikalenge." },
        { do: "Dono taraf A⁻¹ se multiply karo: 7A⁻¹ = 5(A⁻¹A) − A⁻¹A² = 5I − A", why: "A⁻¹A = I aur A⁻¹A² = A. Yeh step hi poora kaam kar deta hai." },
        { do: "A⁻¹ = (1/7)(5I − A) = (1/7)([[5,0],[0,5]] − [[3,1],[−1,2]]) = (1/7)[[2, −1],[1, 3]]", why: "Adjoint aur determinant ki zaroorat hi nahi padi." },
      ],
      answer: "A^{-1} = \\frac{1}{7}\\begin{bmatrix} 2 & -1 \\\\ 1 & 3 \\end{bmatrix}",
    },
  ],

  determinants: [
    {
      kind: "derive",
      title: "A · (adj A) = |A| · I — inverse ka formula yahin se aata hai",
      claim: "Yeh ek identity hai, sanyog nahi. Iske samajhne se A⁻¹ = adj(A)/|A| apne aap saaf ho jaata hai.",
      steps: [
        { do: "A·(adj A) ka (i,i) element = aᵢ₁Aᵢ₁ + aᵢ₂Aᵢ₂ + aᵢ₃Aᵢ₃", why: "adj A cofactor matrix ka transpose hai, isliye uska column A ki row ke cofactors hote hain." },
        { do: "Par yeh to exactly i-th row se determinant ka expansion hai! Isliye har diagonal element = |A|.", why: "Determinant ki definition: kisi bhi row ke element × uska cofactor, sab jod do." },
        { do: "Ab off-diagonal (i,j), i ≠ j: aᵢ₁Aⱼ₁ + aᵢ₂Aⱼ₂ + aᵢ₃Aⱼ₃ — i-th row ke elements, par j-th row ke cofactors.", why: "Yeh mismatch hi khel hai." },
        { do: "Yeh us matrix ka determinant hai jismein j-th row ko i-th row se replace kar diya gaya ho. Us matrix mein do rows same ho jaati hain ⟹ determinant = 0.", why: "★ Property: do rows barabar ⟹ determinant zero. Yahi off-diagonals ko mita deta hai." },
        { do: "To A·(adj A) mein diagonal par |A| aur baaki jagah 0 — matlab |A|·I. ∎ Ab dono taraf |A| se divide karo: A·(adj A / |A|) = I, matlab A⁻¹ = adj(A)/|A|.", why: "Inverse ki definition hi yahi hai: A se multiply karke I aa jaaye." },
      ],
      note: "Isse |A| = 0 ka matlab bhi saaf ho jaata hai: tab A·(adj A) = O ho jaata hai, aur kisi bhi cheez se multiply karke I laana namumkin hai. Isliye singular matrix ka inverse hota hi nahi.",
    },
    {
      kind: "deep",
      title: "Determinant ka matlab kya hai — sirf number nahi",
      body: "2×2 determinant us parallelogram ka **area** hai jo do column vectors banate hain. 3×3 determinant us box ka **volume** hai jo teen column vectors banate hain.\n\nIsse sab kuch samajh aa jaata hai:\n\n**|A| = 0 kyun bura hai?** Matlab area/volume zero ho gaya — poora space squash ho ke ek line ya point ban gaya. Squash hui cheez wapas nahi khol sakte, isliye inverse nahi hota.\n\n**Do rows same ⟹ determinant 0 kyun?** Do same vectors se parallelogram banta hi nahi — woh ek hi line par hain, area zero.\n\n**|kA| = kⁿ|A| kyun?** Har dimension ko k guna khinch diya, to n dimensions mein volume kⁿ guna ho jaata hai.\n\n**Area of triangle ka formula?** Wahi determinant, aadha — kyunki triangle parallelogram ka aadha hota hai.",
      formula: "|A| = 0 \\iff \\text{columns are linearly dependent} \\iff A^{-1} \\text{ does not exist}",
      tag: "Geometry ka nazariya",
    },
    {
      kind: "hard",
      label: "Board-level 5-marker",
      problem: "Prove that $\\begin{vmatrix} a & b & c \\\\ b & c & a \\\\ c & a & b \\end{vmatrix} = -(a^3 + b^3 + c^3 - 3abc)$",
      steps: [
        { do: "R₁ → R₁ + R₂ + R₃ lagao. Pehli row ban jaati hai: (a+b+c, a+b+c, a+b+c)", why: "★ Cyclic determinant mein hamesha yahi pehla move hai — poori row same ho jaati hai. Aur row operation determinant badalta nahi." },
        { do: "Pehli row se (a+b+c) common bahar nikalo: (a+b+c) × |1 1 1; b c a; c a b|", why: "Property: ek row ka common factor determinant ke bahar aa jaata hai." },
        { do: "Ab C₂ → C₂ − C₁ aur C₃ → C₃ − C₁: determinant ban jaata hai (a+b+c) × |1 0 0; b (c−b) (a−b); c (a−c) (b−c)|", why: "Pehli row mein do zero aa gaye — expansion ab ek hi 2×2 rah jaayega." },
        { do: "Pehli row se expand karo: (a+b+c)[ (c−b)(b−c) − (a−b)(a−c) ]", why: "1 × (2×2 minor), baaki dono terms zero se multiply ho ke gayab." },
        { do: "(c−b)(b−c) = −(b−c)² = −(b² − 2bc + c²). Aur (a−b)(a−c) = a² − ac − ab + bc", why: "Dono brackets alag-alag kholo — jaldbaazi mein sign galat ho jaata hai." },
        { do: "Bracket = −b² + 2bc − c² − a² + ac + ab − bc = −(a² + b² + c² − ab − bc − ca)", why: "Terms jodo. Dhyaan se: 2bc − bc = bc." },
        { do: "To determinant = −(a+b+c)(a² + b² + c² − ab − bc − ca) = **−(a³ + b³ + c³ − 3abc)** ∎", why: "★ Standard identity: a³+b³+c³−3abc = (a+b+c)(a²+b²+c²−ab−bc−ca). Yeh yaad rakhna zaroori hai." },
      ],
      answer: "-(a^3 + b^3 + c^3 - 3abc)",
    },
  ],

  "continuity-and-differentiability": [
    {
      kind: "derive",
      title: "Differentiable ⟹ Continuous (aur ulta kyun nahi)",
      claim: "Agar function kisi point par differentiable hai, to wahan continuous hona hi padega. Par continuous hone se differentiability nahi aati.",
      steps: [
        { do: "Maan lo f, x = a par differentiable hai. Matlab lim(x→a) [f(x) − f(a)]/(x − a) exist karta hai aur usse f′(a) kehte hain.", why: "Differentiability ki definition — limit ka exist karna." },
        { do: "Ab ek chaalaki: f(x) − f(a) ko aise likho — f(x) − f(a) = [ (f(x) − f(a))/(x − a) ] × (x − a)", why: "★ Multiply aur divide same cheez se. Yeh proof ka dil hai." },
        { do: "Dono taraf x → a ki limit lo: lim [f(x) − f(a)] = lim[(f(x)−f(a))/(x−a)] × lim(x − a)", why: "Product ki limit = limits ka product, kyunki dono alag-alag exist karte hain." },
        { do: "= f′(a) × 0 = 0", why: "Pehla factor f′(a) hai (diya hua exist karta hai), doosra x→a par zero ho jaata hai." },
        { do: "Matlab lim(x→a) f(x) = f(a) — aur yahi to continuity ki definition hai. ∎", why: "Limit aur function value barabar = continuous." },
        { do: "**Ulta kyun nahi:** f(x) = |x| at x = 0. LHD = lim(h→0) (|−h| − 0)/(−h) = −1. RHD = lim(h→0) (|h| − 0)/h = +1. Dono alag ⟹ derivative exist nahi karta, par function continuous hai.", why: "Ek counter-example kaafi hai kisi bhi dawe ko todne ke liye." },
      ],
      note: "Dhyaan do: proof mein humne f′(a) ka exist karna USE kiya. |x| mein woh exist hi nahi karta, isliye woh continuous reh sakta hai bina differentiable bane.",
    },
    {
      kind: "deep",
      title: "Discontinuity ke teen chehre",
      body: "Sab discontinuity ek jaisi nahi hoti. Teen tarah ki hoti hain:\n\n**1. Removable** — LHL = RHL, par f(a) ya to alag hai ya defined hi nahi. Graph mein bas ek chhota sa 'gaddha' hai. Ise f(a) badal ke theek kiya ja sakta hai. Jaise f(x) = (x²−1)/(x−1) at x = 1: limit 2 hai, par function defined nahi.\n\n**2. Jump** — LHL aur RHL dono exist karte hain par barabar nahi. Graph ek jagah se doosri jagah 'kood' jaata hai. Piecewise functions mein yeh sabse common hai. Ise theek nahi kiya ja sakta.\n\n**3. Infinite** — LHL ya RHL infinity ki taraf bhaag jaate hain. Jaise f(x) = 1/x at x = 0, ya tan x at π/2.\n\nBoard mein aksar jump wala case aata hai — isliye LHL aur RHL alag-alag nikalna itna zaroori hai.",
      formula: "\\text{Removable: } \\lim_{x\\to a}f(x) \\text{ exists} \\neq f(a) \\quad|\\quad \\text{Jump: } \\text{LHL} \\neq \\text{RHL} \\quad|\\quad \\text{Infinite: } \\lim = \\pm\\infty",
      tag: "Poori tasveer",
    },
    {
      kind: "deep",
      title: "sin⁻¹x ka derivative kahaan se aaya",
      body: "Ratt ne se pehle ek baar dekh lo — 4 line mein nikal jaata hai.\n\nMaan lo y = sin⁻¹x. Matlab **sin y = x**.\n\nDono taraf x ke respect mein differentiate karo (implicit differentiation):\ncos y · (dy/dx) = 1\n\nTo dy/dx = 1/cos y. Ab cos y ko x mein badalna hai:\ncos y = √(1 − sin²y) = √(1 − x²)\n\nIsliye dy/dx = 1/√(1−x²).\n\n**Positive root hi kyun liya?** Kyunki sin⁻¹ ka range [−π/2, π/2] hai, aur us poore range mein cos y ≥ 0 hota hai. Range ka faayda yahan bhi dikha.",
      formula: "y = \\sin^{-1}x \\Rightarrow \\sin y = x \\Rightarrow \\cos y \\frac{dy}{dx} = 1 \\Rightarrow \\frac{dy}{dx} = \\frac{1}{\\sqrt{1-x^2}}",
      tag: "Yaad nahi, samajh",
    },
    {
      kind: "hard",
      label: "Board-level 5-marker",
      problem: "Find $a$ and $b$ so that $f(x) = \\begin{cases} 5, & x \\le 2 \\\\ ax + b, & 2 < x < 10 \\\\ 21, & x \\ge 10 \\end{cases}$ is continuous everywhere.",
      steps: [
        { do: "Har branch apne andar continuous hai (constant aur linear). Sirf **jodon** par check karna hai: x = 2 aur x = 10.", why: "★ Yeh line likhna zaroori hai — dikhata hai ki tumhe pata hai kahaan dekhna hai." },
        { do: "**x = 2 par:** LHL = lim(x→2⁻) 5 = 5. RHL = lim(x→2⁺) (ax + b) = 2a + b. f(2) = 5 (kyunki '≤').", why: "Left branch constant hai, right branch linear. f(2) ke liye '≤' dekho." },
        { do: "Continuity ⟹ 2a + b = 5 … (i)", why: "Pehli equation mil gayi." },
        { do: "**x = 10 par:** LHL = lim(x→10⁻) (ax + b) = 10a + b. RHL = lim(x→10⁺) 21 = 21. f(10) = 21 (kyunki '≥').", why: "Ab middle branch left se aa raha hai, right branch constant." },
        { do: "Continuity ⟹ 10a + b = 21 … (ii)", why: "Doosri equation." },
        { do: "(ii) − (i): 8a = 16 ⟹ **a = 2**. (i) mein daalo: 4 + b = 5 ⟹ **b = 1**.", why: "Simple elimination." },
        { do: "**Verify:** f(x) = 2x + 1 on (2,10). At x=2: 5 ✓. At x=10: 21 ✓. Dono jodon par graph judd gaya.", why: "Verification likhne se examiner ko bharosa aata hai — aur tumhe bhi." },
      ],
      answer: "a = 2,\\quad b = 1",
    },
  ],
};
