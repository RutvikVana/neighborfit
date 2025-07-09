const mongoose = require('mongoose');

const dataGovRecordSchema = new mongoose.Schema({
  city: String,
  state: String,
  station: String,
  aqi: String,
  pollutant: String,
  last_updated: String
});

module.exports = mongoose.model('DataGovRecord', dataGovRecordSchema); 