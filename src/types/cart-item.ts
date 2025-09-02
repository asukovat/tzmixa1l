export interface CartItem {
  id: number;
  count: number;
  title: string;
  price: number;
  imageUrl: string;
  size?: string;
}