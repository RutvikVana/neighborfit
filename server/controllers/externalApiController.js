const axios = require('axios');

exports.fetchGeoDBCities = async (req, res) => {
  try {
    const response = await axios.get(
      'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      {
        headers: {
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
          'x-rapidapi-key': process.env.GEODB_API_KEY,
        },
        params: {
          countryIds: 'IN',
          limit: 10
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('🔴 GeoDB fetch error:', error.message);
    res.status(500).json({ error: 'GeoDB fetch failed' });
  }
}; 