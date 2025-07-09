const express = require("express");
const router = express.Router();
const {
  getCities,
  getSchoolsFromOverpass,
  getIndianDataGov
} = require("../controllers/apiController");

// GeoDB
router.get("/geodb/cities", getCities);

// Overpass
router.get("/overpass/schools", getSchoolsFromOverpass);

// data.gov.in
router.get("/datagov/pollution", getIndianDataGov);

module.exports = router; 