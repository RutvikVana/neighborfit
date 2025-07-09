const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// POST /api/match
router.post('/match', async (req, res) => {
  const { rent, safety, schools, parks } = req.body;

  try {
    // 🔸 Step 1: Fetch cities from GeoDB
    const geoRes = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
      params: { limit: 5, namePrefix: 'A' }, // For demo, filter by namePrefix
      headers: {
        'x-rapidapi-key': process.env.GEODB_API_KEY,
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      },
    });

    const cityList = geoRes.data.data;

    const results = [];

    for (const city of cityList) {
      const { name, latitude, longitude } = city;

      // 🔸 Step 2: Fetch weather using Open-Meteo
      const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
        params: {
          latitude,
          longitude,
          current_weather: true,
        },
      });

      const temperature = weatherRes.data.current_weather.temperature;

      // 🔸 Step 3: Fetch parks using Overpass API
      const overpassQuery = `[out:json];\n        node(around:5000,${latitude},${longitude})[\"leisure\"=\"park\"];\n        out body;`;

      const parksRes = await axios.post('https://overpass-api.de/api/interpreter', overpassQuery, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const parkCount = parksRes.data.elements.length;

      // 🔸 Step 4: Quality of Life from Teleport (if slug exists)
      const citySlug = name.toLowerCase().replace(/ /g, '-');
      let qualityScore = null;

      try {
        const teleportRes = await axios.get(`https://api.teleport.org/api/urban_areas/slug:${citySlug}/scores/`);
        qualityScore = teleportRes.data.teleport_city_score;
      } catch (err) {
        qualityScore = 'N/A';
      }

      // 🔹 Add result
      results.push({
        city: name,
        lat: latitude,
        lon: longitude,
        temperature,
        parkCount,
        qualityScore,
      });
    }

    res.json(results);

  } catch (err) {
    console.error('❌ API integration error:', err.message);
    res.status(500).json({ error: 'Failed to fetch from external APIs' });
  }
});

module.exports = router; 