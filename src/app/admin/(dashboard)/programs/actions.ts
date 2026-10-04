"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { programs } from "@/db/schema";

function readProgram(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    age: String(formData.get("age") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createProgram(formData: FormData) {
  await db.insert(programs).values(readProgram(formData));
  redirect("/admin/programs");
}

export async function updateProgram(id: number, formData: FormData) {
  await db.update(programs).set(readProgram(formData)).where(eq(programs.id, id));
  redirect("/admin/programs");
}

export async function deleteProgram(id: number) {
  await db.delete(programs).where(eq(programs.id, id));
  redirect("/admin/programs");
}
