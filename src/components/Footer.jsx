"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BUSINESS as B } from "@/lib/business";

const COLUMNS = [
  { title: "Shop", links: [
    { href: "/#fragrances", label: "Fragrances" },
    { href: "/#skincare", label: "Skincare" },
    { href: "/#hair-care", label: "Hair care" },
  ] },
  { title: "Help", links: [
    { href: "/contact/", label: "Contact us" },
    { href: "/shipping/", label: "Shipping policy" },
    { href: "/returns/", label: "Refund and returns" },
  ] },
  { title: "Legal", links: [
    { href: "/privacy/", label: "Privacy policy" },
    { href: "/terms/", label: "Terms and conditions" },
  ] },
];

export default function Footer() {
  const path = usePathname() ?? "";
  const hideOnPhone = /^\/(cart|checkout)(\/|$)/.test(path); // these pages have their own bottom bar on phones
  const bar = /^\/products(\/|$)/.test(path) || path === "/" ? 14 : 6; // room for fixed bars on phones
  return (
    <Box component="footer" sx={{ display: { xs: hideOnPhone ? "none" : "block", md: "block" }, bgcolor: "#F6F5FF",
      mt: 10, pt: 6, pb: { xs: bar, md: 6 }, borderTop: 1, borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: { xs: "1fr 1fr", md: "1.5fr 1fr 1fr 1fr" } }}>
          <Box sx={{ gridColumn: { xs: "1 / -1", md: "auto" }, display: "flex", flexDirection: "column", gap: 1.5, alignItems: "flex-start" }}>
            <Image src="/brand/logo-header.png" alt="Si6teen" width={120} height={29} />
            <Typography variant="caption" sx={{ letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Modern &nbsp;•&nbsp; Minimal &nbsp;•&nbsp; Premium
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {B.email}<br />{B.phoneDisplay}
            </Typography>
          </Box>
          {COLUMNS.map((c) => (
            <Box key={c.title}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>{c.title}</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {c.links.map((l) => (
                  <Typography key={l.href} component={Link} href={l.href} variant="body2"
                    sx={{ color: "text.secondary", textDecoration: "none", "&:hover": { color: "primary.dark" } }}>
                    {l.label}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 5 }}>
          © {new Date().getFullYear()} {B.tradeName}. All prices include GST.<br />
          {B.legalName} (trading as {B.tradeName}) · GSTIN {B.gstin}
        </Typography>
      </Container>
    </Box>
  );
}
