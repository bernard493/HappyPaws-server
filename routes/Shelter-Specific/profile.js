const router = require("express").Router();




router.get("/", (req, res) => {
  res.send("Get the logged-in shelter's profile.");
});

router.put("/", (req, res) => {
  res.send("Update the shelter's profile.");
});

module.exports = router;
