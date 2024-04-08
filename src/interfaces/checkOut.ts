import { ProductInterface } from './product';

export interface CheckOutInterface {
  items: ProductInterface[];
  details: {};
  amount: number;
  completed: boolean;
}
