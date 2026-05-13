import { use } from "react";

import { CartContext } from "../store/cart-context";
import { OrderProgressContext } from "../store/order-progress-context";
import Button from "./Button";
import Modal from "./Modal";

export default function CartConfirmation() {
    const { items } = use(CartContext);
    const { step, showCart, hideCartConfirmation } = use(OrderProgressContext);

    return (
        <Modal open={step === 'cart-confirmation'} onClose={step === 'cart-confirmation' ? hideCartConfirmation : null}>
            <h2>Item Successfully Added to Cart</h2>
            {items.length > 0 && (
                <p className="confirmation-item">
                    <img src={`http://localhost:3000/${items[items.length - 1].meal.image}`} alt={items[items.length - 1].meal.name} />
                    <span>{items[items.length - 1].meal.name} has been added to your cart.</span>
                </p>
            )}
            <p className="modal-actions">
                <Button isText onClick={hideCartConfirmation}>Continue Shopping</Button>
                <Button onClick={showCart}>View Cart</Button>
            </p>
        </Modal>
    )
}