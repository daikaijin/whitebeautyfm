"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  CART_MAX_QTY,
  cartCount,
  normalizeCart,
  readStoredCart,
  writeStoredCart,
  type CartItem,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeStoredCart(items);
  }, [items, ready]);

  function addItem(productId: string, quantity = 1) {
    setItems((prev) =>
      normalizeCart([
        ...prev,
        { productId, quantity: Math.min(Math.max(quantity, 1), CART_MAX_QTY) },
      ]),
    );
  }

  function setQuantity(productId: string, quantity: number) {
    setItems((prev) =>
      normalizeCart(
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        ),
      ),
    );
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  function clear() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        count: cartCount(items),
        open,
        setOpen,
        addItem,
        setQuantity,
        removeItem,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
