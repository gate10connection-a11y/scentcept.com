export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  sizes: string[];
  isNew?: boolean;
  isSale?: boolean;
  collection: string;
  gender: "women" | "men" | "unisex";
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}
