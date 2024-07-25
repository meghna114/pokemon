import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup } from './features/userSlice'; // Import the signup action
import { Link, useNavigate } from 'react-router-dom';
import './AuthBox.css';

const AuthBox = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users); // Access users from the Redux store

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        dispatch(login({ email, token: 'mock-token' }));
        navigate('/newpage'); // Redirect to the new page after successful login
      } else {
        alert('Invalid credentials');
      }
    } else {
      // Handle sign-up
      const userExists = users.find(user => user.email === email);
      if (userExists) {
        alert('User already exists');
      } else {
        dispatch(signup({ email, password }));
        alert('Registration successful. You can now log in.');
        setIsLogin(true); // Switch to login mode after successful registration
      }
    }
  };

  return (
    <div className="auth-box-container">
      <div className="auth-box">
        <form onSubmit={handleSubmit}>
          <div className="auth-input">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-input">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-buttons">
            <button type="submit" className="auth-button">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
            <button
              type="button"
              className="auth-toggle-button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
          </div>
        </form>
        {!isLogin && (
          <div className="auth-link-container">
            <p>Already have an account?</p>
            <Link to="/login" className="auth-link">Login here</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthBox;
