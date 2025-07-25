import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import productsData from '@/data/products.json';
import Link from 'next/link';
import Image from 'next/image';

// Since this is a server component, this will run on the server.
// The shuffle will be done once at build time for a static page,
// or on each request in a dynamic rendering scenario.
const getShuffledProducts = () => {
  const products: Product[] = productsData;
  return products.sort(() => 0.5 - Math.random());
};

export default function Home() {
  const shuffledProducts = getShuffledProducts();
  const displayProducts = shuffledProducts.slice(0, 10);

  return (
    <div className="bg-background">
      <section className="relative h-[60vh] w-full text-white">
        <Image
          src="https://placehold.co/1600x900"
          alt="Hero background"
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
          data-ai-hint="fashion clothes"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/50 p-4 text-center">
          <h1 className="font-headline text-5xl font-bold md:text-7xl">Discover Your Style</h1>
          <p className="font-body mt-4 max-w-2xl text-lg md:text-xl">
            Explore our curated collection of high-quality apparel and digital goods.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/categories">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold text-foreground md:mb-12 md:text-4xl">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6 lg:gap-8">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
