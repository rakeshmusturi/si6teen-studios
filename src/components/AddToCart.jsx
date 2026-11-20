"use client";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCart } from "@/lib/cart";
import { supabase } from "@/lib/supabase";
import PriceBlock from "./PriceBlock";

export default function AddToCart({ product }) {
  const { add, openCart } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
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

  const base = product.variants.find((x) => x.id === variantId);
  if (!base) return null;
  const v = { ...base, ...(live[base.id] ?? {}) };
  const soldOut = v.stock <= 0;

  return (
    <Stack spacing={2.5}>
      <PriceBlock price={v.price_paise} mrp={v.compare_at_paise} size="h5" />
      <Typography variant="caption" color="text.secondary">
        Inclusive of all taxes. Free shipping.
      </Typography>
      {product.variants.length > 1 && (
        <ToggleButtonGroup exclusive value={variantId} onChange={(_, id) => id && setVariantId(id)} size="small">
          {product.variants.map((x) => (
            <ToggleButton key={x.id} value={x.id} sx={{ px: 3 }}>{x.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
      {!soldOut && v.stock <= 5 && (
        <Typography variant="caption" color="error">Only {v.stock} left</Typography>
      )}
      <Button
        variant="contained" size="large" disabled={soldOut}
        onClick={() => {
          add({
            variantId: v.id, slug: product.slug, name: product.name, label: v.label,
            image: product.images[0] ?? null, unitPaise: v.price_paise, qty: 1,
          });
          openCart();
        }}
      >
        {soldOut ? "Sold out" : "Add to cart"}
      </Button>
    </Stack>
  );
}
