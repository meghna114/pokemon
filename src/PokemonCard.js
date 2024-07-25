import React from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, onClick }) => {
  if (!pokemon) return null;

  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      <h3 className="pokemon-name">{pokemon.name.toUpperCase()}</h3>
      <p className="pokemon-height">Height: {pokemon.height} m</p>
      <p className="pokemon-weight">Weight: {pokemon.weight} kg</p>
    </div>
  );
};

export default PokemonCard;

