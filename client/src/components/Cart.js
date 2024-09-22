import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart({ cart, removeFromCart, updateQuantity }) {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePlaceOrder = () => {
        navigate('/order'); // Use navigate instead of history.push
    };

    return (
        <div className="cart">
            <h4>Your Shopping Cart</h4>
            {cart.map(item => (
                <div key={item._id} className="cart-item">
                    <img src={item.imageUrl} alt={item.productName} className="cart-item-image" />
                    <div className="cart-item-details">
                        <h4>{item.productName}</h4>
                        <p>{item.price} per unit</p>
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                        />
                        <p>Total: {item.price * item.quantity}</p>
                        <button onClick={() => removeFromCart(item._id)} type="button" class="btn btn-secondary">Remove</button>
                    </div>
                </div>
            ))}
            <h4>Total: ${total.toFixed(2)}</h4>
            <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
}

export default Cart;
