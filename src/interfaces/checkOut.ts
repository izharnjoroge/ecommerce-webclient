import { ProductInterface } from "./product";

export interface CheckOutInterface {
  items: ProductInterface[];
  amount: number;
  completed: boolean;
}
