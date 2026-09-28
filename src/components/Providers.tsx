"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import { LocaleProvider } from "@/components/LocaleProvider";

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const admin = pathname.startsWith("/admin");

  return (
    <LocaleProvider>
      <CartProvider>
        {children}
        {admin ? null : <CartDrawer />}
      </CartProvider>
    </LocaleProvider>
  );
}
