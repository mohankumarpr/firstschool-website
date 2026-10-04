import { NextResponse } from "next/server";
import { z } from "zod";
import { sendFormEmail } from "@/lib/mailer";
import { createAdmissionEnquiry } from "@/lib/queries/enquiries";

const schema = z.object({
  parentName: z.string().min(1),
  contactNo: z.string().min(1),
  email: z.string().email(),
  childName: z.string().min(1),
  program: z.string().min(1),
  location: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill in all required fields correctly." }, { status: 400 });
  }

  const { parentName, contactNo, email, childName, program, location } = parsed.data;

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
        <p><strong>Parent Name:</strong> ${parentName}</p>
        <p><strong>Contact No:</strong> ${contactNo}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Child Name:</strong> ${childName}</p>
        <p><strong>Program:</strong> ${program}</p>
        <p><strong>Location:</strong> ${location}</p>
      `,
    });
  } catch (err) {
    // The enquiry is already saved and visible in /admin/enquiries, so a failed
    // notification email is not fatal to the submission.
    console.error("[admission-form] failed to send notification email:", err);
  }

  return NextResponse.json({ ok: true });
}
