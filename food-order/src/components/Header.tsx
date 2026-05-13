import { use } from "react";

import logo from "../assets/logo.jpg";
import { CartContext } from "../store/cart-context";
import Button from "./Button";
import { OrderProgressContext } from "../store/order-progress-context";

export default function Header() {
    const { items } = use(CartContext);
    const { showCart } = use(OrderProgressContext);

    return (
        <>
            <header id="main-header">
                <div id="title">
                    <img src={logo} alt="ReactFood Logo" />
                    <h1>ReactFood</h1>
                </div>
                <nav>
                    <Button isText onClick={showCart}>Cart ({items.length})</Button>
                </nav>
            </header>
        </>
    )
}