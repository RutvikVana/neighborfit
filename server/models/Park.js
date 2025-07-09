const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({
  city: String,
  name: String,
  lat: Number,
  lon: Number
});

module.exports = mongoose.model('Park', parkSchema); 