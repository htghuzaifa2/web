
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { slugify } from "@/lib/utils";
import ProductCardActions from "./product-card-actions";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const productSlug = slugify(product.name);
  const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=";
  
  return (
    <Card className="group/card relative overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <CardContent className="p-0 flex flex-col flex-grow">
        <div className="relative aspect-square w-full overflow-hidden">
           <Link href={`/product/${productSlug}`} className="group block">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              key={product.image}
              placeholder="blur"
              blurDataURL={placeholderImage}
            />
          </Link>
          <div className="absolute top-2 right-2 opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-300 z-10">
              <ProductCardActions product={product} variant="icon" />
          </div>
        </div>
        <div className="p-3 text-center flex-grow flex flex-col justify-between items-center">
            <h3 className="font-headline text-base font-semibold leading-tight mb-2 break-words flex items-center justify-center min-h-[2.5rem]">
            <Link href={`/product/${productSlug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="text-base font-bold text-price mt-auto">{`PKR ${Math.round(product.price)}`}</p>
          <div className="md:hidden mt-3 w-full">
            <ProductCardActions product={product} variant="button" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
