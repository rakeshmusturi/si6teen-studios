import { supabase } from "./supabase";

/*
 Product shape returned by these helpers:
 {
   id, slug, name, description (HTML), category, tags[], images[],
   seo_title, seo_description,
   variants: [{ id, sku, label, price_paise, compare_at_paise, stock }]
 }
 Prices are GST-inclusive paise.
*/
const SELECT =
  "id,slug,name,description,category,tags,images,seo_title,seo_description," +
  "variants(id,sku,label,price_paise,compare_at_paise,stock)";

const sortVariants = (p) => ({
  ...p,
  variants: [...p.variants].sort((a, b) => a.price_paise - b.price_paise),
});

export async function getProducts() {
  const { data, error } = await supabase
    .from("products").select(SELECT).eq("active", true).order("name");
  if (error) throw new Error("Failed to load products: " + error.message);
  return (data ?? []).map(sortVariants);
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products").select(SELECT).eq("slug", slug).eq("active", true).maybeSingle();
  if (error) throw new Error("Failed to load product: " + error.message);
  return data ? sortVariants(data) : null;
}
