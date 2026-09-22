"use client";

import { AddToCartButton } from "@/components/AddToCartButton";
import { useLocale } from "@/components/LocaleProvider";
import { ProductGallery } from "@/components/ProductGallery";
import { getProductCopy } from "@/lib/i18n";
import {
  formatYen,
  isPurchasable,
  productImages,
  productPriceYen,
  type Product,
} from "@/lib/products";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { locale, t } = useLocale();
  const copy = getProductCopy(
    product.id,
    locale,
    product.name,
    product.description,
  );
  const soldOut = product.status === "sold_out";
  const preOrder = product.status === "pre_order";
  const images = productImages(product);
  const priceYen = productPriceYen(product);
  const isFree = priceYen === 0;

  return (
    <article className="product-tile group" id={`product-${product.id}`}>
      <ProductGallery
        name={copy.name}
        images={images}
        soldOut={soldOut}
        badge={
          isFree
            ? t.free
            : preOrder
              ? t.preOrder
              : soldOut
                ? t.soldOut
                : undefined
        }
        priority={priority}
      />
      <div className="product-copy">
        <div className="flex items-baseline justify-between gap-3">
          <h3>{copy.name}</h3>
          <p className="price">{isFree ? t.free : formatYen(priceYen)}</p>
        </div>
        {isFree ? <p className="spec">{t.freeThroughOct10}</p> : null}
        {isFree ? <p className="spec">{t.onePerCustomer}</p> : null}
        {copy.spec ? <p className="spec">{copy.spec}</p> : null}
        <p className="desc">{copy.description}</p>
        {isPurchasable(product) ? (
          <AddToCartButton
            productId={product.id}
            label={preOrder ? t.addPreOrder : t.addToCart}
          />
        ) : (
          <div className="product-action">
            <button type="button" className="wb-btn wb-btn-ghost" disabled>
              {t.soldOut}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
