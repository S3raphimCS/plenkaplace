import { Product } from './Product';

export interface CartItemModel extends Product {
  total?: number;
  quantity: number;
}
