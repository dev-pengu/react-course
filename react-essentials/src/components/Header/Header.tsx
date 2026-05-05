import "./Header.css";
import reactImg from "../../assets/react-core-concepts.png";
import { genRandomInt } from "../../utils/number-utils";

const reactDescriptions = ["Fundamental", "Crucial", "Core"];

export default function Header() {
  const description =
    reactDescriptions[genRandomInt(reactDescriptions.length - 1)];
  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will neeed for almost any app you are
        going to build!
      </p>
    </header>
  );
}
