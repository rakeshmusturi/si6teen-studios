import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { getProducts, getProductBySlug } from "@/lib/products";
import { groupProducts } from "@/lib/groups";
import { parseDescription } from "@/lib/description";
import AddToCart from "@/components/AddToCart";
import Gallery from "@/components/Gallery";
import Crumbs from "@/components/Crumbs";
import DetailsAccordion from "@/components/DetailsAccordion";
import MobileTopBar from "@/components/MobileTopBar";

// Pre-render every product page at build time (good for Google).
export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = await getProductBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.seo_title ?? p.name,
    description: p.seo_description ?? parseDescription(p.description).short ?? undefined,
    openGraph: { images: p.images[0] ? [p.images[0]] : [] },
  };
}

export default async function ProductPage({ params }) {
  const p = await getProductBySlug(params.slug);
  if (!p) notFound();
  const g = groupProducts([p])[0];
  const group = g ? { id: g.id, title: g.title } : null; // plain data only (client component)
  const { short, sections } = parseDescription(p.description);

  // Structured data so Google can show price and availability
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: p.images,
    description: short || undefined,
    brand: { "@type": "Brand", name: "Si6teen" },
    offers: p.variants.map((v) => ({
      "@type": "Offer", priceCurrency: "INR", price: (v.price_paise / 100).toFixed(2), sku: v.sku,
      availability: v.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MobileTopBar showCart />
      <Container maxWidth="lg" sx={{ pt: { xs: 0.5, md: 3 }, pb: { xs: 12, md: 3 } }}>
        <Box sx={{ display: { xs: "none", md: "block" }, mb: 1 }}><Crumbs group={group} name={p.name} /></Box>
        <Box sx={{ display: "grid", gap: { xs: 2.5, md: 7 }, gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" }, alignItems: "start" }}>
          <Gallery images={p.images} alt={p.name} />
          <AddToCart product={p} shortText={short}>
            <DetailsAccordion sections={sections} />
          </AddToCart>
        </Box>
      </Container>
    </>
  );
}
