"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createAdminSession } from "@/lib/admin-auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIpFromRequestHeaders } from "@/lib/request-ip";

export async function login(formData: FormData) {
  const ip = await getClientIpFromRequestHeaders();

  // Checked before bcrypt runs — bcrypt is deliberately CPU-expensive, so without
  // this a scripted brute-force could load up the server even though every guess
  // fails. 10 attempts per 15 minutes per IP is plenty for a real admin who mistypes.
  const allowed = await checkRateLimit(`admin-login:${ip}`, 10, 15);
  if (!allowed) {
    redirect("/admin/login?error=rate_limit");
  }

  const password = String(formData.get("password") ?? "");
  const hash = process.env.ADMIN_PASSWORD_HASH;

  const valid = hash ? await bcrypt.compare(password, hash) : false;

  if (!valid) {
    redirect("/admin/login?error=1");
  }

  await createAdminSession();
  redirect("/admin");
}
