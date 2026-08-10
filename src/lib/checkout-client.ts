import type { CartItem } from "@/lib/cart";

export function checkoutEndpoint() {
  if (typeof window === "undefined") return "/api/checkout";
  const host = window.location.hostname;
  if (host === "whitebeautyfm.com" || host === "www.whitebeautyfm.com") {
    return "https://www.whitebeautyfm.com/api/checkout";
  }
  return "/api/checkout";
}

export async function startCheckout(items: CartItem[]) {
  const response = await fetch(checkoutEndpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
    credentials: "omit",
  });

  let data: { url?: string; error?: string } = {};
  try {
    data = (await response.json()) as { url?: string; error?: string };
  } catch {
    throw new Error("Checkout response was invalid");
  }

  if (!response.ok || !data.url) {
    throw new Error(data.error || "Checkout failed");
  }

  return data.url;
}

export function checkoutErrorMessage(err: unknown) {
  if (err instanceof TypeError) {
    return "Network error — try www.whitebeautyfm.com or disable blockers";
  }
  if (err instanceof Error) return err.message;
  return "Checkout failed";
}
