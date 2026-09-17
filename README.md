# हिम्मत रख · Himmat Rakh

**CBSE Class 12 Mathematics (041) ki poori taiyari - ek app mein.**

Fun Hinglish lessons jo basics se shuru hoke derivations aur board-level tough
questions tak jaate hain, handwritten revision notes, CBSE ke asli board papers,
formula sheet aur ek AI doubt solver.

---

## Kya-kya hai

| Section | Kya karta hai |
|---|---|
| **Chapters** | Saare 13 chapters, CBSE unit weightage ke saath grouped |
| **Lessons** | Har chapter do hisson mein - pehle intuition (kahani, solved examples, quizzes, "yahan log phaste hain" traps), phir **Deep Dive**: 14 derivations, 14 theory sections, 13 board-level hard problems |
| **Videos** | Khan Academy ke embedded videos + har topic ka apna link + full-chapter one-shots |
| **Handwritten Notes** | Ruled-paper revision sheets - 73 sections, 175 formulas, 22 step-by-step methods, 21 warnings. Print-ready. |
| **Papers** | CBSE ki official site se asli board papers (2022-2026) + sample papers ke marking schemes |
| **Formula Sheet** | 94 formulas, searchable, chapter-wise, printable |
| **Ask Doubt** | AI tutor - text ya photo se sawaal pucho, step-by-step Hinglish jawab |

---

## Chalao

```bash
npm install
cp .env.example .env.local     # apni Gemini key daalo
npm run fast                   # build + start → http://localhost:3000
```

| Command | Kab |
|---|---|
| `npm run fast` | **Rozana use** - build karke chalata hai, full speed (pages 4-25 ms) |
| `npm run dev` | Sirf jab code badal rahe ho. Dev mode har page on-demand compile karta hai, isliye slow hai. |

> `npm run dev` chalane ke baad `npm run fast` se pehle `rm -rf .next` kar dena -
> Turbopack aur webpack ek hi folder use karte hain aur chunks mix ho jaate hain.

### AI key (free)

1. **https://aistudio.google.com/apikey** → "Create API key" (card nahi chahiye)
2. `.env.local` mein: `GEMINI_API_KEY=AIza...`

**Key ke bina bhi baaki sab chalta hai** - lessons, notes, videos, formulas,
aur papers. Key sirf AI doubt solver ke liye chahiye.

#### Quota ki sachai

Free tier har model ke **20 requests per din** deta hai (per-minute nahi) -
`GenerateRequestsPerDayPerProjectPerModel`. Isliye `lib/ai.ts` saat models par
rotate karta hai; ek ka din khatam hote hi agla le leta hai. Effective limit
~140 doubts/din.

Ek student ke liye kaafi. Bahut saare users ke liye Google AI Studio mein
**billing enable karni padegi**.

---

## Vercel par deploy

```bash
git init && git add -A && git commit -m "Himmat Rakh"
# GitHub par push karo, phir vercel.com par import karo - ya:
npx vercel
```

Deploy ke baad: **Settings → Environment Variables → `GEMINI_API_KEY`**
(Production + Preview dono), phir redeploy.

---

## Content badalna ho to

Sab content plain TypeScript/JSON mein hai - koi CMS, koi database nahi.

| File | Kya |
|---|---|
| `lib/data/chapters.ts` | Chapters, topics, unit marks, one-shot videos |
| `lib/data/lessons-a/b/c.ts` | Lesson content (Ch 1-4 / 5-9 / 10-13) |
| `lib/data/deep-a/b/c.ts` | Deep dive - derivations, theory, hard problems |
| `lib/data/notes-a/b/c.ts` | Handwritten revision sheets |
| `lib/data/formulas.ts` | Formula sheet |
| `lib/data/papers.ts` | CBSE ke official paper links |

Apne teacher ke videos lagane hain? `chapters.ts` mein us chapter ke `videos`
array mein YouTube ID daal do.

---

## Tech

Next.js 15 (App Router) · TypeScript · Tailwind CSS · KaTeX · Gemini API

Lesson position `localStorage` mein - koi login nahi, koi server nahi, data
device par hi rehta hai.

> **KaTeX note:** `\sqrt` aur matrices SVG se bante hain aur unke `<path d="...">`
> mein literal newlines hote hain. `components/Tex.tsx` isliye **source text
> ko pehle lines mein todta hai, phir maths render karta hai** - rendered HTML
> ko newlines par todne se SVG toot jaata hai aur coordinates page par text
> ban ke chhap jaate hain.

---

## Note

Ye ek independent study tool hai. CBSE ya Khan Academy se koi affiliation nahi.
Board papers CBSE ki apni website (`cbse.gov.in`) par link kiye gaye hain.

**Himmat rakh. Ho jayega.** 💪
