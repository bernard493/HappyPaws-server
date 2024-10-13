const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const knex = require("knex")(require("../../knexfile"));
const constants = require("../../const/constants");
require("dotenv").config();

const signUpController = async (req, res) => {
  try {
    const { username, email, password, role = "adopter" } = req.body;

    // Joi validation schema
    const userRegistrationSchema = Joi.object({
      username: Joi.string().trim().required().messages({
        "any.required": "username is required",
        "string.empty": "username is required",
      }),
      email: Joi.string().trim().email().required().messages({
        "any.required": "email is required",
        "string.email": "email must be a valid email",
      }),
      password: Joi.string().trim().min(8).max(20).required().messages({
        "any.required": "password is required",
        "string.min": "password length must be at least 8 characters long",
        "string.max":
          "password length must be less than or equal to 20 characters",
      }),
      role: Joi.string().trim().valid("adopter", "admin").required().messages({
        "any.only": "role must be either adopter or admin",
        "any.required": "role is required",
      }),
    });

    // Validate input data
    const { error } = userRegistrationSchema.validate(req.body, {
      abortEarly: false, // Return all validation errors
    });

    if (error) {
      // Return all validation errors
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    // Check if user already exists by email
    const userAlreadyExist = await knex(constants.knex.users)
      .where("email", email)
      .first(); // Retrieve the first user if it exists

    if (userAlreadyExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const user = await knex(constants.knex.users).insert({
      username,
      email,
      password: hashedPassword,
      role,
      avatar: "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
    });

    if (user) {
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    // Catch any server-side errors
    console.error("Error during sign up:", error);
    return res.status(500).json({
      message: "Server error, can't register new user. Please try again later.",
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  // const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = await knex(constants.knex.users).where("email", email).first(); // Retrieve the first user if it exists

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate the token after successful authentication
    // eslint-disable-next-line no-undef
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "3h",
    });

    return res.status(200).json({
      message: "Login successful",
      token: `Bearer ${token}`,
    });
    // eslint-disable-next-line no-undef
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginController,
  signUpController,
};
