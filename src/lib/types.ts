export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: string;
  image: string;
  additionalImages: string[];
  rating: {
    rate: number;
    count: number;
  };
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
