
import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`} className="group block" prefetch={true}>
      <Card className="relative overflow-hidden rounded-lg border-2 border-transparent hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
        <div className="aspect-[3/2] w-full overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
            sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 30vw"
            data-ai-hint={`${category.slug} clothing`}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/80 group-hover:via-black/50" />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <h3 className="font-headline text-3xl font-bold text-white text-center shadow-2xl transform transition-all duration-300 group-hover:scale-110">
            {category.name}
          </h3>
        </div>
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </Card>
    </Link>
  );
}
