
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
  return (
    <Link href={`/product/${productSlug}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <CardContent className="p-0 flex flex-col flex-grow">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            />
          </div>
          <div className="p-4 text-center flex-grow flex flex-col justify-between">
            <h3 className="font-headline text-md font-semibold leading-tight mb-2">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{`PKR ${Math.round(product.price)}`}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
