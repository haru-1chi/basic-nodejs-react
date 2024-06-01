// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/login', formData);
            console.log('Login successful', res.data);
            // Redirect to home page or dashboard
        } catch (err) {
            console.error('Error during login', err.response.data);
            setErrors(err.response.data.errors || {});
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>
                <button type="submit" className="submit-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
