
import ProductCard from "@/components/product-card";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import type { Category, Product } from "@/lib/types";
import { notFound } from "next/navigation";

// This function generates static pages for all categories defined in categories.json
export async function generateStaticParams() {
  const categories: Category[] = categoriesData.categories;
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// This function generates metadata for the category page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const categories: Category[] = categoriesData.categories;
  const category = categories.find((c) => c.slug === params.slug);

  // If category is not found in JSON, create a generic title
  const title = category ? `${category.name} - huzi.pk` : `${params.slug} - huzi.pk`;
  const description = category ? `Shop for ${category.name} at huzi.pk.` : `Shop for ${params.slug} at huzi.pk.`;

  return {
    title,
    description,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const categories: Category[] = categoriesData.categories;
  const products: Product[] = productsData.products;

  // Find the category from the JSON file
  let category = categories.find((c) => c.slug === slug);
  
  // If the category is not found, we create a temporary one.
  // This allows creating categories just by adding them to products.
  if (!category) {
    category = {
      id: 0,
      name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      slug: slug,
      image: '' // No image needed for temporary category
    }
  }

  // Filter products that include the current category slug in their `category` array
  const categoryProducts = products.filter(
    (product) => product.category.includes(slug)
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-2 text-center font-headline text-4xl font-bold">
        {category.name}
      </h1>
      <p className="mb-8 text-center text-muted-foreground">
        {`Browse our collection of ${category.name.toLowerCase()}.`}
      </p>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6 lg:gap-8">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No products found in this category yet.
        </p>
      )}
    </div>
  );
}
