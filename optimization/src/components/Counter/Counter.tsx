import { useCallback, useMemo, useState } from "react";

import CounterOutput from "./CounterOutput";
import { log } from "../../log";
import IconButton from "../UI/IconButton";
import MinusIcon from "../UI/Icons/MinusIcon";
import PlusIcon from "../UI/Icons/PlusIcon";
import CounterHistory from "./CounterHistory";

function isPrime(num: number): boolean {
    log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (num <= 1) {
    return false;
  }

  const limit = Math.sqrt(num);

  for (let i = 2; i <= limit; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

export default function Counter({ initialCount }: { initialCount: number }) {
    log('<Counter /> rendered', 1);
    const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

  // const [counter, setCounter] = useState(initialCount);
  const [counterChanges, setCounterChanges] = useState<{value: number, id: number}[]>([{ value: initialCount, id: Math.random() * 1000 }]);

  const handleDecrement = useCallback(function handleDecrement() {
    // setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [ { value: -1, id: Math.random() * 1000 }, ...prevCounterChanges ]);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    // setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [ { value: 1, id: Math.random() * 1000 }, ...prevCounterChanges ]);
  }, []);

  const currentCounter = counterChanges.reduce((prev, change) => prev + change.value, 0);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
}