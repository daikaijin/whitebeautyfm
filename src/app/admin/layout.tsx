import type { Metadata } from "next";
import { AdminBar } from "@/components/AdminBar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell">
      <AdminBar />
      {children}
    </div>
  );
}
