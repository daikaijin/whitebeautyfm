import { BuyButton } from "@/components/BuyButton";
import { ProductGallery } from "@/components/ProductGallery";
import { formatYen, productImages, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.status === "sold_out";
  const images = productImages(product);

  return (
    <article className="product-tile group">
      <ProductGallery
        name={product.name}
        images={images}
        realImageIndex={product.realImageIndex}
        soldOut={soldOut}
      />
      <div className="product-copy">
        <div className="flex items-baseline justify-between gap-3">
          <h3>{product.name}</h3>
          <p className="price">{formatYen(product.priceYen)}</p>
        </div>
        <p className="desc">{product.description}</p>
        {soldOut ? (
          <button type="button" className="wb-btn wb-btn-ghost" disabled>
            Sold Out
          </button>
        ) : (
          <BuyButton productId={product.id} label="Order" />
        )}
      </div>
    </article>
  );
}
