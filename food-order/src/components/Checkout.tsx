import { useActionState, use } from "react";

import { CartContext } from "../store/cart-context";
import { formatter } from "../util/number-utils";
import Input from "./Input";
import Button from "./Button";
import Modal from "./Modal";
import { OrderProgressContext } from "../store/order-progress-context";
import useFetch from "../hooks/useFetch";
import Error from "./Error";

const requestConfig: RequestInit = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {

    const { items, clearCart } = use(CartContext);
    const { step, hideCheckout, showConfirmation } = use(OrderProgressContext);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, isFetching, error, sendRequest, clearData] = useFetch('http://localhost:3000/orders', null, requestConfig);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const submitAction = async (prevFormState: unknown, formData: FormData): Promise<void> => {
        const customer = Object.fromEntries(formData.entries());

        await sendRequest({order:{
            items,
            customer
        }});
        clearCart();
        clearData();
        showConfirmation();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ formState, formAction, isLoading ] = useActionState(submitAction, null);

    return (
        <Modal open={step === 'checkout'} onClose={step === 'checkout' ? hideCheckout : null}>
            <h2>Checkout</h2>
            <p>Total Amount: {formatter.format(items.reduce((total, item) => total + Number(item.meal.price) * item.quantity, 0))}</p>
            <form action={formAction}>
                <Input label="Full Name" type="text" id="name" name="name" required />
                <Input label="E-Mail Address" type="email" id="email" name="email" required />
                <Input label="Street" type="text" id="street" name="street" required />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" name="postal-code" required />
                    <Input label="City" type="text" id="city" name="city" required />
                </div>

                {error && <Error title="Failed to submit order" message={error.message || 'Something went wrong, failed to submit your order. Please try again later.'} />}

                <p className="modal-actions">
                    {!isLoading && <Button isText type="button" onClick={hideCheckout}>Close</Button>}
                    <Button type="submit" disabled={isLoading}>{isLoading ? "Submitting..." : "Submit Order"}</Button>
                </p>
            </form>
        </Modal>
    )

}