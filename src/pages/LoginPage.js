import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';

const LoginPage = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        document.body.style.background = 'var(--login-signup-bg)';
        // Cleanup function to reset background when we leave the page
        return () => {
            document.body.style.background = 'var(--background-color)';
        };
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.login(formData);
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
            navigate('/'); // Redirect to listing page on successful login
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;