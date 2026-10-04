"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { curriculumItems, curriculumPoints } from "@/db/schema";

function readItem(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

function readPoints(formData: FormData) {
  return String(formData.get("points") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function createCurriculumItem(formData: FormData) {
  const [row] = await db.insert(curriculumItems).values(readItem(formData)).returning({ id: curriculumItems.id });
  const points = readPoints(formData);
  if (points.length) {
    await db.insert(curriculumPoints).values(
      points.map((point, i) => ({ curriculumItemId: row.id, point, sortOrder: i }))
    );
  }
  redirect("/admin/curriculum");
}

export async function updateCurriculumItem(id: number, formData: FormData) {
  await db.update(curriculumItems).set(readItem(formData)).where(eq(curriculumItems.id, id));
  await db.delete(curriculumPoints).where(eq(curriculumPoints.curriculumItemId, id));
  const points = readPoints(formData);
  if (points.length) {
    await db.insert(curriculumPoints).values(
      points.map((point, i) => ({ curriculumItemId: id, point, sortOrder: i }))
    );
  }
  redirect("/admin/curriculum");
}

export async function deleteCurriculumItem(id: number) {
  await db.delete(curriculumItems).where(eq(curriculumItems.id, id));
  redirect("/admin/curriculum");
}
