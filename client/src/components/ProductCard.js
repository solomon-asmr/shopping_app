import React, { useState } from 'react';
import './ProductCard.css';

function ProductCard({ product, addToCart }) {
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // Hide the message after 2 seconds
    };

    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.productName} className="product-image" />
            <h3 className="product-name">{product.productName}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
            <button
                className="add-to-cart-button"
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
            {added && <p className="add-to-cart-message">Added to cart!👍❤️</p>}
        </div>
    );
}

export default ProductCard;
