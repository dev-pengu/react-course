/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext} from "react";

export const OrderProgressContext = createContext<{
    step: 'cart-confirmation' |'cart' | 'checkout' | 'confirmation' | null;
    showCartConfirmation: () => void;
    hideCartConfirmation: () => void;
    showCart: () => void;
    hideCart: () => void;
    showCheckout: () => void;
    hideCheckout: () => void;
    showConfirmation: () => void;
    hideConfirmation: () => void;
}>({
    step: null,
    showCartConfirmation: () => {},
    hideCartConfirmation: () => {},
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
    showConfirmation: () => {},
    hideConfirmation: () => {},
})