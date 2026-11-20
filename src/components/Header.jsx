"use client";
import Link from "next/link";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { useCart } from "@/lib/cart";

const NAV = [
  { href: "/#fragrances", label: "Fragrances" },
  { href: "/#skincare", label: "Skincare" },
  { href: "/#hair-care", label: "Hair care" },
];

export default function Header() {
  const { count, ready, openCart } = useCart();
  return (
    <AppBar position="sticky" color="inherit" elevation={0}
      sx={{ bgcolor: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: 1, borderColor: "divider" }}>
      <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto", justifyContent: "space-between" }}>
        <Link href="/" aria-label="Si6teen home" style={{ display: "flex" }}>
          <Image src="/brand/logo-header.png" alt="Si6teen" width={132} height={32} priority />
        </Link>
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
          {NAV.map((n) => (
            <Button key={n.href} component={Link} href={n.href} color="secondary" size="small">{n.label}</Button>
          ))}
        </Box>
        <IconButton aria-label="Open cart" onClick={openCart} color="secondary">
          <Badge badgeContent={ready ? count : 0} color="primary">
            <ShoppingBagOutlined />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
