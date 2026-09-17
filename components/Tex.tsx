"use client";

import katex from "katex";
import React, { useMemo } from "react";

function renderTex(tex: string, display: boolean) {
  try {
    return katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      strict: false,
      trust: true,
    });
  } catch {
    return `<code>${tex}</code>`;
  }
}

/** Block (centered) formula */
export function Formula({ tex, className = "" }: { tex: string; className?: string }) {
  const html = useMemo(() => renderTex(tex, true), [tex]);
  return (
    <div
      className={`katex-scroll overflow-x-auto py-1 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Renders a string that mixes plain text, **bold**, $inline math$ and $$display math$$.
 * Newlines become paragraph breaks.
 */
export function Rich({ text, className = "" }: { text: string; className?: string }) {
  const html = useMemo(() => {
    const escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // $$display$$ first, then $inline$
    let out = escaped.replace(/\$\$([\s\S]+?)\$\$/g, (_, m) =>
      `<div class="katex-scroll overflow-x-auto py-1">${renderTex(decode(m), true)}</div>`
    );
    out = out.replace(/\$([^$\n]+?)\$/g, (_, m) => renderTex(decode(m), false));
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>');
    out = out
      .split("\n")
      .map((line) => (line.trim() ? `<p class="mb-2 last:mb-0">${line}</p>` : ""))
      .join("");
    return out;
  }, [text]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function decode(s: string) {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
