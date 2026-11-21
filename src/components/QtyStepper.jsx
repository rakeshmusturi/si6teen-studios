"use client";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// variant "filled" = grey pill (product page), "outlined" = bordered pill (cart)
export default function QtyStepper({ value, onChange, min = 1, max = 10, variant = "filled" }) {
  return (
    <Box sx={{
      display: "inline-flex", alignItems: "center", borderRadius: 999, flexShrink: 0,
      ...(variant === "filled"
        ? { bgcolor: "#F3F3F6" }
        : { border: 1, borderColor: "divider", bgcolor: "background.paper" }),
    }}>
      <IconButton size="small" aria-label="Decrease quantity" disabled={value <= min}
        onClick={() => onChange(value - 1)}><RemoveIcon fontSize="small" /></IconButton>
      <Typography component="span" sx={{ minWidth: 28, textAlign: "center", fontWeight: 500 }} aria-live="polite">
        {value}
      </Typography>
      <IconButton size="small" aria-label="Increase quantity" disabled={value >= max}
        onClick={() => onChange(value + 1)}><AddIcon fontSize="small" /></IconButton>
    </Box>
  );
}
