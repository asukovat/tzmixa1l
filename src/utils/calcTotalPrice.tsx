import { CartItem } from "types";

export const calcTotalPrice = (items: CartItem[]): number => {
  return items.reduce((sum: number, obj: CartItem) => obj.price * obj.count + sum, 0);
};