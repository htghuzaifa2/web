import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`} className="group block">
      <Card className="relative overflow-hidden rounded-lg">
        <div className="aspect-[3/2] w-full">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            data-ai-hint={`${category.slug} fashion`}
          />
        </div>
        <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="font-headline text-3xl font-bold text-white shadow-lg">
            {category.name}
          </h3>
        </div>
      </Card>
    </Link>
  );
}
