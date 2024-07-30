import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserData } from './api';

const getToken = () => localStorage.getItem('token');
const getTheme = () => localStorage.getItem('theme');
const setTheme = (theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
};

function Navbar() {
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const token = getToken();
            if (token) {
                try {
                    const userData = await fetchUserData();
                    setUser(userData);
                } catch (err) {
                    console.error('Error fetching user profile', err);
                }
            }
        };

        const theme = getTheme();
        setDarkMode(theme === 'dark');
        setTheme(theme || 'light');

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await fetchUserData();
            localStorage.removeItem('token');
            window.location.href = '/login';
        } catch (err) {
            console.error('Error during logout', err);
        }
    };

    const toggleDarkMode = () => {
        const newTheme = darkMode ? 'light' : 'dark';
        setDarkMode(!darkMode);
        setTheme(newTheme);
    };

    const renderMenuItems = () => (
        <>
            <button onClick={toggleDarkMode} className="mr-4 text-white dark:text-gray-200">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <li className='ml-10'><Link to="/" className="">Home</Link></li>
            {user ? (
                <>
                    {user.role === 'admin' && (
                        <li className='ml-10'><Link to="/manage-users" className="">Manage Users</Link></li>
                    )}
                    <li className='ml-10'><Link to="/projectmanage" className="">Project</Link></li>
                    <li className='ml-10'><Link to="/userprofile" className="">Profile</Link></li>
                    <button onClick={handleLogout} className="navbar-button ml-10">Logout</button>
                </>
            ) : (
                <>
                    <li className='ml-10'><Link to="/signup" className="">Sign up</Link></li>
                    <li className='ml-10'><Link to="/login" className="">Login</Link></li>
                </>
            )}
        </>
    );
    return (
        <div className='Navbar'>
            <nav className='bg-[#03AED2] dark:bg-[#3D2C8D]'>
            <div className='flex justify-between flex-col sm:flex-col md:flex-row lg:flex-row h-40 md:h-16 lg:h-16 py-5 items-center'>
                    <div className="logo">
                        <Link to="/" className="text-white text-3xl ml-20">User's Playground</Link>
                    </div>
                    <div className="menu">
                            <ul className="menus flex items-center text-white text-2xl mr-20">
                            {renderMenuItems()}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar