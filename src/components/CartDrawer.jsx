"use client";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/money";

export default function CartDrawer() {
  const { items, open, closeCart, setQty, remove, subtotalPaise } = useCart();
  return (
    <Drawer anchor="right" open={open} onClose={closeCart}
      PaperProps={{ sx: { width: "min(420px, 100vw)", display: "flex", flexDirection: "column" } }}>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6">Your cart</Typography>
        <IconButton onClick={closeCart} aria-label="Close cart"><CloseIcon /></IconButton>
      </Box>
      <Divider />

      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {items.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Typography color="text.secondary" gutterBottom>Your cart is empty.</Typography>
            <Button component={Link} href="/#fragrances" onClick={closeCart} variant="outlined">Start shopping</Button>
          </Box>
        ) : items.map((i) => (
          <Box key={i.variantId} sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Box sx={{ width: 80, height: 80, bgcolor: "primary.light", flexShrink: 0 }}>
              {i.image && <img src={i.image} alt={i.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={600}>{i.name}</Typography>
              {i.label && <Typography variant="caption" color="text.secondary">{i.label}</Typography>}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 0.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", border: 1, borderColor: "divider" }}>
                  <IconButton size="small" aria-label="Decrease" onClick={() => setQty(i.variantId, i.qty - 1)}><RemoveIcon fontSize="small" /></IconButton>
                  <Typography sx={{ px: 1.5 }} variant="body2">{i.qty}</Typography>
                  <IconButton size="small" aria-label="Increase" onClick={() => setQty(i.variantId, i.qty + 1)}><AddIcon fontSize="small" /></IconButton>
                </Box>
                <Typography variant="body2" fontWeight={600}>{formatINR(i.unitPaise * i.qty)}</Typography>
              </Box>
            </Box>
            <IconButton size="small" aria-label="Remove" onClick={() => remove(i.variantId)} sx={{ alignSelf: "flex-start" }}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>

      {items.length > 0 && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography>Subtotal</Typography><Typography fontWeight={600}>{formatINR(subtotalPaise)}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography color="text.secondary" variant="body2">Shipping</Typography>
            <Typography color="text.secondary" variant="body2">Free</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
            Prices include GST.
          </Typography>
          <Button component={Link} href="/checkout/" onClick={closeCart} variant="contained" size="large" fullWidth>
            Checkout
          </Button>
        </Box>
      )}
    </Drawer>
  );
}
