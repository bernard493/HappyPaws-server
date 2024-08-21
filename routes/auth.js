const router = require("express").Router();

// register all user and set role {Adopter, ShelterStaff, Admin}
router.post("/register", (req, res) => {
  // const {username , email , password} = req.body;
  // const hashedPassword = bcrypt.hashSync(password, 10);
  res.send("auth register working ");
});

router.post("/login", (req, res) => {
  // const {username , email , password} = req.body;
  // const hashedPassword = bcrypt.hashSync(password, 10);
  res.send("auth login working ");
});

router.post("/logout", (req, res) => {
  // const {username , email , password} = req.body;
  // const hashedPassword = bcrypt.hashSync(password, 10);
  res.send("auth logout working ");
});

router.get("/profile", (req, res) => {
  // const {username , email , password} = req.body;
  // const hashedPassword = bcrypt.hashSync(password, 10);

  res.send("get user  profile");
});


router.put("/profile", (req, res) => {
  // const {username , email , password}
  res.send("update user profile");
});

router.put("/forget-password", (req, res) => {
  res.send("update password ");
});

module.exports = router;
