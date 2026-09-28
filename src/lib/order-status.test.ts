import assert from "node:assert/strict";
import test from "node:test";
import {
  classifyOrder,
  matchesOrderFilter,
  type OrderSignals,
} from "./order-status";

function signals(overrides: Partial<OrderSignals> = {}): OrderSignals {
  return {
    status: "complete",
    amountTotal: 6500,
    paymentStatus: "paid",
    amountRefunded: 0,
    chargeAmount: 6500,
    chargeRefunded: false,
    ...overrides,
  };
}

test("completed ¥0 checkout with no payment is an order", () => {
  const order = classifyOrder(
    signals({
      amountTotal: 0,
      paymentStatus: "no_payment_required",
      amountRefunded: 0,
      chargeAmount: null,
      chargeRefunded: false,
    }),
  );

  assert.equal(order.free, true);
  assert.equal(order.paid, false);
  assert.equal(order.refund, "none");
  assert.equal(order.paymentLabel, "Free");
  assert.equal(matchesOrderFilter(order, "free"), true);
  assert.equal(matchesOrderFilter(order, "all"), true);
  assert.equal(matchesOrderFilter(order, "paid"), false);
  assert.equal(matchesOrderFilter(order, "refunded"), false);
});

test("completed ¥0 checkout marked paid is still a free order", () => {
  const order = classifyOrder(
    signals({
      amountTotal: 0,
      paymentStatus: "paid",
      chargeAmount: null,
    }),
  );

  assert.equal(order.free, true);
  assert.equal(order.paid, false);
  assert.equal(matchesOrderFilter(order, "free"), true);
});

test("completed paid checkout is not free", () => {
  const order = classifyOrder(signals());

  assert.equal(order.paid, true);
  assert.equal(order.free, false);
  assert.equal(matchesOrderFilter(order, "paid"), true);
  assert.equal(matchesOrderFilter(order, "free"), false);
});

test("fully refunded paid checkout is refunded", () => {
  const order = classifyOrder(
    signals({ amountRefunded: 6500, chargeRefunded: true }),
  );

  assert.equal(order.refund, "full");
  assert.equal(order.paid, false);
  assert.equal(order.paymentLabel, "Refunded");
  assert.equal(matchesOrderFilter(order, "refunded"), true);
  assert.equal(matchesOrderFilter(order, "paid"), false);
});

test("partially refunded paid checkout is refunded", () => {
  const order = classifyOrder(signals({ amountRefunded: 1000 }));

  assert.equal(order.refund, "partial");
  assert.equal(order.paymentLabel, "Partially refunded");
  assert.equal(matchesOrderFilter(order, "refunded"), true);
  assert.equal(matchesOrderFilter(order, "paid"), false);
});

test("abandoned and expired checkouts are not orders", () => {
  for (const status of ["open", "expired"]) {
    const order = classifyOrder(
      signals({
        status,
        amountTotal: 0,
        paymentStatus: "unpaid",
        chargeAmount: null,
      }),
    );
    assert.equal(order.completed, false);
    assert.equal(order.free, false);
    assert.equal(matchesOrderFilter(order, "all"), false);
    assert.equal(matchesOrderFilter(order, "free"), false);
  }
});

test("a completed session that is still unpaid is not free or paid", () => {
  const order = classifyOrder(
    signals({
      amountTotal: 0,
      paymentStatus: "unpaid",
      chargeAmount: null,
    }),
  );

  assert.equal(order.completed, true);
  assert.equal(order.free, false);
  assert.equal(order.paid, false);
  assert.equal(order.paymentLabel, "Unpaid");
  assert.equal(matchesOrderFilter(order, "all"), true);
  assert.equal(matchesOrderFilter(order, "free"), false);
});
