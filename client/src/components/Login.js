import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Navbar from './navbar';

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

    const validateForm = () => {
        let formErrors = {};

        if (!formData.email) {
            formErrors.email = "Your email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = "Enter a valid email address";
        }

        if (!formData.password) {
            formErrors.password = "Your password is required";
        }

        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const res = await axios.post('http://localhost:8080/auth/login', formData, {
                withCredentials: true
            });
            console.log('Login successful', res.data);

            // Store token in localStorage
            localStorage.setItem('token', res.data.token);

            // Redirect to home page
            window.location.href = '/';
        } catch (err) {
            console.error('Error during login', err.response?.data || err.message);
            if (err.response && err.response.status === 401) {
                setErrors({ general: err.response.data.message });
            } else {
                setErrors(err.response?.data.errors || {});
            }
        }
    };

    return (
        <div className="login-container">
            <Navbar />
            <h2>Login</h2>
            {errors.general && <p className="error-text">{errors.general}</p>}
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
