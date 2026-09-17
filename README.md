# हिम्मत रख · Himmat Rakh

**CBSE Class 12 Mathematics (041) ki poori taiyari — ek app mein.**

Fun Hinglish lessons jo basics se shuru hoke derivations aur board-level tough
questions tak jaate hain, asli CBSE board papers se bane timed mocks jinhe AI
step marks ke saath check karta hai, handwritten notes, aur ek AI doubt solver.

---

## Kya-kya hai

| Section | Kya karta hai |
|---|---|
| **Chapters** | Saare 13 chapters, CBSE unit weightage ke saath grouped |
| **Lessons** | Har chapter do hisson mein — pehle intuition (kahani, solved examples, quizzes, "yahan log phaste hain" traps), phir **Deep Dive**: 14 derivations, 14 theory sections, 13 board-level hard problems |
| **Videos** | Khan Academy ke embedded videos + har topic ka apna link + full-chapter one-shots |
| **Handwritten Notes** | Ruled-paper revision sheets — 73 sections, 175 formulas, 22 step-by-step methods, 21 warnings. Print-ready. |
| **Mock Exams** | Asli board papers se generate hote hain: full papers (38 Q, 80 marks, 3 hrs), section drills, chapter tests. **Sab timed.** |
| **Papers** | CBSE ki official site se asli board papers (2022–2026) + sample papers ke marking schemes |
| **Formula Sheet** | 94 formulas, searchable, chapter-wise, printable |
| **Flashcards** | 37 cards, flip-to-reveal, shuffle |
| **Ask Doubt** | AI tutor — text ya photo se sawaal pucho, step-by-step Hinglish jawab |

---

## Chalao

```bash
npm install
cp .env.example .env.local     # apni Gemini key daalo
npm run fast                   # build + start → http://localhost:3000
```

| Command | Kab |
|---|---|
| `npm run fast` | **Rozana use** — build karke chalata hai, full speed (pages 4–25 ms) |
| `npm run dev` | Sirf jab code badal rahe ho. Dev mode har page on-demand compile karta hai, isliye slow hai. |
| `npm run validate` | Board questions check karo (neeche dekho) |
| `npm run gen` | Board paper index regenerate karo |

> `npm run dev` chalane ke baad `npm run fast` se pehle `rm -rf .next` kar dena —
> Turbopack aur webpack ek hi folder use karte hain aur chunks mix ho jaate hain.

### AI key (free)

1. **https://aistudio.google.com/apikey** → "Create API key" (card nahi chahiye)
2. `.env.local` mein: `GEMINI_API_KEY=AIza...`

**Key ke bina bhi app chalta hai.** MCQ aur Assertion-Reason **turant, offline**
check ho jaate hain. Sirf likhe hue answers ki marking aur doubt-solver ke liye
key chahiye.

#### Quota ki sachai

Free tier har model ke **20 requests per din** deta hai (per-minute nahi) —
`GenerateRequestsPerDayPerProjectPerModel`. Isliye `lib/ai.ts` saat models par
rotate karta hai; ek ka din khatam hote hi agla le leta hai. Effective limit
~140 requests/din.

Ek student ke liye kaafi. Bahut saare users ke liye Google AI Studio mein
**billing enable karni padegi**, warna unhe "AI examiner abhi jawab nahi de paya"
dikhega.

---

## Vercel par deploy

```bash
git init && git add -A && git commit -m "Himmat Rakh"
# GitHub par push karo, phir vercel.com par import karo — ya:
npx vercel
```

Deploy ke baad: **Settings → Environment Variables → `GEMINI_API_KEY`**
(Production + Preview dono), phir redeploy.

`prebuild` hook board-paper index ko har build par regenerate karta hai, isliye
fresh clone bhi theek se build hota hai — chahe ek bhi board paper na ho.

---

## Board papers ka pipeline

Asli CBSE board paper PDFs ko app-ready question sets mein badalta hai.

```bash
# PDFs cbse.gov.in se — Papers page par links hain
node scripts/pipeline.mjs <pdf-folder> [maxPapers]
node scripts/validate.mjs --write
npm run gen
```

Har paper ke liye: ek transcribe call (Gemini PDF seedha padhta hai — ye scans
hain, unmein text nahi hota), phir solve passes jo batch chhota karte jaate hain
jab tak har question ka answer na aa jaye.

Script **resumable** hai — poora paper dobara process nahi hota, aur adhoora
paper kabhi student tak nahi pahunchta.

### Validation

`scripts/validate.mjs` do problem pakadta hai jo scanned papers mein aati hain:

- **Figure-dependent** questions — asli paper mein graph chhapa tha jo
  transcription nahi la sakti. Question rehta hai, par uske upar notice aur
  asli PDF ka link dikhta hai. (`Sketch the graph of...` flag **nahi** hota —
  woh student khud banata hai.)
- **Suspect options** — jaise ek indefinite integral ke options bare numbers
  hon. Aise questions **pool se hata diye jaate hain**; galat answer key se
  behtar hai ki sawaal hi na ho.

### Mocks kaise bante hain

| Kind | Kaise |
|---|---|
| **Full paper** | Ek board set, poora. Tabhi banta hai jab **saare 38** questions solved hon. |
| **Section drill** | Ek hi type ke sawaal, har set se kuch — MCQ, 2/3/5-markers, case studies |
| **Chapter test** | Sirf us chapter ke board questions |

Drills aur chapter tests **adhoore papers ke solved questions bhi** use karte
hain — 31/38 wala paper 31 asli questions deta hai.

---

## Content badalna ho to

Sab content plain TypeScript/JSON mein hai — koi CMS, koi database nahi.

| File | Kya |
|---|---|
| `lib/data/chapters.ts` | Chapters, topics, unit marks, one-shot videos |
| `lib/data/lessons-a/b/c.ts` | Lesson content (Ch 1–4 / 5–9 / 10–13) |
| `lib/data/deep-a/b/c.ts` | Deep dive — derivations, theory, hard problems |
| `lib/data/notes-a/b/c.ts` | Handwritten revision sheets |
| `lib/data/formulas.ts` | Formula sheet |
| `lib/data/board-papers/*.json` | Asli board papers (pipeline se) |
| `lib/data/mocks.ts` | Mocks kaise generate hote hain |
| `lib/data/papers.ts` | CBSE ke official paper links |

Apne teacher ke videos lagane hain? `chapters.ts` mein us chapter ke `videos`
array mein YouTube ID daal do.

---

## Tech

Next.js 15 (App Router) · TypeScript · Tailwind CSS · KaTeX · Gemini API

Lesson position aur mock attempts `localStorage` mein — koi login nahi, koi
server nahi, data device par hi rehta hai.

> **KaTeX note:** `\sqrt` aur matrices SVG se bante hain aur unke `<path d="...">`
> mein literal newlines hote hain. `components/Tex.tsx` isliye **source text
> ko pehle lines mein todta hai, phir maths render karta hai** — rendered HTML
> ko newlines par todne se SVG toot jaata hai aur coordinates page par text
> ban ke chhap jaate hain.

---

## Note

Ye ek independent study tool hai. CBSE ya Khan Academy se koi affiliation nahi.
Board papers CBSE ki apni website (`cbse.gov.in`) par link kiye gaye hain.

**Himmat rakh. Ho jayega.** 💪
