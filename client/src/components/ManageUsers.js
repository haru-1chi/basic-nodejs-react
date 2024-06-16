import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageUsers.css';
import Navbar from './navbar';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:8080/admin/users', {
                    headers: { 'Authorization': `Bearer ${token}` },
                    withCredentials: true
                });
                setUsers(res.data.data);
            } catch (err) {
                setError('Error fetching users');
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/admin/user/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
                withCredentials: true
            });
            setUsers(users.filter(user => user.profile.userId !== userId));
        } catch (err) {
            setError('Error deleting user');
            console.error(err);
        }
    };

    return (
        <div className="manage-users-container">
            <Navbar />
            <div className="content">
                <h2>Manage Users</h2>
                {error && <p className="error-text">{error}</p>}
                <ul>
                    {users.map(user => (
                        <li key={user.profile.userId}>
                            <span>{user.profile.first_name} {user.profile.last_name} ({user.profile.username})</span>
                            <button onClick={() => handleDelete(user.profile.userId)} className="delete-button">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ManageUsers;
