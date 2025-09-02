export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: number;
  rating: number;
  sizes?: string[];
}
