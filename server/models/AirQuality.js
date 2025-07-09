const mongoose = require('mongoose');

const airQualitySchema = new mongoose.Schema({
  city: String,
  aqi: Number,
  category: String
});

module.exports = mongoose.model('AirQuality', airQualitySchema); 