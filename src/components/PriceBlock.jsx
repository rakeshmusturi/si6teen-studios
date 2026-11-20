"use client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Tag } from "@carbon/react"; // Carbon component
import { formatINR, discountPercent } from "@/lib/money";

export default function PriceBlock({ price, mrp, size = "h6" }) {
  const off = discountPercent(price, mrp);
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
      <Typography variant={size} component="span">{formatINR(price)}</Typography>
      {mrp && mrp > price && (
        <Typography component="span" variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
          {formatINR(mrp)}
        </Typography>
      )}
      {off > 0 && <Tag type="purple" size="sm">{off}% off</Tag>}
    </Box>
  );
}
