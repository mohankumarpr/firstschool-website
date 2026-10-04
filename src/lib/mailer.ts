import { Resend } from "resend";
import { getSiteConfig } from "@/lib/queries/site-settings";

let resendClient: Resend | null = null;

function getResendClient() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

export async function sendFormEmail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo: string;
}) {
  const resend = getResendClient();

  if (!resend) {
    // No email provider configured yet — log so the submission isn't silently lost during local dev,
    // and surface a clear error so the caller knows mail was NOT actually sent.
    console.warn(
      "[mailer] RESEND_API_KEY is not set — form submission was not emailed. Subject:",
      subject
    );
    throw new Error("Email sending is not configured yet.");
  }

  const { email } = await getSiteConfig();

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "First School Website <onboarding@resend.dev>",
    to: email,
    replyTo,
    subject,
    html,
  });
}
