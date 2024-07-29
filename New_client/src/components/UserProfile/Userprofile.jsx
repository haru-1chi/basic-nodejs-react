import React, { useState, useEffect } from 'react';
import ProfileView from './ProfileView';
import ProfileForm from './ProfileForm';
import { fetchUserData, updateUserData } from '../api';
import { useNavigate } from 'react-router-dom';
import ProfilePic from '../../assets/img/profile.jpg'

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    tel: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
        const formattedBirthday = userData.birthday
          ? new Date(userData.birthday).toISOString().split('T')[0]
          : '';
        setFormData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          birthday: formattedBirthday,
          tel: userData.tel,
        });
      } catch (err) {
        console.error("Error fetching user data", err.response?.data || err.message);
        if (err.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    getUserProfile();
  }, [navigate]);

  const handleUpdateProfile = async (formData) => {
    setIsSubmitting(true);
    try {
      const updateUserProfile = await updateUserData(formData);
      setUser(updateUserProfile);
      setErrors({});
    } catch (err) {
      console.error("Error updating profile", err.response?.data || err.message);
      setErrors(err.response?.data.errors || {});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        birthday: new Date(user.birthday).toISOString().split('T')[0],
        tel: user.tel,
      });
    }
    setIsEditMode((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateProfile(formData);
    setIsEditMode(false);
  };

  if (!user) return null;

  return (
    <div className='mt-12'>
      <div className="content bg-white dark:bg-[#3D2C8D] w-[550px] rounded-2xl py-8 px-16 shadow-lg">
        <div className="head-profile flex flex-col items-center justify-center">
          <img src={ProfilePic} alt="" className='w-28 rounded-full mt-6 mb-4' />
          <p className='text-2xl text-[#03AED2] dark:text-[#C996CC] mb-6'>@{user.username}</p>
        </div>
        {
          isEditMode ? (
            <ProfileForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              errors={errors}
              isSubmitting={isSubmitting}
              toggleEditMode={toggleEditMode}
            />
          ) : (
            <ProfileView user={user} toggleEditMode={toggleEditMode} />
          )
        }
      </div>
    </div>
  )

};

export default UserProfile;