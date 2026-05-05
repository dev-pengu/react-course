import { createContext } from "react";


export type CartState = {
  items: CartItem[];
  updateCartItemQuantity: (id: string, delta: number) => void;
  addItemToCart: (id: string) => void;
}

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export const CartContext = createContext<CartState>({
    items: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateCartItemQuantity: (id: string, delta: number) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addItemToCart: (id: string) => {}
});
