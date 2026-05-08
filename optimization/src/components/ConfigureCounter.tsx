import { useState } from "react";
import { log } from "../log";



export default function ConfigureCounter({onSetChosenCount}: { onSetChosenCount: (count: number) => void }) {
    log('<ConfigureCounter /> rendered', 1);

    const [enteredNumber, setEnteredNumber] = useState<number>(0);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEnteredNumber(+event.target.value);
      }
    
      function handleSetClick() {
        onSetChosenCount(enteredNumber);
        setEnteredNumber(0);
      }

    return (
        <section id="configure-counter">
          <h2>Set Counter</h2>
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section>
    );
}