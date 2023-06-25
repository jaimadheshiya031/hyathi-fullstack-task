import { Schema, model } from 'mongoose';

const pokemonSchema = new Schema({
  id:{
    type:Number
  },
  image:{
    type:String
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: String,
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
  adopted:{
    type:Boolean,
    default:false
  }
  
});

const Pokemon = model('Pokemon', pokemonSchema);

export default Pokemon;
