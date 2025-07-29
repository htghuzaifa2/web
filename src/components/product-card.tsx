
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              data-ai-hint={`${product.category[0]} clothing`}
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="font-headline text-md font-semibold truncate">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{`PKR ${Math.round(product.price)}`}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
