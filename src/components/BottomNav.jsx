"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import GridViewOutlined from "@mui/icons-material/GridViewOutlined";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { useCart } from "@/lib/cart";
import { useSearch } from "./SearchDialog";

// Floating tab bar, phones only, home page only.
export default function BottomNav() {
  const path = usePathname() ?? "";
  const { count, ready } = useCart();
  const { openSearch } = useSearch();
  if (path !== "/") return null;

  const item = (label, icon, props, active) => (
    <Box sx={{ position: "relative", display: "flex", justifyContent: "center", flex: 1 }}>
      <IconButton aria-label={label} sx={{ color: active ? "text.primary" : "text.secondary" }} {...props}>{icon}</IconButton>
      {active && <Box sx={{ position: "absolute", bottom: 2, width: 18, height: 3, borderRadius: 2, bgcolor: "primary.main" }} />}
    </Box>
  );

  return (
    <Box component="nav" aria-label="Main" sx={{
      display: { xs: "flex", md: "none" }, position: "fixed", zIndex: 1050,
      left: 16, right: 16, bottom: "calc(12px + env(safe-area-inset-bottom))",
      bgcolor: "#F3F3F6", borderRadius: "20px", px: 1, py: 0.5,
      boxShadow: "0 6px 20px rgba(30,30,30,0.10)" }}>
      {item("Home", <HomeOutlined />, { component: Link, href: "/" }, true)}
      {item("Search", <SearchIcon />, { onClick: openSearch })}
      {item("Shop by category", <GridViewOutlined />, { component: Link, href: "/#fragrances" })}
      {item("Cart", <Badge badgeContent={ready ? count : 0} color="primary"><ShoppingBagOutlined /></Badge>, { component: Link, href: "/cart/" })}
    </Box>
  );
}
