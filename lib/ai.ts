/**
 * Provider-thin AI layer. Default: Google Gemini (free tier, strong at maths + vision).
 * Swap provider by changing AI_PROVIDER; the rest of the app only calls askAI().
 */

/**
 * The free tier meters requests PER MODEL PER DAY (currently 20 each), not
 * across the account. So the fallback chain doubles as a quota pool: when one
 * model's day is spent it returns 429 and we simply move to the next.
 *
 * Ordered strongest-first — the lite models are the last resort because they
 * are weaker at multi-step marking. Ids verified against the live model list;
 * "gemini-2.0-flash" and "gemini-2.5-flash-lite" do NOT exist there.
 */
const GEMINI_MODELS = [
  process.env.GEMINI_MODEL,        // optional override
  "gemini-3-flash-preview",
  "gemini-3.5-flash",
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
  "gemini-3.5-flash-lite",
  "gemini-flash-lite-latest",
].filter(Boolean) as string[];

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
  const send = (model: string) =>
    fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
  const pick = (d: any) =>
    d?.candidates?.[0]?.content?.parts?.map((x: any) => x.text).join("") ?? "";

  // 429 = rate limited, 503 = model busy. Both are temporary — back off and retry
  // across the whole model list before giving up.
  const RETRYABLE = new Set([429, 500, 503]);

  for (let round = 0; round < 3; round++) {
    for (const model of GEMINI_MODELS) {
      try {
        const res = await send(model);
        if (res.ok) {
          const text = pick(await res.json());
          if (text) return text;
          lastErr = `${model}: empty response`;
          continue;
        }
        if (RETRYABLE.has(res.status)) {
          lastErr = `${model}: ${res.status} (busy)`;
          continue;               // try the next model straight away
        }
        lastErr = `${model}: ${res.status} ${(await res.text()).slice(0, 200)}`;
      } catch (e: any) {
        lastErr = `${model}: ${e?.message ?? e}`;
      }
    }
    // every model was busy — wait, then go round again
    if (round < 2) await new Promise((r) => setTimeout(r, 2000 * (round + 1)));
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
