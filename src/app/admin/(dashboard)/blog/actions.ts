"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { blogPosts } from "@/db/schema";

function read(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    bodyHtml: String(formData.get("bodyHtml") ?? "").trim(),
    publishedDate: String(formData.get("publishedDate") ?? "").trim(),
  };
}

export async function createBlogPost(formData: FormData) {
  await db.insert(blogPosts).values(read(formData));
  redirect("/admin/blog");
}

export async function updateBlogPost(id: number, formData: FormData) {
  await db.update(blogPosts).set(read(formData)).where(eq(blogPosts.id, id));
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: number) {
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  redirect("/admin/blog");
}
