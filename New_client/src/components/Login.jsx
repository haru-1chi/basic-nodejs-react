import React, { useState } from 'react'
import { loginUser } from './api';
import { Link } from 'react-router-dom';
import { validateForm } from './utils/validation';

function Login() {
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

        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const res = await loginUser(formData);

            if (res && res.token) {
                localStorage.setItem('token', res.token);
            } else {
                throw new Error('Token not found in response');
            }

            window.location.href = '/';
        } catch (err) {
            console.error('Error during login', err.response?.data || err.message);
            setErrors(err.response?.data.errors || { general: err.response?.data.message });
        }
    };

    return (
        <div className='Login-page mt-12'>
            <div className="content bg-white dark:bg-[#3D2C8D] w-[550px] rounded-2xl py-8 px-16 shadow-lg">
                <h1 className='text-4xl text-[#03AED2] dark:text-[#C996CC] text-center mb-6'>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label className="block text-xl text-[#03AED2] dark:text-[#C996CC] mb-1">E-mail</label>
                        <input type="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full" />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                    <div className="form-group mb-4">
                        <div className='flex justify-between items-center'>
                            <label className="block text-xl text-[#03AED2] dark:text-[#C996CC] mb-1">Password</label>
                            <Link to="/forgetpassword" className="link text-[#68D2E8] dark:text-[#C996CC]">forget password?</Link>
                        </div>
                        <input type="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full" />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>
                    {errors.general && <p className="error-text">{errors.general}</p>}
                    <div className="btn-submit mt-6 max-w-lg w-full flex justify-center">
                        <button type='submit' className='submit-button bg-[#68D2E8] dark:bg-[#C996CC] text-xl text-white rounded-full py-2 px-8'>Login</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login