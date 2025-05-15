import React, { useState } from "react";
import { FiUser, FiLock, FiMail, FiCreditCard } from "react-icons/fi";
import { FaCar, FaUserShield } from "react-icons/fa";
import "./AuthPages.css";
import { registerUser } from "../services/allApi";
import { toast } from "react-toastify";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    userType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Handle registration logic
    try {
      if (
        formData.fullName &&
        formData.email &&
        formData.password &&
        formData.confirmPassword &&
        formData.licenseNumber&&formData.userType
      ) {
        if (formData.password == formData.confirmPassword) {
          const apiResponse = await registerUser(formData);
          // console.log(apiResponse)
          if (apiResponse.status == 201) {
            toast.success("User registered successfully!");
          } else {
            toast.error("Registration failed. Please try again.");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-page">
      <main className="auth-container">
        <div className="auth-glass">
          <div className="auth-header">
            <FaCar className="auth-icon" />
            <h2>Join LETRIDE</h2>
            <p>Create your account to start renting premium vehicles</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <FiUser className="input-icon" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaUserShield className="input-icon" />
              <input
                type="text"
                name="licenseNumber"
                placeholder="Driver's License Number"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              {/* <FaUserShield className="input-icon" /> */}
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select User Type</option>
                <option value="Renter">Renter</option>
                <option value="RentalOwner">Service Provider(car rental Owners)</option>
              </select>
            </div>

            {/*             
            <div className="terms-agreement">
              <input
                type="checkbox"
                id="terms"
                required
              />
              <label htmlFor="terms">
                I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
              </label>
            </div>
             */}
            <button type="submit" className="auth-button">
              <FiCreditCard className="button-icon" />
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>
        </div>

        <div className="auth-decoration">
          <div className="neon-circle"></div>
          <div className="neon-circle"></div>
          <div className="neon-circle"></div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
