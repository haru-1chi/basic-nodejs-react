import React from 'react';
import Navbar from './navbar';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar/>
            <div className="home-content">
                <h1>Welcome to the Home Page</h1>
                <p>This is the homepage of the application. You can navigate to the registration or login pages using the links below.</p>
            </div>
        </div>
    );
};

export default Home;
