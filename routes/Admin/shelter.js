const router = require("express").Router();

router.get("/shelters", (req, res) => {
  res.send("Get a list of all shelters.");
});

router.get("/shelters/:id", (req, res) => {
  res.send("Get details of a specific shelter.");
});

router.put("/shelters/:id", (req, res) => {
  res.send(" Update a shelter's details");
});

router.delete("/shelters/:id", (req, res) => {
  res.send("Delete a shelter.");
});

module.exports = router;
