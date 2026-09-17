import { NextRequest, NextResponse } from "next/server";
import { askAI, AIConfigError, aiConfigured } from "@/lib/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  if (!aiConfigured()) {
    return NextResponse.json(
      { error: "AI doubt-solver ke liye GEMINI_API_KEY chahiye. Free key: aistudio.google.com/apikey" },
      { status: 503 }
    );
  }

  let body: { question: string; image?: { mime: string; dataB64: string }; chapter?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.question?.trim() && !body.image) {
    return NextResponse.json({ error: "Sawaal to likho pehle!" }, { status: 400 });
  }

  const prompt = `You are "Himmat", a warm and patient Class 12 CBSE Maths tutor from India. A student has a doubt.

Rules:
- Reply in Hinglish (Hindi-English mix in Roman script) - friendly, like a favourite teacher, never condescending.
- Keep mathematical terms and notation in English/LaTeX. Write maths as $...$ for inline and $$...$$ for display.
- Solve it STEP BY STEP. Number the steps. After each step add a one-line "kyun" (why we did that).
- Point out the common mistake students make in this exact type of question.
- End with the CBSE marking-scheme tip: what must be written in the answer sheet to get full marks.
- Be concise - no long essays. If the question is unclear, ask one specific clarifying question instead of guessing.
${body.chapter ? `\nThe student is studying: ${body.chapter}` : ""}

STUDENT'S DOUBT: ${body.question || "(see the attached image)"}`;

  try {
    const parts: any[] = [{ text: prompt }];
    if (body.image) parts.push({ image: body.image });
    const answer = await askAI(parts, { temperature: 0.4 });
    return NextResponse.json({ answer });
  } catch (e: any) {
    const status = e instanceof AIConfigError ? 503 : 500;
    return NextResponse.json({ error: e?.message ?? "Kuch gadbad ho gayi." }, { status });
  }
}
