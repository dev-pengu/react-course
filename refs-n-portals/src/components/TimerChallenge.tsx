import { useRef, useState } from "react";
import ResultModal, { type ResultRef } from "./ResultModal";

export type TimerChallengeProps = {
  title: string;
  targetTime: number;
};

export default function TimerChallenge({
  title,
  targetTime,
}: TimerChallengeProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(targetTime * 1000);
  const timerRef = useRef<number>(null);
  const modalRef = useRef<ResultRef>(null);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  
  if (timeRemaining <= 0) {
    clearInterval(timerRef.current!)
    modalRef.current?.open();
  }

  const handleStart = () => {
    timerRef.current = setInterval(() => {
        setTimeRemaining(prev => prev - 10)
    }, 10);
  };

  const handleStop = () => {
    modalRef.current?.open();
    clearInterval(timerRef.current!);
  };

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  }

  return (
    <>
      <ResultModal ref={modalRef} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
