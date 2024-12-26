// Interface untuk produk/menu
export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
