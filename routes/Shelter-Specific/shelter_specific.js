const router = require("express").Router();




router.post("/pets", (req, res) => {
  res.send(" Add a new pet to the shelter's listings.");
});

router.put("/pets/:id", (req, res) => {
  res.send(" Update details of a specific pet.");
});



router.delete("/pets/:id", (req, res) => {
  res.send("Remove a pet from the shelter's listings.");
});

module.exports = router;
