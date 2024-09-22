import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHome } from 'react-icons/fa';
import './NavBar.css'; // Assuming you have a CSS file for styling

function NavBar({ cart, toggleCartVisibility }) {
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
    const cartTotalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                {/* Replace the src with the path to your logo image */}
                <img src="/uploads/logo.png" alt="Logo" className="logo" />
                <b>לך-לך</b>
            </div>
            <div className="navbar-links">
                <Link to="/" className="home-link">
                    <FaHome size={24} />
                    <span className="home-text">Home</span>
                </Link>
                <div className="cart-info" onClick={toggleCartVisibility} style={{ cursor: 'pointer' }}>
                    <FaShoppingCart size={24} />
                    <span style={{ marginLeft: '10px' }}>
                        {cartItemCount} items (${cartTotalPrice})
                    </span>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
