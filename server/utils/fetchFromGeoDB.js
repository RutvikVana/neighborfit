const axios = require("axios");

// Cache to prevent hitting GeoDB too frequently during dev
let cache = {};

module.exports = async (query) => {
  if (cache[query]) {
    console.log("Using cached GeoDB result");
    return cache[query];
  }

  try {
    const res = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities`, {
      params: {
        namePrefix: query,
        limit: 5
      },
      headers: {
        'X-RapidAPI-Key': process.env.GEODB_API_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    });

    const data = res.data.data.map(city => ({
      name: city.name,
      country: city.country,
      region: city.region,
      lat: city.latitude,
      lon: city.longitude,
      population: city.population
    }));

    cache[query] = data;
    return data;

  } catch (err) {
    console.error("GeoDB API error:", err.response?.status || err.message);
    return []; // Fallback to empty result
  }
}; 