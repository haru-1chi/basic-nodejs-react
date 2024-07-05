import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfilePic from '../assets/img/profile.jpg'
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
function Userprofile() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        birthday: "",
        tel: "",
    });

    const [isEditMode, setIsEditMode] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get("http://localhost:8080/profile", {
                    withCredentials: true,
                });
                const userData = res.data.data;
                const formattedBirthday = userData.birthday
                    ? new Date(userData.birthday).toISOString().split('T')[0]
                    : '';
                setUser(userData);
                setFormData({
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    birthday: formattedBirthday,
                    tel: userData.tel,
                });
            } catch (err) {
                console.error(
                    "Error fetching user data",
                    err.response?.data || err.message
                );
                if (err.response?.status === 401) {
                    navigate("/login");
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);//
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "http://localhost:8080/updateprofile",
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );
            const updatedUserData = res.data.data;
            const formattedBirthday = updatedUserData.birthday
                ? new Date(updatedUserData.birthday).toISOString().split('T')[0]
                : '';
                setUser({
                    ...updatedUserData,
                    username: user.username,
                });
            setFormData({
                first_name: updatedUserData.first_name,
                last_name: updatedUserData.last_name,
                birthday: formattedBirthday,
                tel: updatedUserData.tel,
            });
            setIsEditMode(false);//
            setErrors({});
        } catch (err) {
            console.error(
                "Error updating profile",
                err.response?.data || err.message
            );
            setErrors(err.response?.data.errors || {});
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleEditMode = () => {
        setIsEditMode((prev) => !prev);
    };
    
    const formatDateToDDMMYYYY = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };
    
    return (
        <div className='Userprofile-page mt-12'>
            {user ? (
                <div className="content bg-white w-[550px] rounded-2xl py-8 px-16 shadow-lg">
                    <div className="head-profile flex flex-col items-center justify-center">
                        <img src={ProfilePic} alt="" className='w-28 rounded-full mt-6 mb-4' />
                        <p className='text-2xl text-[#03AED2] mb-6'>@{DOMPurify.sanitize(user.username)}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="body-profile">
                        <div className="data-profile grid grid-cols-2 mb-8 flex items-center">
                            <label className='block text-xl text-[#03AED2]'>Firstname</label>
                            {isEditMode ? (
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    className="p-1 pl-3 border border-[#68D2E8] rounded-full w-full text-xl text-[#03AED2]"
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className='block text-xl text-[#03AED2]'>{DOMPurify.sanitize(user.first_name)}</p>
                            )}
                            {errors.first_name && <p className="error-text">{errors.first_name}</p>}
                        </div>
                        <div className="data-profile grid grid-cols-2 mb-8 flex items-center">
                            <label className='block text-xl text-[#03AED2]'>Lastname</label>
                            {isEditMode ? (
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    className="p-1 pl-3 border border-[#68D2E8] rounded-full w-full text-xl text-[#03AED2]"
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className='block text-xl text-[#03AED2]'>{DOMPurify.sanitize(user.last_name)}</p>
                            )}
                            {errors.last_name && <p className="error-text">{errors.last_name}</p>}
                        </div>
                        <div className="data-profile grid grid-cols-2 mb-8 flex items-center">
                            <label className='block text-xl text-[#03AED2]'>Birthday</label>
                            {isEditMode ? (
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    className="p-1 pl-3 border border-[#68D2E8] rounded-full w-full text-xl text-[#03AED2]"
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className='block text-xl text-[#03AED2]'>{formatDateToDDMMYYYY(new Date(user.birthday).toISOString().split('T')[0])}</p>
                            )}
                            {errors.birthday && <p className="error-text">{errors.birthday}</p>}
                        </div>
                        <div className="data-profile grid grid-cols-2 mb-8 flex items-center">
                            <label className='block text-xl text-[#03AED2]'>Phone Number</label>
                            {isEditMode ? (
                                <input
                                    type="text"
                                    name="tel"
                                    value={formData.tel}
                                    className="p-1 pl-3 border border-[#68D2E8] rounded-full w-full text-xl text-[#03AED2]"
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className='block text-xl text-[#03AED2]'>{DOMPurify.sanitize(user.tel)}</p>
                            )}
                            {errors.tel && <p className="error-text">{errors.tel}</p>}
                        </div>
                        <div className="btn-submit mt-6 max-w-lg w-full flex justify-center">
                            <button type="button"  className='submit-button bg-[#68D2E8] text-xl text-white rounded-full py-2 px-8 mr-5' onClick={toggleEditMode}>
                                {isEditMode ? "Cancel" : "Edit Profile"}
                            </button>
                            {isEditMode && (
                                <button type="submit"  className='submit-button bg-[#68D2E8] text-xl text-white rounded-full py-2 px-8' disabled={isSubmitting}>
                                    {isSubmitting ? "Saving..." : "Save Changes"}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Userprofile