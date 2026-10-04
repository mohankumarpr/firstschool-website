"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { locations } from "@/db/schema";

function read(formData: FormData) {
  const mapEmbedUrl = String(formData.get("mapEmbedUrl") ?? "").trim();
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    mapEmbedUrl: mapEmbedUrl || null,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createLocation(formData: FormData) {
  await db.insert(locations).values(read(formData));
  redirect("/admin/locations");
}

export async function updateLocation(id: number, formData: FormData) {
  await db.update(locations).set(read(formData)).where(eq(locations.id, id));
  redirect("/admin/locations");
}

export async function deleteLocation(id: number) {
  await db.delete(locations).where(eq(locations.id, id));
  redirect("/admin/locations");
}
