import { ProductCart } from './productCart';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  role: number;
  dateOfBirth: Date;
  cart?: ProductCart[];
}
