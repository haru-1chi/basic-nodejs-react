// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import ManageUsers from './components/ManageUsers';
import Contact from './components/Contact';
function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/userprofile" element={<UserProfile />} />
                    <Route path="/manage-users" element={<ManageUsers />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/" element={<Home />} />
                    
                </Routes>
            </div>
        </Router>
    );
}

export default App;
