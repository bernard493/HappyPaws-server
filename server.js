const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// For All Routes
const authRoutes = require("./routes/auth");
const avatarRoutes = require("./routes/avatar");

// Adopter Routes
const adopterProfileRoutes = require("./routes/Adopter/adopterProfile");

// Pets Routes
const petRoutes = require("./routes/Pets/pets");

//Shelter Routes

// Admin Routes

app.listen(PORT, (req, res) => {
  console.log(`server running ${PORT}`);
});

app.get("/api/v1/", (req, res) => {
  res.json({ message: "working" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/avatar", avatarRoutes);

// Adopter END-POINTS
app.use("/api/v1/adoptions", adopterProfileRoutes);

// Pets END-POINTS
app.use("/api/v1/pets", petRoutes);
