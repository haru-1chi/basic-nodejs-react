import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token'); //เปรียบเทียบที่อยู่การเก็บ token
            if (token) {
                try {
                    const res = await axios.get('http://localhost:8080/profile', {
                        headers: { 'Authorization': `Bearer ${token}` },
                        withCredentials: true
                    });
                    setUser(res.data.data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        fetchUser();

        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:8080/auth/logout', {
                withCredentials: true
            });
            localStorage.removeItem('token');
            window.location.href = '/login';
        } catch (err) {
            console.error('Error during logout', err);
        }
    };

    const toggleDarkMode = () => {
        const newTheme = !darkMode;
        setDarkMode(newTheme);
        if (newTheme) {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        } else {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className='Navbar'>
            <nav className='bg-[#03AED2] dark:bg-[#3D2C8D]'>
                <div className='flex justify-between flex-col sm:flex-col md:flex-row lg:flex-row h-40 md:h-16 lg:h-16 py-5 items-center'>
                    <div className="logo">
                        <Link to="/" className="text-white text-3xl ml-20">User's Playground</Link>
                    </div>
                    {user ? (
                        <div className="menu">
                            <ul className="menus flex items-center text-white text-2xl mr-20">
                                <button
                                    onClick={toggleDarkMode}
                                    className="mr-4 text-white dark:text-gray-200">
                                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                                </button>
                                <li className='ml-10'><Link to="/" className="">Home</Link></li>
                                {user.role === 'admin' && (
                                    <Link to="/manage-users" className="navbar-link">Manage Users</Link>
                                )}
                                <li className='ml-10'><Link to="/projectmanage" className="">Project</Link></li>
                                <li className='ml-10'><Link to="/userprofile" className="">Profile</Link></li>
                                <button onClick={handleLogout} className="navbar-button ml-10">Logout</button>
                                {/* <li className='ml-10'><Link to="" className="">Logout</Link></li> */}
                            </ul>

                        </div>
                    ) : (
                        <div className="menu">
                            <ul className="menus flex items-center text-white text-2xl mr-20">
                                <button
                                    onClick={toggleDarkMode}
                                    className="mr-4 text-white dark:text-gray-200">
                                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                                </button>
                                <li className='ml-10'><Link to="/" className="">Home</Link></li>
                                <li className='ml-10'><Link to="/signup" className="">Sign up</Link></li>
                                <li className='ml-10'><Link to="/login" className="">Login</Link></li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar

//สร้างตัวแปร user เช็คว่า Login ยัง