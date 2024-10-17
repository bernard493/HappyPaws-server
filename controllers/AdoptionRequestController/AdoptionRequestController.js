const constants = require("../../const/constants");
const knex = require("knex")(require("../../knexfile"));
const Joi = require("joi");

function generateOrderNumber() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";

  // Generate two random uppercase letters
  const firstTwoLetters = Array(2)
    .fill(null)
    .map(() => letters[Math.floor(Math.random() * letters.length)])
    .join("");

  // Generate three random digits
  const threeDigits = Array(3)
    .fill(null)
    .map(() => digits[Math.floor(Math.random() * digits.length)])
    .join("");

  // Generate two random uppercase letters
  const lastTwoLetters = Array(2)
    .fill(null)
    .map(() => letters[Math.floor(Math.random() * letters.length)])
    .join("");

  // Concatenate and return the result
  return `${firstTwoLetters}${threeDigits}${lastTwoLetters}`;
}

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
      orderNumber: generateOrderNumber(),
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

const getAllAdoptionRequestByUserId = async (req, res) => {
  try {
    const adoptionRequests = await knex(constants.knex.adoption_requests)
      .where("adoption_requests.user_id", req.user.id)
      .join(constants.knex.pets, "adoption_requests.pet_id", "pets.id")
      .join(constants.knex.shelters, "pets.shelter_id", "shelter.id")
      .select(
        "adoption_requests.id as id",
        "pets.name",
        "shelter.name as shelterName",
        "adoption_requests.offerPrice",
        "adoption_requests.price",
        "adoption_requests.orderStatus",
        "adoption_requests.orderNumber"
      );
    return res.json(adoptionRequests);
  } catch (error) {
    console.error("Error getting adoption requests:", error);
  }
};

module.exports = {
  createNewAdoptionRequest,
  getAllAdoptionRequestByUserId,
};
