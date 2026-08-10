import type { Metadata } from "next";
import Link from "next/link";
import { ClearCartOnSuccess } from "@/components/ClearCartOnSuccess";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <main className="success-panel">
      <ClearCartOnSuccess />
      <div>
        <p className="section-kicker">Order locked</p>
        <h1>You&apos;re in</h1>
        <p>
          Payment received. We&apos;ll pack it and ship to the address you gave
          Stripe. Keep an eye on your email.
        </p>
        <Link className="wb-btn" href="/#shop">
          Back to shop
        </Link>
      </div>
    </main>
  );
}
