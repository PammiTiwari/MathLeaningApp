/**
 * Takes transcribed board-paper questions and produces CBSE-style model answers
 * + step-wise marking schemes. Run: node scripts/solve-paper.mjs <in.json> <out.json>
 */
import { readFileSync, writeFileSync } from "fs";

const key = (readFileSync(".env.local", "utf8").match(/GEMINI_API_KEY=(.+)/) || [])[1]?.trim();
const qs = JSON.parse(readFileSync(process.argv[2], "utf8"));
const out = process.argv[3];

// CBSE 2023+ blueprint: section and marks follow the question number
const blueprint = (n) =>
  n <= 20 ? { section: "A", marks: 1 }
  : n <= 25 ? { section: "B", marks: 2 }
  : n <= 31 ? { section: "C", marks: 3 }
  : n <= 35 ? { section: "D", marks: 5 }
  : { section: "E", marks: 4 };

const fixed = qs.map(q => ({ ...q, ...blueprint(q.n) }));

async function gemini(prompt, temp = 0) {
  for (const model of ["gemini-2.5-flash", "gemini-flash-latest"]) {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: temp, maxOutputTokens: 30000, responseMimeType: "application/json" },
        }) });
    if (r.status === 429) { await new Promise(x => setTimeout(x, 20000)); continue; }
    if (!r.ok) { console.error(model, r.status); continue; }
    const j = await r.json();
    const t = j?.candidates?.[0]?.content?.parts?.map(p => p.text).join("") ?? "";
    if (t) return t;
  }
  throw new Error("gemini failed");
}

const results = [];
const CHUNK = 3;
const failed = [];
for (let i = 0; i < fixed.length; i += CHUNK) {
  const batch = fixed.slice(i, i + CHUNK);
  process.stderr.write(`Q${batch[0].n}-${batch[batch.length-1].n} `);
  const prompt = `You are a CBSE Class 12 Mathematics examiner writing the official marking scheme for a real board paper.

For EACH question below produce:
- "n": the question number
- "correct": ONLY for questions with options — the 0-based index of the correct option. Solve it properly; do not guess.
- "answer": the final answer, concise, LaTeX in $...$
- "keySteps": the marking scheme as an array of strings. Each string is one step with the marks it carries, e.g. "Write $AX=B$ and compute $|A| = -1 \\\\neq 0$ — 1 mark". The marks in the steps must add up to the question's total marks.
- "chapter": one of relations-and-functions, inverse-trigonometric-functions, matrices, determinants, continuity-and-differentiability, application-of-derivatives, integrals, application-of-integrals, differential-equations, vector-algebra, three-dimensional-geometry, linear-programming, probability

BE MATHEMATICALLY CORRECT. Work each problem fully before answering. For MCQs, verify your chosen option by actually solving.
Return ONLY a JSON array.

${batch.map(q => `### Q${q.n} (${q.marks} marks, Section ${q.section})
${q.q}
${q.options ? "OPTIONS:\n" + q.options.map((o,k)=>`  [${k}] ${o}`).join("\n") : ""}
${q.parts ? "PARTS:\n" + q.parts.map(p=>`  (${p.marks}m) ${p.q}`).join("\n") : ""}
${q.orAlternative ? "OR-ALTERNATIVE: " + q.orAlternative : ""}`).join("\n\n")}`;

  let ok = false;
  for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
    try {
      const sols = JSON.parse(await gemini(prompt, attempt === 1 ? 0 : 0.15));
      const good = sols.filter(x => x && x.n && x.answer);
      if (!good.length) throw new Error("no usable solutions");
      results.push(...good);
      process.stderr.write(`ok(${good.length}) `);
      ok = true;
    } catch (e) {
      if (attempt === 3) { failed.push(...batch.map(b => b.n)); process.stderr.write(`FAIL `); }
      else await new Promise(r => setTimeout(r, 15000 * attempt));
    }
  }
  await new Promise(r => setTimeout(r, 6000));  // free-tier pacing
}
if (failed.length) console.error(`\nunsolved: ${failed.join(", ")}`);

const merged = fixed.map(q => ({ ...q, ...(results.find(r => r.n === q.n) || {}) }));
writeFileSync(out, JSON.stringify(merged, null, 2));
console.error(`\nsolved ${merged.filter(m=>m.answer).length}/${merged.length} -> ${out}`);
console.error("total marks:", merged.reduce((a,q)=>a+q.marks,0));
