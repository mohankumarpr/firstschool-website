import { NextResponse } from "next/server";
import { z } from "zod";
import { sendFormEmail } from "@/lib/mailer";
import { createAdmissionEnquiry } from "@/lib/queries/enquiries";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";
import { escapeHtml } from "@/lib/html-escape";

const schema = z.object({
  parentName: z.string().min(1).max(100),
  contactNo: z.string().min(1).max(20),
  email: z.string().email().max(200),
  childName: z.string().min(1).max(100),
  program: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
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

  const { parentName, contactNo, email, childName, program, location, company } = parsed.data;

  if (company) {
    // Honeypot tripped — pretend success so the bot doesn't learn to avoid this field.
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(request);
  const allowed = await checkRateLimit(`admission-form:${ip}`, 5, 15);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later or call/WhatsApp us instead." },
      { status: 429 }
    );
  }

  try {
    await createAdmissionEnquiry({ parentName, contactNo, email, childName, program, location });
  } catch (err) {
    console.error("[admission-form] failed to save enquiry:", err);
    return NextResponse.json(
      { error: "We couldn't save your enquiry right now. Please call or WhatsApp us instead." },
      { status: 502 }
    );
  }

  try {
    await sendFormEmail({
      subject: `Admission for ${program} ${location}`,
      replyTo: email,
      html: `
        <p><strong>Parent Name:</strong> ${escapeHtml(parentName)}</p>
        <p><strong>Contact No:</strong> ${escapeHtml(contactNo)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Child Name:</strong> ${escapeHtml(childName)}</p>
        <p><strong>Program:</strong> ${escapeHtml(program)}</p>
        <p><strong>Location:</strong> ${escapeHtml(location)}</p>
      `,
    });
  } catch (err) {
    // The enquiry is already saved and visible in /admin/enquiries, so a failed
    // notification email is not fatal to the submission.
    console.error("[admission-form] failed to send notification email:", err);
  }

  return NextResponse.json({ ok: true });
}
