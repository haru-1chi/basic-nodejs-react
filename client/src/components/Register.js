import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import Navbar from './navbar';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // const validatePassword = (password) => {
    //     const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    //     return passwordRegex.test(password);
    // };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        let formErrors = {};

        if (!formData.username) {
            formErrors.username = "Your username is required";
        } else if (formData.username.length > 25) {
            formErrors.username = "Username cannot exceed 25 characters";
        }

        if (!formData.email) {
            formErrors.email = "Your email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = "Enter a valid email address";
        }

        if (!formData.password) {
            formErrors.password = "Your password is required";
        } else if (formData.password.length < 8) {
            formErrors.password = "Password must be at least 8 characters long";
        }

        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match";
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
            const { ...submitData } = formData;
            const res = await axios.post('http://localhost:8080/auth/register', submitData);
            console.log('Registration successful', res.data);

            alert('Registration successful!');

            window.location.href = '/login';

            setSuccessMessage('Registration successful');
            setErrors({});
        } catch (err) {
            console.error('Error during registration', err.response?.data || err.message);
            setErrors(err.response?.data.errors || {});
            setSuccessMessage('');
        }
    };

    return (
        <div className="register-container">
            <Navbar />
            <div className="register-content">
                <h2>Register</h2>
                {successMessage && <p className="success-text">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="error-text">{errors.username}</p>}
                    </div>
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
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                    </div>
                    <button type="submit" className="submit-button">Sign up</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
