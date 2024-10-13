const router = require("express").Router();
const {
  loginController,
  signUpController,
} = require("../controllers/Auth/auth");

// register all user and set role {Adopter, ShelterStaff, Admin}
router.post("/register", signUpController);

router.post("/login", loginController);

router.post("/logout", (req, res) => {
  // const {username , email , password} = req.body;
  // const hashedPassword = bcrypt.hashSync(password, 10);
  res.send("auth logout working ");
});

router.put("/forget-password", (req, res) => {
  res.send("update password ");
});

module.exports = router;
