"use server";

import { redirect } from "next/navigation";
import { db } from "@/db/client";
import { afterSchoolImages } from "@/db/schema";

export async function updateAfterSchoolImages(formData: FormData) {
  const urls = String(formData.get("images") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  await db.delete(afterSchoolImages);
  if (urls.length) {
    await db.insert(afterSchoolImages).values(urls.map((url, i) => ({ url, sortOrder: i })));
  }

  redirect("/admin/after-school");
}
