import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setMessage("All fields are required.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5131/api/signup/signup",
        { username, email, password, role }
      );

      if (response.status === 200) {
        setMessage("Signup Successful. You can now log in.");
        setIsSuccess(true);
        // Optionally navigate to login or another page
        // navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage("Email already exists. Please use a different email.");
      } else {
        setMessage("Signup failed. Please try again.");
      }
      setIsSuccess(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h5 className="card-title text-center mb-4">Sign Up</h5>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
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
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
          {message && (
            <div
              className={`alert mt-2 ${
                isSuccess ? "alert-success" : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}
        </form>
        <div className="mt-3 text-center">
          <a href="/">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
