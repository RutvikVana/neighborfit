const r = require("express").Router();
const fetchAQ = require("../utils/fetchFromDataGov");
const AQ = require("../models/AirQuality");

r.get("/fetch", async (req, res) => {
  const arr = await fetchAQ();
  if (!arr.length) return res.status(500).send({error:"no data"});
  await AQ.deleteMany({});
  await AQ.insertMany(arr);
  res.send({message:`Inserted ${arr.length}`});
});
r.get("/:city", async (req, res) => {
  const arr = await AQ.find({ city: new RegExp(req.params.city, "i") });
  res.send({ data: arr });
});
module.exports = r; 