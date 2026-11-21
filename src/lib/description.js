// Turns the product description HTML (from Shopify) into short text + accordion sections.
// Handles three shapes found in the catalog:
//  1. <h3>title</h3><p>text</p><p><strong>Fragrance Notes</strong></p><ul>...</ul>
//  2. <p><strong>Key Benefits:</strong> text</p><p><strong>INCI:</strong> list</p>
//  3. a legacy <table> export (flattened into a bullet list)

const strip = (s) =>
  s.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

const sentenceCase = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const titleFor = (label) => (/^(inci|ingredients?)$/i.test(label) ? "Ingredients" : sentenceCase(label));

function firstSentence(html) {
  const t = strip(html);
  const s = t.split(/(?<=[.!?])\s+/)[0] ?? "";
  return s.length > 200 ? s.slice(0, 197).replace(/\s+\S*$/, "") + "…" : s;
}

export function parseDescription(html) {
  if (!html || !html.trim()) return { short: "", sections: [] };

  if (/<table/i.test(html)) {
    const text = html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, " ");
    const items = text.split("\n")
      .map((l) => l.replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .flatMap((l) => l.split(/(?<=[a-z])\s+(?=[A-Z])/));
    if (!items.length) return { short: "", sections: [] };
    return {
      short: items[0],
      sections: [{ title: "Description", html: `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>` }],
    };
  }

  const cleaned = html.replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, ""); // heading repeats the product name
  const blocks = cleaned.match(/<(p|ul|ol)\b[^>]*>[\s\S]*?<\/\1>/gi) ?? [];

  const sections = [];
  let cur = null;
  const start = (title, content = "") => { cur = { title, html: content }; sections.push(cur); };

  for (const b of blocks) {
    const isP = /^<p/i.test(b);
    const m = isP && b.match(/^<p[^>]*>\s*<strong>\s*([^<]{1,40}?)\s*:?\s*<\/strong>\s*:?\s*([\s\S]*?)<\/p>$/i);
    if (m) {
      const rest = m[2].trim();
      start(titleFor(m[1].replace(/:$/, "").trim()), rest ? `<p>${rest}</p>` : "");
      continue;
    }
    if (isP && /^<p[^>]*>\s*<em>[\s\S]*<\/em>\s*<\/p>$/i.test(b)) {
      // italic tagline ("Eau de Parfum · Long-lasting") belongs with the description
      const d = sections.find((s) => s.title === "Description");
      if (d) d.html += b; else start("Description", b);
      continue;
    }
    if (!cur) start("Description");
    cur.html += b;
  }

  const out = sections.filter((s) => strip(s.html));
  return { short: out[0] ? firstSentence(out[0].html) : "", sections: out };
}
