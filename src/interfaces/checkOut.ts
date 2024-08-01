import { ProductInterface } from "./product";

export interface CheckOutInterface {
  items: ProductInterface[];
  details: {};
  amount: number;
  completed: boolean;
  user_id: string;
}

export interface OrderInterface {
  id: string;
  items: ProductInterface[];
  details: {};
  amount: number;
  completed: boolean;
  created_at: Date;
}
