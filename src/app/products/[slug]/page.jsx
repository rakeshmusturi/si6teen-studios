import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getProducts, getProductBySlug } from "@/lib/products";
import { groupProducts } from "@/lib/groups";
import AddToCart from "@/components/AddToCart";
import Gallery from "@/components/Gallery";
import Crumbs from "@/components/Crumbs";
import DetailsAccordion from "@/components/DetailsAccordion";

// Pre-render every product page at build time (good for Google).
export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = await getProductBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.seo_title ?? p.name,
    description: p.seo_description ?? undefined,
    openGraph: { images: p.images[0] ? [p.images[0]] : [] },
  };
}

export default async function ProductPage({ params }) {
  const p = await getProductBySlug(params.slug);
  if (!p) notFound();
  const g = groupProducts([p])[0];
  const group = g ? { id: g.id, title: g.title } : null; // plain data only (client component)

  // Structured data so Google can show price and availability
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: p.images,
    brand: { "@type": "Brand", name: "Si6teen" },
    offers: p.variants.map((v) => ({
      "@type": "Offer", priceCurrency: "INR", price: (v.price_paise / 100).toFixed(2), sku: v.sku,
      availability: v.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    })),
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Crumbs group={group} name={p.name} />
      <Box sx={{ display: "grid", gap: { xs: 3, md: 6 }, mt: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
        <Gallery images={p.images} alt={p.name} />
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>{p.name}</Typography>
          <AddToCart product={p} />
          <Box sx={{ mt: 4 }}><DetailsAccordion html={p.description} /></Box>
        </Box>
      </Box>
    </Container>
  );
}
