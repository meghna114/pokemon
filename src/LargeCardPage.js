// src/LargeCardPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './features/userSlice'; // Import the logout action 
import './LargeCardPage.css';

const LargeCardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pokemon } = location.state || {};

  if (!pokemon) {
    return <p>No Pokémon data available</p>;
  }

  const handleLogout = () => {
    dispatch(logout()); // Call the logout action
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="large-card-page">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="large-card">
        <img src={pokemon.image} alt={pokemon.name} className="large-card-image" />
        <h2 className="large-card-name">{pokemon.name.toUpperCase()}</h2>
        <p className="large-card-height">Height: {pokemon.height} m</p>
        <p className="large-card-weight">Weight: {pokemon.weight} kg</p>
      </div>
    </div>
  );
};

export default LargeCardPage;
