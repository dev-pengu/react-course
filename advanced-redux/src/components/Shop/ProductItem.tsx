import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { addCartItem } from '../../store/cart';
import { useAppDispatch } from '../../store';

const ProductItem = ({ title, price, description, id }:  {title: string; price: number; description: string; id: string}) => {
  const dispatch = useAppDispatch();
  
  const addToCartHandler = () => {
    dispatch(addCartItem({ id, title, price, description }));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;