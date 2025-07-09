const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: String,
  state: String,
  lat: Number,
  lon: Number,
  population: Number,
  costOfLiving: Number
});

module.exports = mongoose.model('City', citySchema); 