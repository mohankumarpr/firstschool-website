import { asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { curriculumItems, curriculumPoints } from "@/db/schema";

export interface CurriculumItem {
  slug: string;
  title: string;
  points: string[];
  image: string;
}

export interface AdminCurriculumItem {
  id: number;
  slug: string;
  title: string;
  image: string;
  sortOrder: number;
  points: string[];
}

export async function getCurriculum(): Promise<CurriculumItem[]> {
  const items = await getCurriculumAdmin();
  return items.map(({ slug, title, image, points }) => ({ slug, title, image, points }));
}

export async function getCurriculumAdmin(): Promise<AdminCurriculumItem[]> {
  const [items, points] = await Promise.all([
    db.select().from(curriculumItems).orderBy(asc(curriculumItems.sortOrder)),
    db.select().from(curriculumPoints).orderBy(asc(curriculumPoints.sortOrder)),
  ]);

  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    image: item.image,
    sortOrder: item.sortOrder,
    points: points.filter((p) => p.curriculumItemId === item.id).map((p) => p.point),
  }));
}

export async function getCurriculumItemById(id: number): Promise<AdminCurriculumItem | undefined> {
  const [item] = await db.select().from(curriculumItems).where(eq(curriculumItems.id, id));
  if (!item) return undefined;

  const points = await db
    .select()
    .from(curriculumPoints)
    .where(eq(curriculumPoints.curriculumItemId, id))
    .orderBy(asc(curriculumPoints.sortOrder));

  return { ...item, points: points.map((p) => p.point) };
}
