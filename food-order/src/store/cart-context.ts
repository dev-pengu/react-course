/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext} from "react";
import type { CartItem, Meal } from "../types";

export const CartContext = createContext<{
    items: CartItem[];
    addItem: (meal: Meal) => void;
    incrementQuantity: (mealId: string) => void;
    decrementQuantity: (mealId: string) => void;
    clearCart: () => void;
}>({
    items: [],
    addItem: (meal: Meal) => {},
    incrementQuantity: (mealId: string) => {},
    decrementQuantity: (mealId: string) => {},
    clearCart: () => {},
})