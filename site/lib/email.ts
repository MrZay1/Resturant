/**
 * Transactional email via Resend (https://resend.com). Free tier covers far more
 * than this business will send. No SDK: one fetch call keeps the bundle small.
 *
 * Env:
 *   RESEND_API_KEY    re_...  from resend.com/api-keys
 *   ORDER_EMAIL_TO    where order notifications land (your inbox)
 *   ORDER_EMAIL_FROM  the From address on a domain verified in Resend
 */
export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

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
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { ok: false, detail: `resend ${res.status}: ${(await res.text()).slice(0, 200)}` };
    return { ok: true, detail: "sent" };
  } catch (e) {
    return { ok: false, detail: (e as Error).message };
  }
}
