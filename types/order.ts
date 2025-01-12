import { OrderStatus } from "./enum";

// Interface untuk pesanan
export interface Order {
  name: string;
  order_id: number;
  user_id: number;
  total_amount: number;
  status: OrderStatus;
  method: string;
  payment_type?: string;
  midtrans_order_id?: string;
  payment_link?: string;
  order_items: OrderItem[];
  created_at: Date;
  updated_at: Date;
}

// Interface untuk detail pesanan
export interface OrderItem {
  order_item_id: number;
  product_name: string;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_time: number;
  subtotal: number;
  notes?: string;
}
