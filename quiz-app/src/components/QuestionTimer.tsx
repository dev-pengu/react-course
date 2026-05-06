import { useEffect, useState } from "react";


declare type TimeOutCallback = () => void;


export default function QuestionTimer({ timeout, mode, onTimeout }: { timeout: number, mode: string, onTimeout: TimeOutCallback | null}) {

    const [remainingTime, setRemainingTime] = useState<number>(timeout);

    useEffect(() => {
        if (onTimeout) {
            const timer = setTimeout(onTimeout, timeout);
            return () => clearTimeout(timer);
        }
    }, [timeout, onTimeout]);

    useEffect(() => {
        const interval = setInterval(() => { 
            setRemainingTime(prev => prev - 10);
        }, 10);
        return () => clearInterval(interval);
    }, []);

    return <progress id="question-time" value={remainingTime} max={timeout} className={mode}/>;
}