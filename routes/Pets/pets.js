const router = require("express").Router();
const passport = require("../../middleware/passport");

const {
  getPetDetailsByID,
} = require("../../controllers/PetsController/PetsController");
 // Update with your knex setup

router.get("/", (req, res) => {
  res.send("Get a list of available pets (search & filter)");
});

router.get("/:id", getPetDetailsByID);

module.exports = router;
