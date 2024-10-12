const Joi = require("joi");
const bcrypt = require("bcrypt");
const knex = require("knex")(require("../../knexfile"));
const constants = require("../../const/constants");
require("dotenv").config();

const signUpController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

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

const loginController = (req, res) => {
  // const {username , email , password} = req.body;
  // const hashedPassword = bcrypt.hashSync(password, 10);
  res.send("auth login working ");
};

module.exports = {
  loginController,
  signUpController,
};
