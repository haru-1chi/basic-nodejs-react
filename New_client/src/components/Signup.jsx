import React, { useState } from 'react';
import { registerUser } from './api';
import { validateSignupForm } from './utils/validation';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateSignupForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const data = await registerUser(formData);
            setMessage({ type: 'success', text: 'Registration successful! Please check your email for verification.' });
            setErrors({});
        } catch (err) {
            console.error('Error during registration', err.response?.data || err.message);
            setErrors(err.response?.data.errors || {});
            setMessage({ type: 'error', text: 'Registration failed. Please try again.' });
        }
    };


    return (
        <div className='Signup-page mt-12'>
            <div className="content bg-white dark:bg-[#3D2C8D] w-[550px] rounded-2xl py-8 px-16 shadow-lg">
                <h1 className='text-4xl text-[#03AED2] dark:text-[#C996CC] text-center mb-6'>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label className="block text-xl text-[#03AED2] dark:text-[#C996CC] mb-1">Username</label>
                        <input type="text"
                            name='username'
                            className="mt-1 p-2 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="error-text">{errors.username}</p>}
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-xl text-[#03AED2] dark:text-[#C996CC] mb-1">E-mail</label>
                        <input type="email"
                            name='email'
                            className="mt-1 p-2 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full"
                            value={formData.email}
                            onChange={handleChange} />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    <div className="form-group mb-4">
                        <label className="block text-xl text-[#03AED2] dark:text-[#C996CC] mb-1">Password</label>
                        <input type="password"
                            name='password'
                            className="mt-1 p-2 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full"
                            value={formData.password}
                            onChange={handleChange} />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>

                    <div className="form-group mb-4">
                        <label className="block text-xl text-[#03AED2] dark:text-[#C996CC] mb-1">Confirm Password</label>
                        <input type="password"
                            name='confirmPassword'
                            className="mt-1 p-2 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full"
                            value={formData.confirmPassword}
                            onChange={handleChange} />
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                    </div>
                    {message && <p className={message.type === 'success' ? "success-text" : "error-text"}>{message.text}</p>}
                    <div className="btn-submit mt-6 max-w-lg w-full flex justify-center">
                        <button type='submit' className='submit-button bg-[#68D2E8] dark:bg-[#C996CC] text-xl text-white rounded-full py-2 px-8'>Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup