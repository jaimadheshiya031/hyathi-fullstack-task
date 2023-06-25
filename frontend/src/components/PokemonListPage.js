import React, { useState, useEffect } from 'react';
import '../components/pokemon-list.css'
import { Link, useNavigate } from 'react-router-dom';

function PokemonListPage({isLoggedIn,setIsLoggedIn,token}) {
  const [pokemonList, setPokemonList] = useState([]);
  const Navigate=useNavigate();
  
  const handleSignout = () => {
    setIsLoggedIn(false);
    Navigate('/');
  };
  const getPokemons = async () => {
    try {
      const response = await fetch('/pokemon');
      if (response.ok) {
        const data = await response.json();
        setPokemonList(data);
      } else {
        console.error('Failed to fetch pokemons:', response.status);
      }
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
  };
  
  // const handleAdoptPokemon = async (pokemonId) => {
  //   try {
  //     // const authToken = localStorage.getItem('authToken');
  //     // console.log('lc ' + authToken);
  //     // if (!token) {
  //     //   // Handle the case where the user is not logged in
  //     //   return;
  //     // }
  
  //     const response = await fetch('/pokemon/adopt', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearer ${token}',
  //       },
  //       body: JSON.stringify({ pokemonId }),
  //     });
  
  //     if (response.ok) {
  //       // Handle the case where the adoption was successful
  //       console.log('Pokemon adopted successfully!');
  //       // Refresh the list of pokemons
  //       getPokemons();
  //     } else if (response.status === 403) {
  //       // Handle the case where the user is not authorized to adopt the pokemon
  //       console.log('You are not authorized to adopt this pokemon.');
  //     } else {
  //       // Handle other error cases
  //       console.log('Failed to adopt Pokemon:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error adopting Pokemon:', error);
  //   }
  // };
  function adoption() {
    const btn = document.getElementById("btn");
    btn.textContent="Adopted";
    // btn.addEventListener("click", function handleClick() {
    //   btn.textContent = "Button clicked";
    // });
  }



  const handleAdoptPokemon = async (pokemonId) => {
    try {
      const response = await fetch('/pokemon/adopt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pokemonId }),
      });
  
      if (response.ok) {
        // Handle the case where the adoption was successful
        console.log('Pokemon adopted successfully!');
        // Refresh the list of pokemons
        getPokemons();
      } else if (response.status === 403) {
        // Handle the case where the user is not authorized to adopt the pokemon
        console.log('You are not authorized to adopt this pokemon.');
      } else {
        // Handle other error cases
        console.log('Failed to adopt Pokemon:', response.status);
      }
    } catch (error) {
      console.error('Error adopting Pokemon:', error);
    }
  };
  const handleAdopt= (pokid)=>{
    pokemonList.findById(pokid, function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
          console.log("Result : ", docs);
      }
     });
    // console.log(pok);
  }
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
      <ul className="pokemon-list">
        {pokemonList.map(pokemon => (
          <li key={pokemon.id} className="pokemon-card">
            <img src={pokemon.image} alt={pokemon.breed} className="pokemon-image" />
            <div className="pokemon-details">
              <h3 className="pokemon-breed">{pokemon.breed}</h3>
              <p className="pokemon-age">Age: {pokemon.age}</p>
              <p className="pokemon-health-status">Health Status: {pokemon.healthStatus}</p>
              <p className="pokemon-last-fed">Last Fed: {pokemon.lastFed}</p>
              {isLoggedIn && (
              <div className="button-group">
                <button  className="adopt-button"id='btn' onClick={()=>adoption()} > Adopt</button>
                <button className="feed-button">Feed</button>
              </div>
            )}
            </div>
          </li>
        ))}
      </ul>
      {isLoggedIn && (
        <button className="signout-button" onClick={handleSignout}>Sign Out</button>
      )}
      {
        !isLoggedIn && (
          <h2>Want to adopt pokemons, <Link to='/'>log in</Link> now </h2>
        
      )}
    </div>
  );
}

export default PokemonListPage;
