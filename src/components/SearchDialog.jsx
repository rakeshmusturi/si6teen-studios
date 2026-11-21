"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { supabase } from "@/lib/supabase";
import { formatINR } from "@/lib/money";

const Ctx = createContext({ openSearch: () => {} });
export const useSearch = () => useContext(Ctx);

export function SearchProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [products, setProducts] = useState(null); // loaded the first time search opens
  const fullScreen = useMediaQuery("(max-width:899.95px)");

  useEffect(() => {
    if (!open || products) return;
    supabase.from("products")
      .select("name,slug,category,tags,images,variants(price_paise)")
      .eq("active", true)
      .then(({ data }) => setProducts(data ?? []));
  }, [open, products]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!products || !term) return [];
    return products.filter((p) =>
      [p.name, p.category, ...(p.tags ?? [])].join(" ").toLowerCase().includes(term));
  }, [q, products]);

  const close = () => { setOpen(false); setQ(""); };

  return (
    <Ctx.Provider value={{ openSearch: () => setOpen(true) }}>
      {children}
      <Dialog open={open} onClose={close} fullScreen={fullScreen} fullWidth maxWidth="sm"
        PaperProps={{ sx: { alignSelf: { md: "flex-start" }, mt: { md: 10 }, borderRadius: { md: "16px" } } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, py: 1.5, borderBottom: 1, borderColor: "divider" }}>
          <SearchIcon color="action" />
          <InputBase autoFocus fullWidth placeholder="Search fragrances, skincare..." value={q}
            onChange={(e) => setQ(e.target.value)} inputProps={{ "aria-label": "Search products" }} />
          <IconButton aria-label="Close search" onClick={close}><CloseIcon /></IconButton>
        </Box>
        <Box sx={{ p: 2, minHeight: { md: 120 } }}>
          {!q.trim() && <Typography color="text.secondary" variant="body2">Type a product name, like “perfume” or “cleanser”.</Typography>}
          {q.trim() && !products && <Typography color="text.secondary" variant="body2">Searching…</Typography>}
          {q.trim() && products && results.length === 0 && (
            <Typography color="text.secondary" variant="body2">No products found for “{q.trim()}”.</Typography>
          )}
          {results.map((p) => {
            const from = Math.min(...p.variants.map((v) => v.price_paise));
            return (
              <Box key={p.slug} component={Link} href={`/products/${p.slug}/`} onClick={close}
                sx={{ display: "flex", gap: 2, alignItems: "center", py: 1, textDecoration: "none", color: "inherit" }}>
                <Box sx={{ width: 56, height: 56, bgcolor: "#F6F5FF", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}>
                  {p.images?.[0] && <img src={p.images[0]} alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={600}>{p.name}</Typography>
                  <Typography variant="caption" color="text.secondary">From {formatINR(from)}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Dialog>
    </Ctx.Provider>
  );
}
