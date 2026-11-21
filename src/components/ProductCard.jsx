"use client";
import { useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useCart } from "@/lib/cart";
import { formatINR, discountPercent } from "@/lib/money";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const v = product.variants[0];
  const many = product.variants.length > 1;
  const off = Math.max(0, ...product.variants.map((x) => discountPercent(x.price_paise, x.compare_at_paise)));
  const quickAdd = !many && v && v.stock > 0; // sizes need the product page
  const href = `/products/${product.slug}/`;

  return (
    <Box sx={{ position: "relative", border: 1, borderColor: "divider", borderRadius: "18px", p: 1.25, bgcolor: "background.paper" }}>
      <Box component={Link} href={href} sx={{ display: "block", textDecoration: "none", color: "inherit" }}>
        <Box sx={{ position: "relative", aspectRatio: "1 / 1", bgcolor: "#F6F5FF", borderRadius: "12px", overflow: "hidden", mb: 1.25 }}>
          {product.images[0] && (
            <img src={product.images[0]} alt={product.name} loading="lazy"
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
          )}
          {off > 0 && (
            <Box sx={{ position: "absolute", top: 8, left: 8, bgcolor: "text.primary", color: "#fff", fontSize: "0.65rem",
                       fontWeight: 600, px: 1, py: 0.35, borderRadius: 1.5, letterSpacing: "0.04em" }}>
              {off}% OFF
            </Box>
          )}
        </Box>
        <Typography variant="caption" color="text.secondary" display="block">Si6teen</Typography>
        <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.35, minHeight: "2.7em",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", mb: 1 }}>
          {product.name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <Box sx={{ bgcolor: "#F3F3F6", borderRadius: 999, px: 1.5, py: 0.75, minWidth: 0 }}>
          <Typography variant="body2" fontWeight={600} noWrap>
            {many && <Box component="span" sx={{ fontWeight: 400, color: "text.secondary", mr: 0.5 }}>From</Box>}
            {v && formatINR(v.price_paise)}
          </Typography>
        </Box>
        {quickAdd ? (
          <IconButton aria-label={`Add ${product.name} to cart`} onClick={() => {
            add({ variantId: v.id, slug: product.slug, name: product.name, label: v.label,
                  image: product.images[0] ?? null, unitPaise: v.price_paise, qty: 1 });
            setAdded(true);
          }} sx={{ bgcolor: "text.primary", color: "#fff", width: 34, height: 34, "&:hover": { bgcolor: "#000" } }}>
            <AddIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton component={Link} href={href} aria-label={`Choose size for ${product.name}`}
            sx={{ bgcolor: "text.primary", color: "#fff", width: 34, height: 34, "&:hover": { bgcolor: "#000" } }}>
            <AddIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Snackbar open={added} autoHideDuration={2500} onClose={() => setAdded(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} sx={{ bottom: { xs: 90, md: 24 } }}
        message="Added to cart"
        action={<Button component={Link} href="/cart/" size="small" color="inherit" sx={{ textDecoration: "underline" }}>View cart</Button>} />
    </Box>
  );
}
