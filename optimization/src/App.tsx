import { useState } from 'react'

import { log } from './log'
import Header from './components/Header';
import Counter from './components/Counter/Counter';
import ConfigureCounter from './components/ConfigureCounter';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetChosenCount(count: number) {
    setChosenCount(count);
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSetChosenCount={handleSetChosenCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App
