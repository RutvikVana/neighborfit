const express = require('express');
const router = express.Router();
const Park = require('../models/Park');

router.get('/', async (req, res) => {
  const city = req.query.city;
  const data = await Park.find({ city });
  res.json(data);
});

module.exports = router; 