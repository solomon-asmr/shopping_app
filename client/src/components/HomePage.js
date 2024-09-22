import React, { useEffect, useState } from 'react';
import './HomePage.css';
import Carousel from './Carousel';
import ProductCard from './ProductCard';
function HomePage({ addToCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the server
        fetch('/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="homepage">
          <Carousel />
            <div className="slogan-section">
                <h1>Step into Style, Walk with Confidence.</h1>
                <div class="jumbotron">
                  <p>Welcome to our exclusive shoe store, where fashion meets comfort. We pride ourselves on offering a curated selection of high-quality footwear that combines the latest trends with timeless designs. Whether you're looking for elegant heels, casual sneakers, sturdy boots, or cozy slippers, we have something for every occasion and every step of your journey. Our commitment to craftsmanship and customer satisfaction ensures that you'll always leave our store with a smile on your face and a spring in your step. Shop with us today and experience the perfect blend of style and comfort.</p>
                </div>
            </div>
            <div className="product-grid">
                {products.slice(0, 9).map(product => (
                    <ProductCard key={product._id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
