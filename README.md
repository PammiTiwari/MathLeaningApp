# हिम्मत रख · Himmat Rakh

**CBSE Class 12 Mathematics (041) ki poori taiyari — ek app mein.**
Fun Hinglish lessons, Khan Academy videos, handwritten notes, official CBSE papers, aur timed mock exams jinki copy AI check karta hai.

---

## Kya-kya hai

| Section | Kya karta hai |
|---|---|
| **Chapters** | Saare 13 chapters, CBSE unit weightage ke saath grouped |
| **Fun Lessons** | Har chapter ek interactive story — concept cards, solved examples (step-by-step reveal), mini-quizzes, "yahan log phaste hain" traps, aur board tips |
| **Videos** | Khan Academy ke embedded videos + har topic ka apna video link + full-chapter one-shots |
| **Handwritten Notes** | Ruled-paper style 1-page revision sheet per chapter, print-ready |
| **Papers** | CBSE ki official website se sample papers + marking schemes (2023-24, 2024-25, 2025-26), Hindi versions bhi |
| **Timed Mock Exam** | Asli CBSE pattern (38 Q, 80 marks, 3 hrs), live timer, question map, answers type karo ya copy ki photo upload karo → **AI examiner step marks ke saath check karta hai** |
| **Formula Sheet** | 94 formulas, searchable, chapter-wise, printable |
| **Flashcards** | 37 cards, flip-to-reveal, shuffle, mastery tracking |
| **Ask Doubt** | AI tutor — text ya photo se sawaal pucho, step-by-step Hinglish jawab |
| **Progress** | XP, levels, streak, exam countdown, unit-wise progress, weak-chapter detector, mock exam history |

---

## Chalaao (local)

```bash
npm install
cp .env.example .env.local     # apni Gemini key daalo (optional)
npm run dev                    # http://localhost:3000
```

### AI key (free)

1. Jao → **https://aistudio.google.com/apikey**
2. "Create API key" — Google account se, koi card nahi chahiye
3. `.env.local` mein paste karo:
   ```
   GEMINI_API_KEY=AIza...
   ```

**Key ke bina bhi app chalta hai.** MCQ aur Assertion-Reason turant, offline check ho jaate hain. Sirf likhe hue answers ki marking aur doubt-solver ke liye key chahiye.

---

## Vercel par deploy

```bash
git init && git add -A && git commit -m "Himmat Rakh"
# GitHub par push karo, phir:
npx vercel            # ya vercel.com par repo import karo
```

Deploy ke baad Vercel dashboard mein:
**Settings → Environment Variables → `GEMINI_API_KEY`** add karo (Production + Preview dono), phir redeploy.

---

## Content badalna ho to

Sab content plain TypeScript files mein hai — koi CMS nahi, koi database nahi.

| File | Kya hai |
|---|---|
| `lib/data/chapters.ts` | Chapters, topics, unit marks, one-shot videos |
| `lib/data/lessons-a/b/c.ts` | Lesson content (Ch 1-4 / 5-9 / 10-13) |
| `lib/data/videos.ts` | Khan Academy links aur per-topic video mapping |
| `lib/data/notes.ts` | Handwritten revision sheets |
| `lib/data/formulas.ts` | Formula sheet |
| `lib/data/questions.ts` | Question bank (38-question full mock) |
| `lib/data/papers.ts` | CBSE paper links + mock paper definitions |
| `lib/data/flashcards.ts` | Flashcards |

Apne teacher ke videos lagane hain? `lib/data/chapters.ts` mein us chapter ke `videos` array mein YouTube video ID daal do — bas.

---

## Tech

Next.js 15 (App Router) · TypeScript · Tailwind CSS · KaTeX · Framer Motion · Gemini API

Progress `localStorage` mein save hota hai — koi login nahi, koi server nahi, data device par hi rehta hai.

---

## Note

Yeh ek independent study tool hai. CBSE ya Khan Academy se koi affiliation nahi hai.
Sample papers CBSE ki apni website (`cbseacademic.nic.in`) par link kiye gaye hain — koi copy host nahi ki gayi.

**Himmat rakh. Ho jayega.** 💪
