const router = require("express").Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");

// register all user and set role {Adopter, ShelterStaff, Admin}
router.post("/register", (req, res) => {
  const { username, email, password, role } = req.body;
  const userRegistrationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("adopter", "shelter_staff", "admin").required(),
  });

  const { error } = userRegistrationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  } else {
    // const hashedPassword = bcrypt.hashSync(password, 10);
    res.json({ ...req.body, password: hashedPassword });
  }
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
