import Link from "next/link";
import type { Metadata } from "next";
import { unstable_rethrow } from "next/navigation";
import { formatOrderTime, listShipQueue, type ShipOrder } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Ship",
  robots: { index: false, follow: false },
};

function Parcel({ order }: { order: ShipOrder }) {
  return (
    <article className={order.preorder ? "ship-card is-hold" : "ship-card"}>
      <header>
        <h2>{order.customerName || "No name"}</h2>
        <p>
          {formatOrderTime(order.created)}
          {order.free ? " · Free" : ""}
          {order.partialRefund ? " · Partial refund" : ""}
        </p>
      </header>
      {order.address.length ? (
        <address>
          {order.address.map((line, index) => (
            <span key={`${order.id}-addr-${index}`}>{line}</span>
          ))}
        </address>
      ) : (
        <p>No shipping address</p>
      )}
      <ul>
        {order.lines.map((line, index) => (
          <li key={`${order.id}-${index}`}>
            {line.name} × {line.quantity}
          </li>
        ))}
      </ul>
      {order.customerEmail ? <p>{order.customerEmail}</p> : null}
      {order.phone ? <p>{order.phone}</p> : null}
      <p>
        <Link href={`/admin/orders/${order.id}`}>Order</Link>
      </p>
    </article>
  );
}

export default async function ShipPage() {
  let queue;
  try {
    queue = await listShipQueue();
  } catch (error) {
    unstable_rethrow(error);
    console.error("ship queue failed");
    return (
      <main className="admin-panel">
        <h1>Ship</h1>
        <p className="admin-error" role="alert">
          Orders could not be loaded.
        </p>
      </main>
    );
  }

  return (
    <main className="admin-panel">
      <header className="admin-heading">
        <h1>Ship</h1>
        <p>
          {queue.pack.length} to pack
          {queue.hold.length ? ` · ${queue.hold.length} pre-order hold` : ""}
        </p>
      </header>
      {queue.mode === "test" ? <p className="admin-banner">Stripe test mode</p> : null}
      {queue.capped ? (
        <p className="admin-note">
          Showing the latest {queue.scanned} completed sessions.
        </p>
      ) : null}

      <section>
        <h2>Pull</h2>
        {queue.picks.length === 0 ? (
          <p>Nothing ready to pack.</p>
        ) : (
          <ul className="ship-picks">
            {queue.picks.map((pick) => (
              <li key={pick.name}>
                <span>{pick.name}</span>
                <strong>{pick.quantity}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Pack</h2>
        {queue.pack.length === 0 ? (
          <p>No orders ready to ship.</p>
        ) : (
          <div className="ship-list">
            {queue.pack.map((order) => (
              <Parcel key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>

      {queue.hold.length ? (
        <section>
          <h2>Hold</h2>
          <p className="admin-note">Pre-order. Do not ship these yet.</p>
          <div className="ship-list">
            {queue.hold.map((order) => (
              <Parcel key={order.id} order={order} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
