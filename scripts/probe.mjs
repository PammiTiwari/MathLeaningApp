import { readFileSync } from "fs";
const key = (readFileSync(".env.local","utf8").match(/GEMINI_API_KEY=(.+)/)||[])[1]?.trim();
const models = ["gemini-2.5-flash","gemini-2.5-flash-lite","gemini-flash-latest","gemini-flash-lite-latest",
  "gemini-3.5-flash","gemini-3.5-flash-lite","gemini-3-flash-preview","gemini-3.1-flash-lite",
  "gemini-2.5-pro","gemini-pro-latest","gemma-4-31b-it"];
for (const m of models) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`,
    { method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ contents:[{role:"user",parts:[{text:"ok"}]}], generationConfig:{maxOutputTokens:5} }) });
  let note = "";
  if (r.status === 429) {
    const t = await r.text();
    note = /PerDay/.test(t) ? "daily quota used up" : "per-minute limit";
  }
  console.log(`${String(r.status).padEnd(4)} ${m.padEnd(26)} ${note}`);
  await new Promise(x=>setTimeout(x,700));
}
