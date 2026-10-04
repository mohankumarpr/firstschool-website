"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { navItems } from "@/db/schema";

function read(formData: FormData) {
  return {
    label: String(formData.get("label") ?? "").trim(),
    href: String(formData.get("href") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createNavItem(formData: FormData) {
  await db.insert(navItems).values(read(formData));
  redirect("/admin/nav");
}

export async function updateNavItem(id: number, formData: FormData) {
  await db.update(navItems).set(read(formData)).where(eq(navItems.id, id));
  redirect("/admin/nav");
}

export async function deleteNavItem(id: number) {
  await db.delete(navItems).where(eq(navItems.id, id));
  redirect("/admin/nav");
}
