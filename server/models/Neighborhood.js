const mongoose = require('mongoose');

const neighborhoodSchema = new mongoose.Schema({
  city: String,
  neighborhood: String,
  rent_avg: Number,
  safety: Number,
  schools: Number,
  parks: Number
});

module.exports = mongoose.model('Neighborhood', neighborhoodSchema); 