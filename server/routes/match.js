const express = require("express");
const router = express.Router();
const Neighborhood = require("../models/Neighborhood");

router.post("/", async (req, res) => {
  const { city, rent_max, safety, schools, parks } = req.body;

  try {
    const matches = await Neighborhood.find({
      city: { $regex: new RegExp(city, 'i') },
      rent_avg: { $lte: rent_max || 100000 },
      safety: { $gte: (safety ? safety - 0.5 : 0) },
      schools: { $gte: (schools ? schools - 0.5 : 0) },
      parks: { $gte: (parks ? parks - 0.5 : 0) },
    });

    res.json({ matches });
  } catch (err) {
    console.error("Match error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
