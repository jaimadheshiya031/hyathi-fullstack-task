import React, { useState, useEffect } from 'react';
import '../components/pokemon-list.css'

function PokemonListPage() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch('/pokemon')
      .then(response => response.json())
      .then(data => {
        setPokemonList(data);
      })
      .catch(error => {
        console.error('Error fetching Pokemon:', error);
      });
  }, []);

  return (
    <div>
      <h2>Pokemon List</h2>
      <div className="pokemon-list">
        {pokemonList.map(pokemon => (
          <div className="pokemon-card" key={pokemon._id}>
            <h3>{pokemon.name}</h3>
            <p>Breed: {pokemon.breed}</p>
            <p>Age: {pokemon.age}</p>
            <p>Health Status: {pokemon.healthStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonListPage;
