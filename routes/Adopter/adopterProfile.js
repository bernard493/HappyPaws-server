const router = require("express").Router();
const passport = require("../../middleware/passport");
// Adoption Request Routes:

// Submit a new adoption request.
router.post("/requests", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send("Submit a new adoption request.");
});

//   Get a list of the logged-in adopter's adoption requests.
router.get("/requests", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send("Get a list of the logged-in adopter's adoption requests.");
});

//  Get details of a specific adoption request (if the request belongs to the adopter).
router.get("/requests/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send(
    "Get details of a specific adoption request (if the request belongs to the adopter)."
  );
});

// Favorites Routes:
//  Add a pet to the adopter's favorites.
router.post("/favorites", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send(" Add a pet to the adopter's favorites.");
});

//  Get a list of the adopter's favorite pets.
router.get("/favorites", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send(" Get a list of the adopter's favorite pets.");
});

// Remove a pet from the adopter's favorites
router.delete("/favorites/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send("Remove a pet from the adopter's favorites");
});

// Send a message to shelter staff.
router.post("/messages",  passport.authenticate("jwt", { session: false }),(req, res) => {
  res.send(" Send a message to shelter staff.");
});

// Get a list of the adopter's messages.
router.get("/messages", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send("Get a list of the adopter's messages");
});
module.exports = router;
