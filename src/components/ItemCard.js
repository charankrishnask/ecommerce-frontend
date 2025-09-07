import React from 'react';
import * as api from '../services/api';

const ItemCard = ({ item }) => {

    const handleAddToCart = async () => {
        try {
            // Check if user is logged in
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to add items to the cart.');
                return;
            }
            await api.addToCart(item._id, 1);
            alert(`${item.name} added to cart!`);
        } catch (error) {
            console.error("Failed to add to cart", error);
            alert('Could not add item to cart.');
        }
    };
    
    return (
        <div className="item-card">
            {/* 1. Add this new container div */}
            <div className="item-card-image-container">
                <img src={item.imageUrl} alt={item.name} />
            </div>
            <div className="item-card-content">
                <h3>{item.name}</h3>
                <p className="price">${item.price.toFixed(2)}</p>
                <p>{item.description}</p>
                {/* 2. Update this button's class name */}
                <button className="card-action-btn" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ItemCard;