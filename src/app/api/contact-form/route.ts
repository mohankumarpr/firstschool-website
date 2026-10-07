import { NextResponse } from "next/server";
import { z } from "zod";
import { sendFormEmail } from "@/lib/mailer";
import { createContactEnquiry } from "@/lib/queries/enquiries";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";
import { escapeHtml } from "@/lib/html-escape";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  mobile: z.string().min(1).max(20),
  subject: z.string().max(150).optional().default(""),
  message: z.string().max(2000).optional().default(""),
  // Honeypot: real users never see or fill this field (hidden via CSS). Bots that
  // auto-fill every input tend to fill it, so a non-empty value marks spam.
  company: z.string().max(200).optional().default(""),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill in all required fields correctly." }, { status: 400 });
  }

  const { name, email, mobile, subject, message, company } = parsed.data;

  if (company) {
    // Honeypot tripped — pretend success so the bot doesn't learn to avoid this field.
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(request);
  const allowed = await checkRateLimit(`contact-form:${ip}`, 5, 15);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later or call/WhatsApp us instead." },
      { status: 429 }
    );
  }

  try {
    await createContactEnquiry({ name, email, mobile, subject, message });
  } catch (err) {
    console.error("[contact-form] failed to save enquiry:", err);
    return NextResponse.json(
      { error: "We couldn't save your message right now. Please call or WhatsApp us instead." },
      { status: 502 }
    );
  }

  try {
    await sendFormEmail({
      subject: `Enquiry for ${subject}`,
      replyTo: email,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)}</p>
        <p><strong>Mobile:</strong> ${escapeHtml(mobile)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong> ${escapeHtml(message)}</p>
      `,
    });
  } catch (err) {
    console.error("[contact-form] failed to send notification email:", err);
  }

  return NextResponse.json({ ok: true });
}
