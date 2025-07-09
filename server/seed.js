const mongoose = require('mongoose');
require('dotenv').config();

const City = require('./models/City');
const Weather = require('./models/Weather');
const AirQuality = require('./models/AirQuality');
const Park = require('./models/Park');

const cities = require('./data/cities.json');
const weather = require('./data/weather.json');
const air = require('./data/air_quality.json');
const parks = require('./data/parks.json');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await City.insertMany(cities);
    await Weather.insertMany(weather);
    await AirQuality.insertMany(air);
    await Park.insertMany(parks);
    console.log('Seeded successfully!');
    process.exit();
  }).catch(console.error); 