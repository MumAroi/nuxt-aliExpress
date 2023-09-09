import { Product } from './product';

export interface User {
  isMenuOverlay: boolean;
  isLoading: boolean;
  cart: Product[];
  checkout: Product[];
}
