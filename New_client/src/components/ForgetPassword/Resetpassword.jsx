import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from '../api';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    const token = params.get("token");

    if (email && token) {
      setFormData((prevData) => ({
        ...prevData,
        email: email,
        token: token,
      }));
    } else {
      navigate("/error");
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }
    try {
      const res = await sendResetPasswordEmail(formData);
      if (res.data.status === "success") {
        navigate("/resetsuccess");
      }
    } catch (err) {
      console.error("Error resetting password", err.response?.data || err.message);
      setErrors(err.response?.data.errors || {});
    }
  };

  return (
    <div className="resetpassword-page mt-12">
      <div className="content bg-white w-[550px] rounded-2xl py-8 px-16 shadow-lg">
        <h1 className="text-4xl text-[#03AED2] text-center mb-6">Reset Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="block text-xl text-[#03AED2] mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="mt-1 p-2 pl-3 border border-[#68D2E8] rounded-full w-full"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group mb-4">
            <label className="block text-xl text-[#03AED2] mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 p-2 pl-3 border border-[#68D2E8] rounded-full w-full"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <div className="form-group mb-4">
            <label className="block text-xl text-[#03AED2] mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="mt-1 p-2 pl-3 border border-[#68D2E8] rounded-full w-full"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>
          <div className="btn-submit mt-6 max-w-lg w-full flex justify-center">
            <button type="submit" className="submit-button bg-[#68D2E8] text-xl text-white rounded-full py-2 px-8">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
