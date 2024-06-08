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
                    const res = await axios.get('http://localhost:8080/user', {
                        headers: { 'Authorization': `Bearer ${token}` },
                        withCredentials: true
                    });
                    setUser(res.data.user);
                } catch (err) {
                    console.error('Error fetching user data', err);
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
                <Link to="/" className="navbar-logo">Home</Link>
                {user && (
                    <div className="navbar-user">
                        <span>Welcome, {user.first_name} {user.last_name}</span>
                        <span>Role: {user.role}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
