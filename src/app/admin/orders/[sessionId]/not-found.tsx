import Link from "next/link";

export default function OrderNotFound() {
  return (
    <main className="admin-card">
      <h1>Order not found</h1>
      <p>That Checkout Session does not exist.</p>
      <Link className="wb-btn" href="/admin/orders">
        Back to orders
      </Link>
    </main>
  );
}
