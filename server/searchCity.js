const axios = require('axios');
require('dotenv').config(); // Make sure this line is present

const searchCity = async (cityName) => {
  try {
    const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
      params: {
        namePrefix: cityName,
        limit: 10,
        countryIds: 'IN' // Only cities from India
      },
      headers: {
        'x-rapidapi-key': process.env.GEODB_API_KEY,
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
      }
    });

    const cities = response.data.data;

    if (cities.length === 0) {
      console.log(`No results found for "${cityName}"`);
    } else {
      console.log(`Results for "${cityName}":`);
      cities.forEach(city => {
        console.log(`📍 ${city.city}, ${city.country} — ID: ${city.wikiDataId}`);
      });
    }
  } catch (error) {
    console.error('Error fetching city data:', error.message);
  }
};

searchCity('Surat'); // You can change this to any city like 'Mumbai', 'Paris', etc. 