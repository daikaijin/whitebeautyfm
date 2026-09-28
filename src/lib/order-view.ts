export const ORDER_SORTS = ["newest", "oldest", "total", "name"] as const;

export type OrderSort = (typeof ORDER_SORTS)[number];

export type OrderRow = {
  id: string;
  created: number;
  customerName: string;
  customerEmail: string;
  items: string;
  quantity: number;
  subtotal: string;
  discount: string;
  total: string;
  totalValue: number;
  paymentLabel: string;
  free: boolean;
  refunded: boolean;
  test: boolean;
};

export function sortOrderRows(orders: OrderRow[], sort: OrderSort) {
  return [...orders].sort((a, b) => {
    if (sort === "oldest") return a.created - b.created;
    if (sort === "total") return b.totalValue - a.totalValue || b.created - a.created;
    if (sort === "name") {
      const left = (a.customerName || a.customerEmail).toLocaleLowerCase();
      const right = (b.customerName || b.customerEmail).toLocaleLowerCase();
      const byName = left.localeCompare(right);
      return byName || b.created - a.created;
    }
    return b.created - a.created;
  });
}
