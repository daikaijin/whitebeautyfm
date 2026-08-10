import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductGallery } from "@/components/ProductGallery";
import {
  formatYen,
  isPurchasable,
  productImages,
  type Product,
} from "@/lib/products";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
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
        priority={priority}
      />
      <div className="product-copy">
        <div className="flex items-baseline justify-between gap-3">
          <h3>{product.name}</h3>
          <p className="price">{formatYen(product.priceYen)}</p>
        </div>
        <p className="desc">{product.description}</p>
        {isPurchasable(product) ? (
          <AddToCartButton
            productId={product.id}
            label={preOrder ? "Add pre-order" : "Add to cart"}
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
