const express = require('express');
const axios = require('axios');
const router = express.Router();
const Neighborhood = require('../models/Neighborhood');
require('dotenv').config();

// GeoDB API - Get cities
router.get('/geodb', async (req, res) => {
  try {
    const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5', {
      headers: {
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY
      }
    });

    const cities = response.data.data.map(city => ({
      city: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    }));

    await Neighborhood.insertMany(cities);
    res.status(200).json({ message: 'GeoDB fetch successful' });
    res.status(500).json({ error: 'GeoDB fetch failed' });
  }
});

// Overpass API - Get parks in Ahmedabad
router.get('/overpass', async (req, res) => {
  try {
    const query = `
      [out:json];
      area["name"="Ahmedabad"]->.searchArea;
      node["leisure"="park"](area.searchArea);
      out body;
    `;

    const response = await axios.post('https://overpass-api.de/api/interpreter', query, {
      headers: { 'Content-Type': 'text/plain' }
    });

    const parks = response.data.elements.map(p => ({
      city: "Ahmedabad",
      neighborhood: p.tags.name || 'Unknown',
      latitude: p.lat,
      longitude: p.lon,
      parks: 1 // simple score
    }));

    await Neighborhood.insertMany(parks);
    res.status(200).json({ message: 'Overpass parks stored', parks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Overpass fetch failed' });
  }
});

router.get('/all', async (req, res) => {
  const data = await Neighborhood.find();
  res.json(data);
});

router.get('/geodb-distance', async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'Missing from or to placeId in query' });
  }

  const options = {
    method: 'GET',
    url: `https://wft-geo-db.p.rapidapi.com/v1/geo/places/${from}/distance`,
    params: { toPlaceId: to },
    headers: {
      'x-rapidapi-key': process.env.GEODB_API_KEY,
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('🔴 GeoDB API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'GeoDB distance fetch failed' });
  }
});

module.exports = router; 