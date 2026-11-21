"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { useCart } from "@/lib/cart";
import { startCheckout } from "@/lib/checkout";
import { formatINR } from "@/lib/money";
import { GST_STATES } from "@/lib/states";
import MobileTopBar from "@/components/MobileTopBar";

const RE = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[6-9]\d{9}$/,
  pincode: /^[1-9]\d{5}$/,
  gstin: /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
};
const EMPTY = { name: "", email: "", phone: "", line1: "", line2: "", city: "", state_code: "", pincode: "", gstin: "" };

function SummaryItems({ items }) {
  return items.map((i) => (
    <Box key={i.variantId} sx={{ display: "flex", gap: 1.5, mb: 2 }}>
      <Box sx={{ width: 56, height: 56, bgcolor: "#fff", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}>
        {i.image && <img src={i.image} alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" fontWeight={600}>{i.name}</Typography>
        <Typography variant="caption" color="text.secondary">{i.label ? `${i.label} · ` : ""}Qty {i.qty}</Typography>
      </Box>
      <Typography variant="body2" fontWeight={500}>{formatINR(i.unitPaise * i.qty)}</Typography>
    </Box>
  ));
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, ready, subtotalPaise, count, clear } = useCart();
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [wantGst, setWantGst] = useState(false);
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showSummary, setShowSummary] = useState(false);

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
    if (Object.keys(e).length) setTimeout(() => document.querySelector('[aria-invalid="true"]')?.focus(), 50);
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

  if (!ready) return <MobileTopBar title="Checkout" />;
  if (items.length === 0) {
    return (
      <>
        <MobileTopBar title="Checkout" />
        <Container maxWidth="sm" sx={{ py: { xs: 10, md: 14 }, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
          <Button component={Link} href="/" variant="contained" size="large" sx={{ mt: 2 }}>Continue shopping</Button>
        </Container>
      </>
    );
  }

  const field = (k, label, extra = {}) => (
    <TextField label={label} value={f[k]} onChange={set(k)} error={!!errors[k]} helperText={errors[k]} fullWidth {...extra} />
  );
  const payLabel = busy ? <CircularProgress size={22} color="inherit" /> : `Pay ${formatINR(subtotalPaise)}`;

  return (
    <>
      <MobileTopBar title="Checkout" />
      <Container maxWidth="lg" sx={{ pt: { xs: 1, md: 4 }, pb: { xs: 16, md: 4 } }}>
        <Typography variant="h4" component="h1" sx={{ display: { xs: "none", md: "block" }, mb: 3 }}>Checkout</Typography>

        {/* Phones: collapsible order summary at the top */}
        <Box sx={{ display: { xs: "block", md: "none" }, bgcolor: "#F6F5FF", borderRadius: "14px", mb: 3 }}>
          <Box component="button" type="button" onClick={() => setShowSummary((s) => !s)} aria-expanded={showSummary}
            sx={{ font: "inherit", width: "100%", border: 0, bgcolor: "transparent", cursor: "pointer", p: 2,
                  display: "flex", alignItems: "center", justifyContent: "space-between", color: "text.primary" }}>
            <Typography variant="body2" fontWeight={600} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              Order summary ({count} {count === 1 ? "item" : "items"})
              <ExpandMore sx={{ transform: showSummary ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
            </Typography>
            <Typography fontWeight={700}>{formatINR(subtotalPaise)}</Typography>
          </Box>
          <Collapse in={showSummary}><Box sx={{ px: 2, pt: 0.5 }}><SummaryItems items={items} /></Box></Collapse>
        </Box>

        <Box sx={{ display: "grid", gap: { xs: 3, md: 6 }, gridTemplateColumns: { xs: "1fr", md: "1.3fr 1fr" }, alignItems: "start" }}>
          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography variant="h6">Contact</Typography>
            {field("name", "Full name", { autoComplete: "name" })}
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
              {field("email", "Email", { type: "email", autoComplete: "email", inputProps: { inputMode: "email" } })}
              {field("phone", "Mobile number", { type: "tel", autoComplete: "tel", inputProps: { inputMode: "tel", maxLength: 15 } })}
            </Box>

            <Typography variant="h6" sx={{ mt: 2 }}>Delivery address</Typography>
            {field("line1", "Address line 1", { autoComplete: "address-line1" })}
            {field("line2", "Address line 2 (optional)", { autoComplete: "address-line2" })}
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" } }}>
              {field("city", "City", { autoComplete: "address-level2" })}
              {field("pincode", "Pincode", { inputProps: { inputMode: "numeric", maxLength: 6 }, autoComplete: "postal-code" })}
              <Box sx={{ gridColumn: { xs: "1 / -1", sm: "auto" } }}>
                {field("state_code", "State", {
                  select: true, SelectProps: { native: true }, InputLabelProps: { shrink: true }, autoComplete: "address-level1",
                  children: [<option key="" value="">Select state</option>, ...GST_STATES.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)],
                })}
              </Box>
            </Box>

            <FormControlLabel
              control={<Checkbox checked={wantGst} onChange={(e) => setWantGst(e.target.checked)} />}
              label={<Typography variant="body2">I have a GST number (for a business invoice)</Typography>} />
            <Collapse in={wantGst}>{field("gstin", "GSTIN", { inputProps: { maxLength: 15, style: { textTransform: "uppercase" } } })}</Collapse>
            <Typography variant="caption" color="text.secondary">
              By placing your order you agree to our <Link href="/terms/">Terms and Conditions</Link>,{" "}
              <Link href="/shipping/">Shipping Policy</Link> and <Link href="/returns/">Refund and Returns Policy</Link>.
            </Typography>
          </Box>

          {/* Desktop: summary card with the pay button */}
          <Box sx={{ display: { xs: "none", md: "block" }, bgcolor: "#F6F5FF", p: 3, borderRadius: "16px", position: "sticky", top: 88 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Order summary</Typography>
            <SummaryItems items={items} />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}><Typography variant="body2">Subtotal</Typography><Typography variant="body2">{formatINR(subtotalPaise)}</Typography></Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}><Typography variant="body2">Shipping</Typography><Typography variant="body2">Free</Typography></Box>
            <Divider sx={{ my: 1.5 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography fontWeight={700}>Total</Typography><Typography fontWeight={700}>{formatINR(subtotalPaise)}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">Includes GST. Your GST invoice is generated after payment.</Typography>
            {serverError && <Alert severity="error" sx={{ mt: 2 }}>{serverError}</Alert>}
            <Button onClick={pay} disabled={busy} variant="contained" size="large" fullWidth sx={{ mt: 2, py: 1.5 }}>{payLabel}</Button>
            <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" justifyContent="center" gap={0.5} sx={{ mt: 1.5 }}>
              <LockOutlined sx={{ fontSize: 14 }} /> Secure payment by Razorpay (UPI, cards, netbanking, wallets)
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Phones: pay bar pinned to the bottom */}
      <Box sx={{ display: { xs: "block", md: "none" }, position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 1050,
                 bgcolor: "background.paper", borderTop: "1px solid #e4e2f5", px: 2, pt: 1.5,
                 pb: "calc(12px + env(safe-area-inset-bottom))", boxShadow: "0 -6px 16px rgba(30,30,30,0.05)" }}>
        {serverError && <Alert severity="error" sx={{ mb: 1 }}>{serverError}</Alert>}
        <Button onClick={pay} disabled={busy} variant="contained" size="large" fullWidth sx={{ py: 1.5 }}>{payLabel}</Button>
        <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" justifyContent="center" gap={0.5} sx={{ mt: 0.75 }}>
          <LockOutlined sx={{ fontSize: 14 }} /> Secure payment by Razorpay · GST included
        </Typography>
      </Box>
    </>
  );
}
