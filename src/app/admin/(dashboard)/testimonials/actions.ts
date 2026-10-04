"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { testimonials } from "@/db/schema";

function read(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createTestimonial(formData: FormData) {
  await db.insert(testimonials).values(read(formData));
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: number, formData: FormData) {
  await db.update(testimonials).set(read(formData)).where(eq(testimonials.id, id));
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: number) {
  await db.delete(testimonials).where(eq(testimonials.id, id));
  redirect("/admin/testimonials");
}
