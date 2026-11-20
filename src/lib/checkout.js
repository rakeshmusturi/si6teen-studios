import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase";

/*
 startCheckout input shape:
 {
   items: [{ variant_id, qty }],
   customer: { name, email, phone },
   address: { line1, line2?, city, pincode, state_code },
   buyer_gstin?: "29ABCDE1234F1Z5"   // optional, for business customers
 }
*/
export async function createOrder(input) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify(input),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body?.error ?? "Could not create order");
  return body; // { order_id, razorpay_order_id, amount, currency, key_id }
}

let rzpPromise = null;
export function loadRazorpay() {
  if (typeof window === "undefined") return Promise.reject(new Error("browser only"));
  if (window.Razorpay) return Promise.resolve();
  rzpPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    s.onerror = () => { rzpPromise = null; reject(new Error("Could not load Razorpay")); };
    document.body.appendChild(s);
  });
  return rzpPromise;
}

/**
 * Full flow: server creates the order -> Razorpay popup -> callbacks.
 * Payment is only *confirmed* by the webhook; onPaid just means the popup succeeded.
 */
export async function startCheckout(input, { onPaid, onDismiss } = {}) {
  const [order] = await Promise.all([createOrder(input), loadRazorpay()]);
  const rzp = new window.Razorpay({
    key: order.key_id,
    amount: order.amount,
    currency: order.currency,
    order_id: order.razorpay_order_id,
    name: "Si6teen Studios",
    prefill: { name: input.customer.name, email: input.customer.email, contact: input.customer.phone },
    handler: () => onPaid?.(order.order_id),
    modal: { ondismiss: () => onDismiss?.() },
  });
  rzp.open();
}
