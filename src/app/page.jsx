import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { getProducts } from "@/lib/products";
import { groupProducts } from "@/lib/groups";
import { discountPercent } from "@/lib/money";
import ProductCard from "@/components/ProductCard";
import BannerCarousel from "@/components/BannerCarousel";

const bestDiscount = (p) => Math.max(0, ...p.variants.map((v) => discountPercent(v.price_paise, v.compare_at_paise)));

export default async function Home() {
  const products = await getProducts(); // runs at build time (static export)
  const sections = groupProducts(products);

  // Banner 1: the brand. Then one offer banner per category, built from real discounts in the catalog.
  const heroImage = products.find((p) => /parfum|perfume/i.test(p.category ?? ""))?.images[0];
  const slides = [{
    id: "brand", tone: "light", eyebrow: "Modern • Minimal • Premium",
    title: "Fragrance and skincare, made simple.",
    subtitle: "Eau de parfum, cleansers and creams. Free shipping across India.",
    cta: "Shop now", href: "/#fragrances", image: heroImage,
  }];
  for (const s of sections) {
    const top = [...s.items].sort((a, b) => bestDiscount(b) - bestDiscount(a))[0];
    if (top && bestDiscount(top) > 0 && slides.length < 4) {
      slides.push({
        id: top.id, tone: "purple", eyebrow: s.title, title: top.name,
        subtitle: `Save up to ${bestDiscount(top)}% • Free shipping`,
        cta: "Shop now", href: `/products/${top.slug}/`, image: top.images[0],
      });
    }
  }

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 1.5, md: 3 } }}>
      <BannerCarousel slides={slides} />

      {/* Categories */}
      <Box sx={{ mt: { xs: 3, md: 5 } }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>Categories</Typography>
        <Box sx={{ display: "flex", gap: 1, overflowX: "auto", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" }, pb: 0.5 }}>
          {sections.map((s) => (
            <Chip key={s.id} label={s.title} component={Link} href={`/#${s.id}`} clickable variant="outlined"
              sx={{ borderRadius: 999, px: 1, height: 38, fontSize: "0.875rem", borderColor: "divider", bgcolor: "background.paper" }} />
          ))}
        </Box>
      </Box>

      {/* Product sections: swipeable rows on phones, grid on desktop */}
      {sections.map((s) => (
        <Box key={s.id} id={s.id} sx={{ pt: { xs: 4, md: 8 }, scrollMarginTop: "72px" }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2, fontSize: { md: "1.75rem" } }}>{s.title}</Typography>
          <Box sx={{
            display: { xs: "flex", md: "grid" }, gap: { xs: 1.5, md: 3 },
            gridTemplateColumns: { md: "repeat(4, 1fr)" },
            overflowX: { xs: "auto", md: "visible" }, scrollSnapType: { xs: "x proximity" }, scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" }, mx: { xs: -2, md: 0 }, px: { xs: 2, md: 0 }, pb: { xs: 0.5, md: 0 } }}>
            {s.items.map((p) => (
              <Box key={p.id} sx={{ flex: { xs: "0 0 46%", sm: "0 0 30%", md: "initial" }, scrollSnapAlign: "start" }}>
                <ProductCard product={p} />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Container>
  );
}
