const axios = require("axios");
module.exports = async (lat, lon, city) => {
  const q = `
[out:json];(
 node["leisure"="park"](around:5000,${lat},${lon});
 way["leisure"="park"](around:5000,${lat},${lon});
);
out center;`;
  const r = await axios.post("https://overpass-api.de/api/interpreter", q, { headers: { "Content-Type":"text/plain" }});
  return r.data.elements.map(e => ({
    city,
    lat: e.lat || e.center.lat,
    lon: e.lon || e.center.lon,
    tags: e.tags
  }));
}; 