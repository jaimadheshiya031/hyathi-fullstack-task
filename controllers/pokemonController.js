import Pokemon from "../models/pokemon.js";

// Get all available Pokemon
export async function getAllPokemon(req, res) {
  try {
    const pokemon = await Pokemon.find();
    res.json(pokemon);
  } catch (error) {
    console.error('Error getting Pokemon:', error);
    res.status(500).json({ error: 'Failed to get Pokemon' });
  }
}
 function findById(id){
  const pok= Pokemon.find(id);
  return pok;
}
//Adopt a Pokemon
export async function adoptPokemon(req, res) {
  try {
    const { pokemonId } = req.body;
    console.log(pokemonId);

    // Check if the Pokemon is already adopted
    const pokemon = await findById(pokemonId);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    if (pokemon.adoptedBy) {
      return res.status(400).json({ error: 'Pokemon already adopted' });
    }

    // Set the adoptedBy field to the user ID
    pokemon.adoptedBy = req.userId;

    // Save the updated Pokemon to the database
    await pokemon.save();

    res.json({ message: 'Pokemon adopted successfully' });
  } catch (error) {
    console.error('Error adopting Pokemon:', error);
    res.status(500).json({ error: 'Failed to adopt Pokemon' });
  }
}

// Other controller functions...

// Adopt a Pokemon
// export async function adoptPokemon(req, res) {
//   try {
//     const { id } = req.body.pokemonID;
//     console.log(id);

//     // Check if the Pokemon has already been adopted
//     const pokemon = await Pokemon.findById(id);
//     if (pokemon.adopted) {
//       return res.status(400).json({ error: 'Pokemon has already been adopted' });
//     }

//     // Mark the Pokemon as adopted
//     pokemon.adopted = true;
//     await pokemon.save();

//     res.json({ message: 'Pokemon adopted successfully' });
//   } catch (error) {
//     console.error('Error adopting Pokemon::', error);
//     res.status(500).json({ error: 'Failed to adopt Pokemon' });
//   }
// }


// Feed a Pokemon
export async function feedPokemon(req, res) {
  try {
    const { pokemonId } = req.body;

    // Find the Pokemon by ID
    const pokemon = await findById(pokemonId);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    // Update the lastFedAt field to the current date and time
    pokemon.lastFedAt = new Date();

    // Save the updated Pokemon to the database
    await pokemon.save();

    res.json({ message: 'Pokemon fed successfully' });
  } catch (error) {
    console.error('Error feeding Pokemon:', error);
    res.status(500).json({ error: 'Failed to feed Pokemon' });
  }
}
