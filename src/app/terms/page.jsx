import Link from "next/link";
import { PolicyLayout, H, P, UL } from "@/components/PolicyPage";
import { BUSINESS as B } from "@/lib/business";

export const metadata = { title: "Terms and Conditions", description: "Terms for buying from Si6teen Studios." };

export default function Terms() {
  return (
    <PolicyLayout title="Terms and Conditions"
      intro={`${B.site} is operated by ${B.legalName}, trading as ${B.tradeName} (GSTIN ${B.gstin}). By using this website or placing an order, you agree to these terms.`}>
      <H>Eligibility</H>
      <P>You must be at least 18 years old to place an order.</P>

      <H>Products and information</H>
      <UL items={[
        "We try to describe and photograph our products accurately. Colours may look slightly different on your screen.",
        "Product information is for general guidance and is not medical advice.",
        "Please do a patch test before using a skincare product. Stop using it if you notice irritation, and consult a doctor if needed.",
        "Fragrances are flammable. Keep them away from flames and heat, and out of reach of children.",
      ]} />

      <H>Prices and payment</H>
      <UL items={[
        "All prices are in Indian rupees (INR) and include GST. Shipping is free.",
        "We may change prices at any time. A price change does not affect an order that has already been placed and paid for.",
        "Payments are made online through Razorpay (UPI, cards, netbanking and wallets).",
        "Your order is confirmed only after your payment is successful.",
        "We may cancel an order and refund you in full if a product is unavailable, a price was shown incorrectly, or we suspect fraud.",
      ]} />

      <H>GST invoice</H>
      <P>A GST invoice is generated after payment. If you need an invoice in your business name, enter your GST number at checkout.</P>

      <H>Shipping, returns and cancellations</H>
      <P>These are covered in our <Link href="/shipping/">Shipping Policy</Link> and <Link href="/returns/">Refund and Returns Policy</Link>, which form part of these terms.</P>

      <H>Intellectual property</H>
      <P>The Si6teen name, logo, images and text on this website belong to {B.tradeName}. You may not copy or use them without our written permission.</P>

      <H>Acceptable use</H>
      <P>Please do not misuse the website, attempt to break or disrupt it, or use it for anything unlawful.</P>

      <H>Limitation of liability</H>
      <P>To the extent the law allows, we are not liable for indirect or consequential losses. Our total liability for any order is limited to the amount you paid for it. Nothing in these terms limits your rights under Indian consumer protection law.</P>

      <H>Governing law</H>
      <P>These terms are governed by the laws of India. Courts in Bengaluru, Karnataka have jurisdiction over any dispute.</P>

      <H>Changes to these terms</H>
      <P>We may update these terms from time to time. The date at the top shows when they were last changed.</P>

      <H>Contact</H>
      <P>{B.email}, {B.phoneDisplay}. See also our <Link href="/contact/">Contact Us</Link> page.</P>
    </PolicyLayout>
  );
}
