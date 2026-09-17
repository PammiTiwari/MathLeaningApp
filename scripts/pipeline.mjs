/**
 * Turns real CBSE board-paper PDFs into app-ready question sets.
 *
 *   node scripts/pipeline.mjs <pdf-dir> [maxPapers]
 *
 * Per paper: 1 transcribe call + 2 solve calls. Results land in
 * lib/data/board-papers/<id>.json. Already-finished papers are skipped,
 * so the script can be stopped and restarted freely.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join, basename } from "path";

const KEY = (readFileSync(".env.local", "utf8").match(/GEMINI_API_KEY=(.+)/) || [])[1]?.trim();
if (!KEY) { console.error("no GEMINI_API_KEY"); process.exit(1); }

const OUT_DIR = "lib/data/board-papers";
mkdirSync(OUT_DIR, { recursive: true });

// free tier = 20 requests per model per day, so treat the list as a quota pool
const MODELS = [
  "gemini-3-flash-preview", "gemini-3.5-flash", "gemini-2.5-flash", "gemini-flash-latest",
  "gemini-3.1-flash-lite", "gemini-3.5-flash-lite", "gemini-flash-lite-latest",
];
const exhausted = new Set();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function call(parts, maxTokens = 60000) {
  for (let round = 1; round <= 5; round++) {
    for (const model of MODELS) {
      if (exhausted.has(model)) continue;
      let res;
      try {
        res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts }],
              generationConfig: { temperature: 0, maxOutputTokens: maxTokens, responseMimeType: "application/json" },
            }),
          }
        );
      } catch (e) { process.stderr.write("net "); continue; }
      if (res.ok) {
        const j = await res.json();
        const t = j?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ?? "";
        if (t) return t;
        process.stderr.write("empty ");
      } else {
        if (res.status === 429) {
          const body = await res.text();
          if (/PerDay/.test(body)) { exhausted.add(model); process.stderr.write(`${model}:spent `); continue; }
        }
        process.stderr.write(`${res.status} `);
      }
    }
    if (exhausted.size >= MODELS.length) throw new Error("every model's daily free quota is spent");
    const wait = 15000 * round;
    process.stderr.write(`| wait ${wait / 1000}s `);
    await sleep(wait);
  }
  throw new Error("all attempts failed");
}

const TRANSCRIBE = `This is a real CBSE Class 12 Mathematics board exam question paper.
Transcribe EVERY question exactly as printed. Do not simplify, do not invent, do not skip.

Return ONLY a JSON array, one object per question:
{
  "n": <question number 1-38>,
  "q": "<full question text, maths in LaTeX inside $...$>",
  "options": ["<a>","<b>","<c>","<d>"],          // ONLY for Section A (Q1-20)
  "orAlternative": "<the OR alternative if printed>",  // else omit
  "parts": [{"q":"...","marks":n}]               // ONLY for Section E case studies (Q36-38)
}
Preserve exact numbers, coefficients, matrices and limits — accuracy matters more than anything.
Matrices as \\\\begin{bmatrix} a & b \\\\\\\\ c & d \\\\end{bmatrix}. Integrals, fractions and vectors in LaTeX.
For Assertion-Reason questions put both statements in "q" and the four standard options in "options".`;

const SOLVE_HEAD = `You are a CBSE Class 12 Mathematics examiner writing the official marking scheme for a REAL board paper.
Solve every question completely and correctly before answering. Accuracy is everything.

For EACH question return:
- "n": question number
- "correct": ONLY for questions with options — 0-based index of the correct option (solve it, never guess)
- "answer": the final answer, concise, LaTeX in $...$
- "keySteps": array of marking-scheme steps, each ending with the marks it carries, e.g. "Compute the determinant — 1 mark". Step marks must sum to the question total.
- "chapter": one of relations-and-functions, inverse-trigonometric-functions, matrices, determinants, continuity-and-differentiability, application-of-derivatives, integrals, application-of-integrals, differential-equations, vector-algebra, three-dimensional-geometry, linear-programming, probability
Return ONLY a JSON array.`;

// CBSE 2023+ blueprint — section and marks follow the question number
const blueprint = (n) =>
  n <= 20 ? { section: "A", marks: 1 }
  : n <= 25 ? { section: "B", marks: 2 }
  : n <= 31 ? { section: "C", marks: 3 }
  : n <= 35 ? { section: "D", marks: 5 }
  : { section: "E", marks: 4 };

const fmt = (q) => `### Q${q.n} (${q.marks} marks, Section ${q.section})
${q.q}
${q.options ? "OPTIONS:\n" + q.options.map((o, k) => `  [${k}] ${o}`).join("\n") : ""}
${q.parts ? "PARTS:\n" + q.parts.map((p) => `  (${p.marks}m) ${p.q}`).join("\n") : ""}
${q.orAlternative ? "OR-ALTERNATIVE: " + q.orAlternative : ""}`;

async function processPaper(pdfPath, id, year) {
  const outFile = join(OUT_DIR, `${id}.json`);
  if (existsSync(outFile)) {
    const prev = JSON.parse(readFileSync(outFile, "utf8"));
    if (prev.questions?.length === 38 && prev.questions.every((q) => q.answer)) {
      console.error(`= ${id} already complete, skipping`);
      return;
    }
  }

  console.error(`\n>> ${id}`);
  process.stderr.write("   transcribing ");
  const data = readFileSync(pdfPath).toString("base64");
  const raw = await call([{ text: TRANSCRIBE }, { inline_data: { mime_type: "application/pdf", data } }]);
  let qs = JSON.parse(raw).map((q) => ({ ...q, ...blueprint(q.n) }));
  qs = qs.filter((q) => q.n >= 1 && q.n <= 38);
  console.error(`-> ${qs.length} questions`);

  const solutions = [];
  for (const [k, half] of [qs.filter((q) => q.n <= 20), qs.filter((q) => q.n > 20)].entries()) {
    if (!half.length) continue;
    process.stderr.write(`   solving half ${k + 1} `);
    try {
      const sols = JSON.parse(await call([{ text: `${SOLVE_HEAD}\n\n${half.map(fmt).join("\n\n")}` }]));
      solutions.push(...sols.filter((x) => x && x.n && x.answer));
      console.error(`-> ${sols.length}`);
    } catch (e) { console.error(`-> FAILED (${e.message})`); }
    await sleep(4000);
  }

  const questions = qs.map((q) => ({ ...q, ...(solutions.find((s) => s.n === q.n) || {}) }));
  const solved = questions.filter((q) => q.answer).length;
  writeFileSync(outFile, JSON.stringify({ id, year, set: id.split("-").slice(1).join("-"), questions }, null, 2));
  console.error(`   saved ${solved}/${questions.length} solved -> ${outFile}`);
}

const dir = process.argv[2];
const max = Number(process.argv[3] || 99);
const pdfs = readdirSync(dir)
  .filter((f) => f.endsWith(".pdf") && !/Visually Impaired/i.test(f))
  .sort()
  .slice(0, max);

console.error(`${pdfs.length} papers to process\n`);
for (const f of pdfs) {
  const set = basename(f).replace(/_Mathematics\.pdf$/i, "");
  try {
    await processPaper(join(dir, f), `2025-${set}`, "2025");
  } catch (e) {
    console.error(`   !! ${set}: ${e.message}`);
  }
  await sleep(6000);
}
console.error("\ndone");
