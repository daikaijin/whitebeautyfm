"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useLocale } from "@/components/LocaleProvider";
import { checkoutErrorMessage, startCheckout } from "@/lib/checkout-client";
import { getProductCopy } from "@/lib/i18n";
import {
  formatYen,
  getProduct,
  isPurchasable,
  productImage,
} from "@/lib/products";

export function CartDrawer() {
  const { items, count, open, setOpen, setQuantity, removeItem, clear } =
    useCart();
  const { locale, t } = useLocale();
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
        aria-label={`${t.openCart}${count ? `, ${count}` : ""}`}
      >
        <span>{t.cart}</span>
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
        aria-label={t.cart}
      >
        <header className="cart-drawer-head">
          <h2>{t.cart}</h2>
          <button
            type="button"
            className="cart-close"
            onClick={() => setOpen(false)}
            aria-label={t.close}
          >
            {t.close}
          </button>
        </header>

        {lines.length === 0 ? (
          <p className="cart-empty">{t.cartEmpty}</p>
        ) : (
          <ul className="cart-lines">
            {lines.map(({ item, product }) => {
              const copy = getProductCopy(
                product.id,
                locale,
                product.name,
                product.description,
              );
              return (
                <li key={product.id} className="cart-line">
                  <div className="cart-thumb">
                    {open ? (
                      <Image
                        src={productImage(product)}
                        alt={copy.name}
                        fill
                        sizes="72px"
                        className="object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="cart-line-copy">
                    <div className="cart-line-top">
                      <p className="cart-line-name">{copy.name}</p>
                      <p className="cart-line-price">
                        {formatYen(product.priceYen * item.quantity)}
                      </p>
                    </div>
                    {product.status === "pre_order" ? (
                      <p className="cart-line-meta">{t.preOrder}</p>
                    ) : null}
                    <div className="cart-line-actions">
                      <label className="cart-qty">
                        <span className="sr-only">{t.quantity}</span>
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
                        {t.remove}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <footer className="cart-drawer-foot">
          <div className="cart-total">
            <span>{t.total}</span>
            <strong>{formatYen(totalYen)}</strong>
          </div>
          {error ? <p className="cart-error">{error}</p> : null}
          <button
            type="button"
            className="wb-btn"
            disabled={!lines.length || loading}
            onClick={checkout}
          >
            {loading ? t.redirecting : t.checkout}
          </button>
          {lines.length ? (
            <button
              type="button"
              className="cart-clear"
              onClick={clear}
              disabled={loading}
            >
              {t.clearCart}
            </button>
          ) : null}
        </footer>
      </aside>
    </>
  );
}
