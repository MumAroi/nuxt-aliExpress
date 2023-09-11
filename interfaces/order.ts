import { Product } from './product';
export interface Order {
  address: string;
  city: string;
  country: string;
  created_at: Date;
  id: number;
  name: string;
  orderItem: {
    created_at: Date
    id:number
    orderId:number
    product:Product
    productId:number
  }[];
  stripeId: string;
  userId: string;
  zipcode: string;
}