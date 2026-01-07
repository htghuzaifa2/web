

export interface ImageObject {
  url: string;
  alt: string;
}

export interface Product {
  id: number;
  name: string;
  slug?: string;
  price: number;
  description: string;
  longDescription?: string;
  specifications?: Record<string, any>;
  category: string[];
  image: ImageObject;
  additionalImages: ImageObject[];
  stock?: number;
  // SEO and Merchant Center Fields
  brand?: string;
  condition?: 'new' | 'used' | 'refurbished';
  availability?: 'in_stock' | 'out_of_stock' | 'preorder';
  googleProductCategory?: string;
  currency?: string;
  shortDescription?: string;
  specs?: Record<string, any>; // The new JSON uses 'specs' sometimes, mapping it to specifications or keeping both
  notes?: string;
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
