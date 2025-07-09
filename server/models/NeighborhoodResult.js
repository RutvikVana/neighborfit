const mongoose = require('mongoose');

const NeighborhoodResultSchema = new mongoose.Schema({
  userInput: {
    rent: Number,
    safety: Number,
    schools: Number,
    parks: Number
  },
  results: [
    {
      city: String,
      neighborhood: String,
      score: Number
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('NeighborhoodResult', NeighborhoodResultSchema); 