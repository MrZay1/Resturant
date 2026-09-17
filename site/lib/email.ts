/**
 * Transactional email via Resend (https://resend.com). Free tier covers far more
 * than this business will send. No SDK: one fetch call keeps the bundle small.
 *
 * Env:
 *   RESEND_API_KEY    re_...  from resend.com/api-keys
 *   ORDER_EMAIL_TO    where order notifications land (your inbox)
 *   ORDER_EMAIL_FROM  the From address on a domain verified in Resend
 */
export type EmailAttachment = {
  filename: string;
  /** Raw base64, no data: prefix. */
  content: string;
  contentType?: string;
  /** Set to embed the file in the HTML with <img src="cid:thisValue">. */
  contentId?: string;
};

export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
};

/** Splits a data: URL into the base64 payload and MIME type Resend needs. */
export function parseDataUrl(dataUrl: string): { base64: string; contentType: string } | null {
  const m = /^data:([a-zA-Z0-9.+/-]+);base64,([A-Za-z0-9+/=\s]+)$/.exec(dataUrl.trim());
  if (!m) return null;
  return { contentType: m[1], base64: m[2].replace(/\s+/g, "") };
}

export function extensionFor(contentType: string) {
  return { "image/png": "png", "image/jpeg": "jpg", "image/svg+xml": "svg", "image/webp": "webp" }[contentType] ?? "png";
}

export async function sendEmail(msg: EmailMessage): Promise<{ ok: boolean; detail: string }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM;
  if (!key || !from) {
    return { ok: false, detail: "email not configured (RESEND_API_KEY or ORDER_EMAIL_FROM missing)" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({
        from,
        to: [msg.to],
        subject: msg.subject,
        html: msg.html,
        text: msg.text,
        ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
        ...(msg.attachments?.length
          ? {
              attachments: msg.attachments.map((a) => ({
                filename: a.filename,
                content: a.content,
                ...(a.contentType ? { content_type: a.contentType } : {}),
                ...(a.contentId ? { content_id: a.contentId } : {}),
              })),
            }
          : {}),
      }),
      // Attachments make the request bigger; give it room.
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return { ok: false, detail: `resend ${res.status}: ${(await res.text()).slice(0, 200)}` };
    return { ok: true, detail: "sent" };
  } catch (e) {
    return { ok: false, detail: (e as Error).message };
  }
}
