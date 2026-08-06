const RESEND_ENDPOINT = "https://api.resend.com/emails";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, company } = req.body || {};

  // Honeypot: hidden field real visitors never fill. Pretend success for bots.
  if (company) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (
    !EMAIL_PATTERN.test(email) ||
    name.length > 200 ||
    email.length > 320 ||
    message.length > 5000
  ) {
    return res.status(400).json({ error: "Invalid submission" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || "mrtjslade@gmail.com"],
      reply_to: email,
      subject: "New Portfolio Contact Message!",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("Resend error:", response.status, detail);
    return res.status(502).json({ error: "Failed to send message" });
  }

  return res.status(200).json({ ok: true });
}
