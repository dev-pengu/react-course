import Cart from "./components/Cart/Cart"
import Layout from "./components/Layout/Layout"
import Products from "./components/Shop/Products"
import Notification from "./components/UI/Notification"

import {useSelector} from 'react-redux';
import { useAppDispatch, type RootState } from "./store";
import { useEffect } from "react";
import { fetchCartData } from "./store/cart";


function App() {
  const { cartIsVisible: showCart, notification } = useSelector((state: RootState) => state.ui);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </>
  )
}

export default App
