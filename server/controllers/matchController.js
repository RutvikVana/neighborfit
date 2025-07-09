const Neighborhood = require('../models/Neighborhood');

const matchNeighborhoods = async (req, res) => {
  try {
    const { preferredCity, maxRent, minSafety, minSchools, minParks } = req.body;

    const neighborhoods = await Neighborhood.find({ city: preferredCity });

    const results = neighborhoods.map(n => {
      let score = 0;

      if (n.rent_avg <= maxRent) score += 1;
      if (n.safety >= minSafety) score += 1;
      if (n.schools >= minSchools) score += 1;
      if (n.parks >= minParks) score += 1;

      return { ...n._doc, score };
    });

    const sorted = results.sort((a, b) => b.score - a.score);

    res.json(sorted);
  } catch (error) {
    console.error('Matching error:', error);
    res.status(500).json({ error: 'Server error during matching.' });
  }
};

module.exports = matchNeighborhoods; 