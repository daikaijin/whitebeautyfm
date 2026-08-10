"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

type AddToCartButtonProps = {
  productId: string;
  label?: string;
};

export function AddToCartButton({
  productId,
  label = "Add to cart",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(productId, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  }

  return (
    <div className="product-action">
      <button type="button" className="wb-btn" onClick={handleAdd}>
        {added ? "Added" : label}
      </button>
    </div>
  );
}
