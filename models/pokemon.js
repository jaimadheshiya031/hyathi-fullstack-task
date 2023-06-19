import { Schema, model } from 'mongoose';

const pokemonSchema = new Schema({
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  healthStatus: {
    type: String,
    enum: ['Healthy', 'Unhealthy'],
    default: 'Healthy',
  },
  lastFedAt: {
    type: Date,
    default: Date.now,
  },
});

const Pokemon = model('Pokemon', pokemonSchema);

export default Pokemon;
