import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";
const MAX_BODY_BYTES = 32_768;
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const controls = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

function reply(status: number) {
  return Response.json(status === 200 ? { success: true } : { success: false, error: "Unable to send message. Please try again later." }, {
    status, headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "60" } : {}) },
  });
}

// Bound the actual stream, including requests without a Content-Length header.
async function readBody(request: Request): Promise<unknown> {
  if (!request.body) throw new Error("Missing body");
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let text = "";
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_BODY_BYTES) { await reader.cancel(); throw new Error("Body limit"); }
      text += decoder.decode(chunk.value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally { reader.releaseLock(); }
}

// Explicit allowlist: this endpoint exposes only the public widget key.
export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const siteKey = env.TURNSTILE_SITE_KEY?.trim();
    if (!siteKey) return reply(503);
    return Response.json({ siteKey }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return reply(503);
  }
}

export async function POST(request: Request) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env.CONTACT_ORIGIN || !env.TURNSTILE_SECRET_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL || !env.RESEND_API_KEY || !env.CONTACT_RATE_LIMITER) return reply(503);
    const origin = new URL(env.CONTACT_ORIGIN);
    if (request.headers.get("origin") !== origin.origin) return reply(403);
    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return reply(415);

    // Cloudflare supplies this header; do not trust a caller's X-Forwarded-For.
    const ip = request.headers.get("cf-connecting-ip") || "local";
    const allowed = await env.CONTACT_RATE_LIMITER.limit({ key: "portfolio-contact:" + ip });
    if (!allowed.success) return reply(429);
    if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) return reply(413);

    let body: unknown;
    try { body = await readBody(request); } catch { return reply(400); }
    if (!body || typeof body !== "object" || Array.isArray(body)) return reply(400);
    const data = body as Record<string, unknown>;
    if (typeof data.name !== "string" || typeof data.email !== "string" || typeof data.message !== "string" || typeof data.token !== "string") return reply(400);
    const name = data.name.trim();
    const email = data.email.trim();
    const message = data.message.replace(/\r\n?/g, "\n").trim();
    if (!name || name.length > 100 || /[\r\n]/.test(name) || controls.test(name) || email.length > 254 || !emailPattern.test(email) || controls.test(email) || !message || message.length > 5000 || controls.test(message) || !data.token || data.token.length > 2048) return reply(400);

    const verificationResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: data.token, ...(ip !== "local" ? { remoteip: ip } : {}) }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!verificationResponse.ok) return reply(503);
    const verification = await verificationResponse.json() as { success?: boolean; hostname?: string; action?: string };
    if (verification.success !== true || verification.hostname !== origin.hostname || verification.action !== "contact") return reply(400);

    // Recipient/sender are fixed server configuration. User content is plain text,
    // never HTML or a raw SMTP header, and the visitor is only the Reply-To.
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL, to: [env.CONTACT_TO_EMAIL], reply_to: email,
        subject: "New portfolio contact message",
        text: "Name: " + name + "\nEmail: " + email + "\n\n" + message,
      }), signal: AbortSignal.timeout(15_000),
    });
    // Never forward provider responses, which may contain recipient information.
    await delivery.body?.cancel();
    return reply(delivery.ok ? 200 : 503);
  } catch {
    return reply(503);
  }
}
