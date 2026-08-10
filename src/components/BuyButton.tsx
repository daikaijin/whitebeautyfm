"use client";

import { useState } from "react";

type BuyButtonProps = {
  productId: string;
  label?: string;
  disabled?: boolean;
};

function checkoutUrl() {
  if (typeof window === "undefined") return "/api/checkout";
  const host = window.location.hostname;
  // Avoid apex→www POST redirect failures in some browsers.
  if (host === "whitebeautyfm.com" || host === "www.whitebeautyfm.com") {
    return "https://www.whitebeautyfm.com/api/checkout";
  }
  return "/api/checkout";
}

export function BuyButton({
  productId,
  label = "Buy",
  disabled = false,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    if (disabled || loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(checkoutUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
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

      window.location.assign(data.url);
    } catch (err) {
      const message =
        err instanceof TypeError
          ? "Network error — try www.whitebeautyfm.com or disable blockers"
          : err instanceof Error
            ? err.message
            : "Checkout failed";
      setError(message);
      setLoading(false);
    }
  }

  return (
    <div className="product-action">
      <button
        type="button"
        onClick={handleBuy}
        disabled={disabled || loading}
        className="wb-btn"
      >
        {loading ? "Redirecting…" : label}
      </button>
      {error ? <p className="text-sm text-[var(--wb-pink)]">{error}</p> : null}
    </div>
  );
}
