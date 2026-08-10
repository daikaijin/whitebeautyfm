"use client";

import { useEffect } from "react";
import { writeStoredCart } from "@/lib/cart";
import { useCart } from "@/components/CartProvider";

export function ClearCartOnSuccess() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    writeStoredCart([]);
  }, []);

  return null;
}
