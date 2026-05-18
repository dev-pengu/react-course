import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import {toggle} from '../../store/ui';
import type { RootState } from '../../store';

const CartButton = () => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

  return (
    <button className={classes.button} onClick={() => dispatch(toggle())}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;