import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./features/userSlice";
import PokemonCard from "./PokemonCard";
import { useNavigate, useParams } from "react-router-dom";
import "./NewPage.css";

const PAGE_LIMIT = 12; // Number of cards per page
const TOTAL_POKEMONS = 1302; // Total number of Pokémon available
const TOTAL_PAGES = Math.ceil(TOTAL_POKEMONS / PAGE_LIMIT); // Calculate total pages

const NewPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPokemons = async (page) => {
    setLoading(true);
    const offset = (page - 1) * PAGE_LIMIT;
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${PAGE_LIMIT}`
      );
      const data = await response.json();
      const pokemonData = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonDetails = await fetch(pokemon.url);
          const pokemonJson = await pokemonDetails.json();
          return {
            name: pokemonJson.name.toUpperCase(), // Convert name to uppercase
            image: pokemonJson.sprites.front_default,
            height: pokemonJson.height / 10, // Height in meters
            weight: pokemonJson.weight / 10, // Weight in kilograms
          };
        })
      );
      setPokemons(pokemonData);
    } catch (error) {
      console.error("Failed to fetch Pokémon data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear user state
    navigate("/login"); // Redirect to login page
  };

  const email = useParams();
  console.log(email);
  const handleCardClick = (pokemon) => {
    navigate(`/auth/${email.username}/${pokemon.name}`, { state: { pokemon } });
  };

  const handleNextPage = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="new-page-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="pokemon-grid">
        {loading ? (
          <p>Loading Pokémon...</p>
        ) : (
          pokemons.map((pokemon, index) => (
            <PokemonCard
              key={index}
              pokemon={pokemon}
              onClick={() => handleCardClick(pokemon)}
            />
          ))
        )}
      </div>
      <div className="arrow-buttons">
        <button className="arrow-button left-arrow" onClick={handlePrevPage}>
          ←
        </button>
        <button className="arrow-button right-arrow" onClick={handleNextPage}>
          →
        </button>
      </div>
    </div>
  );
};

export default NewPage;
