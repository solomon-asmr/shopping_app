import './App.css';
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import OrderPlacement from './components/OrderPlacement';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';


function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
    });
    const [cartVisible, setCartVisible] = useState(false);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item._id === product._id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart(cart.map(item =>
            item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        ));
    };
    const clearCart = () => {
      setCart([]);
  };

    const toggleCartVisibility = () => {
        setCartVisible(!cartVisible);
    };

    return (

    <Router>
      <div className="App">
      <NavBar cart={cart} toggleCartVisibility={toggleCartVisibility} />
        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart}/>} />
          <Route path="/order" element={<OrderPlacement cart={cart} clearCart={clearCart} />}/>
          <Route path="/products" element={<ProductGrid addToCart={addToCart}/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
      {cartVisible && <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}
    </Router>
        
    );
}

export default App;