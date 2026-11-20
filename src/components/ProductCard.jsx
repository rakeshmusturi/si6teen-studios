import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PriceBlock from "./PriceBlock";

export default function ProductCard({ product }) {
  const v = product.variants[0];
  const hasMany = product.variants.length > 1;
  return (
    <Box component={Link} href={`/products/${product.slug}/`}
      sx={{ textDecoration: "none", color: "inherit", display: "block",
            "&:hover img": { transform: "scale(1.04)" } }}>
      <Box sx={{ aspectRatio: "1 / 1", bgcolor: "primary.light", overflow: "hidden", mb: 1.5 }}>
        {product.images[0] && (
          <img src={product.images[0]} alt={product.name} loading="lazy"
            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s" }} />
        )}
      </Box>
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>{product.name}</Typography>
      {hasMany && <Typography variant="caption" color="text.secondary">From</Typography>}
      {v && <PriceBlock price={v.price_paise} mrp={v.compare_at_paise} size="subtitle1" />}
    </Box>
  );
}
