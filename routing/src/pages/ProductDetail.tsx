import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
    const { productId } = useParams<{ productId: string }>();

    return (
        <>
            <h1>Product Detail Page</h1>
            <p>Here you can find details about a specific product.</p>
            <h2>Product Name</h2>
            <p><strong>{productId}</strong></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur commodo. Sed at ligula a nunc efficitur bibendum.</p>
            <p>Price: $19.99</p>
        </>
    );
}