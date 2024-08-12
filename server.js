const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();



app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());



const PORT = process.env.PORT || 5000;



app.listen(PORT, (req, res) => {
 console.log(`server running ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "working" });
});
