import { use } from "react";

import { CartContext } from "../store/cart-context";

import { type CartItem as CartItemType } from "../types";

export default function CartItem({item}: {item: CartItemType}) {
    const { incrementQuantity, decrementQuantity } = use(CartContext);

    const handleIncrement = () => {
        incrementQuantity(item.meal.id);
    };

    const handleDecrement = () => {
        decrementQuantity(item.meal.id);
    };

    return (
        <li className="cart-item">
            <p>{item.meal.name} - {item.quantity} x ${item.meal.price}</p>
            <p className="cart-item-actions">
                <button onClick={handleDecrement}>-</button>
                <span>{item.quantity}</span>
                <button onClick={handleIncrement}>+</button>
            </p>
        </li>
    )
}