import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5131/api/auth/forgot-password",
        {
          email,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setError("Failed to send reset link");
      console.error(error);
    }
  };

  return (
    <div className="forgot-password-container">
      <h5>Forgot Password</h5>
      <form onSubmit={handleForgotPassword}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
        {message && <div className="alert alert-success mt-2">{message}</div>}
        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </form>
      <div className="mt-3">
        <Link to="/" className="btn btn-link">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
