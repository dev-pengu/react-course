import { Link } from "react-router-dom";

const PRODUCTS = [
    { id: 'p1', name: 'Product 1' },
    { id: 'p2', name: 'Product 2' },
    { id: 'p3', name: 'Product 3' },
]

export default function ProductsPage() {
    return (
        <>
            <h1>Products Page</h1>
            <p>Here you can find all our products.</p>
            <ul>
                {PRODUCTS.map(product => (
                    <li key={product.id}>
                        {product.name} <span><Link to={`/products/${product.id}`}>View Details</Link></span>
                    </li>
                ))}
            </ul>
        </>
    );
}