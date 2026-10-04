import { asc } from "drizzle-orm";
import { db } from "@/db/client";
import { afterSchoolImages } from "@/db/schema";

export async function getAfterSchoolImages(): Promise<string[]> {
  const rows = await db
    .select()
    .from(afterSchoolImages)
    .orderBy(asc(afterSchoolImages.sortOrder));
  return rows.map((r) => r.url);
}
