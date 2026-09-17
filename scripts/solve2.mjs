import { readFileSync, writeFileSync } from "fs";
const key = (readFileSync(".env.local","utf8").match(/GEMINI_API_KEY=(.+)/)||[])[1]?.trim();
const qs = JSON.parse(readFileSync(process.argv[2],"utf8"));
const out = process.argv[3];

const bp = n => n<=20?{section:"A",marks:1}:n<=25?{section:"B",marks:2}:n<=31?{section:"C",marks:3}:n<=35?{section:"D",marks:5}:{section:"E",marks:4};
const fixed = qs.map(q => ({...q, ...bp(q.n)}));

async function ask(prompt) {
  for (let a = 1; a <= 6; a++) {
    for (const model of ["gemini-2.5-flash","gemini-flash-latest","gemini-3.5-flash"]) {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        { method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ contents:[{role:"user",parts:[{text:prompt}]}],
            generationConfig:{temperature:0,maxOutputTokens:60000,responseMimeType:"application/json"} }) });
      if (r.ok) {
        const j = await r.json();
        const t = j?.candidates?.[0]?.content?.parts?.map(p=>p.text).join("") ?? "";
        if (t) return t;
      }
      process.stderr.write(`${model.slice(7)}:${r.status} `);
    }
    const wait = 20000 * a;
    process.stderr.write(`| retry ${a} in ${wait/1000}s\n`);
    await new Promise(x => setTimeout(x, wait));
  }
  throw new Error("all attempts failed");
}

const HEAD = `You are a CBSE Class 12 Mathematics examiner writing the official marking scheme for a REAL board paper.
Solve every question completely and correctly before answering. Accuracy is everything.

For EACH question return:
- "n": question number
- "correct": ONLY for questions with options — 0-based index of the correct option (solve it, never guess)
- "answer": the final answer, concise, LaTeX in $...$
- "keySteps": array of marking-scheme steps, each ending with the marks it carries, e.g. "Compute the determinant — 1 mark". Step marks must sum to the question total.
- "chapter": one of relations-and-functions, inverse-trigonometric-functions, matrices, determinants, continuity-and-differentiability, application-of-derivatives, integrals, application-of-integrals, differential-equations, vector-algebra, three-dimensional-geometry, linear-programming, probability
Return ONLY a JSON array.`;

const fmt = q => `### Q${q.n} (${q.marks} marks, Section ${q.section})
${q.q}
${q.options ? "OPTIONS:\n"+q.options.map((o,k)=>`  [${k}] ${o}`).join("\n") : ""}
${q.parts ? "PARTS:\n"+q.parts.map(p=>`  (${p.marks}m) ${p.q}`).join("\n") : ""}
${q.orAlternative ? "OR-ALTERNATIVE: "+q.orAlternative : ""}`;

const results = [];
const halves = [fixed.filter(q=>q.n<=20), fixed.filter(q=>q.n>20)];
for (const [k, half] of halves.entries()) {
  console.error(`\n--- half ${k+1}: Q${half[0].n}-Q${half[half.length-1].n} ---`);
  try {
    const sols = JSON.parse(await ask(`${HEAD}\n\n${half.map(fmt).join("\n\n")}`));
    results.push(...sols.filter(x=>x&&x.n&&x.answer));
    console.error(`  got ${sols.length}`);
  } catch (e) { console.error("  half failed:", e.message); }
}

const merged = fixed.map(q => ({...q, ...(results.find(r=>r.n===q.n)||{})}));
writeFileSync(out, JSON.stringify(merged,null,2));
console.error(`\nsolved ${merged.filter(m=>m.answer).length}/${merged.length} -> ${out}`);
