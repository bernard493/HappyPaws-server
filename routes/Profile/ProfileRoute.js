const router = require("express").Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../../controllers/ProfileController/ProfileController");
const passport = require("../../middleware/passport");


router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getUserProfile
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  updateUserProfile
);

module.exports = router;
