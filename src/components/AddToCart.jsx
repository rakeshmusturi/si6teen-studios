"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import { useCart } from "@/lib/cart";
import { supabase } from "@/lib/supabase";
import PriceBlock from "./PriceBlock";
import QtyStepper from "./QtyStepper";

// Title, price, size pills, short text, (children = details accordion) and the add-to-cart bar.
// On phones the add-to-cart bar sticks to the bottom of the screen.
export default function AddToCart({ product, shortText, children }) {
  const { add } = useCart();
  const firstInStock = product.variants.find((x) => x.stock > 0) ?? product.variants[0];
  const [variantId, setVariantId] = useState(firstInStock?.id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [live, setLive] = useState({}); // fresh price/stock fetched in the browser

  // The page is pre-built, so re-check live price + stock when it opens.
  useEffect(() => {
    let cancelled = false;
    supabase.from("variants").select("id,price_paise,compare_at_paise,stock")
      .eq("product_id", product.id)
      .then(({ data }) => {
        if (!cancelled && data) setLive(Object.fromEntries(data.map((d) => [d.id, d])));
      });
    return () => { cancelled = true; };
  }, [product.id]);

  const withLive = (x) => ({ ...x, ...(live[x.id] ?? {}) });
  const variants = product.variants.map(withLive);
  const v = variants.find((x) => x.id === variantId);
  if (!v) return null;
  const soldOut = v.stock <= 0;
  const maxQty = Math.max(1, Math.min(10, v.stock));

  return (
    <Box>
      <Typography variant="caption" color="text.secondary">Si6teen</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, mb: 2.5 }}>
        <Typography variant="h5" component="h1" sx={{ flex: 1, lineHeight: 1.3 }}>{product.name}</Typography>
        <Box sx={{ textAlign: "right" }}>
          <PriceBlock price={v.price_paise} mrp={v.compare_at_paise} size="h6" align="right" stacked />
        </Box>
      </Box>

      {variants.length > 1 && (
        <Box role="radiogroup" aria-label="Size" sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
          {variants.map((x) => {
            const selected = x.id === variantId, out = x.stock <= 0;
            return (
              <Box key={x.id} component="button" type="button" role="radio" aria-checked={selected}
                onClick={() => { setVariantId(x.id); setQty(1); }}
                sx={{
                  font: "inherit", fontSize: "0.875rem", cursor: "pointer", px: 2.5, py: 1, borderRadius: 999,
                  bgcolor: selected ? "primary.light" : "background.paper",
                  color: selected ? "primary.dark" : out ? "#b4b2c6" : "text.primary",
                  fontWeight: selected ? 600 : 400,
                  border: selected ? "1.5px solid" : "1px solid", borderColor: selected ? "primary.main" : "divider",
                }}>
                {x.label}{out ? " (sold out)" : ""}
              </Box>
            );
          })}
        </Box>
      )}
      {!soldOut && v.stock <= 5 && (
        <Typography variant="caption" color="error" display="block" sx={{ mb: 1 }}>Only {v.stock} left</Typography>
      )}

      {shortText && <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.7 }}>{shortText}</Typography>}
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2.5 }}>
        Inclusive of all taxes. Free shipping across India.
      </Typography>

      {children}

      {/* Add-to-cart bar: fixed at the bottom on phones, inline on desktop */}
      <Box sx={{
        position: { xs: "fixed", md: "static" }, left: 0, right: 0, bottom: 0, zIndex: 1050,
        display: "flex", gap: 1.5, alignItems: "center",
        px: { xs: 2, md: 0 }, pt: { xs: 1.5, md: 0 }, mt: { md: 3 },
        pb: { xs: "calc(12px + env(safe-area-inset-bottom))", md: 0 },
        bgcolor: { xs: "background.paper", md: "transparent" },
        borderTop: { xs: "1px solid #e4e2f5", md: "none" },
      }}>
        <QtyStepper value={qty} onChange={setQty} max={maxQty} />
        <Button variant="contained" size="large" disabled={soldOut} sx={{ flex: 1, py: 1.5 }}
          onClick={() => {
            add({
              variantId: v.id, slug: product.slug, name: product.name, label: v.label,
              image: product.images[0] ?? null, unitPaise: v.price_paise, qty,
            });
            setAdded(true);
          }}>
          {soldOut ? "Sold out" : "Add to Cart"}
        </Button>
      </Box>

      <Snackbar open={added} autoHideDuration={3000} onClose={() => setAdded(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ bottom: { xs: 88, md: 24 } }}
        message="Added to cart"
        action={<Button component={Link} href="/cart/" size="small" color="inherit" sx={{ textDecoration: "underline" }}>View cart</Button>} />
    </Box>
  );
}
