import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        birthDay: '',
        picture: null
    });

    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data when component mounts
        const fetchUserData = async () => {
            try {
                const res = await axios.get('/api/user-profile');
                setUser(res.data);
                setFormData({
                    name: res.data.name || '',
                    birthDay: res.data.birthDay || '',
                    picture: null
                });
            } catch (err) {
                console.error('Error fetching user data', err.response.data);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('birthDay', formData.birthDay);
        if (formData.picture) {
            data.append('picture', formData.picture);
        }

        try {
            const res = await axios.post('/api/user-profile', data);
            console.log('Profile update successful', res.data);
            setUser(res.data);
        } catch (err) {
            console.error('Error updating profile', err.response.data);
            setErrors(err.response.data.errors || {});
        }
    };

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label>Birthday</label>
                    <input
                        type="date"
                        name="birthDay"
                        value={formData.birthDay}
                        onChange={handleChange}
                    />
                    {errors.birthDay && <p className="error-text">{errors.birthDay}</p>}
                </div>
                <div className="form-group">
                    <label>Profile Picture</label>
                    <input
                        type="file"
                        name="picture"
                        onChange={handleChange}
                    />
                    {errors.picture && <p className="error-text">{errors.picture}</p>}
                </div>
                <button type="submit" className="submit-button">Update Profile</button>
            </form>
            {user && user.pictureUrl && (
                <div className="profile-picture-container">
                    <h3>Current Profile Picture</h3>
                    <img src={user.pictureUrl} alt="Profile" className="profile-picture" />
                </div>
            )}
        </div>
    );
};

export default UserProfile;
