import Link from "next/link";
import { PolicyLayout, H, P, UL } from "@/components/PolicyPage";
import { BUSINESS as B } from "@/lib/business";

export const metadata = { title: "Refund and Returns Policy", description: "Returns, replacements, cancellations and refunds at Si6teen." };

export default function Returns() {
  return (
    <PolicyLayout title="Refund and Returns Policy"
      intro="Fragrance and skincare are personal-care products, so we accept returns only when we have made a mistake or the product arrives damaged. Here is how it works.">
      <H>When we accept a return</H>
      <P>You can return a product within {B.returnDays} days of delivery only if:</P>
      <UL items={[
        "you received the wrong product, or",
        "the product arrived damaged (for example, a broken, cracked or leaking bottle or a broken seal).",
      ]} />

      <H>When we cannot accept a return</H>
      <UL items={[
        "You changed your mind or no longer like the product or fragrance.",
        "The product has been opened, used or tested, unless it arrived damaged or was the wrong item.",
        `The issue is reported more than ${B.returnDays} days after delivery.`,
        "The damage happened after delivery, for example through mishandling or storage.",
      ]} />

      <H>How to request a return</H>
      <UL items={[
        <>Email <strong>{B.email}</strong> within {B.returnDays} days of delivery, or call {B.phoneDisplay}.</>,
        "Include your order reference (shown on the thank-you page) and the name you ordered with.",
        "Attach clear photos of the product, its packaging and the shipping label. A short unboxing video helps, if you have one.",
      ]} />
      <P>We will review your request and reply with the next steps. We will tell you how to send the item back, and you will not pay return shipping for a wrong or damaged item.</P>

      <H>Replacements and refunds</H>
      <P>Once we have verified the issue, we will send a replacement or refund the amount you paid. Refunds go back to your original payment method (UPI, card, netbanking or wallet) through Razorpay. They usually reflect in 5 to 7 business days, depending on your bank.</P>

      <H>Cancelling an order</H>
      <P>Orders are dispatched within {B.dispatchHours} hours. To cancel, email {B.email} as soon as possible. We can cancel an order only before it is dispatched, and we will refund it as described above. Once an order is dispatched it cannot be cancelled, but you can still use this policy if it arrives wrong or damaged.</P>

      <H>Payment failed but money was deducted</H>
      <P>If your payment was deducted but you did not receive an order confirmation, the amount is usually returned automatically to your account within 5 to 7 business days. If it is not, email us with your payment ID and we will help.</P>

      <P>See also our <Link href="/shipping/">Shipping Policy</Link> and <Link href="/contact/">Contact Us</Link> page.</P>
    </PolicyLayout>
  );
}
