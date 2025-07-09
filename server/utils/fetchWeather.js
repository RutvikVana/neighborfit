const axios = require("axios");
module.exports = async (lat, lon, city) => {
  const r = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: { latitude: lat, longitude: lon, current_weather: true }
  });
  const cw = r.data.current_weather;
  return {
    city,
    temperature: cw.temperature,
    windspeed: cw.windspeed,
    weathercode: cw.weathercode,
    timestamp: new Date()
  };
}; 