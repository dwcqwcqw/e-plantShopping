import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const total = useSelector((state) => state.cart.total);

    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.replace('$', ''));
        return (price * item.quantity).toFixed(2);
    };

    const handleIncrement = (item) => {
        try {
            dispatch(updateQuantity({
                name: item.name,
                quantity: item.quantity + 1
            }));
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Failed to update quantity. Please try again.');
        }
    };

    const handleDecrement = (item) => {
        try {
            if (item.quantity > 1) {
                dispatch(updateQuantity({
                    name: item.name,
                    quantity: item.quantity - 1
                }));
            } else {
                handleRemove(item.name);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Failed to update quantity. Please try again.');
        }
    };

    const handleRemove = (itemName) => {
        try {
            dispatch(removeItem(itemName));
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Failed to remove item. Please try again.');
        }
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping(e);
    };

    const handleCheckoutShopping = () => {
        alert('Checkout functionality will be implemented in a future update!');
    };

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button onClick={handleContinueShopping}>Continue Shopping</button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p className="item-price">{item.cost}</p>
                                    <div className="quantity-controls">
                                        <button 
                                            onClick={() => handleDecrement(item)}
                                            aria-label="Decrease quantity"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button 
                                            onClick={() => handleIncrement(item)}
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="item-subtotal">Subtotal: ${calculateTotalCost(item)}</p>
                                    <button 
                                        className="remove-button"
                                        onClick={() => handleRemove(item.name)}
                                        aria-label={`Remove ${item.name} from cart`}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Cart Summary</h3>
                        <p>Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
                        <p>Total Cost: ${total.toFixed(2)}</p>
                        <div className="cart-buttons">
                            <button onClick={handleContinueShopping}>Continue Shopping</button>
                            <button onClick={handleCheckoutShopping}>Proceed to Checkout</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartItem;


