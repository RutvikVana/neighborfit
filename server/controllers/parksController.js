const fetchFromOverpass = require("../utils/fetchFromOverpass");
exports.getParks = async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const data = await fetchFromOverpass(lat, lon);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 