const express = require('express');
const router = express.Router();
const Neighborhood = require('../models/Neighborhood');

// GET /api/neighborhoods?city=Delhi
router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    const query = city ? { city: new RegExp(city, 'i') } : {};
    const neighborhoods = await Neighborhood.find(query);
    res.json(neighborhoods);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router; 