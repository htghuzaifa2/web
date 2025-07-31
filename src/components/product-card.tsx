
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { slugify } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const productSlug = slugify(product.name);
  // Using a tiny, fast-loading SVG placeholder for the blur effect
  const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=";
  
  return (
    <Link href={`/product/${productSlug}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <CardContent className="p-0 flex flex-col flex-grow">
          <div className="relative aspect-[1/1.15] w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              key={product.image}
              placeholder="blur"
              blurDataURL={placeholderImage}
            />
          </div>
          <div className="p-3 text-center flex-grow flex flex-col justify-between">
            <h3 className="font-headline text-base font-semibold leading-tight mb-2 break-words min-h-[2.5rem]">
              {product.name}
            </h3>
            <p className="text-sm font-medium text-muted-foreground mt-auto">{`PKR ${Math.round(product.price)}`}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
