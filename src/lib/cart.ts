export type CartItem = {
  productId: string;
  quantity: number;
};

export const CART_STORAGE_KEY = "wb-cart-v1";
export const CART_MAX_LINES = 12;
export const CART_MAX_QTY = 10;

export function normalizeCart(items: CartItem[]): CartItem[] {
  const map = new Map<string, number>();
  for (const item of items) {
    if (!item?.productId) continue;
    const qty = Math.min(
      Math.max(Number(item.quantity) || 0, 0),
      CART_MAX_QTY,
    );
    if (qty < 1) continue;
    map.set(item.productId, Math.min((map.get(item.productId) ?? 0) + qty, CART_MAX_QTY));
  }
  return [...map.entries()]
    .slice(0, CART_MAX_LINES)
    .map(([productId, quantity]) => ({ productId, quantity }));
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return normalizeCart(Array.isArray(parsed) ? parsed : []);
  } catch {
    return [];
  }
}

export function writeStoredCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizeCart(items)));
}
