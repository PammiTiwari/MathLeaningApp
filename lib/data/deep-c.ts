import type { Beat } from "./lesson-types";

export const DEEP_C: Record<string, Beat[]> = {
  "vector-algebra": [
    {
      kind: "derive",
      title: "a·b = |a||b|cos θ — yeh definition nahi, natija hai",
      claim: "Components wala formula aur cos wala formula ek hi cheez hain. Cosine rule dono ko jodta hai.",
      steps: [
        { do: "Vectors a aur b se ek triangle banao. Teesri side hogi (a − b).", why: "Triangle law: a = b + (a−b)." },
        { do: "Cosine rule lagao: |a−b|² = |a|² + |b|² − 2|a||b|cos θ", why: "Class 11 ki trigonometry, jahan θ a aur b ke beech ka angle hai." },
        { do: "Ab left side ko components se kholo: |a−b|² = (a₁−b₁)² + (a₂−b₂)² + (a₃−b₃)²", why: "Distance formula 3D mein." },
        { do: "= (a₁²+a₂²+a₃²) + (b₁²+b₂²+b₃²) − 2(a₁b₁ + a₂b₂ + a₃b₃) = |a|² + |b|² − 2(a₁b₁+a₂b₂+a₃b₃)", why: "Squares expand karke group kiya." },
        { do: "Dono expressions compare karo. |a|² aur |b|² dono taraf hain — cancel. Bachta hai: **a₁b₁+a₂b₂+a₃b₃ = |a||b|cos θ** ∎", why: "★ Dono formulas ek hi cheez nikle. Ek calculation ke liye, doosra angle ke liye." },
      ],
      note: "Isse yeh bhi saaf ho jaata hai ki a·b = 0 matlab cos θ = 0 matlab θ = 90°. Perpendicular ka test isi se aata hai — ratt a nahi gaya.",
    },
    {
      kind: "deep",
      title: "Scalar triple product — teen vectors ek plane mein hain ya nahi",
      body: "Do vectors hamesha ek plane mein hote hain. Par teen? Woh ya to ek hi plane mein honge (coplanar) ya box banayenge.\n\n**Scalar triple product** [a b c] = a · (b × c) us box ka volume deta hai.\n\nSocho: (b × c) ek vector hai jiski magnitude b aur c wale parallelogram ka area hai, aur direction us plane ke perpendicular. Ab a ko usse dot karne se milta hai: area × (a ki us perpendicular direction mein height) = **volume**.\n\nIsliye:\n**[a b c] = 0 ⟺ volume zero ⟺ teeno coplanar hain.**\n\nDeterminant se nikaalo — teeno vectors ko rows bana do.",
      formula: "[\\vec a\; \\vec b\; \\vec c] = \\vec a \\cdot (\\vec b \\times \\vec c) = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}",
      tag: "Volume ka nazariya",
    },
    {
      kind: "hard",
      label: "Board-level 5-marker",
      problem: "Find a vector of magnitude 6 which is perpendicular to both $\\vec a = 2\\hat i - \\hat j + 2\\hat k$ and $\\vec b = 4\\hat i - \\hat j + 3\\hat k$.",
      steps: [
        { do: "Dono ke perpendicular vector chahiye ⟹ **cross product** lagao. Yahi uski khasiyat hai.", why: "★ 'Perpendicular to both' sunte hi cross product sochna." },
        { do: "a × b = |î ĵ k̂; 2 −1 2; 4 −1 3|", why: "Determinant form mein likho." },
        { do: "î component: (−1)(3) − (2)(−1) = −3 + 2 = −1", why: "Pehla column hata ke 2×2 determinant." },
        { do: "ĵ component: −[(2)(3) − (2)(4)] = −[6 − 8] = +2", why: "★ ĵ ke saath minus sign — yahin sabse zyada galti hoti hai." },
        { do: "k̂ component: (2)(−1) − (−1)(4) = −2 + 4 = 2", why: "Teesra 2×2." },
        { do: "a × b = −î + 2ĵ + 2k̂. Magnitude = √(1 + 4 + 4) = **3**", why: "Yeh perpendicular to dono hai, par magnitude 3 hai — humein 6 chahiye." },
        { do: "Unit vector = (−î + 2ĵ + 2k̂)/3. Ab 6 se multiply: **6 × (−î+2ĵ+2k̂)/3 = −2î + 4ĵ + 4k̂**", why: "Direction wahi, magnitude 6. Check: √(4+16+16) = √36 = 6 ✓" },
        { do: "Uska negative (2î − 4ĵ − 4k̂) bhi sahi answer hai.", why: "Ulti direction bhi dono ke perpendicular hai — likh dena bonus hai." },
      ],
      answer: "\\pm\\left(-2\\hat i + 4\\hat j + 4\\hat k\\right)",
    },
  ],

  "three-dimensional-geometry": [
    {
      kind: "derive",
      title: "Shortest distance ka formula kaise bana",
      claim: "Formula dekhne mein daraavna hai, par idea bahut simple: sabse choti doori dono lines ke perpendicular direction mein hoti hai.",
      steps: [
        { do: "Do skew lines hain — ek a₁ se b₁ direction mein, doosri a₂ se b₂ direction mein.", why: "Standard setup." },
        { do: "**Key idea:** sabse choti doori us line ke saath milegi jo DONO lines ke perpendicular ho.", why: "★ Socho — koi bhi tedhi doori usse lambi hi hogi. Perpendicular hi sabse chhota raasta hai." },
        { do: "Dono ke perpendicular direction kaun deta hai? **b₁ × b₂** — cross product ka yahi kaam hai.", why: "Cross product dono inputs ke perpendicular hota hai." },
        { do: "Ab ek line se doosri tak koi bhi vector lo — sabse aasaan hai (a₂ − a₁).", why: "Dono lines ke points ko jodne wala vector." },
        { do: "Us vector ka perpendicular direction par **projection** lo — wahi shortest distance hai.", why: "Projection matlab us direction mein kitna hissa hai. Baaki hissa lines ke saath-saath hai, doori mein nahi ginta." },
        { do: "Projection ka formula: (a₂−a₁)·n̂ jahan n̂ = (b₁×b₂)/|b₁×b₂|. Isliye **d = |(a₂−a₁)·(b₁×b₂)| / |b₁×b₂|** ∎", why: "Modulus isliye kyunki doori negative nahi hoti." },
      ],
      note: "Numerator asal mein scalar triple product [a₂−a₁, b₁, b₂] hai. Agar woh zero ho, matlab teeno coplanar hain, matlab lines ek hi plane mein hain — woh milti hain, skew nahi hain.",
    },
    {
      kind: "deep",
      title: "Do lines intersect karti hain ya nahi — kaise check karo",
      body: "Do lines ke beech teen hi possibilities hain:\n\n**1. Parallel** — b₁ × b₂ = 0 (directions proportional hain)\n\n**2. Intersecting** — shortest distance = 0, matlab (a₂−a₁)·(b₁×b₂) = 0, par b₁×b₂ ≠ 0\n\n**3. Skew** — na parallel, na milti. Shortest distance ≠ 0\n\n**Intersection point nikalna ho to:** dono lines ke general points barabar rakh do aur λ, μ solve karo. Do equations se λ aur μ nikalo, phir **teesri equation mein daal ke verify karo**. Agar teesri satisfy ho gayi to lines milti hain, warna skew hain.\n\nYeh verification step chhodna sabse common galti hai — bina uske proof adhoora hai.",
      formula: "\\text{Intersect} \\iff (\\vec a_2 - \\vec a_1)\\cdot(\\vec b_1 \\times \\vec b_2) = 0 \;\\text{ and }\; \\vec b_1 \\times \\vec b_2 \\neq \\vec 0",
      tag: "Teen cases, teen test",
    },
    {
      kind: "hard",
      label: "Board-level 5-marker",
      problem: "Find the image (reflection) of the point $(1, 6, 3)$ in the line $\\dfrac{x}{1} = \\dfrac{y-1}{2} = \\dfrac{z-2}{3}$.",
      steps: [
        { do: "Line ka general point likho: P(λ) = (λ, 2λ+1, 3λ+2). Diya hua point A(1,6,3).", why: "★ Line ke har point ko ek parameter λ se likhna — pehla step hamesha yahi." },
        { do: "Maan lo M line par woh point hai jahan A se daali gayi perpendicular milti hai. Foot of perpendicular = M(λ, 2λ+1, 3λ+2).", why: "Image nikalne ke liye pehle foot of perpendicular chahiye." },
        { do: "AM vector = M − A = (λ−1, 2λ−5, 3λ−1)", why: "End minus start." },
        { do: "AM line ke perpendicular hai ⟹ AM · (direction vector) = 0. Direction = (1,2,3).", why: "★ Yahi woh condition hai jo λ deti hai." },
        { do: "(λ−1)(1) + (2λ−5)(2) + (3λ−1)(3) = 0 ⟹ λ − 1 + 4λ − 10 + 9λ − 3 = 0 ⟹ 14λ = 14 ⟹ **λ = 1**", why: "Simple linear equation." },
        { do: "M = (1, 3, 5)", why: "λ = 1 daal diya." },
        { do: "**M, A aur image B ka midpoint hai.** To B = 2M − A = (2−1, 6−6, 10−3) = **(1, 0, 7)**", why: "★ Reflection ki definition — foot of perpendicular hamesha beech mein hota hai. Yeh line poora sawaal khatam kar deti hai." },
        { do: "Verify: A(1,6,3) aur B(1,0,7) ka midpoint = (1, 3, 5) = M ✓", why: "Verification likhna hamesha accha." },
      ],
      answer: "\\text{Image} = (1,\\, 0,\\, 7)",
    },
  ],

  "linear-programming": [
    {
      kind: "derive",
      title: "Optimal value corner par hi kyun milti hai",
      claim: "Corner Point Theorem koi ratt ne wali baat nahi — ek line ki dalil se saaf ho jaata hai.",
      steps: [
        { do: "Z = ax + by ko ek number k ke barabar rakho: ax + by = k. Yeh ek **seedhi line** hai.", why: "★ Z ka har value ek line banata hai — inhe 'iso-profit lines' kehte hain." },
        { do: "k badalne se yeh line apne aap ke parallel khisakti hai — slope wahi rehta hai, sirf position badalti hai.", why: "Slope −a/b hai, jo k par depend hi nahi karta." },
        { do: "Z maximise karna matlab: is line ko utni door tak khisakao jitna ho sake, **par feasible region chhodne se pehle ruk jao**.", why: "Line jitni door jaayegi, k utna bada." },
        { do: "Ab socho — jab line region ko chhodne hi wali hai, to woh region ko chhu kahaan rahi hogi? Ya to ek **kone** par, ya ek poore **kinare** par.", why: "★ Yahi poora proof hai. Convex region se nikalti hui line pehle corner chhodti hai." },
        { do: "Agar poore kinare par chhu rahi hai, to us kinare ke dono corners bhi wahi value dete hain. Matlab **kisi na kisi corner par optimal value zaroor milegi**. ∎", why: "Isliye sirf corners check karna kaafi hai — beech ke infinite points dekhne ki zaroorat hi nahi." },
      ],
      note: "Yeh isliye kaam karta hai kyunki linear constraints se bana feasible region hamesha CONVEX hota hai — usme koi gaddha nahi hota. Agar constraints curved hote to yeh theorem fail kar jaata.",
    },
    {
      kind: "deep",
      title: "Unbounded region — yahan answer na bhi ho sakta hai",
      body: "Bounded region mein maximum aur minimum dono hamesha milte hain. Par **unbounded** (khula) region mein ek ya dono na bhi milein.\n\n**Kaise check karo:**\n\nMaan lo corners par sabse bada value M mila. Ab plot karo **ax + by > M**. Agar is region ka feasible region se koi common point hai — matlab tum aur aage jaa sakte the — to **maximum exist nahi karta**. Agar koi common point nahi, to M hi maximum hai.\n\nMinimum ke liye ulta: **ax + by < m** plot karo aur wahi check karo.\n\nBoard mein yeh check likhna zaroori hota hai jab region unbounded ho — sirf table bana ke answer likh dene se mark kat jaata hai.",
      formula: "\\text{Unbounded: } M \\text{ is the max} \\iff \\{ax + by > M\\} \\cap \\text{feasible region} = \\emptyset",
      tag: "Yeh step chhodna mat",
    },
    {
      kind: "hard",
      label: "Board-level 5-marker (unbounded)",
      problem: "Minimise $Z = 3x + 5y$ subject to $x + 3y \\ge 3$, $x + y \\ge 2$, $x \\ge 0$, $y \\ge 0$.",
      steps: [
        { do: "Lines banao: x + 3y = 3 → (3,0) aur (0,1). x + y = 2 → (2,0) aur (0,2).", why: "Intercepts se line banana sabse tez." },
        { do: "'≥' hai to origin test: 0 ≥ 3 **jhooth** ⟹ origin se DOOR wali side shade karo. Dono ke liye same.", why: "★ '≥' mein aksar origin se door shade hota hai — region upar-daayein khula rehta hai." },
        { do: "Region **unbounded** hai (upar-daayein khula). Corners: A(3,0), B(intersection), C(0,2).", why: "Yeh pehchanna zaroori hai — aage extra check karna padega." },
        { do: "B nikalo: x+3y=3 aur x+y=2 ko ghatao ⟹ 2y = 1 ⟹ y = 1/2, x = 3/2. **B(3/2, 1/2)**", why: "Elimination method." },
        { do: "Table: Z(A) = 3(3)+0 = 9 · Z(B) = 4.5 + 2.5 = **7** · Z(C) = 0 + 10 = 10", why: "Har corner par Z. Sabse chhota 7 hai." },
        { do: "**Unbounded check:** 3x + 5y < 7 plot karo. Kya iska feasible region se koi common point hai?", why: "★ Unbounded region mein yeh step compulsory hai." },
        { do: "Nahi — 3x+5y < 7 wala poora hissa feasible region ke bahar hai. Isliye **Z_min = 7 at (3/2, 1/2)**", why: "Common point nahi mila ⟹ 7 sach mein minimum hai." },
      ],
      answer: "Z_{\\min} = 7 \\text{ at } \\left(\\tfrac{3}{2},\\, \\tfrac{1}{2}\\right)",
    },
  ],

  probability: [
    {
      kind: "derive",
      title: "Bayes' theorem — do line mein nikal aata hai",
      claim: "Bayes koi naya formula nahi. Woh conditional probability ko do tareeke se likhne ka natija hai.",
      steps: [
        { do: "Conditional probability ki definition: P(E|A) = P(E ∩ A) / P(A)", why: "Yahi sab kuch ka base hai." },
        { do: "Ab P(E ∩ A) ko **doosre tareeke** se likho: P(E ∩ A) = P(E) · P(A|E)", why: "★ Multiplication theorem. Yahi Bayes ka asli trick hai — ek hi cheez ko ulta likhna." },
        { do: "Substitute karo: **P(E|A) = P(E)·P(A|E) / P(A)**", why: "Bayes ka core mil gaya. Ab sirf denominator baaki hai." },
        { do: "Denominator P(A) ko total probability se kholo: P(A) = Σⱼ P(Eⱼ)·P(A|Eⱼ)", why: "A har raaste se aa sakta hai — sab jod do." },
        { do: "Final: **P(Eᵢ|A) = P(Eᵢ)P(A|Eᵢ) / Σⱼ P(Eⱼ)P(A|Eⱼ)** ∎", why: "Bas. Do definitions jodne se poora theorem nikal aaya." },
      ],
      note: "Isliye Bayes ke sawaal mein numerator hamesha denominator ka EK term hota hai. Agar tumhara numerator denominator ke kisi term se match nahi kar raha, to kahin galti hai — yeh ek accha self-check hai.",
    },
    {
      kind: "deep",
      title: "Independent vs Mutually Exclusive — ek baar mein clear",
      body: "Yeh do cheezein bilkul alag hain, par naam sunke log confuse ho jaate hain.\n\n**Mutually exclusive:** dono saath ho hi nahi sakte. P(A∩B) = 0. Jaise ek hi dice throw mein 2 aana aur 5 aana.\n\n**Independent:** ek ke hone se doosre ka chance badalta nahi. P(A∩B) = P(A)P(B). Jaise pehle throw mein 2 aana aur doosre throw mein 5 aana.\n\n**Ab asli baat:** agar P(A) > 0 aur P(B) > 0 hon aur A, B mutually exclusive hon, to woh **kabhi independent nahi ho sakte**. Kyunki:\n\nMutually exclusive ⟹ P(A∩B) = 0\nIndependent ⟹ P(A∩B) = P(A)P(B) > 0\n\nDono ek saath sach nahi ho sakte. Aur soch ke dekho — mutually exclusive matlab A hone se B ka chance ZERO ho jaata hai. Itna bada asar to independence ka bilkul ulta hai!",
      formula: "P(A),P(B) > 0: \\quad \\text{mutually exclusive} \\implies \\text{NOT independent}",
      tag: "Har saal 1-marker",
    },
    {
      kind: "hard",
      label: "Board-level 5-marker",
      problem: "In a factory, machines A, B and C produce 25%, 35% and 40% of the bolts. Of their output 5%, 4% and 2% are defective. A bolt is drawn at random and found defective. Find the probability that it was produced by machine B. Also find the probability it was NOT made by A.",
      steps: [
        { do: "**Events define karo:** E₁ = machine A, E₂ = B, E₃ = C, D = bolt defective. Yeh likhna compulsory hai.", why: "★ 1 mark sirf events define karne ka hota hai." },
        { do: "Priors: P(E₁) = 0.25, P(E₂) = 0.35, P(E₃) = 0.40", why: "Production ke percentages." },
        { do: "Conditionals: P(D|E₁) = 0.05, P(D|E₂) = 0.04, P(D|E₃) = 0.02", why: "Har machine ka defect rate." },
        { do: "**Total probability:** P(D) = (0.25)(0.05) + (0.35)(0.04) + (0.40)(0.02)", why: "Defective bolt teeno raaston se aa sakta hai." },
        { do: "= 0.0125 + 0.0140 + 0.0080 = **0.0345**", why: "Har term alag likho — step marks milte hain." },
        { do: "**Bayes:** P(E₂|D) = (0.35)(0.04) / 0.0345 = 0.0140/0.0345 = 140/345 = **28/69**", why: "Numerator denominator ka doosra term hai ✓ self-check pass." },
        { do: "**Doosra hissa:** P(not A | D) = 1 − P(E₁|D). P(E₁|D) = 0.0125/0.0345 = 125/345 = 25/69.", why: "Complement lena seedha tareeka hai — teeno alag nikalne ki zaroorat nahi." },
        { do: "P(not A | D) = 1 − 25/69 = **44/69**", why: "Check: 25/69 + 28/69 + 16/69 = 69/69 = 1 ✓ (C ka 16/69)" },
      ],
      answer: "P(B|D) = \\frac{28}{69}, \\qquad P(\\text{not }A \\mid D) = \\frac{44}{69}",
    },
  ],
};
