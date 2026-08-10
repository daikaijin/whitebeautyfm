export type Product = {
  id: string;
  name: string;
  description: string;
  priceYen: number;
  /** Gallery frames — every product is multi-image; first is the cover. */
  images: string[];
  category: "tee" | "longsleeve" | "pin" | "patch" | "sticker";
  status: "available" | "pre_order" | "sold_out";
};

export function isPurchasable(product: Product) {
  return product.status === "available" || product.status === "pre_order";
}

export function productImages(product: Product) {
  return product.images.filter(Boolean);
}

export function productImage(product: Product) {
  return productImages(product)[0] ?? "";
}

/** Prices in JPY (zero-decimal for Stripe). Update anytime. */
export const products: Product[] = [
  {
    id: "character-tee",
    name: "Character Tee",
    description: "Black dry-fit poly. Cracked-lens character hit.",
    priceYen: 6500,
    images: [
      "/merch/character-tee-beach.webp",
      "/merch/character-shirt.webp",
    ],
    category: "tee",
    status: "sold_out",
  },
  {
    id: "power-glory-tee",
    name: "Digital Beach Tee",
    description:
      "Black dry-fit poly. Real drop — horizontal WB front, Let’s Retreat back at the shoulder blades.",
    priceYen: 6500,
    images: [
      "/merch/retreat-tee-front-real.webp",
      "/merch/retreat-tee-back-real.webp",
      "/merch/retreat-back-artwork.webp",
    ],
    category: "tee",
    status: "sold_out",
  },
  {
    id: "tough-cookies-ls",
    name: "Tough Cookies Long Sleeve",
    description: "Black dry-fit poly long sleeve. Pre-order — ships when the drop lands.",
    priceYen: 12000,
    images: [
      "/merch/tough-cookies-ls-beach.webp",
      "/merch/tough-cookies-artwork.webp",
    ],
    category: "longsleeve",
    status: "pre_order",
  },
  {
    id: "sticker-portrait",
    name: "Portrait Sticker",
    description: "Field portrait + pink script. Pre-order — ships when the drop lands.",
    priceYen: 1000,
    images: [
      "/merch/sticker-portrait-beach.webp",
      "/merch/sticker-portrait-artwork.webp",
    ],
    category: "sticker",
    status: "pre_order",
  },
  {
    id: "pin-colorbars",
    name: "Color Bars Pin",
    description: "Hard enamel. Pink over green. Soft flex.",
    priceYen: 1500,
    images: [
      "/merch/pin-colorbars-beach.webp",
      "/merch/pin-colorbars.webp",
    ],
    category: "pin",
    status: "available",
  },
  {
    id: "patch-script",
    name: "Script Patch",
    description: "PVC + velcro backing. Removable, or stitch it direct.",
    priceYen: 2000,
    images: [
      "/merch/patch-script-beach.webp",
      "/merch/patch-script.webp",
    ],
    category: "patch",
    status: "available",
  },
  {
    id: "sticker-script",
    name: "Die-Cut Script Sticker",
    description: "Pink White Beauty script. Peel and claim.",
    priceYen: 800,
    images: [
      "/merch/sticker-script-beach.webp",
      "/merch/sticker-script.webp",
    ],
    category: "sticker",
    status: "available",
  },
  {
    id: "sticker-logo",
    name: "Logo Sticker",
    description: "Black plate. Neon script. Stack ready.",
    priceYen: 800,
    images: [
      "/merch/sticker-logo-beach.webp",
      "/merch/sticker-logo.webp",
    ],
    category: "sticker",
    status: "available",
  },
  {
    id: "sticker-cut-rite",
    name: "Cut Rite Sticker",
    description: "Cracked-ice holo + WB/QR side. Scan the signal.",
    priceYen: 1000,
    images: [
      "/merch/sticker-cutrite-beach.webp",
      "/merch/sticker-holo-set.webp",
      "/merch/sticker-wb-qr.webp",
    ],
    category: "sticker",
    status: "available",
  },
  {
    id: "sticker-halloween",
    name: "Make Halloween Scary Again",
    description: "Double-sided drop. Bring the night back.",
    priceYen: 1000,
    images: [
      "/merch/sticker-halloween-beach.webp",
      "/merch/sticker-halloween.webp",
    ],
    category: "sticker",
    status: "available",
  },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function formatYen(amount: number) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(amount);
}
