import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './navbar.css';

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get('http://localhost:8080/profile', {
                        headers: { 'Authorization': `Bearer ${token}` },
                        withCredentials: true
                    });
                    setUser(res.data.data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:8080/auth/logout', {
                withCredentials: true
            });
            localStorage.removeItem('token');
            window.location.href = '/login';
        } catch (err) {
            console.error('Error during logout', err);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">User's playground</Link>
                {user ? (
                    <div className="navbar-user">
                        <span>Welcome, {user.username}</span>
                        <Link to="/userprofile" className="navbar-link">Profile</Link>
                        {user.role === 'admin' && (
                            <Link to="/manage-users" className="navbar-link">Manage Users</Link>
                        )}
                        <button onClick={handleLogout} className="navbar-button">Logout</button>
                    </div>
                ) : (
                    <div className="navbar-guest">
                        <Link to="/" className="navbar-link">Home</Link>
                        <Link to="/register" className="navbar-link">Sign up</Link>
                        <Link to="/login" className="navbar-link">Login</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
