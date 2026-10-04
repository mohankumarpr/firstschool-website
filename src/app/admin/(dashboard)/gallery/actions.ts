"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { galleryItems, galleryImages } from "@/db/schema";

function readItem(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    coverImage: String(formData.get("coverImage") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

function readImages(formData: FormData) {
  return String(formData.get("images") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function createGalleryItem(formData: FormData) {
  const [row] = await db.insert(galleryItems).values(readItem(formData)).returning({ id: galleryItems.id });
  const images = readImages(formData);
  if (images.length) {
    await db.insert(galleryImages).values(
      images.map((url, i) => ({ galleryItemId: row.id, url, sortOrder: i }))
    );
  }
  redirect("/admin/gallery");
}

export async function updateGalleryItem(id: number, formData: FormData) {
  await db.update(galleryItems).set(readItem(formData)).where(eq(galleryItems.id, id));
  await db.delete(galleryImages).where(eq(galleryImages.galleryItemId, id));
  const images = readImages(formData);
  if (images.length) {
    await db.insert(galleryImages).values(
      images.map((url, i) => ({ galleryItemId: id, url, sortOrder: i }))
    );
  }
  redirect("/admin/gallery");
}

export async function deleteGalleryItem(id: number) {
  await db.delete(galleryItems).where(eq(galleryItems.id, id));
  redirect("/admin/gallery");
}
