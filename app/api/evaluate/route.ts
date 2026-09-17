import { NextRequest, NextResponse } from "next/server";
import { askAI, parseJSON, AIConfigError, aiConfigured } from "@/lib/ai";
import { anyQuestion as getQuestion } from "@/lib/data/mocks";

export const runtime = "nodejs";
export const maxDuration = 60;

type Submission = {
  qid: string;
  answer: string;                       // typed answer
  image?: { mime: string; dataB64: string }; // photo of handwritten answer
};

type Marked = { qid: string; awarded: number; max: number; feedback: string };

export async function POST(req: NextRequest) {
  let body: { submissions: Submission[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const subs = body.submissions ?? [];
  if (!subs.length) return NextResponse.json({ error: "Kuch submit hi nahi hua." }, { status: 400 });

  const results: Marked[] = [];
  const needsAI: Submission[] = [];

  // 1. Objective questions are marked locally — no API needed, instant and exact.
  for (const s of subs) {
    const q = getQuestion(s.qid);
    if (!q) continue;
    if (q.type === "mcq" || q.type === "ar") {
      const picked = parseInt(s.answer, 10);
      const right = picked === q.correct;
      results.push({
        qid: q.id,
        awarded: right ? q.marks : 0,
        max: q.marks,
        feedback: right
          ? "Sahi jawab! ✓"
          : `Galat. Sahi option: (${String.fromCharCode(97 + (q.correct ?? 0))}). ${q.answer}`,
      });
    } else {
      needsAI.push(s);
    }
  }

  // 2. Subjective answers go to the AI examiner, marked against the CBSE-style scheme.
  if (needsAI.length) {
    if (!aiConfigured()) {
      for (const s of needsAI) {
        const q = getQuestion(s.qid)!;
        results.push({
          qid: q.id,
          awarded: 0,
          max: q.marks,
          feedback:
            "AI evaluation off hai — GEMINI_API_KEY set karo tab yeh answer check hoga. Abhi ke liye model answer neeche hai.",
        });
      }
    } else {
      try {
        // number the images so the model can match each one to its question
        const imageIndex = new Map<string, number>();
        needsAI.forEach((s) => { if (s.image) imageIndex.set(s.qid, imageIndex.size + 1); });

        const blocks = needsAI.map((s) => {
          const q = getQuestion(s.qid)!;
          return [
            `--- QUESTION ${q.id} (${q.marks} marks, type: ${q.type}) ---`,
            `QUESTION: ${q.q}`,
            q.parts ? `SUB-PARTS: ${q.parts.map((p, i) => `(${i + 1}) [${p.marks}m] ${p.q} => ${p.answer}`).join(" | ")}` : "",
            `MODEL ANSWER: ${q.answer}`,
            q.keySteps?.length ? `MARKING SCHEME STEPS:\n${q.keySteps.map((k) => "  • " + k).join("\n")}` : "",
            s.image
              ? `STUDENT ANSWER: ${s.answer?.trim() || "(written by hand)"}\n[IMAGE ${imageIndex.get(s.qid)} below is this student's handwritten working for THIS question — ${q.id}]`
              : `STUDENT ANSWER: ${s.answer?.trim() || "(left blank)"}`,
          ]
            .filter(Boolean)
            .join("\n");
        });

        const prompt = `You are an experienced CBSE Class 12 Mathematics board examiner marking a student's answer script. You follow the official CBSE marking scheme: award STEP MARKS generously for correct method even when the final answer is wrong, and deduct for missing steps the scheme requires (e.g. not writing the range in inverse-trig, missing second-derivative test, missing diagram in area questions, missing +C in indefinite integrals, missing units).

Mark each question below. For each, return:
- "awarded": marks given (may be a half mark like 1.5; never more than max, never negative)
- "feedback": 2-4 sentences in friendly Hinglish (Hindi-English mix, Roman script). Say what was right, exactly where marks were lost, and ONE specific thing to fix next time. Be encouraging but honest. Use maths notation in plain text or LaTeX with $...$.

If the student's answer is blank, award 0 and briefly tell them the method they should have used.
Images are attached AFTER the questions. Each one is labelled "IMAGE n — handwritten answer for question <id>". Match every image to its question by that label and mark that handwriting as the student's answer for that question only.
If a question is a case study, the student's answer is given part by part as "(1) ... (2) ... (3) ...". Award each part's marks separately and say in the feedback which part lost marks.

Return ONLY a JSON array, one object per question, in the same order:
[{"qid":"...","awarded":0,"feedback":"..."}]

${blocks.join("\n\n")}`;

        const parts: any[] = [{ text: prompt }];
        // images are pushed in the same order they were numbered above
        for (const s of needsAI) {
          if (s.image) {
            parts.push({ text: `--- IMAGE ${imageIndex.get(s.qid)} — handwritten answer for question ${s.qid} ---` });
            parts.push({ image: s.image });
          }
        }

        const raw = await askAI(parts, { json: true, temperature: 0.1 });
        const marked = parseJSON<{ qid: string; awarded: number; feedback: string }[]>(raw);

        for (const s of needsAI) {
          const q = getQuestion(s.qid)!;
          const m = marked.find((x) => x.qid === q.id);
          results.push({
            qid: q.id,
            awarded: Math.max(0, Math.min(q.marks, Number(m?.awarded ?? 0))),
            max: q.marks,
            feedback: m?.feedback ?? "Evaluate nahi ho paya — dobara try karo.",
          });
        }
      } catch (e: any) {
        const msg =
          e instanceof AIConfigError
            ? e.message
            : `AI examiner abhi jawab nahi de paya (${e?.message ?? e}). Objective marks upar sahi hain.`;
        for (const s of needsAI) {
          const q = getQuestion(s.qid)!;
          results.push({ qid: q.id, awarded: 0, max: q.marks, feedback: msg });
        }
      }
    }
  }

  // Keep the original paper order
  const order = new Map(subs.map((s, i) => [s.qid, i]));
  results.sort((a, b) => (order.get(a.qid) ?? 0) - (order.get(b.qid) ?? 0));

  const scored = results.reduce((n, r) => n + r.awarded, 0);
  const total = results.reduce((n, r) => n + r.max, 0);

  let overall = "";
  if (aiConfigured() && needsAI.length) {
    try {
      const weak = results.filter((r) => r.awarded < r.max * 0.6).map((r) => r.qid);
      overall = await askAI(
        [
          {
            text: `A CBSE Class 12 student scored ${scored}/${total} on a Maths mock. Questions where they lost most marks: ${weak.join(", ") || "none"}.
Write a short motivating summary in Hinglish (Roman script), max 4 sentences: what went well, the single biggest pattern of mistakes, and exactly what to revise tomorrow. End with one encouraging line. No preamble, just the summary.`,
          },
        ],
        { temperature: 0.6 }
      );
    } catch {
      overall = "";
    }
  }

  return NextResponse.json({ results, scored, total, overall });
}
