import React from 'react';
import Navbar from './navbar';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar/>
            <div className="home-content">
                <h1>Welcome to User's Playground!</h1>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            </div>
        </div>
    );
};

export default Home;
