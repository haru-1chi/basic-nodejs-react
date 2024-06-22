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
              {editMode.first_name ? (
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              ) : (
                <p>{DOMPurify.sanitize(user.first_name)}</p>
              )}
              <button
                type="button"
                onClick={() => toggleEditMode("first_name")}
              >
                {editMode.first_name ? "Save" : "Edit"}
              </button>
              {errors.first_name && (
                <p className="error-text">{errors.first_name}</p>
              )}
            </div>
            <div className="profile-data">
              <p>Last Name</p>
              {editMode.last_name ? (
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              ) : (
                <p>{DOMPurify.sanitize(user.last_name)}</p>
              )}
              <button
                type="button"
                onClick={() => toggleEditMode("last_name")}
              >
                {editMode.last_name ? "Save" : "Edit"}
              </button>
              {errors.last_name && (
                <p className="error-text">{errors.last_name}</p>
              )}
            </div>
            <div className="profile-data">
              <p>Birthday</p>
              {editMode.birthday ? (
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                />
              ) : (
                <p>{DOMPurify.sanitize(new Date(user.birthday).toLocaleDateString())}</p>
              )}
              <button
                type="button"
                onClick={() => toggleEditMode("birthday")}
              >
                {editMode.birthday ? "Save" : "Edit"}
              </button>
              {errors.birthday && (
                <p className="error-text">{errors.birthday}</p>
              )}
            </div>
            <div className="profile-data">
              <p>Tel</p>
              {editMode.tel ? (
                <input
                  type="text"
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                />
              ) : (
                <p>{DOMPurify.sanitize(user.tel)}</p>
              )}
              <button type="button" onClick={() => toggleEditMode("tel")}>
                {editMode.tel ? "Save" : "Edit"}
              </button>
              {errors.tel && <p className="error-text">{errors.tel}</p>}
            </div>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
