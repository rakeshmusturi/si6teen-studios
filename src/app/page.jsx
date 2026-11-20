import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { getProducts } from "@/lib/products";
import { groupProducts } from "@/lib/groups";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const products = await getProducts(); // runs at build time (static export)
  const sections = groupProducts(products);
  const heroImage = products.find((p) => /parfum|perfume/i.test(p.category ?? ""))?.images[0];

  return (
    <>
      {/* Hero */}
      <Box sx={{ background: "linear-gradient(135deg, #E7E5FF 0%, #F6F5FF 60%, #FFFFFF 100%)" }}>
        <Container maxWidth="lg" sx={{
          py: { xs: 6, md: 10 }, display: "grid", gap: 4, alignItems: "center",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" } }}>
          <Box>
            <Typography variant="caption" sx={{ letterSpacing: "0.25em", textTransform: "uppercase", color: "primary.dark", fontWeight: 600 }}>
              Modern • Minimal • Premium
            </Typography>
            <Typography variant="h2" component="h1" sx={{ mt: 1.5, mb: 2, fontSize: { xs: "2.25rem", md: "3.5rem" }, lineHeight: 1.1 }}>
              Fragrance and skincare, made simple.
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 480 }}>
              Eau de parfum, cleansers and creams from Si6teen Studios. Free shipping across India.
            </Typography>
            <Button component={Link} href="/#fragrances" variant="contained" size="large">Shop now</Button>
          </Box>
          {heroImage && (
            <Box sx={{ aspectRatio: "1 / 1", maxWidth: 480, width: "100%", justifySelf: "center", overflow: "hidden" }}>
              <img src={heroImage} alt="Si6teen fragrance" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>
          )}
        </Container>
      </Box>

      {/* Product sections */}
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        {sections.map((s) => (
          <Box key={s.id} id={s.id} sx={{ pt: 8, scrollMarginTop: "72px" }}>
            <Typography variant="h4" component="h2" sx={{ mb: 3 }}>{s.title}</Typography>
            <Box sx={{ display: "grid", gap: { xs: 2, md: 4 },
                       gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" } }}>
              {s.items.map((p) => <ProductCard key={p.id} product={p} />)}
            </Box>
          </Box>
        ))}
      </Container>
    </>
  );
}
