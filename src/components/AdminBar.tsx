import Link from "next/link";
import { auth, isAllowedAdminEmail, signOut } from "@/auth";

export async function AdminBar() {
  let email = "";
  try {
    const session = await auth();
    if (isAllowedAdminEmail(session?.user?.email)) {
      email = session?.user?.email?.trim().toLowerCase() ?? "";
    }
  } catch {
    console.error("admin session unavailable");
  }

  if (!email) return null;

  return (
    <header className="admin-bar">
      <Link href="/admin/orders">Orders</Link>
      <p>{email}</p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/admin/login" });
        }}
      >
        <button className="wb-btn wb-btn-ghost" type="submit">
          Sign out
        </button>
      </form>
    </header>
  );
}
