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

function samePlace(
  left: ShippingAddress | null,
  right: ShippingAddress | null,
) {
  if (!left || !right) return false;
  return (
    left.line1 === right.line1 &&
    left.postalCode === right.postalCode &&
    left.country === right.country
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
      <header className="admin-heading">
        <p>
          <Link href="/admin/orders">Orders</Link>
        </p>
        <h1>{order.customerName || "Order"}</h1>
        <p>
          {formatOrderTime(order.created)}
          {order.free ? " · Free" : ""}
          {order.refund !== "none" ? ` · ${order.paymentLabel}` : ""}
          {!order.livemode ? " · Test" : ""}
        </p>
      </header>

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
            {order.phone ? (
              <div>
                <dt>Phone</dt>
                <dd>{order.phone}</dd>
              </div>
            ) : null}
          </dl>
        </section>

        <AddressBlock title="Shipping" address={order.shipping} />
        {samePlace(order.shipping, order.billing) ? null : (
          <AddressBlock title="Billing" address={order.billing} />
        )}

        <section>
          <h2>Amounts</h2>
          <dl>
            {order.subtotal !== order.total ? (
              <div>
                <dt>Subtotal</dt>
                <dd>{money(order.subtotal)}</dd>
              </div>
            ) : null}
            <div>
              <dt>Total</dt>
              <dd>{money(order.total)}</dd>
            </div>
            {order.discount > 0 ? (
              <div>
                <dt>Discount</dt>
                <dd>{money(order.discount)}</dd>
              </div>
            ) : null}
            {order.shippingAmount > 0 ? (
              <div>
                <dt>Shipping</dt>
                <dd>{money(order.shippingAmount)}</dd>
              </div>
            ) : null}
            {order.taxAmount > 0 ? (
              <div>
                <dt>Tax</dt>
                <dd>{money(order.taxAmount)}</dd>
              </div>
            ) : null}
            {order.amountRefunded > 0 ? (
              <div>
                <dt>Refunded</dt>
                <dd>{money(order.amountRefunded)}</dd>
              </div>
            ) : null}
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

      <details className="admin-more">
        <summary>Stripe details</summary>
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
            <dt>Status</dt>
            <dd>
              {order.paymentLabel} · {order.orderStatus}
            </dd>
          </div>
          {order.metadata.map((entry) => (
            <div key={entry.key}>
              <dt>{entry.key}</dt>
              <dd>{entry.value}</dd>
            </div>
          ))}
        </dl>
      </details>
    </main>
  );
}
