"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AlertCircle, Check, CheckCircle2, Copy, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";

type Mode = "build" | "finder";

type ParseResult =
  | { kind: "empty" }
  | { kind: "placeId"; placeId: string; link: string; unusual: boolean }
  | { kind: "shortLink"; link: string; addedSuffix: boolean }
  | { kind: "profileLink"; reason: string }
  | { kind: "unknown" };

const WRITE_REVIEW_BASE = "https://search.google.com/local/writereview?placeid=";

/** Loose shape of a Google Place ID: URL-safe base64-ish, at least 20 characters. */
const PLACE_ID_RE = /^[A-Za-z0-9_-]{20,}$/;

function toUrl(raw: string): URL | null {
  const candidate = /^[a-z]+:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(candidate);
  } catch {
    return null;
  }
}

export function parseReviewInput(raw: string): ParseResult {
  const value = raw.trim();
  if (!value) return { kind: "empty" };

  // Bare Place ID (no dots, no slashes, no spaces).
  if (!/[\s./]/.test(value) && PLACE_ID_RE.test(value)) {
    return {
      kind: "placeId",
      placeId: value,
      link: WRITE_REVIEW_BASE + encodeURIComponent(value),
      unusual: !value.startsWith("ChIJ"),
    };
  }

  const url = toUrl(value);
  if (!url) return { kind: "unknown" };

  const host = url.hostname.replace(/^www\./, "").toLowerCase();

  // Any URL that already carries a placeid query parameter.
  const fromQuery = url.searchParams.get("placeid") ?? url.searchParams.get("place_id");
  if (fromQuery && PLACE_ID_RE.test(fromQuery)) {
    return {
      kind: "placeId",
      placeId: fromQuery,
      link: WRITE_REVIEW_BASE + encodeURIComponent(fromQuery),
      unusual: !fromQuery.startsWith("ChIJ"),
    };
  }

  // g.page/r/<token>/review or g.page/<name>/review short links.
  if (host === "g.page") {
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length === 0) return { kind: "unknown" };
    const hasReview = parts[parts.length - 1].toLowerCase() === "review";
    const base = hasReview ? parts : [...parts, "review"];
    return {
      kind: "shortLink",
      link: `https://g.page/${base.join("/")}`,
      addedSuffix: !hasReview,
    };
  }

  if (host === "maps.app.goo.gl" || host === "goo.gl") {
    return {
      kind: "profileLink",
      reason:
        "This is a Maps share link. It opens your profile, not the review box, and it does not contain a Place ID. Use the Ask for reviews button in your profile instead, or look up your Place ID with Method 3.",
    };
  }

  if (host === "google.com" || host.endsWith(".google.com")) {
    if (url.pathname.startsWith("/maps")) {
      return {
        kind: "profileLink",
        reason:
          "This is a Google Maps URL. The long code in it is not a Place ID, so we cannot build a review link from it. Use the Ask for reviews button in your profile, or look up your Place ID with Method 3.",
      };
    }
    return {
      kind: "profileLink",
      reason:
        "This Google link does not include a Place ID or a review short link. Try the Ask for reviews button in your profile, or paste a Place ID.",
    };
  }

  return { kind: "unknown" };
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function Hint({
  tone,
  children,
}: {
  tone: "ok" | "info" | "warn";
  children: ReactNode;
}) {
  const Icon = tone === "ok" ? CheckCircle2 : tone === "warn" ? AlertCircle : Info;
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm leading-relaxed",
        tone === "ok" && "border-accent/20 bg-accent-soft text-accent-2",
        tone === "info" && "border-line bg-paper text-ink-2",
        tone === "warn" && "border-gold/50 bg-gold/10 text-ink-2"
      )}
      role="status"
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}

export function ReviewLinkBuilder({ className }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("build");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  const result = useMemo(() => parseReviewInput(input), [input]);
  const link =
    result.kind === "placeId" || result.kind === "shortLink" ? result.link : null;

  async function onCopy() {
    if (!link) return;
    const ok = await copyText(link);
    setCopied(ok ? "done" : "failed");
    window.setTimeout(() => setCopied("idle"), 2000);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div
        role="tablist"
        aria-label="Builder mode"
        className="inline-flex w-fit rounded-full border border-line bg-paper p-1"
      >
        {(
          [
            { id: "build", label: "Build my link" },
            { id: "finder", label: "I used the Finder" },
          ] as Array<{ id: Mode; label: string }>
        ).map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={mode === tab.id}
            onClick={() => setMode(tab.id)}
            className={cn(
              "whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm",
              mode === tab.id ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {mode === "build" ? (
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="review-link-input" className="block text-sm font-medium text-ink">
              Paste your Place ID or your review short link
            </label>
            <p className="mt-1 text-sm text-muted">
              A Place ID usually starts with <span className="font-mono">ChIJ</span>. A short link
              looks like <span className="font-mono">g.page/r/.../review</span>.
            </p>
            <input
              id="review-link-input"
              type="text"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              placeholder="ChIJN1t_tDeuEmsRUsoyG83frY4  or  https://g.page/r/abc123/review"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setCopied("idle");
              }}
              className="mt-3 h-12 w-full rounded-xl border border-line-strong bg-white px-4 font-mono text-sm text-ink placeholder:text-muted/70 focus:border-accent"
            />
          </div>

          {result.kind === "empty" && (
            <Hint tone="info">
              Your generated link will appear here. Nothing you paste is sent anywhere; this runs in
              your browser.
            </Hint>
          )}

          {result.kind === "placeId" && (
            <>
              <Hint tone="ok">
                That looks like a Place ID.{" "}
                {result.unusual
                  ? "It does not start with ChIJ, which is unusual but can still be valid. Test the link before you use it."
                  : "Your review link is ready. Test it before you use it."}
              </Hint>
            </>
          )}

          {result.kind === "shortLink" && (
            <Hint tone="ok">
              That is a Google review short link.{" "}
              {result.addedSuffix
                ? "We added /review to the end so it opens the review box instead of your profile."
                : "It should open the review box directly. Test it to be sure."}
            </Hint>
          )}

          {result.kind === "profileLink" && <Hint tone="warn">{result.reason}</Hint>}

          {result.kind === "unknown" && (
            <Hint tone="warn">
              We do not recognise that. Paste a Place ID (a long code with no spaces, usually
              starting with ChIJ) or a short link from the Ask for reviews button in your Google
              Business Profile.
            </Hint>
          )}

          {link && (
            <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
                Your review link
              </div>
              <div className="mt-2 break-all rounded-lg border border-line bg-white px-3 py-2.5 font-mono text-[13px] leading-relaxed text-ink">
                {link}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button type="button" size="sm" onClick={onCopy} aria-live="polite">
                  {copied === "done" ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" /> Copy link
                    </>
                  )}
                </Button>
                <Button
                  href={link}
                  variant="secondary"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open link to test <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              {copied === "failed" && (
                <p className="mt-3 text-sm text-muted">
                  Copy did not work in this browser. Select the link above and copy it by hand.
                </p>
              )}
              <p className="mt-3 text-sm text-muted">
                When it opens, you should see a box with five empty stars and a place to type. If
                you see your business profile instead, it is the wrong kind of link.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-ink-2">
          <p>
            Google&apos;s Place ID Finder shows a map with a search box. You search for your
            restaurant, click the result, and it shows a long code labelled Place ID. That code is
            what you need.
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Copy the code exactly as shown. It usually starts with ChIJ and has no spaces.</li>
            <li>Switch to the Build my link tab above and paste it in.</li>
            <li>Click Open link to test. You should land on a box with five empty stars.</li>
          </ol>
          <p>
            If the finder shows more than one result for your name, pick the one with your street
            address. Each location has its own Place ID and its own review link.
          </p>
          <p className="text-sm text-muted">
            The Place ID Finder lives on a developer page, but you do not need an account or any
            code to use it. If you get stuck, send us your business name and address and{" "}
            {BRAND.name} will look it up for you.
          </p>
        </div>
      )}
    </div>
  );
}
