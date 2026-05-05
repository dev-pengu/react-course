import { useState } from 'react';

import Header from './components/Header';
import UserInput from './components/UserInput';
import Results from './components/Results';

export type UserInput = {
    initialInvestment: number,
    annualInvestment: number,
    expectedReturn: number,
    duration: number,
}

function App() {
  const [userInput, setUserInput] = useState<UserInput>({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  function handleChange(inputIdentifier: string, newValue: number) {
    setUserInput((prevUserInput: UserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: newValue,
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      <Results input={userInput} />
    </>
  );
}

export default App;
