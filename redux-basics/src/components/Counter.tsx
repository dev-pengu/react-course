import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount, toggleShowCounter } from "../store/features/counter/counterSlice";

import classes from './Counter.module.css'; 
import type { RootState } from "../store";

const Counter = () => {
  const {value: count, showCounter: show} = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
       {show && <div className={classes.value}>{count}</div>}
       <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
       </div>
      <button onClick={() => dispatch(toggleShowCounter())}>Toggle Counter</button>
    </main>
  );
};

export default Counter;