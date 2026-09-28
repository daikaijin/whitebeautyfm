import { adminAuthConfigured, auth, isAllowedAdminEmail, signIn } from "@/auth";
import { redirect } from "next/navigation";

function loginMessage(error: string | undefined) {
  if (error === "AccessDenied") return "This Google account cannot view orders.";
  if (error === "Configuration") return "Sign-in is not configured.";
  if (error) return "Sign-in failed.";
  return null;
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const configured = adminAuthConfigured();
  if (configured) {
    try {
      const session = await auth();
      if (isAllowedAdminEmail(session?.user?.email)) {
        redirect("/admin/orders");
      }
    } catch {
      console.error("admin session unavailable");
    }
  }

  const params = await searchParams;
  const message = configured
    ? loginMessage(params.error)
    : "Sign-in is not configured.";

  return (
    <main className="admin-card">
      <p className="section-kicker">Beach Patrol</p>
      <h1>Orders</h1>
      <p>Sign in with the Google account allowed to view orders.</p>
      {message ? (
        <p className="admin-error" role="alert">
          {message}
        </p>
      ) : null}
      {configured ? (
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/admin/orders" });
          }}
        >
          <button className="wb-btn" type="submit">
            Continue with Google
          </button>
        </form>
      ) : null}
    </main>
  );
}
