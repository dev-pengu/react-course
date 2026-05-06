import { useRef } from "react";

export default function QuestionAnswers({answers, selectedAnswer, answerState, handleSelectedAnswer}: { answers: string[], selectedAnswer: string, answerState: string, handleSelectedAnswer: (answer: string) => void }) {

    const shuffledAnswersRef = useRef<string[]>(undefined);

    if (!shuffledAnswersRef.current) {
        shuffledAnswersRef.current = [...answers].sort(() => Math.random() - 0.5);
    } 

    return (
        <ul id="answers">
            {shuffledAnswersRef.current.map((answer) => {
                const isSelected = selectedAnswer === answer;
                let cssClasses = '';

                if (answerState === 'answered' && isSelected) {
                    cssClasses = 'selected';
                } else if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClasses = answerState;
                }

                return <li key={answer} className="answer">
                    <button onClick={() => handleSelectedAnswer(answer)} className={cssClasses} disabled={answerState !== ''}>{answer}</button>
                </li>;
            })}
        </ul>
    );
}