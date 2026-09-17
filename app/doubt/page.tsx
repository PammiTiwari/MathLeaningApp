"use client";

import { useRef, useState } from "react";
import { CHAPTERS } from "@/lib/data/chapters";
import { Card, Pill } from "@/components/ui";
import PageBanner from "@/components/PageBanner";
import { IMAGES } from "@/lib/images";
import { Rich } from "@/components/Tex";
import { Send, Camera, X, Loader2, Sparkles, AlertTriangle } from "lucide-react";

const SAMPLES = [
  "Continuity aur differentiability mein farak kya hai? Example se samjhao",
  "Integration by parts mein ILATE ka order kyun follow karte hain?",
  "Bayes theorem ka sawaal kaise pehchanein ki Bayes hi lagana hai?",
  "cos⁻¹(−1/2) ka answer 2π/3 kyun hai, −π/3 kyun nahi?",
];

export default function DoubtPage() {
  const [q, setQ] = useState("");
  const [chapter, setChapter] = useState("");
  const [img, setImg] = useState<{ name: string; mime: string; dataB64: string } | null>(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function ask() {
    if (!q.trim() && !img) return;
    setLoading(true); setErr(""); setAnswer("");
    try {
      const res = await fetch("/api/doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          chapter: chapter || undefined,
          image: img ? { mime: img.mime, dataB64: img.dataB64 } : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Kuch gadbad ho gayi");
      setAnswer(data.answer);
    } catch (e: any) {
      setErr(e?.message ?? "Kuch gadbad ho gayi");
    } finally {
      setLoading(false);
    }
  }

  async function pickFile(f: File) {
    if (f.size > 4 * 1024 * 1024) { alert("Photo 4MB se choti honi chahiye."); return; }
    const b64 = await new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result).split(",")[1]);
      r.onerror = rej;
      r.readAsDataURL(f);
    });
    setImg({ name: f.name, mime: f.type, dataB64: b64 });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageBanner
        image={IMAGES.graph}
        eyebrow="AI tutor"
        title="Doubt pucho, bina jhijhak"
        sub="Koi bhi sawaal - chapter ka concept ho, ya book ka koi question jo samajh nahi aa raha. Photo bhi kheench ke bhej sakte ho. Jawab step-by-step milega, Hinglish mein."
      />

      <Card className="p-5">
        <textarea
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) ask(); }}
          rows={4}
          placeholder="Apna doubt yahan likho… (Ctrl+Enter se bhejo)"
          className="w-full resize-y rounded-xl border border-line bg-sunk p-4 text-[14.5px] leading-relaxed text-head placeholder:text-faint focus:border-primary focus:outline-none"
        />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <select
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="rounded-lg border border-line bg-page px-3 py-2 text-xs text-body focus:border-primary focus:outline-none"
          >
            <option value="">Chapter (optional)</option>
            {CHAPTERS.map((c) => (
              <option key={c.slug} value={c.title}>Ch {c.n} - {c.title}</option>
            ))}
          </select>

          <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden"
            onChange={(e) => e.target.files?.[0] && pickFile(e.target.files[0])} />
          <button onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-muted hover:bg-sunk">
            <Camera size={13} /> Photo lagao
          </button>
          {img && (
            <span className="flex items-center gap-1.5 rounded-lg bg-mintSoft px-2.5 py-1.5 text-[11px] font-semibold text-mint">
              {img.name}
              <button onClick={() => setImg(null)}><X size={11} /></button>
            </span>
          )}

          <button
            onClick={ask}
            disabled={loading || (!q.trim() && !img)}
            className="ml-auto flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-white transition hover:bg-primaryDim disabled:opacity-40"
          >
            {loading ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
            {loading ? "Soch raha hoon…" : "Pucho"}
          </button>
        </div>
      </Card>

      {!answer && !loading && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-faint">Yeh bhi puch sakte ho</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {SAMPLES.map((s) => (
              <button key={s} onClick={() => setQ(s)}
                className="rounded-xl border border-line bg-card p-3.5 text-left text-[13px] leading-snug text-muted transition hover:border-primary/40 hover:text-head">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {err && (
        <Card className="mt-5 border-rose/30 bg-roseSoft p-4">
          <div className="flex items-start gap-2.5">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-rose" />
            <p className="text-[13.5px] leading-relaxed text-rose">{err}</p>
          </div>
        </Card>
      )}

      {loading && (
        <Card className="mt-5 p-8 text-center">
          <Loader2 size={28} className="mx-auto animate-spin text-primary" />
          <p className="mt-3 text-sm text-muted">Tumhara doubt solve kar raha hoon…</p>
        </Card>
      )}

      {answer && (
        <Card className="mt-5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={16} className="text-primary" />
            <Pill>Himmat tutor</Pill>
          </div>
          <Rich text={answer} className="text-[14.5px] leading-[1.8] text-body" />
          <button
            onClick={() => { setAnswer(""); setQ(""); setImg(null); }}
            className="mt-5 rounded-lg border border-line px-4 py-2 text-xs font-semibold text-muted hover:bg-sunk"
          >
            Naya doubt pucho
          </button>
        </Card>
      )}
    </div>
  );
}
