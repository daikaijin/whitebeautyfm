"use client";

import { useState } from "react";

type BuyButtonProps = {
  productId: string;
  label?: string;
  disabled?: boolean;
};

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
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Checkout failed");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
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
