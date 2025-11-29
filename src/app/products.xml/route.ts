
import productsData from "@/data/products.json";
import type { Product } from "@/lib/types";

// Function to escape XML special characters
function escapeXml(unsafe: string): string {
    if (typeof unsafe !== 'string') {
        return '';
    }
    return unsafe.replace(/[<>&"']/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case "'": return '&apos;';
            default: return c;
        }
    });
}

export async function GET() {
  const products: Product[] = productsData;
  const siteUrl = "https://huzi.pk";

  const productItems = products
    .map((p) => {
      const isOutOfStock = p.stock !== undefined && p.stock <= 0;
      const availability = isOutOfStock ? "out of stock" : "in stock";

      // Basic mapping of your categories to a broad Google category
      const googleCategory = "Apparel & Accessories > Clothing";

      return `
    <item>
      <g:id>${p.id}</g:id>
      <g:title>${escapeXml(p.name)}</g:title>
      <g:description>${escapeXml(p.description)}</g:description>
      <g:link>${siteUrl}/product/${p.slug}</g:link>
      <g:image_link>${p.image.url}</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${p.price.toFixed(2)} PKR</g:price>
      <g:condition>new</g:condition>
      <g:google_product_category>${escapeXml(googleCategory)}</g:google_product_category>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>huzi.pk</title>
    <link>${siteUrl}</link>
    <description>Product feed for huzi.pk</description>
${productItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
