"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  sortOrderRows,
  type OrderRow,
  type OrderSort,
} from "@/lib/order-view";

const SORTS: { id: OrderSort; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "total", label: "Total" },
  { id: "name", label: "Name" },
];

function pillClass(order: OrderRow) {
  if (order.free) return "admin-pill is-free";
  if (order.refunded) return "admin-pill is-refund";
  return "admin-pill";
}

export function OrdersBoard({
  orders,
  when,
}: {
  orders: OrderRow[];
  when: Record<string, string>;
}) {
  const [sort, setSort] = useState<OrderSort>("newest");
  const [showEmail, setShowEmail] = useState(false);
  const [showAmounts, setShowAmounts] = useState(false);
  const rows = useMemo(() => sortOrderRows(orders, sort), [orders, sort]);
  const freeCount = orders.filter((order) => order.free).length;

  return (
    <>
      <div className="admin-toolbar">
        <div className="admin-tool">
          <span>Sort</span>
          {SORTS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={sort === item.id ? "is-on" : undefined}
              aria-pressed={sort === item.id}
              onClick={() => setSort(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="admin-tool">
          <span>Show</span>
          <button
            type="button"
            className={showEmail ? "is-on" : undefined}
            aria-pressed={showEmail}
            onClick={() => setShowEmail((value) => !value)}
          >
            Emails
          </button>
          <button
            type="button"
            className={showAmounts ? "is-on" : undefined}
            aria-pressed={showAmounts}
            onClick={() => setShowAmounts((value) => !value)}
          >
            Subtotals
          </button>
        </div>
        <p className="admin-count">
          {orders.length} on this page
          {freeCount ? ` · ${freeCount} free` : ""}
        </p>
      </div>

      {orders.length === 0 ? (
        <p>No completed orders in this view.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <caption className="sr-only">Completed orders</caption>
            <thead>
              <tr>
                <th scope="col">When</th>
                <th scope="col">Customer</th>
                {showEmail ? <th scope="col">Email</th> : null}
                <th scope="col">Items</th>
                {showAmounts ? <th scope="col">Subtotal</th> : null}
                {showAmounts ? <th scope="col">Discount</th> : null}
                <th scope="col" className="admin-num">
                  Total
                </th>
                <th scope="col">Payment</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((order) => (
                <tr
                  key={order.id}
                  className={order.free ? "admin-row-free" : undefined}
                >
                  <td>
                    <Link href={`/admin/orders/${order.id}`}>
                      {when[order.id]}
                    </Link>
                    {order.test ? (
                      <span className="admin-badge-test">Test</span>
                    ) : null}
                  </td>
                  <td>{order.customerName || "—"}</td>
                  {showEmail ? <td>{order.customerEmail || "—"}</td> : null}
                  <td className="admin-items">{order.items}</td>
                  {showAmounts ? <td className="admin-num">{order.subtotal}</td> : null}
                  {showAmounts ? <td className="admin-num">{order.discount}</td> : null}
                  <td className="admin-num">
                    {order.total}
                    {order.free ? <span className="admin-badge-free">¥0</span> : null}
                  </td>
                  <td>
                    <span className={pillClass(order)}>{order.paymentLabel}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
