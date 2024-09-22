// src/components/OrderPlacement.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderPlacement.css';

function OrderPlacement({ cart, clearCart }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        delivery: 'free',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            setError('All fields are required.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (cart.length === 0) {
            setError('Your cart is empty.');
            return;
        }

        // Calculate total price including shipping
        const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const deliveryCharge = formData.delivery === 'fast' ? 10 : 0; // Example delivery charge
        const totalPrice = cartTotal + deliveryCharge;

        const orderData = {
            ...formData,
            cart,
            totalPrice,
            deliveryCharge,
            date: new Date().toISOString(),
        };

        // Send order data to server (mocked here)
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });
            const result = await response.json();

            if (response.ok) {
                alert(`Order received! Your order number is ${result.orderId}.`);
                clearCart();
                navigate('/');
            } else {
                setError(result.error || 'Failed to place order.');
            }
        } catch (error) {
            setError('An error occurred while placing the order. Please try again.');
        }
    };


    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
        <h2>Order Placement</h2>
        <div className="order-placement">
            <div className="order-cart">
                {cart.map(item => (
                    <div key={item._id} className="order-cart-item">
                        <img src={item.imageUrl} alt={item.productName} className="order-cart-item-image" />
                        <div>
                            <h4>{item.productName}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
                <h3>Cart Total: ${cartTotal.toFixed(2)}</h3>
            </div>
            <form className="order-form" onSubmit={handleSubmit}>
                <h3>Shipping Information</h3>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div>
                    <label>Shipping Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label>Delivery Method</label>
                    <select name="delivery" value={formData.delivery} onChange={handleChange}>
                        <option value="free">Free Delivery (14 days)</option>
                        <option value="fast">Fast Delivery (3 days) - $10</option>
                    </select>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Place Order</button>
            </form>
        </div>
        </>
    );
}

export default OrderPlacement;
