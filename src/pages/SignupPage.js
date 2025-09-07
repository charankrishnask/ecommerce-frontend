import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';

const SignupPage = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        document.body.style.background = 'var(--login-signup-bg)';
        return () => {
            document.body.style.background = 'var(--background-color)';
        };
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.signup(formData);
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
            navigate('/');
        } catch (error) {
            console.error('Signup failed', error);
            alert('Signup failed. User may already exist.');
        }
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Password (min 6 chars)" onChange={handleChange} required minLength="6" />
                </div>
                <button type="submit" className="btn">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;