import { use } from "react";

import { CartContext } from "../store/cart-context";
import CartItem from "./CartItem";
import { formatter } from "../util/number-utils";
import Button from "./Button";
import Modal from "./Modal";
import { OrderProgressContext } from "../store/order-progress-context";

export default function Cart() {    
    const { items } = use(CartContext);
    const { step, showCheckout, hideCart } = use(OrderProgressContext);

    return (
        <Modal open={step === 'cart'} onClose={step === 'cart' ? hideCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {items.length === 0 && <p>Your cart is empty.</p>}
                {items.map(item => (
                    <CartItem key={item.meal.id} item={item} />
                ))}
            </ul>
            <div className="cart-total">
                {formatter.format(items.reduce((total, item) => total + Number(item.meal.price) * item.quantity, 0))}
            </div>
            <p className="modal-actions">
                <Button isText onClick={hideCart}>Close</Button>
                {items.length > 0 && <Button onClick={showCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    )
}