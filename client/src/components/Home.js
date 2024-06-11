// src/components/Home.js
import React from 'react';
import Navbar from './navbar';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar/>
            <h1>Welcome to the Home Page</h1>
            <p>This is the homepage of the application. You can navigate to the registration or login pages using the links below.</p>
        </div>
    );
};

export default Home;
