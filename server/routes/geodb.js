const express = require('express');
const router = express.Router();
const fetchFromGeoDB = require('../utils/fetchFromGeoDB');

console.log("✅ geodb.js route file loaded");

router.get('/', async (req, res) => {
  console.log("🔁 /api/geodb route hit");
  console.log("💬 Received query param:", req.query.query); // Debug log
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  try {
    const results = await fetchFromGeoDB(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "GeoDB fetch error" });
  }
});

module.exports = router; 