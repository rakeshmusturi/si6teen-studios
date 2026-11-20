// Groups products into shop sections using the category stored in the database.
export const GROUPS = [
  { id: "fragrances", title: "Fragrances", test: (p) => /parfum|perfume/i.test(p.category ?? "") },
  { id: "skincare", title: "Skincare", test: (p) => /skin|moistur|cleanser/i.test(p.category ?? "") },
  { id: "hair-care", title: "Hair care", test: (p) => /shampoo|conditioner|hair/i.test(p.category ?? "") },
];

export function groupProducts(products) {
  const used = new Set();
  const sections = GROUPS.map((g) => {
    const items = products.filter((p) => !used.has(p.id) && g.test(p));
    items.forEach((p) => used.add(p.id));
    return { ...g, items };
  }).filter((s) => s.items.length);
  const rest = products.filter((p) => !used.has(p.id));
  if (rest.length) sections.push({ id: "more", title: "More", items: rest });
  return sections;
}
