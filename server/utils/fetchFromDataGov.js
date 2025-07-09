const axios = require("axios");
module.exports = async () => {
  const r = await axios.get("https://api.data.gov.in/resource/8b1918cd-...", {
    params: {
      format: "json", limit: 100, "api-key": process.env.DATAGOV_API_KEY
    }
  });
  return r.data.records.map(r => ({
    city: r.city, aqi: +r.pollutant_avg, timestamp: new Date(r.last_update)
  }));
}; 