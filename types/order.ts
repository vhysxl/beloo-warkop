import { OrderStatus } from "./enum";

// Interface untuk pesanan
export interface Order {
  order_id: number;
  user_id: number;
  total_amount: number;
  status: OrderStatus;
  payment_type?: string;
  midtrans_order_id?: string;
  payment_link?: string;
  order_items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

// Interface untuk detail pesanan
export interface OrderItem {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  subtotal: number;
  notes?: string;
}
