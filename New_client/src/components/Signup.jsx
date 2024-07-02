import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (!formData.confirmPassword) {
            formErrors.confirmPassword = "Your confirmPassword is required";
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
        <div className='Signup-page mt-12'>
            <div className="content bg-white w-[550px] rounded-2xl py-8 px-16 shadow-lg">
                <h1 className='text-4xl text-[#03AED2] text-center mb-6'>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label htmlFor="" className="block text-xl text-[#03AED2] mb-1">Username</label>
                        <input type="text"
                            name='username'
                            className="mt-1 p-2 pl-3 border border-[#68D2E8] rounded-full w-full"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="error-text">{errors.username}</p>}
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="" className="block text-xl text-[#03AED2] mb-1">E-mail</label>
                        <input type="email"
                            name='email'
                            className="mt-1 p-2 pl-3 border border-[#68D2E8] rounded-full w-full"
                            value={formData.email}
                            onChange={handleChange} />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="" className="block text-xl text-[#03AED2] mb-1">Password</label>
                        <input type="password"
                            name='password'
                            className="mt-1 p-2 pl-3 border border-[#68D2E8] rounded-full w-full"
                            value={formData.password}
                            onChange={handleChange} />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="" className="block text-xl text-[#03AED2] mb-1">Confirm Password</label>
                        <input type="password"
                            name='confirmPassword'
                            className="mt-1 p-2 pl-3 border border-[#68D2E8] rounded-full w-full"
                            value={formData.confirmPassword}
                            onChange={handleChange} />
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                    </div>

                    <div className="btn-submit mt-6 max-w-lg w-full flex justify-center">
                        <button type='submit' className='submit-button bg-[#68D2E8] text-xl text-white rounded-full py-2 px-8'>Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup