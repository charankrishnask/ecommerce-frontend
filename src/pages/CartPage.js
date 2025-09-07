import React, { useState, useEffect } from 'react';
import * as api from '../services/api';

const CartPage = () => {
    const [cart, setCart] = useState(null);

    const fetchCart = async () => {
        try {
            const { data } = await api.getCart();
            setCart(data);
        } catch (error) {
            console.error('Could not fetch cart', error);
        }
    };

    useEffect(() => {
        document.body.style.backgroundColor = 'var(--cart-bg)';
        fetchCart();
        return () => {
            document.body.style.backgroundColor = 'var(--background-color)';
        };
    }, []);

    const handleRemove = async (itemId) => {
        try {
            await api.removeFromCart(itemId);
            fetchCart(); // Refresh cart after removing item
        } catch (error) {
            console.error('Failed to remove item', error);
        }
    };

    if (!cart || !cart.items || cart.items.length === 0) {
        return <h2 style={{ textAlign: 'center', marginTop: '5rem' }}>Your cart is empty.</h2>;
    }

    const totalPrice = cart.items.reduce((total, { item, quantity }) => total + item.price * quantity, 0);

    return (
        <div>
            <h2>Your Shopping Cart</h2>
            {cart.items.map(({ item, quantity }) => (
                <div key={item._id} className="cart-item">
                    {/* --- CHANGE 1: Added the product image --- */}
                    <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                    
                    {/* --- CHANGE 2: Wrapped details in a div for layout --- */}
                    <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>${item.price.toFixed(2)} x {quantity}</p>
                    </div>
                    
                    {/* --- CHANGE 3: Updated button class for unique styling --- */}
                    <button className="btn-remove" onClick={() => handleRemove(item._id)}>Remove</button>
                </div>
            ))}
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
    );
};

export default CartPage;