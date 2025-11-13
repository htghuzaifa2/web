
import productsData from "@/data/products.json";
import type { Product } from "@/lib/types";

export async function GET() {
  const products: Product[] = productsData;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>huzi.pk Product Feed</title>
<link>https://huzi.pk</link>
<description>Product feed for huzi.pk</description>
${products
  .map(
    (p) => `
  <item>
    <g:id>${p.id}</g:id>
    <g:title>${p.name.replace(/&/g, "&amp;")}</g:title>
    <g:link>https://huzi.pk/product/${p.slug}</g:link>
    <g:price>${p.price.toFixed(2)} PKR</g:price>
    <g:image_link>${p.image}</g:image_link>
    <g:availability>${p.stock === undefined || p.stock > 0 ? "in stock" : "out of stock"}</g:availability>
    <g:description>${p.description.replace(/&/g, "&amp;")}</g:description>
    <g:brand>huzi.pk</g:brand>
    <g:condition>new</g:condition>
    ${p.additionalImages?.map((img) => `<g:additional_image_link>${img}</g:additional_image_link>`).join("") || ""}
  </item>`
  )
  .join("")}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
