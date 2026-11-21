import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import { PolicyLayout, H, P } from "@/components/PolicyPage";
import { BUSINESS as B } from "@/lib/business";

export const metadata = { title: "Contact Us", description: "Contact Si6teen Studios by email or phone." };

const Row = ({ icon, label, children }) => (
  <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", p: 2.5, bgcolor: "#F6F5FF", borderRadius: "14px" }}>
    <Box sx={{ color: "primary.main", mt: 0.25 }}>{icon}</Box>
    <Box><Typography variant="caption" color="text.secondary">{label}</Typography><Typography fontWeight={500}>{children}</Typography></Box>
  </Box>
);

export default function Contact() {
  return (
    <PolicyLayout title="Contact Us" intro="Questions about an order, a product or a return? We are happy to help.">
      <Box sx={{ display: "grid", gap: 1.5, mt: 1 }}>
        <Row icon={<EmailOutlined />} label="Email"><Link href={`mailto:${B.email}`}>{B.email}</Link></Row>
        <Row icon={<PhoneOutlined />} label="Phone"><Link href={`tel:${B.phoneTel}`}>{B.phoneDisplay}</Link></Row>
        <Row icon={<PlaceOutlined />} label="Address">{B.address}</Row>
      </Box>

      <H>Writing to us about an order</H>
      <P>Please include your order reference and the name you ordered with, so we can help faster.</P>

      <H>Complaints and grievances</H>
      <P>For any complaint, write to {B.legalName} at {B.email}. We acknowledge complaints within 48 hours and aim to resolve them within one month.</P>

      <H>Business details</H>
      <P>Trade name: {B.tradeName}<br />Legal name: {B.legalName}<br />GSTIN: {B.gstin}<br />Registered address: {B.address}</P>
    </PolicyLayout>
  );
}
