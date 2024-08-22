const router = require("express").Router();




router.get("/", (req, res) => {
  res.send("Get a list of shelters.");
});

router.get("/:id", (req, res) => {
  res.send("Get details of a specific shelter.");
});

module.exports = router;
