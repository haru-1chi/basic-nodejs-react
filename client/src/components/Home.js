// src/components/Home.js
import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Home Page</h1>
            <p>This is the homepage of the application. You can navigate to the registration or login pages using the links below.</p>
            <div className="home-links">
                <a href="/register" className="home-link">Register</a>
                <a href="/login" className="home-link">Login</a>
            </div>
        </div>
    );
};

export default Home;
