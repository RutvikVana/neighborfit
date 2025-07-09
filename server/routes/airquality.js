const express = require('express');
const router = express.Router();
const AirQuality = require('../models/AirQuality');

router.get('/', async (req, res) => {
  const city = req.query.city;
  const data = await AirQuality.findOne({ city });
  res.json(data);
});

module.exports = router; 