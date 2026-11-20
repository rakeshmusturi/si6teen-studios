"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBackIosNewRounded";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { useCart } from "@/lib/cart";

// Compact top bar shown on phones only (the full Header covers tablet/desktop).
export default function MobileTopBar({ title = "", showCart = false }) {
  const router = useRouter();
  const { count, ready } = useCart();
  return (
    <Box sx={{
      display: { xs: "flex", md: "none" }, position: "sticky", top: 0, zIndex: 1100,
      height: 56, px: 1.5, alignItems: "center", justifyContent: "space-between",
      bgcolor: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)",
    }}>
      <IconButton aria-label="Back" sx={{ bgcolor: "#F3F3F6" }}
        onClick={() => (window.history.length > 1 ? router.back() : router.push("/"))}>
        <ArrowBack fontSize="small" />
      </IconButton>
      <Typography variant="subtitle1" fontWeight={600}>{title}</Typography>
      {showCart ? (
        <IconButton component={Link} href="/cart/" aria-label="Open cart" sx={{ bgcolor: "#F3F3F6" }}>
          <Badge badgeContent={ready ? count : 0} color="primary"><ShoppingBagOutlined fontSize="small" /></Badge>
        </IconButton>
      ) : (
        <Box sx={{ width: 40 }} />
      )}
    </Box>
  );
}
