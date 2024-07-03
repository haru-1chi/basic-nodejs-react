import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfilePic from '../assets/img/profile.jpg'
import { FaRegEdit } from "react-icons/fa";
function Userprofile() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        birthday: "",
        tel: "",
    });
    
    const [editMode, setEditMode] = useState({
        first_name: false,
        last_name: false,
        birthday: false,
        tel: false,
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get("http://localhost:8080/profile", {
                    withCredentials: true,
                });
                setUser(res.data.data);
                setFormData({
                    username: res.data.data.username,
                    first_name: res.data.data.first_name,
                    last_name: res.data.data.last_name,
                    birthday: res.data.data.birthday,
                    tel: res.data.data.tel,
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
        try {
            const res = await axios.post(
                "http://localhost:8080/updateprofile",
                formData,
                {
                    withCredentials: true,
                }
            );
            setUser(res.data.data);
            setEditMode({
                first_name: false,
                last_name: false,
                birthday: false,
                tel: false,
            });
            setErrors({});
        } catch (err) {
            console.error(
                "Error updating profile",
                err.response?.data || err.message
            );
            setErrors(err.response?.data.errors || {});
        }
    };

    const toggleEditMode = (field) => {
        setEditMode((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <div className='Userprofile-page mt-12'>
            <div className="content bg-white w-[550px] rounded-2xl py-8 px-16 shadow-lg">
                <div className="head-profile flex flex-col items-center justify-center">
                    <img src={ProfilePic} alt="" className='w-28 rounded-full mt-6 mb-4' />
                    <p className='text-2xl text-[#03AED2] mb-6'>@username</p>
                </div>
                <div className="body-profile">
                    <div className="data-profile">
                        <label htmlFor="" className='block text-xl text-[#03AED2]'>Firstname</label>
                        <input type="text" />
                        <a href="#"><FaRegEdit /></a>
                    </div>
                    <div className="data-profile">
                        <label htmlFor="" className='block text-xl text-[#03AED2]'>Lastname</label>
                        <input type="text" />
                    </div>
                    <div className="data-profile">
                        <label htmlFor="" className='block text-xl text-[#03AED2]'>Birthday</label>
                        <input type="text" />
                    </div>
                    <div className="data-profile">
                        <label htmlFor="" className='block text-xl text-[#03AED2]'>Phone Number</label>
                        <input type="text" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Userprofile