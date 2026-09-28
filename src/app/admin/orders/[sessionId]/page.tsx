import type { Metadata } from "next";
import Link from "next/link";
import { notFound, unstable_rethrow } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import {
  formatOrderTime,
  formatStripeAmount,
  getOrder,
  isCheckoutSessionId,
  type ShippingAddress,
} from "@/lib/orders";

export const metadata: Metadata = {
  title: "Order",
  robots: { index: false, follow: false },
};

function AddressBlock({
  title,
  address,
}: {
  title: string;
  address: ShippingAddress | null;
}) {
  if (!address) return null;
  const locality = [address.city, address.state, address.postalCode]
    .filter(Boolean)
    .join(" ");
  return (
    <section>
      <h2>{title}</h2>
      <address>
        {address.name ? <span>{address.name}</span> : null}
        {address.line1 ? <span>{address.line1}</span> : null}
        {address.line2 ? <span>{address.line2}</span> : null}
        {locality ? <span>{locality}</span> : null}
        {address.country ? <span>{address.country}</span> : null}
      </address>
    </section>
  );
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  await requireAdmin();
  const { sessionId } = await params;
  if (!isCheckoutSessionId(sessionId)) notFound();

  let order;
  try {
    order = await getOrder(sessionId);
  } catch (error) {
    unstable_rethrow(error);
    console.error("order detail failed");
    throw new Error("Order could not be loaded");
  }

  if (!order) notFound();

  const money = (amount: number) => formatStripeAmount(amount, order.currency);

  return (
    <main className="admin-panel">
      <p>
        <Link href="/admin/orders">All orders</Link>
      </p>
      <header className="admin-heading">
        <p className="section-kicker">Checkout session</p>
        <h1>
          {order.free ? "¥0 order" : "Order"}{" "}
          <span className="admin-session-id">{order.id}</span>
        </h1>
        <p>
          {formatOrderTime(order.created)} · {order.paymentLabel} ·{" "}
          {order.orderStatus}
          {!order.livemode ? " · Test" : ""}
        </p>
      </header>

      {order.free ? (
        <p className="admin-banner">
          Completed checkout with a ¥0 total. No Stripe payment is required for
          this order.
        </p>
      ) : null}
      {order.orderStatus !== "complete" ? (
        <p className="admin-banner">This checkout is not a completed order.</p>
      ) : null}

      <div className="admin-detail-grid">
        <section>
          <h2>Customer</h2>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>{order.customerName || "—"}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{order.customerEmail || "—"}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{order.phone || "—"}</dd>
            </div>
          </dl>
        </section>

        <AddressBlock title="Shipping" address={order.shipping} />
        <AddressBlock title="Billing" address={order.billing} />

        <section>
          <h2>Amounts</h2>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{money(order.subtotal)}</dd>
            </div>
            <div>
              <dt>Discount</dt>
              <dd>{money(order.discount)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{money(order.shippingAmount)}</dd>
            </div>
            <div>
              <dt>Tax</dt>
              <dd>{money(order.taxAmount)}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{money(order.total)}</dd>
            </div>
            <div>
              <dt>Refunded</dt>
              <dd>{money(order.amountRefunded)}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section>
        <h2>Items</h2>
        {order.lines.length === 0 ? (
          <p>No line items on this session.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.lines.map((line, index) => (
                  <tr key={`${order.id}-${index}`}>
                    <td>{line.name}</td>
                    <td>{line.quantity}</td>
                    <td>{money(line.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {order.linesTruncated ? <p>Additional line items were not loaded.</p> : null}
      </section>

      <section>
        <h2>Stripe</h2>
        <dl>
          <div>
            <dt>Checkout Session</dt>
            <dd className="admin-session-id">{order.id}</dd>
          </div>
          <div>
            <dt>Payment</dt>
            <dd>{order.paymentIntentId || "None"}</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>{order.livemode ? "Live" : "Test"}</dd>
          </div>
        </dl>
      </section>

      {order.metadata.length ? (
        <section>
          <h2>Metadata</h2>
          <dl>
            {order.metadata.map((entry) => (
              <div key={entry.key}>
                <dt>{entry.key}</dt>
                <dd>{entry.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </main>
  );
}
