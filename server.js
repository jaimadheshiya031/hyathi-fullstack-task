import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import User from './models/user.js';
import {feedPokemon,getAllPokemon,adoptPokemon} from './controllers/pokemonController.js';
import Pokemon from './models/pokemon.js';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/pokemon-adoption', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Register a new user
app.post('/register', async (req, res) => {
    // console.log(req.body);
    try {
        const { username, password } = req.body;

  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = new User({ username, password: hashedPassword });
  
      // Save the user to the database
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  });
  
  // User login
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user in the database
      const user = await User.findOne({ username });
  
      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'secret_key');
  
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Failed to log in user' });
    }
  });

  // Create a new Pokemon
  app.post('/pokemon', async (req, res) => {
    try {
      const { name, breed, age, healthStatus } = req.body;

      // Create a new Pokemon document
      const pokemon = new Pokemon({ name, breed, age, healthStatus });

      // Save the Pokemon to the database
      await pokemon.save();

      res.status(201).json({ message: 'Pokemon created successfully' });
    } catch (error) {
      console.error('Error creating Pokemon:', error);
      res.status(500).json({ error: 'Failed to create Pokemon' });
    }
  });

// Get all available Pokemon
app.get('/pokemon', getAllPokemon);

// Adopt a Pokemon
app.post('/pokemon/adopt', authenticateToken, adoptPokemon);

// Feed a Pokemon
app.post('/pokemon/feed', authenticateToken, feedPokemon);

// ...

// Middleware for authenticating JWT token
function authenticateToken(req, res, next) {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify the token
  jwt.verify(token, 'secret_key', (error, decoded) => {
    if (error) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    // Add the decoded user ID to the request object
    req.userId = decoded.userId;
    next();
  });
}
  
  
  
  
  