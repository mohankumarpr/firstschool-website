import { NextResponse } from "next/server";
import { z } from "zod";
import { sendFormEmail } from "@/lib/mailer";
import { createContactEnquiry } from "@/lib/queries/enquiries";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  mobile: z.string().min(1),
  subject: z.string().optional().default(""),
  message: z.string().optional().default(""),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill in all required fields correctly." }, { status: 400 });
  }

  const { name, email, mobile, subject, message } = parsed.data;

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
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
  } catch (err) {
    console.error("[contact-form] failed to send notification email:", err);
  }

  return NextResponse.json({ ok: true });
}
