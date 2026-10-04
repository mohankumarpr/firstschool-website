"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createAdminSession } from "@/lib/admin-auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const hash = process.env.ADMIN_PASSWORD_HASH;

  const valid = hash ? await bcrypt.compare(password, hash) : false;

  if (!valid) {
    redirect("/admin/login?error=1");
  }

  await createAdminSession();
  redirect("/admin");
}
