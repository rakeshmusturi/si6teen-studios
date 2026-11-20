"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import { useCart } from "@/lib/cart";
import { startCheckout } from "@/lib/checkout";
import { formatINR } from "@/lib/money";
import { GST_STATES } from "@/lib/states";

const RE = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[6-9]\d{9}$/,
  pincode: /^[1-9]\d{5}$/,
  gstin: /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
};

const EMPTY = { name: "", email: "", phone: "", line1: "", line2: "", city: "", state_code: "", pincode: "", gstin: "" };

export default function CheckoutPage() {
  const router = useRouter();
  const { items, ready, subtotalPaise, clear } = useCart();
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [wantGst, setWantGst] = useState(false);
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState("");

  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  function validate() {
    const e = {};
    if (f.name.trim().length < 2) e.name = "Enter your full name";
    if (!RE.email.test(f.email.trim())) e.email = "Enter a valid email";
    if (!RE.phone.test(f.phone.replace(/\D/g, "").slice(-10))) e.phone = "Enter a 10-digit mobile number";
    if (f.line1.trim().length < 5) e.line1 = "Enter your address";
    if (f.city.trim().length < 2) e.city = "Enter your city";
    if (!f.state_code) e.state_code = "Select your state";
    if (!RE.pincode.test(f.pincode.trim())) e.pincode = "Enter a 6-digit pincode";
    if (wantGst && !RE.gstin.test(f.gstin.trim().toUpperCase())) e.gstin = "Enter a valid GSTIN";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function pay() {
    setServerError("");
    if (!validate()) return;
    setBusy(true);
    try {
      await startCheckout(
        {
          items: items.map((i) => ({ variant_id: i.variantId, qty: i.qty })),
          customer: { name: f.name.trim(), email: f.email.trim(), phone: f.phone },
          address: { line1: f.line1.trim(), line2: f.line2.trim(), city: f.city.trim(), pincode: f.pincode.trim(), state_code: f.state_code },
          buyer_gstin: wantGst ? f.gstin.trim().toUpperCase() : undefined,
        },
        {
          onPaid: (orderId) => { router.push(`/thank-you/?o=${orderId}`); clear(); },
          onDismiss: () => setBusy(false),
        },
      );
    } catch (err) {
      setServerError(err.message || "Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  if (!ready) return null;
  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
        <Button component={Link} href="/" variant="contained" sx={{ mt: 2 }}>Continue shopping</Button>
      </Container>
    );
  }

  const field = (k, label, extra = {}) => (
    <TextField label={label} value={f[k]} onChange={set(k)} error={!!errors[k]} helperText={errors[k]} fullWidth size="small" {...extra} />
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>Checkout</Typography>
      <Box sx={{ display: "grid", gap: 5, gridTemplateColumns: { xs: "1fr", md: "1.3fr 1fr" }, alignItems: "start" }}>
        <Box sx={{ display: "grid", gap: 2 }}>
          <Typography variant="h6">Contact</Typography>
          {field("name", "Full name", { autoComplete: "name" })}
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
            {field("email", "Email", { type: "email", autoComplete: "email" })}
            {field("phone", "Mobile number", { type: "tel", autoComplete: "tel", inputProps: { maxLength: 15 } })}
          </Box>

          <Typography variant="h6" sx={{ mt: 2 }}>Delivery address</Typography>
          {field("line1", "Address line 1", { autoComplete: "address-line1" })}
          {field("line2", "Address line 2 (optional)", { autoComplete: "address-line2" })}
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" } }}>
            {field("city", "City", { autoComplete: "address-level2" })}
            {field("state_code", "State", { select: true, children: GST_STATES.map((s) => (
              <MenuItem key={s.code} value={s.code}>{s.name}</MenuItem>
            )) })}
            {field("pincode", "Pincode", { inputProps: { inputMode: "numeric", maxLength: 6 }, autoComplete: "postal-code" })}
          </Box>

          <FormControlLabel
            control={<Checkbox checked={wantGst} onChange={(e) => setWantGst(e.target.checked)} />}
            label="I have a GST number (for a business invoice)" />
          <Collapse in={wantGst}>{field("gstin", "GSTIN", { inputProps: { maxLength: 15, style: { textTransform: "uppercase" } } })}</Collapse>
        </Box>

        <Box sx={{ bgcolor: "#F6F5FF", p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Order summary</Typography>
          {items.map((i) => (
            <Box key={i.variantId} sx={{ display: "flex", gap: 1.5, mb: 2 }}>
              <Box sx={{ width: 56, height: 56, bgcolor: "primary.light", flexShrink: 0 }}>
                {i.image && <img src={i.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={600}>{i.name}</Typography>
                <Typography variant="caption" color="text.secondary">{i.label ? `${i.label} · ` : ""}Qty {i.qty}</Typography>
              </Box>
              <Typography variant="body2">{formatINR(i.unitPaise * i.qty)}</Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}><Typography variant="body2">Subtotal</Typography><Typography variant="body2">{formatINR(subtotalPaise)}</Typography></Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}><Typography variant="body2">Shipping</Typography><Typography variant="body2">Free</Typography></Box>
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography fontWeight={700}>Total</Typography><Typography fontWeight={700}>{formatINR(subtotalPaise)}</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">Includes GST. The GST invoice is generated after payment.</Typography>

          {serverError && <Alert severity="error" sx={{ mt: 2 }}>{serverError}</Alert>}
          <Button onClick={pay} disabled={busy} variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
            {busy ? <CircularProgress size={22} color="inherit" /> : `Pay ${formatINR(subtotalPaise)}`}
          </Button>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1.5, textAlign: "center" }}>
            Secure payment by Razorpay (UPI, cards, netbanking, wallets)
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
