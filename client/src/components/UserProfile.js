import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Import DOMPurify
import './UserProfile.css';
import Navbar from './navbar';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        birthday: '',
        tel: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/profile', {
                    withCredentials: true
                });
                setUser(res.data.data);
                setFormData({
                    first_name: res.data.data.first_name,
                    last_name: res.data.data.last_name,
                    birthday: res.data.data.birthday, // Convert to YYYY-MM-DD format
                    tel: res.data.data.tel
                });
            } catch (err) {
                console.error('Error fetching user data', err.response?.data || err.message);
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/updateprofile', formData, {
                withCredentials: true
            });
            setUser(res.data.data);
            setEditMode(false);
            setErrors({});
        } catch (err) {
            console.error('Error updating profile', err.response?.data || err.message);
            setErrors(err.response?.data.errors || {});
        }
    };

    return (
        <div className="profile-container">
            <Navbar />
            {user ? (
                <div>
                    <h2>User Profile</h2>
                    <p>Role: {DOMPurify.sanitize(user.role)}</p> {/* Sanitize user role */}
                    {editMode ? (
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
                                <label>Birthday</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                />
                                {errors.birthday && <p className="error-text">{errors.birthday}</p>}
                            </div>
                            <div className="form-group">
                                <label>Tel</label>
                                <input
                                    type="text"
                                    name="tel"
                                    value={formData.tel}
                                    onChange={handleChange}
                                />
                                {errors.tel && <p className="error-text">{errors.tel}</p>}
                            </div>
                            <button type="submit" className="submit-button">Save</button>
                            <button type="button" className="cancel-button" onClick={() => setEditMode(false)}>Cancel</button>
                        </form>
                    ) : (
                        <div>
                            <p>First Name: {DOMPurify.sanitize(user.first_name)}</p> {/* Sanitize first name */}
                            <p>Last Name: {DOMPurify.sanitize(user.last_name)}</p> {/* Sanitize last name */}
                            <p>Birthday: {DOMPurify.sanitize(new Date(user.birthday).toLocaleDateString())}</p> {/* Sanitize and format birthday */}
                            <p>Tel: {DOMPurify.sanitize(user.tel)}</p> {/* Sanitize telephone number */}
                            <button onClick={() => setEditMode(true)}>Edit Profile</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
