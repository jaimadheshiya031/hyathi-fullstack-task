import React, { useEffect, useState } from 'react';

function AdoptedPokemonList() {
  const [adoptedPokemonList, setAdoptedPokemonList] = useState([]);

  useEffect(() => {
    // Fetch the list of adopted Pokemon
    fetch('/adopted-pokemon')
      .then(response => response.json())
      .then(data => {
        setAdoptedPokemonList(data);
      })
      .catch(error => {
        console.error('Error fetching adopted Pokemon:', error);
      });
  }, []);

  return (
    <div>
      <h2>Adopted Pokemon</h2>
      <ul>
        {adoptedPokemonList.map(pokemon => (
          <li key={pokemon._id}>
            {pokemon.breed} - Age: {pokemon.age} - Health: {pokemon.healthStatus}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdoptedPokemonList;
