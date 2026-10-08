const RESEND_ENDPOINT = "https://api.resend.com/emails";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

const json = (body: unknown, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const { name, email, message, company } = body;

  // Honeypot: hidden field real visitors never fill. Pretend success for bots.
  if (company) {
    return json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name ||
    !email ||
    !message
  ) {
    return json({ error: "Missing required fields" }, 400);
  }
  if (
    !EMAIL_PATTERN.test(email) ||
    name.length > 200 ||
    email.length > 320 ||
    message.length > 5000
  ) {
    return json({ error: "Invalid submission" }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ error: "Email service not configured" }, 500);
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.CONTACT_FROM || "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || "mrtjslade@gmail.com"],
      reply_to: email,
      subject: "New Portfolio Contact Message!",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("Resend error:", response.status, detail);
    return json({ error: "Failed to send message" }, 502);
  }

  return json({ ok: true });
}

export function GET() {
  return json({ error: "Method not allowed" }, 405);
}
