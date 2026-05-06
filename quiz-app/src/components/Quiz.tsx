import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState<string[]>([]);

    const activeQuestionIndex = userAnswers.length;
    const isQuizFinished = activeQuestionIndex >= QUESTIONS.length;

    const handleSelectedAnswer = useCallback((selected: string) => {
        setUserAnswers(prev => [...prev, selected])
    }, []);

    const handleTimeout = useCallback(() => handleSelectedAnswer(""), [handleSelectedAnswer]);

    if (isQuizFinished) {
        return <Summary userAnswers={userAnswers}/>;
    }

    return (
        <div id="quiz">
            <Question 
                key={activeQuestionIndex}
                questionIndex={activeQuestionIndex}
                onSelectedAnswer={handleSelectedAnswer}
                onSkipAnswer={handleTimeout}
            />
        </div>
        
    );
}