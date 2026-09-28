import "server-only";

import Stripe from "stripe";
import { requireAdmin } from "@/lib/admin";
import {
  classifyOrder,
  matchesOrderFilter,
  type OrderFilter,
} from "@/lib/order-status";
import { getStripe } from "@/lib/stripe";

const PAGE_SIZE = 25;
const SCAN_PAGE_SIZE = 100;
const MAX_SCAN_PAGES = 5;
const SESSION_ID = /^cs_(test|live)_[A-Za-z0-9]+$/;
const ZERO_DECIMAL = new Set([
  "bif",
  "clp",
  "djf",
  "gnf",
  "jpy",
  "kmf",
  "krw",
  "mga",
  "pyg",
  "rwf",
  "ugx",
  "vnd",
  "vuv",
  "xaf",
  "xof",
  "xpf",
]);

const LIST_EXPAND = ["data.line_items", "data.payment_intent.latest_charge"];

export type OrderLine = {
  name: string;
  quantity: number;
  amount: number;
};

export type ShippingAddress = {
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type OrderSummary = {
  id: string;
  created: number;
  customerName: string;
  customerEmail: string;
  lines: OrderLine[];
  linesTruncated: boolean;
  quantity: number;
  subtotal: number;
  discount: number;
  total: number;
  currency: string;
  paymentLabel: string;
  orderStatus: string;
  free: boolean;
  refund: "none" | "partial" | "full";
  livemode: boolean;
};

export type OrderDetail = OrderSummary & {
  shippingAmount: number;
  taxAmount: number;
  shipping: ShippingAddress | null;
  billing: ShippingAddress | null;
  phone: string;
  metadata: { key: string; value: string }[];
  paymentIntentId: string | null;
  amountRefunded: number;
};

export type OrderPage = {
  orders: OrderSummary[];
  nextCursor: string | null;
  capped: boolean;
  scanned: number;
  mode: "live" | "test" | "unknown";
};

type SessionLine = NonNullable<
  Stripe.Checkout.Session["line_items"]
>["data"][number];

export function isCheckoutSessionId(value: string | undefined): value is string {
  return typeof value === "string" && SESSION_ID.test(value);
}

export function formatStripeAmount(amount: number, currency: string) {
  const code = (currency || "jpy").toLowerCase();
  const zeroDecimal = ZERO_DECIMAL.has(code);
  const major = zeroDecimal ? amount : amount / 100;
  try {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: code.toUpperCase(),
      maximumFractionDigits: zeroDecimal ? 0 : 2,
    }).format(major);
  } catch {
    return `${major} ${code.toUpperCase()}`;
  }
}

export function formatOrderTime(unixSeconds: number) {
  return `${new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(unixSeconds * 1000))} JST`;
}

export function shortSessionId(id: string) {
  return `cs_…${id.slice(-8)}`;
}

function stripeMode(): OrderPage["mode"] {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  if (key.startsWith("sk_test_") || key.startsWith("rk_test_")) return "test";
  if (key.startsWith("sk_live_") || key.startsWith("rk_live_")) return "live";
  return "unknown";
}

function chargeOf(session: Stripe.Checkout.Session) {
  const paymentIntent = session.payment_intent;
  if (!paymentIntent || typeof paymentIntent === "string") return null;
  const charge = paymentIntent.latest_charge;
  if (!charge || typeof charge === "string") return null;
  return charge;
}

function signalsFor(session: Stripe.Checkout.Session) {
  const charge = chargeOf(session);
  return {
    status: session.status,
    amountTotal: session.amount_total,
    paymentStatus: session.payment_status,
    amountRefunded: charge?.amount_refunded ?? 0,
    chargeAmount: charge?.amount ?? null,
    chargeRefunded: charge?.refunded ?? false,
  };
}

function linesFrom(items: SessionLine[] | undefined, truncated: boolean) {
  const lines = (items ?? []).map((item) => ({
    name: item.description?.trim() || "Item",
    quantity: item.quantity ?? 0,
    amount: item.amount_total,
  }));
  return { lines, truncated };
}

function customerName(session: Stripe.Checkout.Session) {
  return (
    session.collected_information?.individual_name ||
    session.collected_information?.shipping_details?.name ||
    session.customer_details?.name ||
    session.customer_details?.individual_name ||
    ""
  );
}

function toSummary(
  session: Stripe.Checkout.Session,
  lineItems?: SessionLine[],
  linesTruncated = false,
): OrderSummary {
  const classification = classifyOrder(signalsFor(session));
  const source = lineItems ?? session.line_items?.data;
  const { lines, truncated } = linesFrom(
    source,
    linesTruncated || Boolean(session.line_items?.has_more && !lineItems),
  );
  return {
    id: session.id,
    created: session.created,
    customerName: customerName(session),
    customerEmail:
      session.customer_details?.email || session.customer_email || "",
    lines,
    linesTruncated: truncated,
    quantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: session.amount_subtotal ?? 0,
    discount: session.total_details?.amount_discount ?? 0,
    total: session.amount_total ?? 0,
    currency: session.currency || "jpy",
    paymentLabel: classification.paymentLabel,
    orderStatus: classification.orderStatus,
    free: classification.free,
    refund: classification.refund,
    livemode: session.livemode,
  };
}

function addressOf(
  name: string,
  address:
    | {
        line1?: string | null;
        line2?: string | null;
        city?: string | null;
        state?: string | null;
        postal_code?: string | null;
        country?: string | null;
      }
    | null
    | undefined,
): ShippingAddress | null {
  if (!address?.line1 && !address?.country && !name) return null;
  return {
    name,
    line1: address?.line1 ?? "",
    line2: address?.line2 ?? "",
    city: address?.city ?? "",
    state: address?.state ?? "",
    postalCode: address?.postal_code ?? "",
    country: address?.country ?? "",
  };
}

function metadataEntries(metadata: Stripe.Metadata | null) {
  if (!metadata) return [];
  return Object.entries(metadata)
    .filter((entry): entry is [string, string] => typeof entry[1] === "string")
    .slice(0, 20)
    .map(([key, value]) => ({
      key: key.slice(0, 40),
      value: value.slice(0, 500),
    }));
}

function logOrderError(scope: string, error: unknown) {
  if (error instanceof Stripe.errors.StripeError) {
    console.error(scope, error.type, error.statusCode ?? "", error.requestId ?? "");
    return;
  }
  console.error(scope, "failed");
}

function isMissingSession(error: unknown) {
  return (
    error instanceof Stripe.errors.StripeInvalidRequestError &&
    error.code === "resource_missing"
  );
}

async function listCompleted(startingAfter: string | undefined, limit: number) {
  const stripe = getStripe();
  return stripe.checkout.sessions.list({
    status: "complete",
    limit,
    ...(startingAfter ? { starting_after: startingAfter } : {}),
    expand: LIST_EXPAND,
  });
}

export async function listOrders(
  filter: OrderFilter,
  cursor: string | undefined,
): Promise<OrderPage> {
  await requireAdmin();
  const startingAfter = isCheckoutSessionId(cursor) ? cursor : undefined;

  try {
    if (filter === "all") {
      const page = await listCompleted(startingAfter, PAGE_SIZE);
      const last = page.data.at(-1);
      return {
        orders: page.data.map((session) => toSummary(session)),
        nextCursor: page.has_more && last ? last.id : null,
        capped: false,
        scanned: page.data.length,
        mode: stripeMode(),
      };
    }

    const matches: Stripe.Checkout.Session[] = [];
    let scanCursor = startingAfter;
    let scanned = 0;
    let capped = false;
    let nextCursor: string | null = null;

    for (let pageNumber = 0; pageNumber < MAX_SCAN_PAGES; pageNumber += 1) {
      const page = await listCompleted(scanCursor, SCAN_PAGE_SIZE);
      if (!page.data.length) break;

      let stoppedEarly = false;
      for (const session of page.data) {
        scanned += 1;
        if (matchesOrderFilter(classifyOrder(signalsFor(session)), filter)) {
          matches.push(session);
        }
        if (matches.length >= PAGE_SIZE) {
          const moreInPage = session.id !== page.data.at(-1)?.id;
          if (moreInPage || page.has_more) nextCursor = session.id;
          stoppedEarly = true;
          break;
        }
      }

      if (stoppedEarly) break;
      if (!page.has_more) break;

      scanCursor = page.data.at(-1)?.id;
      if (pageNumber === MAX_SCAN_PAGES - 1 && scanCursor) {
        capped = true;
        nextCursor = scanCursor;
      }
    }

    return {
      orders: matches.map((session) => toSummary(session)),
      nextCursor,
      capped,
      scanned,
      mode: stripeMode(),
    };
  } catch (error) {
    logOrderError("order list failed", error);
    throw new Error("Orders could not be loaded");
  }
}

export type ShipLine = {
  name: string;
  quantity: number;
};

export type ShipOrder = {
  id: string;
  created: number;
  customerName: string;
  customerEmail: string;
  phone: string;
  lines: ShipLine[];
  address: string[];
  preorder: boolean;
  free: boolean;
  partialRefund: boolean;
};

export type ShipQueue = {
  pack: ShipOrder[];
  hold: ShipOrder[];
  picks: ShipLine[];
  capped: boolean;
  scanned: number;
  mode: OrderPage["mode"];
};

function shipAddress(session: Stripe.Checkout.Session) {
  const shipping = session.collected_information?.shipping_details;
  const address = addressOf(
    shipping?.name || customerName(session),
    shipping?.address,
  );
  if (!address) return [];
  const locality = [address.city, address.state, address.postalCode]
    .filter(Boolean)
    .join(" ");
  return [address.name, address.line1, address.line2, locality, address.country].filter(
    Boolean,
  );
}

function toShipOrder(session: Stripe.Checkout.Session): ShipOrder {
  const classification = classifyOrder(signalsFor(session));
  const lines = linesFrom(session.line_items?.data, false).lines.map((line) => ({
    name: line.name.replace(/\s*\(Pre-Order\)\s*/g, "").trim() || "Item",
    quantity: line.quantity,
  }));
  const preorder = (session.line_items?.data ?? []).some((line) =>
    (line.description ?? "").includes("(Pre-Order)"),
  );
  return {
    id: session.id,
    created: session.created,
    customerName: customerName(session),
    customerEmail: session.customer_details?.email || session.customer_email || "",
    phone: session.customer_details?.phone ?? "",
    lines,
    address: shipAddress(session),
    preorder,
    free: classification.free,
    partialRefund: classification.refund === "partial",
  };
}

export async function listShipQueue(): Promise<ShipQueue> {
  await requireAdmin();

  try {
    const pack: ShipOrder[] = [];
    const hold: ShipOrder[] = [];
    let scanCursor: string | undefined;
    let scanned = 0;
    let capped = false;

    for (let pageNumber = 0; pageNumber < MAX_SCAN_PAGES; pageNumber += 1) {
      const page = await listCompleted(scanCursor, SCAN_PAGE_SIZE);
      if (!page.data.length) break;

      for (const session of page.data) {
        scanned += 1;
        const classification = classifyOrder(signalsFor(session));
        if (!classification.completed || classification.refund === "full") continue;
        const order = toShipOrder(session);
        if (order.preorder) hold.push(order);
        else pack.push(order);
      }

      if (!page.has_more) break;
      scanCursor = page.data.at(-1)?.id;
      if (pageNumber === MAX_SCAN_PAGES - 1 && page.has_more) capped = true;
    }

    const totals = new Map<string, number>();
    for (const order of pack) {
      for (const line of order.lines) {
        totals.set(line.name, (totals.get(line.name) ?? 0) + line.quantity);
      }
    }
    const picks = [...totals.entries()]
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity || a.name.localeCompare(b.name));

    return { pack, hold, picks, capped, scanned, mode: stripeMode() };
  } catch (error) {
    logOrderError("ship queue failed", error);
    throw new Error("Orders could not be loaded");
  }
}

export async function getOrder(sessionId: string): Promise<OrderDetail | null> {
  await requireAdmin();
  if (!isCheckoutSessionId(sessionId)) return null;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent.latest_charge", "line_items"],
    });

    let lineItems = session.line_items?.data ?? [];
    let truncated = false;
    if (session.line_items?.has_more) {
      const full = await stripe.checkout.sessions.listLineItems(sessionId, {
        limit: 100,
      });
      lineItems = full.data;
      truncated = full.has_more;
    }

    const summary = toSummary(session, lineItems, truncated);
    const charge = chargeOf(session);
    const paymentIntent = session.payment_intent;
    const shipping = session.collected_information?.shipping_details;

    return {
      ...summary,
      shippingAmount: session.total_details?.amount_shipping ?? 0,
      taxAmount: session.total_details?.amount_tax ?? 0,
      shipping: addressOf(shipping?.name ?? summary.customerName, shipping?.address),
      billing: addressOf(
        session.customer_details?.name ?? "",
        session.customer_details?.address,
      ),
      phone: session.customer_details?.phone ?? "",
      metadata: metadataEntries(session.metadata),
      paymentIntentId:
        typeof paymentIntent === "string"
          ? paymentIntent
          : paymentIntent?.id ?? null,
      amountRefunded: charge?.amount_refunded ?? 0,
    };
  } catch (error) {
    if (isMissingSession(error)) return null;
    logOrderError("order detail failed", error);
    throw new Error("Order could not be loaded");
  }
}
