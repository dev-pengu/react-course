import Cart from "./components/Cart";
import CartConfirmation from "./components/CartConfirmation";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContextProvider";
import { OrderProgressContextProvider } from "./store/OrderProgressContextProvider";


function App() {
  return (
    <OrderProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <CartConfirmation />
        <Cart />
        <Checkout />
        <Confirmation />
      </CartContextProvider>
    </OrderProgressContextProvider>
  );
}

export default App
