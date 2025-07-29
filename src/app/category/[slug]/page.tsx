
import ProductCard from "@/components/product-card";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import type { Category, Product } from "@/lib/types";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories: Category[] = categoriesData.categories;
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const categories: Category[] = categoriesData.categories;
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} - huzi.pk`,
    description: `Shop for ${category.name} at huzi.pk.`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const categories: Category[] = categoriesData.categories;
  const products: Product[] = productsData.products;

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

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
