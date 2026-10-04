import { asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { galleryItems, galleryImages } from "@/db/schema";

export interface GalleryItem {
  slug: string;
  title: string;
  coverImage: string;
  images: string[];
}

export interface AdminGalleryItem {
  id: number;
  slug: string;
  title: string;
  coverImage: string;
  sortOrder: number;
  images: string[];
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const items = await getGalleryAdmin();
  return items.map(({ slug, title, coverImage, images }) => ({ slug, title, coverImage, images }));
}

export async function getGalleryAdmin(): Promise<AdminGalleryItem[]> {
  const [items, images] = await Promise.all([
    db.select().from(galleryItems).orderBy(asc(galleryItems.sortOrder)),
    db.select().from(galleryImages).orderBy(asc(galleryImages.sortOrder)),
  ]);

  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    coverImage: item.coverImage,
    sortOrder: item.sortOrder,
    images: images.filter((img) => img.galleryItemId === item.id).map((img) => img.url),
  }));
}

export async function getGalleryItemBySlug(slug: string): Promise<GalleryItem | undefined> {
  const items = await getGalleryItems();
  return items.find((item) => item.slug === slug);
}

export async function getGalleryItemById(id: number): Promise<AdminGalleryItem | undefined> {
  const [item] = await db.select().from(galleryItems).where(eq(galleryItems.id, id));
  if (!item) return undefined;

  const images = await db
    .select()
    .from(galleryImages)
    .where(eq(galleryImages.galleryItemId, id))
    .orderBy(asc(galleryImages.sortOrder));

  return { ...item, images: images.map((img) => img.url) };
}
