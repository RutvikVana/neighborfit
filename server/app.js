const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Mount the match route
const matchRoute = require("./routes/match");
app.use("/api/match", matchRoute);

// Optional: basic root route
app.get("/", (req, res) => {
  res.send("NeighborFit API is running");
});

// DB + Server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected");
    app.listen(5000, () => console.log("Server running on 5000"));
  })
  .catch(err => console.error(err)); 