import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import "./UserProfile.css";
import Navbar from "./navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    birthday: "",
    tel: "",
  });
  const [isEditMode, setIsEditMode] = useState(false); //
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); //
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
    setIsSubmitting(true); //
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
      setUser(res.data.data);
      setFormData({
        username: res.data.data.username,
        first_name: res.data.data.first_name,
        last_name: res.data.data.last_name,
        birthday: res.data.data.birthday,
        tel: res.data.data.tel,
      });
      setIsEditMode(false); //
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

  return (
    <div className="profile-container">
      <Navbar />
      {user ? (
        <div className="profile-content">
          <div className="img-username">
            <img src="" alt="" />
            <p>@{DOMPurify.sanitize(user.username)}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="profile-data">
              <p>First Name</p>
              {isEditMode ? (
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              ) : (
                <p>{DOMPurify.sanitize(user.first_name)}</p>
              )}
              {errors.first_name && (
                <p className="error-text">{errors.first_name}</p>
              )}
            </div>
            <div className="profile-data">
              <p>Last Name</p>
              {isEditMode ? (
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              ) : (
                <p>{DOMPurify.sanitize(user.last_name)}</p>
              )}
              {errors.last_name && (
                <p className="error-text">{errors.last_name}</p>
              )}
            </div>
            <div className="profile-data">
              <p>Birthday</p>
              {isEditMode ? (
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                />
              ) : (
                <p>
                  {DOMPurify.sanitize(
                    new Date(user.birthday).toLocaleDateString()
                  )}
                </p>
              )}
              {errors.birthday && (
                <p className="error-text">{errors.birthday}</p>
              )}
            </div>
            <div className="profile-data">
              <p>Tel</p>
              {isEditMode ? (
                <input
                  type="text"
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                />
              ) : (
                <p>{DOMPurify.sanitize(user.tel)}</p>
              )}
              {errors.tel && <p className="error-text">{errors.tel}</p>}
            </div>
            <button type="button" onClick={toggleEditMode}>
              {isEditMode ? "Cancel" : "Edit Profile"}
            </button>
            {isEditMode && (
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            )}
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
