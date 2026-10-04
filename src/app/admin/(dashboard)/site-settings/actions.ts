"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { siteSettings } from "@/db/schema";

export async function updateSiteSettings(formData: FormData) {
  const field = (name: string) => String(formData.get(name) ?? "").trim();

  await db
    .update(siteSettings)
    .set({
      name: field("name"),
      tagline: field("tagline"),
      phoneDisplay: field("phoneDisplay"),
      phoneHref: field("phoneHref"),
      whatsappNumber: field("whatsappNumber"),
      whatsappHref: field("whatsappHref"),
      email: field("email"),
      businessHours: field("businessHours"),
      footerCreditText: field("footerCreditText"),
      footerCreditHref: field("footerCreditHref"),
      social: {
        facebook: field("facebook"),
        youtube: field("youtube"),
        instagram: field("instagram"),
        twitter: field("twitter"),
      },
    })
    .where(eq(siteSettings.id, 1));

  redirect("/admin/site-settings");
}
