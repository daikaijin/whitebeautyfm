import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import {
  formatOrderTime,
  formatStripeAmount,
  isCheckoutSessionId,
  listOrders,
  shortSessionId,
} from "@/lib/orders";
import { parseOrderFilter, type OrderFilter } from "@/lib/order-status";

const FILTERS: { id: OrderFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "paid", label: "Paid" },
  { id: "free", label: "Free / ¥0" },
  { id: "refunded", label: "Refunded" },
];

function ordersHref(filter: OrderFilter, cursor?: string | null) {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("filter", filter);
  if (cursor && isCheckoutSessionId(cursor)) params.set("cursor", cursor);
  const query = params.toString();
  return query ? `/admin/orders?${query}` : "/admin/orders";
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; cursor?: string }>;
}) {
  const params = await searchParams;
  const filter = parseOrderFilter(params.filter);
  const cursor = isCheckoutSessionId(params.cursor) ? params.cursor : undefined;

  let page;
  try {
    page = await listOrders(filter, cursor);
  } catch (error) {
    unstable_rethrow(error);
    console.error("order list failed");
    return (
      <main className="admin-panel">
        <h1>Orders</h1>
        <p className="admin-error" role="alert">
          Orders could not be loaded.
        </p>
      </main>
    );
  }

  return (
    <main className="admin-panel">
      <header className="admin-heading">
        <p className="section-kicker">Checkout sessions</p>
        <h1>Orders</h1>
        <p>
          Every completed Stripe Checkout Session, including ¥0 orders that
          never create a payment.
        </p>
      </header>

      {page.mode === "test" ? (
        <p className="admin-banner">Stripe test mode</p>
      ) : null}
      {page.mode === "unknown" ? (
        <p className="admin-banner">Stripe mode could not be confirmed</p>
      ) : null}

      <nav className="admin-filters" aria-label="Order filters">
        {FILTERS.map((item) => (
          <Link
            key={item.id}
            href={ordersHref(item.id)}
            className={item.id === filter ? "is-active" : undefined}
            aria-current={item.id === filter ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {filter !== "all" ? (
        <p className="admin-note">
          This filter walks completed sessions
          {page.scanned ? ` (${page.scanned} scanned)` : ""}. Use Next to keep
          looking further back.
        </p>
      ) : null}
      {page.capped ? (
        <p className="admin-note">
          Scanning stopped before the account history ended. Continue to search
          older sessions.
        </p>
      ) : null}

      {page.orders.length === 0 ? (
        <p>No completed orders in this view.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <caption className="sr-only">Completed orders</caption>
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Date</th>
                <th scope="col">Customer</th>
                <th scope="col">Email</th>
                <th scope="col">Items</th>
                <th scope="col">Qty</th>
                <th scope="col">Subtotal</th>
                <th scope="col">Discount</th>
                <th scope="col">Total</th>
                <th scope="col">Payment</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {page.orders.map((order) => (
                <tr
                  key={order.id}
                  className={order.free ? "admin-row-free" : undefined}
                >
                  <td>
                    <Link href={`/admin/orders/${order.id}`}>
                      {shortSessionId(order.id)}
                    </Link>
                    {order.free ? (
                      <span className="admin-badge-free">¥0</span>
                    ) : null}
                    {!order.livemode ? (
                      <span className="admin-badge-test">Test</span>
                    ) : null}
                  </td>
                  <td>{formatOrderTime(order.created)}</td>
                  <td>{order.customerName || "—"}</td>
                  <td>{order.customerEmail || "—"}</td>
                  <td>
                    {order.lines.length === 0 ? (
                      "—"
                    ) : (
                      <ul>
                        {order.lines.map((line, index) => (
                          <li key={`${order.id}-${index}`}>
                            {line.name} × {line.quantity}
                          </li>
                        ))}
                      </ul>
                    )}
                    {order.linesTruncated ? <p>More on the order</p> : null}
                  </td>
                  <td>{order.quantity}</td>
                  <td>{formatStripeAmount(order.subtotal, order.currency)}</td>
                  <td>{formatStripeAmount(order.discount, order.currency)}</td>
                  <td>{formatStripeAmount(order.total, order.currency)}</td>
                  <td>{order.paymentLabel}</td>
                  <td>{order.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <nav className="admin-pager" aria-label="Pagination">
        {cursor ? <Link href={ordersHref(filter)}>First page</Link> : null}
        {page.nextCursor ? (
          <Link href={ordersHref(filter, page.nextCursor)}>Next</Link>
        ) : null}
      </nav>
    </main>
  );
}
