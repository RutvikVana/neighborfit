const cron = require("node-cron");
const fetchWeather = require("./fetchWeather");
const fetchAQ = require("./fetchFromDataGov");
const Weather = require("../models/Weather");
const AQ = require("../models/AirQuality");

cron.schedule("0 * * * *", async () => {
  const city = "Delhi", lat = 28.61, lon = 77.20;
  await Weather.create(await fetchWeather(lat, lon, city));
  const arr = await fetchAQ();
  if (arr.length) {
    await AQ.deleteMany({ city });
    await AQ.insertMany(arr);
  }
  console.log("Scheduled fetch done", new Date());
}); 