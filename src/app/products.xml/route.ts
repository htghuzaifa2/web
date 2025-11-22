
import productsData from "@/data/products.json";
import type { Product } from "@/lib/types";

// Function to escape XML special characters
function escapeXml(unsafe: string): string {
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

  const productEntries = products
    .map((p) => {
      const isOutOfStock = p.stock !== undefined && p.stock <= 0;
      const availability = isOutOfStock ? "out of stock" : "in stock";

      return `
    <product>
      <id>${p.id}</id>
      <title>${escapeXml(p.name)}</title>
      <link>${siteUrl}/product/${p.slug}</link>
      <price>${p.price.toFixed(2)} PKR</price>
      <image_link>${p.image}</image_link>
      <availability>${availability}</availability>
      <description>${escapeXml(p.description)}</description>
    </product>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<products>
${productEntries}
</products>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
