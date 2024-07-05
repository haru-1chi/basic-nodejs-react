import React, { useState } from 'react'
import axios from 'axios';

function Forgetpassword() {
    const [formData, setFormData] = useState({
        email: '',
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
        <div className='forget-page mt-12'>
            <div className="content bg-white w-[550px] rounded-2xl py-8 px-16 shadow-lg">
                <h1 className='text-4xl text-[#03AED2] text-center mb-6'>Reset Password</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label className="block text-xl text-[#03AED2] mb-1">E-mail</label>
                        <input type="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 pl-3 border border-[#68D2E8] rounded-full w-full" />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                    {errors.general && <p className="error-text">{errors.general}</p>}
                    <div className="btn-submit mt-6 max-w-lg w-full flex justify-center">
                        <button type='submit' className='submit-button bg-[#68D2E8] text-xl text-white rounded-full py-2 px-8'>Send Password Reset Link</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Forgetpassword