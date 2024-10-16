const router = require("express").Router();

router.get("/users", (req, res) => {
  res.send("Get a list of all users.");
});

router.get("/users/:id", (req, res) => {
  res.send("Get details of a specific user.");
});
router.put("/users/:id", (req, res) => {
  res.send("Update a user's details.");
});

router.delete("/users/:id", (req, res) => {
  res.send("Delete a user.");
});

module.exports = router;
