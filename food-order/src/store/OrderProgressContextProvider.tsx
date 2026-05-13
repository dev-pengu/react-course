import { useState, type PropsWithChildren } from "react";
import { OrderProgressContext } from "./order-progress-context";

export function OrderProgressContextProvider({ children }: PropsWithChildren) {
    const [step, setStep] = useState<'cart-confirmation' | 'cart' | 'checkout' | 'confirmation' | null>(null);

    const showCart = () => setStep('cart');
    const hideCart = () => setStep(null);
    const showCartConfirmation = () => setStep('cart-confirmation');
    const hideCartConfirmation = () => setStep(null);
    const showCheckout = () => setStep('checkout');
    const hideCheckout = () => setStep(null);
    const showConfirmation = () => setStep('confirmation');
    const hideConfirmation = () => setStep(null);

    const contextValue = {
        step,
        showCart,
        hideCart,
        showCartConfirmation,
        hideCartConfirmation,
        showCheckout,
        hideCheckout,
        showConfirmation,
        hideConfirmation
    };

    return <OrderProgressContext.Provider value={contextValue}>{children}</OrderProgressContext.Provider>
}