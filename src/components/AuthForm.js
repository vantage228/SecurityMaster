import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/AuthForm.css";

const AuthForm = () => {
  const [tabIndex, setTabIndex] = useState(0); // 0 for Login, 1 for Signup
  const [formData, setFormData] = useState({ userID: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleTabChange = (index) => {
    setTabIndex(index);
    setMessage("");
    setError("");
    setFormData({ userID: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const Navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    const url = tabIndex === 0 ? "https://localhost:7298/api/User/login" : "https://localhost:7298/api/User/signup"; // Configure your URL
    try {
      const response = await axios.post(url, {
        userID: formData.userID,
        password: formData.password,
      });
      setMessage(response.data);
      if(response.status === 200){
        localStorage.setItem("isAuthenticated", "true"); 
        Navigate('/security-master')
      }
    } catch (err) {
      setError(err.response?.data || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="tabs">
          <button
            className={`tab ${tabIndex === 0 ? "active" : ""}`}
            onClick={() => handleTabChange(0)}
          >
            Login
          </button>
          <button
            className={`tab ${tabIndex === 1 ? "active" : ""}`}
            onClick={() => handleTabChange(1)}
          >
            Signup
          </button>
        </div>
        <form className="auth-form">
          <input
            type="text"
            name="userID"
            value={formData.userID}
            onChange={handleChange}
            placeholder="User ID"
            required
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="auth-input"
          />
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <button
              type="button"
              className="auth-button"
              onClick={handleSubmit}
              disabled={!formData.userID || !formData.password}
            >
              {tabIndex === 0 ? "Login" : "Signup"}
            </button>
          )}
          {message && <div className="message success">{message}</div>}
          {error && <div className="message error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
