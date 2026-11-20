"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  const path = usePathname() ?? "";
  // leave room for the fixed bottom bars on product and cart pages (phones)
  const onCart = /^\/cart(\/|$)/.test(path);
  const bar = /^\/products(\/|$)/.test(path) ? 14 : 6;
  return (
    <Box component="footer" sx={{ display: { xs: onCart ? "none" : "block", md: "block" }, bgcolor: "#F6F5FF", mt: 10, pt: 6, pb: { xs: bar, md: 6 }, borderTop: 1, borderColor: "divider" }}>
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start" }}>
        <Image src="/brand/logo-header.png" alt="Si6teen" width={120} height={29} />
        <Typography variant="caption" sx={{ letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Modern &nbsp;•&nbsp; Minimal &nbsp;•&nbsp; Premium
        </Typography>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Si6teen Studios. All prices include GST.
        </Typography>
      </Container>
    </Box>
  );
}
