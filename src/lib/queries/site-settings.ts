import { asc } from "drizzle-orm";
import { db } from "@/db/client";
import { siteSettings, locations } from "@/db/schema";

export interface SiteConfig {
  name: string;
  tagline: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  whatsappHref: string;
  email: string;
  businessHours: string;
  locations: string[];
  social: { facebook: string; youtube: string; instagram: string; twitter: string };
  footerCredit: { text: string; href: string };
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const [[settings], locationRows] = await Promise.all([
    db.select().from(siteSettings),
    db.select().from(locations).orderBy(asc(locations.sortOrder)),
  ]);

  return {
    name: settings.name,
    tagline: settings.tagline,
    phoneDisplay: settings.phoneDisplay,
    phoneHref: settings.phoneHref,
    whatsappNumber: settings.whatsappNumber,
    whatsappHref: settings.whatsappHref,
    email: settings.email,
    businessHours: settings.businessHours,
    locations: locationRows.map((l) => l.name),
    social: settings.social,
    footerCredit: { text: settings.footerCreditText, href: settings.footerCreditHref },
  };
}
