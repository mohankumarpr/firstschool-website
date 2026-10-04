import { eq, asc } from "drizzle-orm";
import { db } from "@/db/client";
import { pages, locations, type PageSlug } from "@/db/schema";
import type { HomePageData, AboutPageData, ContactPageData } from "@/lib/page-content-types";

async function getPageData<T>(slug: PageSlug): Promise<T> {
  const [row] = await db.select().from(pages).where(eq(pages.slug, slug));
  if (!row) throw new Error(`Page content not found for slug "${slug}"`);
  return row.data as T;
}

export function getHomePageContent(): Promise<HomePageData> {
  return getPageData<HomePageData>("home");
}

export function getAboutPageContent(): Promise<AboutPageData> {
  return getPageData<AboutPageData>("about");
}

export interface ContactPageLocation {
  name: string;
  mapEmbedUrl: string | null;
}

export async function getContactPageContent(): Promise<
  ContactPageData & { locations: ContactPageLocation[] }
> {
  const [base, locationRows] = await Promise.all([
    getPageData<ContactPageData>("contact"),
    db.select().from(locations).orderBy(asc(locations.sortOrder)),
  ]);

  return {
    ...base,
    locations: locationRows.map((l) => ({
      name: l.name.toUpperCase(),
      mapEmbedUrl: l.mapEmbedUrl,
    })),
  };
}
