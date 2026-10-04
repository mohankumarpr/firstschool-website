import { eq, asc } from "drizzle-orm";
import { db } from "@/db/client";
import { programs } from "@/db/schema";

export interface Program {
  id: number;
  slug: string;
  title: string;
  age: string;
  description: string;
  image: string;
  sortOrder: number;
}

export async function getPrograms(): Promise<Program[]> {
  return db.select().from(programs).orderBy(asc(programs.sortOrder));
}

export async function getProgramBySlug(slug: string): Promise<Program | undefined> {
  const [row] = await db.select().from(programs).where(eq(programs.slug, slug));
  return row;
}

export async function getProgramById(id: number): Promise<Program | undefined> {
  const [row] = await db.select().from(programs).where(eq(programs.id, id));
  return row;
}
