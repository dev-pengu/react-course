import QuestionTimer from "./QuestionTimer";
import QuestionAnswers from "./QuestionAnswers";
import { useState} from "react";
import QUESTIONS from "../questions";

export default function Question({questionIndex,  onSelectedAnswer, onSkipAnswer}: {questionIndex: number, onSelectedAnswer: (answer: string) => void, onSkipAnswer: () => void }) {
    const [answer, setAnswer] = useState<{ selectedAnswer: string; isCorrect: boolean | null }>({
        selectedAnswer: '',
        isCorrect: null,
    });

    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    const handleSelectedAnswer = (selected: string) => {
        setAnswer({
            selectedAnswer: selected,
            isCorrect: null,
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: selected,
                isCorrect: QUESTIONS[questionIndex].answers[0] === selected,
            });

            setTimeout(() => {
                onSelectedAnswer(selected);
            }, 2000);
        }, 1000);
    }

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            <QuestionTimer key={timer} timeout={timer} onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null} mode={answerState}/>
            <h2>{QUESTIONS[questionIndex].text}</h2>
            <QuestionAnswers 
                answers={QUESTIONS[questionIndex].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                handleSelectedAnswer={handleSelectedAnswer}
            />
        </div>
    )
}