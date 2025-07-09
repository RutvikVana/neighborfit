const axios = require("axios");
module.exports = async (lat, lon) => {
  const query = `
    [out:json];
    node[leisure=park](around:3000,${lat},${lon});
    out body;
  `;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  const res = await axios.get(url);
  return res.data.elements;
}; 