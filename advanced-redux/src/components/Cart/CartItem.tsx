import type { CartItem as CartItemType } from '../../types';
import classes from './CartItem.module.css';
import { removeCartItem, addCartItem } from '../../store/cart';
import { useAppDispatch } from '../../store';

const CartItem = ({item}: {item: Omit<CartItemType, 'description'>}) => {
  const { title, quantity, totalPrice, price } = item;
  const dispatch = useAppDispatch();

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => dispatch(removeCartItem(item.id))}>-</button>
          <button onClick={() => dispatch(addCartItem({ id: item.id, title, price, description: '' }))}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;