import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ListingPage from './pages/ListingPage';
import CartPage from './pages/CartPage';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <main className="container">
                <Routes>
                    <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/cart" element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />} />
                    <Route path="/" element={<ListingPage />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;