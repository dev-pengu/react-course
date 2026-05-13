import { useState, type PropsWithChildren } from "react";
import type { CartItem, Meal } from "../types";
import { CartContext } from "./cart-context";

export function CartContextProvider({ children }: PropsWithChildren) {

    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (meal: Meal) => {
        setItems((prevItems) => {
            if (prevItems.some((item) => item.meal.id === meal.id)) {
                return prevItems.map((item) => {
                    if (item.meal.id === meal.id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
            } else {
                return [...prevItems, { meal, quantity: 1 }];
            }
        })
    }

    const incrementQuantity = (mealId: string) => {
        setItems((prevItems) => prevItems.map((item) => {
            if (item.meal.id === mealId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        }));
    }

    const decrementQuantity = (mealId: string) => {
        setItems((prevItems) => prevItems.map((item) => {
            if (item.meal.id === mealId) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        }).filter((item) => item.quantity > 0));
    }

    const clearCart = () => {
        setItems([]);
    }

    const contextValue = {
        items,
        addItem,
        incrementQuantity,
        decrementQuantity,
        clearCart
    }

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}