import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '' // Add confirmPassword field
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(''); // Add state for success message
    const [isSuccess, setIsSuccess] = useState(false); // State to manage success

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }
        try {
            const {...submitData} = formData; // Remove confirmPassword before sending
            const res = await axios.post('http://localhost:8080/auth/register', submitData);
            console.log('Registration successful', res.data);
            setSuccessMessage('Registration successful'); // Set success message
            setIsSuccess(true); // Set success state to true
            setErrors({}); // Clear any previous errors
        } catch (err) {
            console.error('Error during registration', err.response?.data || err.message);
            setErrors(err.response?.data.errors || {});
            setSuccessMessage(''); // Clear success message if there's an error
            setIsSuccess(false); // Set success state to false
        }
    };

    const handleRedirect = () => {
        window.location.href = '/';
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {successMessage && (
                <div className="success-message">
                    <p>{successMessage}</p>
                    <button onClick={handleRedirect} className="home-button">Go to Homepage</button>
                </div>
            )}
            {!isSuccess && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        {errors.first_name && <p className="error-text">{errors.first_name}</p>}
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                        {errors.last_name && <p className="error-text">{errors.last_name}</p>}
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
                    <button type="submit" className="submit-button">Register</button>
                </form>
            )}
        </div>
    );
};

export default Register;
