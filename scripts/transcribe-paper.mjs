/**
 * Reads a real CBSE board paper PDF and transcribes its questions to JSON,
 * using the same Gemini key the app uses. Run: node scripts/transcribe-paper.mjs <pdf> <out>
 */
import { readFileSync, writeFileSync } from "fs";

const key = (readFileSync(".env.local", "utf8").match(/GEMINI_API_KEY=(.+)/) || [])[1]?.trim();
if (!key) { console.error("no GEMINI_API_KEY in .env.local"); process.exit(1); }

const pdf = process.argv[2], out = process.argv[3];
const data = readFileSync(pdf).toString("base64");
console.error(`reading ${pdf} (${(data.length/1.37/1e6).toFixed(1)} MB)`);

const prompt = `This is a real CBSE Class 12 Mathematics board exam question paper.
Transcribe EVERY question exactly as printed. Do not simplify, do not invent, do not skip.

Return ONLY a JSON array. One object per question:
{
  "n": <question number 1-38>,
  "section": "A"|"B"|"C"|"D"|"E",
  "marks": <number>,
  "q": "<the full question text, maths in LaTeX inside $...$>",
  "options": ["<a>","<b>","<c>","<d>"]   // ONLY for Section A MCQs, else omit
  "orAlternative": "<the 'OR' alternative question if one is printed>"  // else omit
  "parts": [{"q":"...","marks":n}]       // ONLY for Section E case studies
}

Rules:
- Preserve exact numbers, coefficients, matrices, limits. Accuracy matters more than anything.
- Matrices in LaTeX: \\\\begin{bmatrix} a & b \\\\\\\\ c & d \\\\end{bmatrix}
- Integrals, fractions, vectors all in LaTeX.
- For Assertion-Reason questions put the Assertion and Reason in "q" and the four standard options in "options".
- If a question has an "OR" choice, put the alternative in "orAlternative".`;

const body = {
  contents: [{ role: "user", parts: [
    { text: prompt },
    { inline_data: { mime_type: "application/pdf", data } },
  ]}],
  generationConfig: { temperature: 0, maxOutputTokens: 60000, responseMimeType: "application/json" },
};

const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
  { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
);
if (!res.ok) { console.error(res.status, (await res.text()).slice(0, 500)); process.exit(1); }
const j = await res.json();
const text = j?.candidates?.[0]?.content?.parts?.map(p => p.text).join("") ?? "";
if (!text) { console.error("empty:", JSON.stringify(j).slice(0,400)); process.exit(1); }
writeFileSync(out, text);
try { console.error(`transcribed ${JSON.parse(text).length} questions -> ${out}`); }
catch { console.error(`wrote ${text.length} chars -> ${out} (check JSON)`); }
