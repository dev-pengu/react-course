import { use } from "react";

import Button from "./Button";
import Modal from "./Modal";
import { OrderProgressContext } from "../store/order-progress-context";

export default function Confirmation() {
    const { step, hideConfirmation } = use(OrderProgressContext);

    return (
        <Modal open={step === 'confirmation'} onClose={step === 'confirmation' ? hideConfirmation : null}>
            <h2>Order Confirmed!</h2>
            <p>Thank you for your order. Your delicious food will be with you shortly.</p>
            <p className="modal-actions">
                <Button onClick={hideConfirmation}>Okay</Button>
            </p>
        </Modal>
    )
}