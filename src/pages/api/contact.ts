import type { APIRoute } from "astro";
import { contactInfo } from "../../i18n/content";

export const prerender = false;

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const MAX_FIELD_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse(400, { ok: false, error: "Invalid request body." });
  }

  if (typeof payload !== "object" || payload === null) {
    return jsonResponse(400, { ok: false, error: "Invalid request body." });
  }

  const { name, email, message, company } = payload as Record<string, unknown>;

  // Honeypot: real visitors never fill this hidden field. Pretend success
  // so bots don't learn their submission was rejected.
  if (typeof company === "string" && company.trim() !== "") {
    return jsonResponse(200, { ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return jsonResponse(400, { ok: false, error: "Missing required fields." });
  }

  if (
    name.length > MAX_FIELD_LENGTH ||
    email.length > MAX_FIELD_LENGTH ||
    message.length > MAX_FIELD_LENGTH
  ) {
    return jsonResponse(400, { ok: false, error: "Field too long." });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return jsonResponse(400, { ok: false, error: "Invalid email address." });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return jsonResponse(500, { ok: false, error: "Contact form is not configured." });
  }

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio contact form <onboarding@resend.dev>",
      to: [contactInfo.email],
      reply_to: email,
      subject: `New message from ${name} via sergiojover.dev`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!resendResponse.ok) {
    const errorBody = await resendResponse.text();
    console.error("Resend API error:", resendResponse.status, errorBody);
    return jsonResponse(502, { ok: false, error: "Failed to send message." });
  }

  return jsonResponse(200, { ok: true });
};
