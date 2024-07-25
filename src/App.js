import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginSignupPage from './LoginSignupPage';
import NewPage from './NewPage';
import LargeCardPage from './LargeCardPage';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return currentUser ? <Element {...rest} /> : <Navigate to="/Signup" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignupPage mode ="login" />} />
        <Route path="/signup" element={<LoginSignupPage mode ="signup" />} />
        <Route path="/auth/:username" element={<ProtectedRoute element={NewPage} />} />
        <Route path="/auth/:username/:pokemonName" element={<ProtectedRoute element={LargeCardPage} />} />
        <Route path="/" element={<Navigate to="/signup" />} /> {/* Redirect root to signup */}
      </Routes>
    </Router>
  );
};

export default App;
