export interface Product {
  id: number;
  name: string;
  slug?: string;
  price: number;
  description: string;
  longDescription?: string;
  specifications?: Record<string, string | undefined>;
  category: string[];
  image: string;
  additionalImages: string[];
  stock?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
