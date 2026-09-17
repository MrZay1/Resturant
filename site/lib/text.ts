/** First n sentences of a paragraph, always ending with a single period. */
export function firstSentences(text: string, n = 1) {
  const parts = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const out = parts.slice(0, n).join(" ").trim();
  return /[.!?]$/.test(out) ? out : `${out}.`;
}
