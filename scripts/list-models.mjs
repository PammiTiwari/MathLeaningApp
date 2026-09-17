import { readFileSync } from "fs";
const key = (readFileSync(".env.local","utf8").match(/GEMINI_API_KEY=(.+)/)||[])[1]?.trim();
const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
const j = await r.json();
if (!j.models) { console.log("ERR:", JSON.stringify(j).slice(0,300)); process.exit(1); }
for (const m of j.models) {
  if (!(m.supportedGenerationMethods||[]).includes("generateContent")) continue;
  console.log(m.name.replace("models/",""));
}
