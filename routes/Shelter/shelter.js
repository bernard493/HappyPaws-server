const router = require("express").Router();
const passport = require("../../middleware/passport");



router.get("/", (req, res) => {
  res.send("Get a list of shelters.");
});

router.get("/:id", (req, res) => {
  res.send("Get details of a specific shelter.");
});

module.exports = router;
