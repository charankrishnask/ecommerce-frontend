import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// This function will run before every request
// It attaches the JWT token to the header if it exists
API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers['x-auth-token'] = localStorage.getItem('token');
    }
    return req;
});

// Auth routes
export const signup = (formData) => API.post('/auth/signup', formData);
export const login = (formData) => API.post('/auth/login', formData);

// Item routes
export const getItems = (params = {}) => API.get('/items', { params });

// Cart routes
export const getCart = () => API.get('/cart');
export const addToCart = (itemId, quantity) => API.post('/cart', { itemId, quantity });
export const removeFromCart = (itemId) => API.delete(`/cart/${itemId}`);

export default API;