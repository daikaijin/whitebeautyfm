export type Product = {
  id: string;
  name: string;
  description: string;
  priceYen: number;
  /** Gallery frames — every product is multi-image; first is the cover. */
  images: string[];
  category: "tee" | "pin" | "patch" | "sticker";
  status: "available" | "sold_out";
};

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
    description: "Black tee. White Beauty character hit.",
    priceYen: 6500,
    images: ["/merch/character-shirt.png"],
    category: "tee",
    status: "sold_out",
  },
  {
    id: "power-glory-tee",
    name: "Power & Glory Tee",
    description: "Drop one. Gone for now.",
    priceYen: 6500,
    images: ["/merch/character-shirt.png"],
    category: "tee",
    status: "sold_out",
  },
  {
    id: "pin-colorbars",
    name: "Color Bars Pin",
    description: "Hard enamel. Pink over green. Soft flex.",
    priceYen: 1500,
    images: [
      "/merch/pin-colorbars-beach.png",
      "/merch/pin-colorbars.jpg",
    ],
    category: "pin",
    status: "available",
  },
  {
    id: "patch-script",
    name: "Script Patch",
    description:
      "PVC script hit. Velcro front with velcro backing — removable, or stitch it direct.",
    priceYen: 2000,
    images: [
      "/merch/patch-script-beach.png",
      "/merch/patch-script.jpg",
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
      "/merch/sticker-script-beach.png",
      "/merch/sticker-script.jpg",
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
      "/merch/sticker-logo-beach.png",
      "/merch/sticker-logo.jpg",
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
      "/merch/sticker-cutrite-beach.png",
      "/merch/sticker-holo-set.jpg",
      "/merch/sticker-wb-qr.jpg",
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
      "/merch/sticker-halloween-beach.png",
      "/merch/sticker-halloween.jpg",
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
