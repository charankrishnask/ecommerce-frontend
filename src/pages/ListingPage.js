import React, { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import * as api from '../services/api';

const ListingPage = () => {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({ category: '', 'price[lte]': '' });

    useEffect(() => {
        document.body.style.backgroundColor = 'var(--products-bg)';
        document.body.style.background = '';
        const fetchItems = async () => {
            try {
                // Clean up empty filter values before sending
                const validFilters = Object.fromEntries(
                    Object.entries(filters).filter(([_, value]) => value !== '')
                );
                const { data } = await api.getItems(validFilters);
                setItems(data);
            } catch (error) {
                console.error("Could not fetch items", error);
            }
        };
        fetchItems();
    }, [filters]); // Refetch when filters change

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="listing-page">
            <h1>Our Products</h1>
            <div className="filters">
                <select name="category" onChange={handleFilterChange}>
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home Goods">Home Goods</option>
                </select>
                <input
                    type="number"
                    name="price[lte]"
                    placeholder="Max Price"
                    onChange={handleFilterChange}
                />
            </div>
            <div className="item-grid">
                {items.map(item => (
                    <ItemCard key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ListingPage;