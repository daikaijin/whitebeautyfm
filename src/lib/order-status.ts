export const ORDER_FILTERS = ["all", "paid", "free", "refunded"] as const;

export type OrderFilter = (typeof ORDER_FILTERS)[number];

export type RefundState = "none" | "partial" | "full";

/**
 * Fields that decide whether a Checkout Session is an order.
 * A missing PaymentIntent is normal for a completed ¥0 session.
 */
export type OrderSignals = {
  status: string | null;
  amountTotal: number | null;
  paymentStatus: string | null;
  amountRefunded: number;
  chargeAmount: number | null;
  chargeRefunded: boolean;
};

export type OrderClassification = {
  completed: boolean;
  free: boolean;
  paid: boolean;
  refund: RefundState;
  paymentLabel: string;
  orderStatus: string;
};

export function parseOrderFilter(value: string | undefined): OrderFilter {
  if (value === "paid" || value === "free" || value === "refunded") return value;
  return "all";
}

export function refundState(signals: OrderSignals): RefundState {
  if (signals.amountRefunded <= 0) return "none";
  const chargeAmount = signals.chargeAmount ?? 0;
  if (signals.chargeRefunded || signals.amountRefunded >= chargeAmount) {
    return "full";
  }
  return "partial";
}

export function classifyOrder(signals: OrderSignals): OrderClassification {
  const completed = signals.status === "complete";
  const total = signals.amountTotal ?? 0;
  const refund = refundState(signals);
  const zeroTotal = total === 0;
  const settled =
    signals.paymentStatus === "paid" ||
    signals.paymentStatus === "no_payment_required";
  const free = completed && zeroTotal && settled && refund === "none";
  const paid =
    completed &&
    total > 0 &&
    signals.paymentStatus === "paid" &&
    refund === "none";

  let paymentLabel = "Unknown";
  if (refund === "full") paymentLabel = "Refunded";
  else if (refund === "partial") paymentLabel = "Partially refunded";
  else if (free) paymentLabel = "Free";
  else if (paid) paymentLabel = "Paid";
  else if (signals.paymentStatus === "unpaid") paymentLabel = "Unpaid";
  else if (signals.paymentStatus === "no_payment_required") {
    paymentLabel = "No payment required";
  } else if (signals.paymentStatus === "paid") paymentLabel = "Paid";

  return {
    completed,
    free,
    paid,
    refund,
    paymentLabel,
    orderStatus: signals.status ?? "unknown",
  };
}

export function matchesOrderFilter(
  classification: OrderClassification,
  filter: OrderFilter,
) {
  if (!classification.completed) return false;
  if (filter === "all") return true;
  if (filter === "free") return classification.free;
  if (filter === "paid") return classification.paid;
  return classification.refund !== "none";
}
