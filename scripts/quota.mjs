import { readFileSync } from "fs";
const key = (readFileSync(".env.local","utf8").match(/GEMINI_API_KEY=(.+)/)||[])[1]?.trim();
const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
  { method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ contents:[{role:"user",parts:[{text:"say ok"}]}],
      generationConfig:{maxOutputTokens:10} }) });
console.log("status:", r.status);
const t = await r.text();
console.log(t.slice(0, 1200));
