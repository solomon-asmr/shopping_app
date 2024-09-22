// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css'; // Import the CSS for the grid layout

function ProductGrid({ addToCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard key={product._id} product={product} addToCart={addToCart} />
            ))}
        </div>
    );
}

export default ProductGrid;
