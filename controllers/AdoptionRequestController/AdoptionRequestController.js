const constants = require("../../const/constants");
const knex = require("knex")(require("../../knexfile"));
const Joi = require("joi");

const createNewAdoptionRequest = async (req, res) => {
  try {
    const { offerPrice, price, petId } = req.body;

    // Joi validation schema
    const newAdoptionSchema = Joi.object({
      offerPrice: Joi.number().required().messages({
        "any.required": "Offer Price is required",
        "number.base": "Offer Price must be a valid number",
      }),
      price: Joi.number().required().messages({
        "any.required": "Price is required",
        "number.base": "Price must be a valid number",
      }),
      petId: Joi.string().trim().required().messages({
        "any.required": "Pet ID is required",
        "string.base": "Pet ID must be a valid string",
      }),
    });

    // Validate input data
    const { error } = newAdoptionSchema.validate(req.body, {
      abortEarly: false, // Return all validation errors
    });

    if (error) {
      // Return all validation errors
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    // Check if petId exists in the database
    const pet = await knex(constants.knex.pets).where("id", petId).first();

    if (!pet) {
      // Correctly check if pet exists
      return res.status(404).json({ message: "Pet not found" });
    }

    // Check if the user has already made an adoption request for this pet
    const existingAdoptionRequest = await knex(constants.knex.adoption_requests)
      .where("pet_id", pet.id)
      .where("user_id", req.user.id)
      .first();

    if (existingAdoptionRequest) {
      return res.status(400).json({
        message: "You have already made an adoption request for this pet",
      });
    }

    // Create new adoption request
    const newAdoptionRequest = await knex(
      constants.knex.adoption_requests
    ).insert({
      offerPrice: offerPrice,
      price: price,
      pet_id: petId,
      user_id: req.user.id,
      orderStatus: "Pending",
    });

    if (newAdoptionRequest) {
      return res
        .status(201)
        .json({ message: "Adoption request created successfully" });
    }
  } catch (err) {
    console.error("Error creating adoption request:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createNewAdoptionRequest,
};
