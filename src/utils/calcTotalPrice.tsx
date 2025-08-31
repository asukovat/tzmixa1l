// Интерфейс для элемента корзины
export interface CartItem {
  id: number;
  price: number;
  count: number;
  title: string;
  imageUrl: string;
  size?: string;
}

// Функция с типизацией
export const calcTotalPrice = (items: CartItem[]): number => {
  return items.reduce((sum: number, obj: CartItem) => obj.price * obj.count + sum, 0);
};