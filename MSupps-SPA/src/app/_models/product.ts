import { Photo } from './photo';

export interface Product {
  id: number;
  description: string;
  suggestedUse: string;
  otherIngredients: string;
  warnings: string;
  price: number;
  quantity: number;
  name: string;
  brand: string;
  category: string;
  photoUrl: string;
  photos?: Photo[];
}
