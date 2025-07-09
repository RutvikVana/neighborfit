const DataGovRecord = require("../models/DataGovRecord");
const fetchFromDataGov = require("../utils/fetchFromDataGov");
const axios = require("axios");

const fetchAndStoreDataGov = async (req, res) => {
  const records = await fetchFromDataGov();

  if (!records.length) {
    return res.status(500).json({ message: "No records found" });
  }

  await DataGovRecord.deleteMany({});
  await DataGovRecord.insertMany(records);
  res.json({ message: `Inserted ${records.length} records.` });
};

const getDataByCity = async (req, res) => {
  const { city } = req.params;
  const data = await DataGovRecord.find({ city: { $regex: city, $options: 'i' } });
  res.json(data);
};

exports.fetchAirData = async (req, res) => {
  const city = req.params.city.toLowerCase();
  try {
    // Replace with working dataset & API key
    const url = `https://api.data.gov.in/resource/<DATASET_ID>?format=json&api-key=<API_KEY>`;
    const result = await axios.get(url);
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { fetchAndStoreDataGov, getDataByCity }; 