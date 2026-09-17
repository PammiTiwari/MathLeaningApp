/**
 * Provider-thin AI layer. Default: Google Gemini (free tier, strong at maths + vision).
 * Swap provider by changing AI_PROVIDER; the rest of the app only calls askAI().
 */

const GEMINI_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"];

export type AIPart = { text: string } | { image: { mime: string; dataB64: string } };

export class AIConfigError extends Error {}

export function aiConfigured() {
  return Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
}

export async function askAI(parts: AIPart[], opts?: { json?: boolean; temperature?: number }) {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key) {
    throw new AIConfigError(
      "GEMINI_API_KEY set nahi hai. Google AI Studio se free key lo (aistudio.google.com/apikey) aur .env.local mein daalo."
    );
  }

  const body = {
    contents: [
      {
        role: "user",
        parts: parts.map((p) =>
          "text" in p
            ? { text: p.text }
            : { inline_data: { mime_type: p.image.mime, data: p.image.dataB64 } }
        ),
      },
    ],
    generationConfig: {
      temperature: opts?.temperature ?? 0.2,
      maxOutputTokens: 8192,
      ...(opts?.json ? { responseMimeType: "application/json" } : {}),
    },
  };

  let lastErr = "";
  for (const model of GEMINI_MODELS) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) {
        lastErr = `${model}: ${res.status} ${(await res.text()).slice(0, 300)}`;
        continue;
      }
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.map((x: any) => x.text).join("") ?? "";
      if (text) return text;
      lastErr = `${model}: empty response`;
    } catch (e: any) {
      lastErr = `${model}: ${e?.message ?? e}`;
    }
  }
  throw new Error(`AI call failed. ${lastErr}`);
}

/** Pull the first JSON object/array out of a model response. */
export function parseJSON<T>(raw: string): T {
  const cleaned = raw.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    const m = cleaned.match(/[[{][\s\S]*[\]}]/);
    if (m) return JSON.parse(m[0]) as T;
    throw new Error("AI ne valid JSON nahi diya.");
  }
}
