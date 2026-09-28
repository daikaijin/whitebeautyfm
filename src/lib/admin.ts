import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { adminAuthConfigured, auth, isAllowedAdminEmail } from "@/auth";

export const requireAdmin = cache(async () => {
  if (!adminAuthConfigured()) {
    console.error("admin auth is not configured");
    redirect("/admin/login");
  }

  let email: string | null | undefined;
  try {
    const session = await auth();
    email = session?.user?.email;
  } catch {
    console.error("admin session unavailable");
    email = null;
  }

  if (!email || !isAllowedAdminEmail(email)) {
    redirect("/admin/login");
  }

  return { email: email.trim().toLowerCase() };
});
