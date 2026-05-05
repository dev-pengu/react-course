import { useEffect, useState } from "react";

export type ProgressBarProps = {
    max: number;
}

export default function ProgressBar({max}: ProgressBarProps) {
    const [remainingTime, setRemainingTime] = useState<number>(max);
    
      useEffect(() => {
        const id = setInterval(() => {
          setRemainingTime((prev) => prev - 10);
        }, 10);
        return () => clearInterval(id);
      }, []);

      return <progress value={remainingTime} max={max} />;
}