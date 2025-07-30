
import ProductCard from "@/components/product-card";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import type { Category, Product } from "@/lib/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// This function generates static pages for all categories defined in categories.json
export async function generateStaticParams() {
  const categories: Category[] = categoriesData.categories;
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// This function generates metadata for the category page
export async function generateMetadata({ params }: { params: { slug:string } }): Promise<Metadata> {
  const categories: Category[] = categoriesData.categories;
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
      notFound();
  }

  const title = `Shop for ${category.name} in Pakistan - huzi.pk`;
  const description = `Explore our collection of ${category.name} and get fast delivery all over Pakistan. High-quality products at the best prices.`;

  return {
    title,
    description,
    openGraph: {
        title,
        description,
        url: `/category/${category.slug}`
    }
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const categories: Category[] = categoriesData.categories;
  const products: Product[] = productsData.products;

  // Find the category from the JSON file
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    notFound();
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-6">
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
