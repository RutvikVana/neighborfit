const express = require('express');
const router = express.Router();
const City = require('../models/City');

router.get('/', async (req, res) => {
  const query = req.query.query;
  const results = await City.find({ name: { $regex: query, $options: 'i' } });
  res.json(results);
});

module.exports = router; 