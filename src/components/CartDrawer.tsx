"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { checkoutErrorMessage, startCheckout } from "@/lib/checkout-client";
import {
  formatYen,
  getProduct,
  isPurchasable,
  productImage,
} from "@/lib/products";

export function CartDrawer() {
  const { items, count, open, setOpen, setQuantity, removeItem, clear } =
    useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lines = items
    .map((item) => {
      const product = getProduct(item.productId);
      if (!product || !isPurchasable(product)) return null;
      return { item, product };
    })
    .filter(Boolean) as {
    item: { productId: string; quantity: number };
    product: NonNullable<ReturnType<typeof getProduct>>;
  }[];

  const totalYen = lines.reduce(
    (sum, line) => sum + line.product.priceYen * line.item.quantity,
    0,
  );

  async function checkout() {
    if (!lines.length || loading) return;
    setLoading(true);
    setError(null);
    try {
      const url = await startCheckout(
        lines.map((line) => ({
          productId: line.product.id,
          quantity: line.item.quantity,
        })),
      );
      window.location.assign(url);
    } catch (err) {
      setError(checkoutErrorMessage(err));
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className={`cart-fab${count > 0 ? " has-items" : ""}`}
        onClick={() => setOpen(true)}
        aria-label={`Open cart${count ? `, ${count} items` : ""}`}
      >
        <span>Cart</span>
        {count > 0 ? <span className="cart-fab-count">{count}</span> : null}
      </button>

      <div
        className={`cart-overlay${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        className={`cart-drawer${open ? " is-open" : ""}`}
        aria-hidden={!open}
        aria-label="Cart"
      >
        <header className="cart-drawer-head">
          <h2>Cart</h2>
          <button
            type="button"
            className="cart-close"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
          >
            Close
          </button>
        </header>

        {lines.length === 0 ? (
          <p className="cart-empty">Empty — add merch from the shop.</p>
        ) : (
          <ul className="cart-lines">
            {lines.map(({ item, product }) => (
              <li key={product.id} className="cart-line">
                <div className="cart-thumb">
                  {open ? (
                    <Image
                      src={productImage(product)}
                      alt={product.name}
                      fill
                      sizes="72px"
                      className="object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <div className="cart-line-copy">
                  <div className="cart-line-top">
                    <p className="cart-line-name">{product.name}</p>
                    <p className="cart-line-price">
                      {formatYen(product.priceYen * item.quantity)}
                    </p>
                  </div>
                  {product.status === "pre_order" ? (
                    <p className="cart-line-meta">Pre-order</p>
                  ) : null}
                  <div className="cart-line-actions">
                    <label className="cart-qty">
                      <span className="sr-only">Quantity</span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(product.id, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(product.id, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </label>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => removeItem(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer className="cart-drawer-foot">
          <div className="cart-total">
            <span>Total</span>
            <strong>{formatYen(totalYen)}</strong>
          </div>
          {error ? <p className="cart-error">{error}</p> : null}
          <button
            type="button"
            className="wb-btn"
            disabled={!lines.length || loading}
            onClick={checkout}
          >
            {loading ? "Redirecting…" : "Checkout"}
          </button>
          {lines.length ? (
            <button
              type="button"
              className="cart-clear"
              onClick={clear}
              disabled={loading}
            >
              Clear cart
            </button>
          ) : null}
        </footer>
      </aside>
    </>
  );
}
