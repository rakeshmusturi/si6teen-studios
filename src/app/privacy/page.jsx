import { PolicyLayout, H, P, UL } from "@/components/PolicyPage";
import { BUSINESS as B } from "@/lib/business";

export const metadata = { title: "Privacy Policy", description: "How Si6teen collects, uses and protects your personal information." };

export default function Privacy() {
  return (
    <PolicyLayout title="Privacy Policy"
      intro={`${B.tradeName} (operated by ${B.legalName}) respects your privacy. This policy explains what personal information we collect on ${B.site}, why, and what we do with it.`}>
      <H>Information we collect</H>
      <UL items={[
        "Details you enter at checkout: your name, email address, mobile number and delivery address.",
        "An optional GST number, if you want an invoice in your business name.",
        "Order details: the products you bought, the amount paid and the date.",
        "Messages you send us by email or phone.",
        "Your shopping cart is saved in your own browser so it is still there when you return. It is not sent to us until you check out.",
      ]} />
      <P>We do not use advertising trackers. Our hosting providers may keep basic technical logs (such as IP address and browser type) to keep the site secure and running.</P>

      <H>Payment information</H>
      <P>Payments are processed by Razorpay. We never see or store your card, UPI or bank details. We receive only the payment status and a payment ID.</P>

      <H>How we use your information</H>
      <UL items={[
        "To process, ship and deliver your order.",
        "To create GST invoices and keep the tax and accounting records the law requires.",
        "To contact you about your order, returns or refunds, and to answer your questions.",
        "To prevent fraud and keep our website secure.",
        "To meet our legal obligations.",
      ]} />
      <P>We do not sell your personal information. We will send you promotional messages only if you have agreed to receive them.</P>

      <H>Who we share it with</H>
      <UL items={[
        "Razorpay, to take your payment and process refunds.",
        "Courier and logistics partners, who need your name, phone number and address to deliver your order.",
        "Technology providers that host our website and database (for example Cloudflare and Supabase) and send our emails.",
        "Government or legal authorities, when the law requires it.",
      ]} />
      <P>These providers may store or process data on servers in India or elsewhere. We share only what is needed for them to do their job.</P>

      <H>How long we keep it</H>
      <P>We keep order and invoice records for as long as Indian tax and accounting laws require. Other information is kept only as long as we need it for the purposes above.</P>

      <H>Your rights</H>
      <P>In line with applicable Indian law, including the Digital Personal Data Protection Act, 2023, you can ask us to show you the information we hold about you, correct it, or delete it. Some records must be kept by law, so we may not be able to delete those straight away. Email {B.email} and we will respond.</P>

      <H>Security</H>
      <P>Our website uses HTTPS, and we limit who can access customer data. No online system is completely secure, so we cannot guarantee absolute security.</P>

      <H>Children</H>
      <P>Our website is meant for adults. We do not knowingly collect information from anyone under 18.</P>

      <H>Changes to this policy</H>
      <P>We may update this policy from time to time. The date at the top shows when it was last changed.</P>

      <H>Contact</H>
      <P>Questions or requests about your data: {B.email}, {B.phoneDisplay}.</P>
    </PolicyLayout>
  );
}
