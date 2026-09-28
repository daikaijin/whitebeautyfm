import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { OrdersBoard } from "@/components/OrdersBoard";
import {
  formatOrderTime,
  formatStripeAmount,
  isCheckoutSessionId,
  listOrders,
} from "@/lib/orders";
import { parseOrderFilter, type OrderFilter } from "@/lib/order-status";
import type { OrderRow } from "@/lib/order-view";

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

  const rows: OrderRow[] = page.orders.map((order) => ({
    id: order.id,
    created: order.created,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    items: order.lines.length
      ? order.lines
          .map((line) => `${line.name} × ${line.quantity}`)
          .join(", ") + (order.linesTruncated ? "…" : "")
      : "—",
    quantity: order.quantity,
    subtotal: formatStripeAmount(order.subtotal, order.currency),
    discount: order.discount > 0
      ? formatStripeAmount(order.discount, order.currency)
      : "",
    total: formatStripeAmount(order.total, order.currency),
    totalValue: order.total,
    paymentLabel: order.paymentLabel,
    free: order.free,
    refunded: order.refund !== "none",
    test: !order.livemode,
  }));
  const when = Object.fromEntries(
    page.orders.map((order) => [order.id, formatOrderTime(order.created)]),
  );

  return (
    <main className="admin-panel">
      <header className="admin-heading">
        <h1>Orders</h1>
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

      {page.capped ? (
        <p className="admin-note">
          Scanned {page.scanned} sessions. Next keeps looking further back.
        </p>
      ) : null}

      <OrdersBoard orders={rows} when={when} />

      <nav className="admin-pager" aria-label="Pagination">
        {cursor ? <Link href={ordersHref(filter)}>First page</Link> : null}
        {page.nextCursor ? (
          <Link href={ordersHref(filter, page.nextCursor)}>Next</Link>
        ) : null}
      </nav>
    </main>
  );
}
