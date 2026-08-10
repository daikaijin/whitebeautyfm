"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useLocale } from "@/components/LocaleProvider";

type AddToCartButtonProps = {
  productId: string;
  label?: string;
};

export function AddToCartButton({ productId, label }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { t } = useLocale();
  const [added, setAdded] = useState(false);
  const buttonLabel = label ?? t.addToCart;

  function handleAdd() {
    addItem(productId, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  }

  return (
    <div className="product-action">
      <button type="button" className="wb-btn" onClick={handleAdd}>
        {added ? t.added : buttonLabel}
      </button>
    </div>
  );
}
