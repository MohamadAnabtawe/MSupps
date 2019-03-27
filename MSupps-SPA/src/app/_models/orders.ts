import { Product } from './product';

export interface Orders {
  id: number;
  orderDate: Date;
  totalPrice: number;
  orderedProducts?: Product[];
}
