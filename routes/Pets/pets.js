const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Get a list of available pets (search & filter)");
});

router.get("/:id", (req, res) => {
  res.send(" Get details of a specific pet");
});

module.exports = router;
