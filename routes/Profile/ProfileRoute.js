const router = require("express").Router();
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
} = require("../../controllers/ProfileController/ProfileController");
const passport = require("../../middleware/passport");

// Get user Profile By ID
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getUserProfile
);
// UPDATE user Profile By ID

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  updateUserProfile
);


// DELETE user profile By ID
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteUserProfile
  );
module.exports = router;
