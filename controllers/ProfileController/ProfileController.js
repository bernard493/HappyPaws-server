const knex = require("knex")(require("../../knexfile"));
const Joi = require("joi");
const constants = require("../../const/constants");

// Get User profile
const getUserProfile = async (req, res) => {
  try {
    const user_Id = req.user.id;
    const user = await knex(constants.knex.users)
      .select("email", "avatar", "role", "username")
      .where("id", user_Id)
      .first();
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const user_Id = req.user.id;
    // Joi validation schema
    const userProfileUpdateSchema = Joi.object({
      username: Joi.string().trim().required().messages({
        "any.required": "username is required",
        "string.empty": "username is required",
      }),
      email: Joi.string().trim().email().required().messages({
        "any.required": "email is required",
        "string.email": "email must be a valid email",
      }),
      role: Joi.string().trim().valid("adopter", "admin").required().messages({
        "any.only": "role must be either adopter or admin",
        "any.required": "role is required",
      }),
    });

    // Validate input data
    const { error } = userProfileUpdateSchema.validate(req.body, {
      abortEarly: false, // Return all validation errors
      stripUnknown: true, // Strip unknown fields
    });

    if (error) {
      // Return all validation errors
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    // Check if user exists before update
    const existingUser = await knex(constants.knex.users)
      .where("id", user_Id)
      .first();
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updateUser = await knex(constants.knex.users)
      .where("id", user_Id)
      .update({ username, email, role });

    if (updateUser.length === 0) {
      return res.status(500).json({
        message: "Update failed: No changes made.",
      });
    }

    // Fetch the updated user profile
    const updatedUser = await knex(constants.knex.users)
      .select("email", "avatar", "role", "username")
      .where("id", user_Id)
      .first();

    res.status(200).json({
      message: "Your Detail was updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    // Catch any server-side errors
    console.error("Error during Updating  User:", error);
    return res.status(500).json({
      message: "Server error, can't Update  user. Please try again later.",
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
