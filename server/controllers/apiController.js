// server/controllers/apiController.js

const axios = require("axios");

exports.getCities = async (req, res) => {
  try {
    const response = await axios.get("https://wft-geo-db.p.rapidapi.com/v1/geo/cities", {
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": process.env.GEODB_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "GeoDB fetch error" });
  }
};

exports.getSchoolsFromOverpass = async (req, res) => {
  try {
    const bbox = "[19.0760,72.8777,19.2760,73.0777]"; // Change to your bounds
    const query = `[out:json];node[\"amenity\"=\"school\"](${bbox});out;`;

    const response = await axios.get("https://overpass-api.de/api/interpreter", {
      params: { data: query }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Overpass fetch error" });
  }
};

exports.getIndianDataGov = async (req, res) => {
  try {
    // NOTE: Replace 'your-dataset-id' with the actual dataset ID from data.gov.in
    const response = await axios.get("https://api.data.gov.in/resource/your-dataset-id", {
      params: {
        "api-key": process.env.DATAGOV_API_KEY,
        format: "json"
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "data.gov.in fetch error" });
  }
}; 