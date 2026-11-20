"use client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Tag } from "@carbon/react"; // Carbon component
import { formatINR, discountPercent } from "@/lib/money";

export default function PriceBlock({ price, mrp, size = "h6", align = "left", stacked = false }) {
  const off = discountPercent(price, mrp);
  const mrpEl = mrp && mrp > price && (
    <Typography component="span" variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
      {formatINR(mrp)}
    </Typography>
  );
  const tagEl = off > 0 && <Tag type="purple" size="sm">{off}% off</Tag>;
  const justify = align === "right" ? "flex-end" : "flex-start";

  if (stacked) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: justify, gap: 0.5 }}>
        <Typography variant={size} component="span" sx={{ lineHeight: 1.2 }}>{formatINR(price)}</Typography>
        {(mrpEl || tagEl) && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", justifyContent: justify }}>{mrpEl}{tagEl}</Box>
        )}
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", justifyContent: justify }}>
      <Typography variant={size} component="span">{formatINR(price)}</Typography>
      {mrpEl}{tagEl}
    </Box>
  );
}
