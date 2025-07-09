require('dotenv').config();
const axios = require('axios');

const from = 'Q4629'; // Surat
const to = 'Q60';     // New York

const options = {
  method: 'GET',
  url: `https://wft-geo-db.p.rapidapi.com/v1/geo/places/${from}/distance`,
  params: { toPlaceId: to },
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
  }
};

(async () => {
  try {
    const response = await axios.request(options);
    console.log('✅ Distance result:', response.data);
  } catch (err) {
    console.error('❌ RapidAPI call failed:', err.response?.data || err.message);
  }
})(); 