const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  windspeed: Number,
  is_day: Boolean
});

module.exports = mongoose.model('Weather', weatherSchema); 