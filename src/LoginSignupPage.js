import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, login } from "./features/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginSignupPage.css";

const LoginSignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const users = useSelector((state) => state.user.users);

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLoginPage) {
        // Handle login
        const user = users.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          dispatch(login({ email, token: user.token }));
          navigate(`/auth/${email}`); // Redirect to the new page after login
        } else {
          alert("Invalid credentials");
        }
      } else if (isSignupPage) {
        // Handle signup
        const userExists = users.find((user) => user.email === email);
        if (userExists) {
          alert("User already exists");
        } else {
          dispatch(signup({ email, password }));
          alert("Registration successful. You can now log in.");
          navigate("/login"); // Redirect to login page after signup
        }
      }
    }
  };

  const handleSwitchMode = () => {
    if (isLoginPage) {
      navigate("/signup");
    } else if (isSignupPage) {
      navigate("/login");
    }
  };

  return (
    <div className="login-signup-container">
      <div className="credential-box">
        {errors.email && <div className="error-message">{errors.email}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="button-container">
          <button className="login-button" onClick={handleSubmit}>
            {isLoginPage ? "Login" : "Signup"}
          </button>
        </div>
        <div className="switch-container">
          <button onClick={handleSwitchMode}>
            {isLoginPage ? "Switch to Signup" : "Switch to Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
