import quizLogo from '../assets/quiz-logo.png';

export default function Header() {
    return (
        <header>
            <img src={quizLogo} alt="A picture of a quiz on a clipboard"/>
            <h1>ReactQuiz</h1>
        </header>
    ); 
}