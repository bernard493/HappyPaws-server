const router = require("express").Router();
const {
  getRecommendedPets,
} = require("../../controllers/SearchPetsController/SearchPetsController");
const passport = require("../../middleware/passport");


router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  getRecommendedPets
);

module.exports = router;
