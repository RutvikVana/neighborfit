const fetchWeather = require("../utils/fetchWeather");
exports.getWeather = async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const data = await fetchWeather(lat, lon);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 