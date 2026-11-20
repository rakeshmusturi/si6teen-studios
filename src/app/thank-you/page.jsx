"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

export default function ThankYou() {
  const [ref, setRef] = useState("");
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("o");
    if (id) setRef(id.slice(0, 8).toUpperCase());
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
      <CheckCircleOutline sx={{ fontSize: 64, color: "primary.main" }} />
      <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 1 }}>Thank you!</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Your payment was received and your order is confirmed.
      </Typography>
      {ref && (
        <Typography sx={{ mb: 4 }}>
          Order reference: <strong>{ref}</strong>
        </Typography>
      )}
      <Button component={Link} href="/" variant="contained" size="large">Continue shopping</Button>
    </Container>
  );
}
