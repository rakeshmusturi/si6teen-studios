"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Check from "@mui/icons-material/Check";

export default function ThankYou() {
  const [ref, setRef] = useState("");
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("o");
    if (id) setRef(id.slice(0, 8).toUpperCase());
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 }, textAlign: "center" }}>
      <Box sx={{ width: 84, height: 84, mx: "auto", mb: 3, borderRadius: "50%", display: "grid", placeItems: "center",
                 background: "linear-gradient(135deg, #7B68EE 0%, #6B57E6 100%)", color: "#fff" }}>
        <Check sx={{ fontSize: 44 }} />
      </Box>
      <Typography variant="h4" component="h1" gutterBottom>Thank you!</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Your payment was received and your order is confirmed.
      </Typography>
      {ref && (
        <Box sx={{ display: "inline-block", bgcolor: "#F6F5FF", borderRadius: "14px", px: 3, py: 1.5, mb: 4 }}>
          <Typography variant="caption" color="text.secondary" display="block">Order reference</Typography>
          <Typography fontWeight={700} letterSpacing="0.08em">{ref}</Typography>
        </Box>
      )}
      <Box><Button component={Link} href="/" variant="contained" size="large">Continue shopping</Button></Box>
    </Container>
  );
}
