/**
 * Flags board-paper questions that cannot be trusted or cannot be shown.
 *   node scripts/validate.mjs [--write]
 *
 * Two kinds of problem show up when transcribing scanned papers:
 *  1. the question depends on a printed figure the transcription cannot carry
 *  2. the options plainly do not match the question (OCR pulled them from
 *     elsewhere on the page)
 *
 * With --write the flags are saved back into each JSON so the app can act on
 * them; without it this just prints a report.
 */
import { readdirSync, readFileSync, writeFileSync } from "fs";

const DIR = "lib/data/board-papers";

/**
 * Only a question that points at a figure PRINTED ON THE PAPER is a problem.
 * "Sketch the graph of ..." asks the student to draw one — that works fine
 * here, so it must not match.
 */
const FIGURE_RE =
  /\bas shown\b|shown (in|below|above) (the )?(figure|graph|diagram)|given (figure|graph|diagram)|adjoining (figure|graph)|following (figure|graph|diagram)|in the (figure|diagram)|Graph \([A-D]\)|the (figure|diagram) (shows|given)/i;

const DRAWS_OWN_RE = /\b(sketch|draw|plot)\b/i;

/** An indefinite integral whose options are bare numbers is mis-transcribed. */
function optionsLookWrong(q) {
  if (!q.options?.length) return false;
  const indefiniteIntegral = /\\int/.test(q.q) && !/\\int_|\\int\s*\^|_\{/.test(q.q);
  if (!indefiniteIntegral) return false;
  const bareNumber = (o) => /^\$?-?\\?[a-z]*\s*-?\d+\s*\$?$/i.test(o.trim());
  return q.options.every(bareNumber);
}

let totalFig = 0, totalBad = 0, totalQ = 0;
const report = [];

for (const file of readdirSync(DIR).filter((f) => f.endsWith(".json"))) {
  const paper = JSON.parse(readFileSync(`${DIR}/${file}`, "utf8"));
  let fig = 0, bad = 0;

  for (const q of paper.questions ?? []) {
    totalQ++;
    const texts = [q.q, ...(q.options ?? []), ...(q.parts ?? []).map((p) => p.q), q.orAlternative ?? ""];
    const needsFigure =
      texts.some((t) => t && FIGURE_RE.test(t)) && !DRAWS_OWN_RE.test(q.q);
    const mismatched = optionsLookWrong(q);

    if (needsFigure) { q.needsFigure = true; fig++; totalFig++; }
    else delete q.needsFigure;

    if (mismatched) { q.suspect = true; bad++; totalBad++; }
    else delete q.suspect;

    if (needsFigure || mismatched)
      report.push(`  ${paper.id} Q${q.n}  ${needsFigure ? "[figure]" : ""}${mismatched ? "[options?]" : ""}  ${q.q.replace(/\s+/g, " ").slice(0, 90)}`);
  }

  if (process.argv.includes("--write"))
    writeFileSync(`${DIR}/${file}`, JSON.stringify(paper, null, 2));

  console.log(`${paper.id}: ${fig} figure-dependent, ${bad} suspect options`);
}

console.log(`\n${totalQ} questions checked — ${totalFig} need a figure, ${totalBad} have suspect options`);
if (report.length) console.log("\n" + report.join("\n"));
