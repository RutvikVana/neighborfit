module.exports = async function matchCities(preferences, City, AirQuality, Weather, Park) {
  const cities = await City.find({});
  const results = [];

  for (const city of cities) {
    const aqiData = await AirQuality.findOne({ city: city.name });
    const weatherData = await Weather.findOne({ city: city.name });
    const parks = await Park.find({ city: city.name });

    let score = 0;

    if (aqiData && preferences.maxAqi && aqiData.aqi <= preferences.maxAqi) score += 1;
    if (weatherData && preferences.maxTemp && weatherData.temperature <= preferences.maxTemp) score += 1;
    if (parks && parks.length >= preferences.minParks) score += 1;

    results.push({ city: city.name, score, parks: parks.length });
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}; 