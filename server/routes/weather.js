const express = require('express');
const router = express.Router();
const Weather = require('../models/Weather');

router.get('/', async (req, res) => {
  const city = req.query.city;
  const data = await Weather.findOne({ city });
  res.json(data);
});

module.exports = router; 