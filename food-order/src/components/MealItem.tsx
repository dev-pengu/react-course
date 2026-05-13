import { use } from "react";

import { CartContext } from "../store/cart-context";
import type { Meal } from "../types";
import Button from "./Button";
import { OrderProgressContext } from "../store/order-progress-context";

export default function MealItem({ meal }: { meal: Meal }) {
    const { addItem } = use(CartContext);
    const { showCartConfirmation } = use(OrderProgressContext);

    const handleAddToCart = () => {
        addItem(meal);
        showCartConfirmation();
    };

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">${meal.price}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    )
}