"use client";

import type { ReactNode } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import { LocaleProvider } from "@/components/LocaleProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </LocaleProvider>
  );
}
