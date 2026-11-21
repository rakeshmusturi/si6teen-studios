"use client";
import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/money";
import QtyStepper from "@/components/QtyStepper";
import MobileTopBar from "@/components/MobileTopBar";

export default function CartPage() {
  const { items, ready, setQty, remove, subtotalPaise } = useCart();
  if (!ready) return <MobileTopBar title="Cart" />;

  if (items.length === 0) {
    return (
      <>
        <MobileTopBar title="Cart" />
        <Container maxWidth="sm" sx={{ py: { xs: 10, md: 14 }, textAlign: "center" }}>
          <ShoppingBagOutlined sx={{ fontSize: 56, color: "primary.main", mb: 1 }} />
          <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>Add a fragrance or skincare product to get started.</Typography>
          <Button component={Link} href="/" variant="contained" size="large">Start shopping</Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <MobileTopBar title="Cart" />
      <Container maxWidth="lg" sx={{ pt: { xs: 1, md: 4 }, pb: { xs: 0, md: 4 } }}>
        <Typography variant="h4" component="h1" sx={{ display: { xs: "none", md: "block" }, mb: 3 }}>Your cart</Typography>

        <Box sx={{ display: "grid", gap: { xs: 0, md: 6 }, gridTemplateColumns: { xs: "1fr", md: "1.7fr 1fr" }, alignItems: "start" }}>
          {/* Items */}
          <Box sx={{ pb: { xs: 3, md: 0 } }}>
            {items.map((i, idx) => (
              <Box key={i.variantId} sx={{
                position: "relative", display: "flex", gap: 2, pb: 2.5, mb: 2.5,
                borderBottom: idx === items.length - 1 ? 0 : "1px dashed", borderColor: "divider" }}>
                <Box component={Link} href={`/products/${i.slug}/`} sx={{
                  width: { xs: 88, md: 120 }, height: { xs: 88, md: 120 }, flexShrink: 0, bgcolor: "#F6F5FF",
                  borderRadius: "14px", overflow: "hidden" }}>
                  {i.image && <img src={i.image} alt={i.name} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box sx={{ pr: 4 }}>
                    <Typography component={Link} href={`/products/${i.slug}/`} variant="subtitle2"
                      sx={{ color: "text.primary", textDecoration: "none", fontWeight: 600, lineHeight: 1.35, display: "block" }}>
                      {i.name}
                    </Typography>
                    {i.label && <Typography variant="caption" color="text.secondary">{i.label}</Typography>}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, mt: 1 }}>
                    <Typography fontWeight={600}>{formatINR(i.unitPaise * i.qty)}</Typography>
                    <QtyStepper variant="outlined" value={i.qty} onChange={(n) => setQty(i.variantId, n)} />
                  </Box>
                </Box>
                <IconButton size="small" aria-label={`Remove ${i.name}`} onClick={() => remove(i.variantId)}
                  sx={{ position: "absolute", top: 0, right: 0, color: "text.secondary" }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* Summary: pinned to the bottom of the screen on phones */}
          <Box sx={{
            position: { xs: "fixed", md: "sticky" }, left: { xs: 0 }, right: { xs: 0 }, bottom: { xs: 0 }, top: { md: 88 }, zIndex: 1050,
            px: { xs: 2, md: 3 }, pt: { xs: 2, md: 3 },
            pb: { xs: "calc(16px + env(safe-area-inset-bottom))", md: 3 },
            bgcolor: { xs: "background.paper", md: "#F6F5FF" },
            borderTop: { xs: "1px solid #e4e2f5", md: "none" }, borderRadius: { md: "16px" },
            boxShadow: { xs: "0 -6px 16px rgba(30,30,30,0.05)", md: "none" },
          }}>
            <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "space-between", mb: 1 }}>
              <Typography color="text.secondary">Subtotal</Typography><Typography>{formatINR(subtotalPaise)}</Typography>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "space-between", mb: 2 }}>
              <Typography color="text.secondary">Shipping</Typography><Typography>Free</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" fontWeight={700}>{formatINR(subtotalPaise)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="caption" color="text.secondary">Free shipping</Typography>
              <Typography variant="caption" color="text.secondary">GST included</Typography>
            </Box>
            <Button component={Link} href="/checkout/" variant="contained" color="secondary" size="large" fullWidth sx={{ py: 1.6 }}>
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
