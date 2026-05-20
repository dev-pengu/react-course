import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate("/products");
    }

    return (
        <>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of our React application.</p>
            <p>Go to <Link to="/products">Products Page</Link></p>
            <p><button onClick={navigateHandler}>Go to Products Page (programmatically)</button></p>
        </>
    );
}