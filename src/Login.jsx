import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setMessage("Email and password are required.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5131/api/login/login",
        { email, password }
      );

      const { role } = response.data;

      if (role) {
        setIsSuccess(true);
        setMessage("Login successful.");
        if (role.toLowerCase() === "admin") {
          navigate("/AdminDashboard");
        } else if (role.toLowerCase() === "user") {
          navigate("/UserDashboard");
        }
      } else {
        setMessage("Login failed. Role mismatch.");
        setIsSuccess(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Invalid email or password.");
      } else {
        setMessage("Login failed. Please try again.");
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
        <h5 className="card-title text-center mb-4">Login</h5>
        <form onSubmit={handleLogin}>
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
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
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
          <a href="/signup">Go to Signup</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
