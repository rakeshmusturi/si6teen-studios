import { PolicyLayout, H, P, UL } from "@/components/PolicyPage";
import { BUSINESS as B } from "@/lib/business";

export const metadata = { title: "Shipping Policy", description: "Dispatch and delivery details for Si6teen orders." };

export default function Shipping() {
  return (
    <PolicyLayout title="Shipping Policy" intro={`This policy explains how ${B.tradeName} ships orders placed on ${B.site}.`}>
      <H>Where we ship</H>
      <P>We currently deliver to addresses across India. We do not ship outside India.</P>

      <H>Shipping charges</H>
      <P>Shipping is free on all orders. The price you see at checkout is the price you pay, inclusive of GST.</P>

      <H>Dispatch time</H>
      <P>Orders are dispatched within {B.dispatchHours} hours of your payment being confirmed. Once your order is dispatched, we will share tracking details with you.</P>

      <H>Delivery time</H>
      <P>Delivery usually takes {B.deliveryDays} after dispatch. Remote locations, public holidays, weather or courier delays can sometimes take longer. These timelines are estimates, not guarantees.</P>

      <H>Delivery address</H>
      <UL items={[
        "Please enter a complete address with a correct pincode and a working mobile number, as couriers may call before delivery.",
        "We are not responsible for delays or failed deliveries caused by an incorrect or incomplete address. If you made a mistake, contact us as soon as possible.",
      ]} />

      <H>Received a damaged or wrong item?</H>
      <P>Please see our Refund and Returns Policy. You must report it within {B.returnDays} days of delivery.</P>

      <H>Questions</H>
      <P>Email us at {B.email} or call {B.phoneDisplay}.</P>
    </PolicyLayout>
  );
}
