import { asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { locations } from "@/db/schema";

export interface Location {
  id: number;
  slug: string;
  name: string;
  mapEmbedUrl: string | null;
  sortOrder: number;
}

export async function getLocations(): Promise<Location[]> {
  return db.select().from(locations).orderBy(asc(locations.sortOrder));
}

export async function getLocationById(id: number): Promise<Location | undefined> {
  const [row] = await db.select().from(locations).where(eq(locations.id, id));
  return row;
}
