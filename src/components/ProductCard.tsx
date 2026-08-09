import { BuyButton } from "@/components/BuyButton";
import { ProductGallery } from "@/components/ProductGallery";
import {
  formatYen,
  isPurchasable,
  productImages,
  type Product,
} from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.status === "sold_out";
  const preOrder = product.status === "pre_order";
  const images = productImages(product);

  return (
    <article className="product-tile group" id={`product-${product.id}`}>
      <ProductGallery
        name={product.name}
        images={images}
        soldOut={soldOut}
        badge={preOrder ? "Pre-Order" : soldOut ? "Sold Out" : undefined}
      />
      <div className="product-copy">
        <div className="flex items-baseline justify-between gap-3">
          <h3>{product.name}</h3>
          <p className="price">{formatYen(product.priceYen)}</p>
        </div>
        <p className="desc">{product.description}</p>
        {isPurchasable(product) ? (
          <BuyButton
            productId={product.id}
            label={preOrder ? "Pre-Order" : "Order"}
          />
        ) : (
          <button type="button" className="wb-btn wb-btn-ghost" disabled>
            Sold Out
          </button>
        )}
      </div>
    </article>
  );
}
