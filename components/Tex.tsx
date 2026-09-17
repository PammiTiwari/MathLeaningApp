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
    return `<code>${escapeHtml(tex)}</code>`;
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function unescapeHtml(s: string) {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
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

const MARK_OPEN = "@@BLOCK";
const MARK_CLOSE = "@@";

/**
 * Renders a string mixing plain text, **bold**, $inline math$ and $$display math$$.
 * Line breaks become paragraph breaks.
 *
 * Order matters here. KaTeX emits SVG for \sqrt, \overline and stretchy
 * delimiters, and that SVG carries literal newlines inside its <path d="...">
 * data. So the SOURCE text must be split into lines BEFORE any maths is
 * rendered - splitting the rendered HTML tears those path attributes apart and
 * the raw coordinates get printed onto the page as text.
 */
export function Rich({ text, className = "" }: { text: string; className?: string }) {
  const html = useMemo(() => {
    // 1. lift out $$display$$ blocks (they may span several lines)
    const blocks: string[] = [];
    const withMarkers = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, m: string) => {
      blocks.push(
        `<div class="katex-scroll overflow-x-auto py-1">${renderTex(m, true)}</div>`
      );
      return `${MARK_OPEN}${blocks.length - 1}${MARK_CLOSE}`;
    });

    const restore = (s: string) =>
      s.replace(/@@BLOCK(\d+)@@/g, (_, n: string) => blocks[Number(n)] ?? "");

    // 2. split the SOURCE into paragraphs, then render maths inside each one
    return withMarkers
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        // a line that is nothing but a display block stands alone
        if (/^@@BLOCK\d+@@$/.test(line)) return restore(line);

        const out = escapeHtml(line)
          .replace(/\$([^$]+?)\$/g, (_, m: string) => renderTex(unescapeHtml(m), false))
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-head">$1</strong>');

        return `<p class="mb-2 last:mb-0">${restore(out)}</p>`;
      })
      .join("");
  }, [text]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
