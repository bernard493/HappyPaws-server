const Joi = require("joi");
const generateDogBreedsByOpenAi = require("../../Open_AI-Assis/open-ai_api_assistant");
const getAllBreedsAndCacheFromDB = require("../../Open_AI-Assis/getAllBreedsAndCacheFromDB");
const constants = require("../../const/constants");
const knex = require("knex")(require("../../knexfile"));

// Get pets based on input
const getRecommendedPets = async (req, res) => {
  try {
    const { searchValue } = req.body;
    // Validate body
    const userRecommendationSchema = Joi.object({
      searchValue: Joi.string().required(),
    });
    const { error } = userRecommendationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      // Get all breeds from DB and cache them
      const availableBreedsCache = await getAllBreedsAndCacheFromDB();

      if (availableBreedsCache && availableBreedsCache.length > 0) {
        try {
          // Get breed recommendations from OpenAI based on searchValue and cached breeds
          const suggestedBreeds = await generateDogBreedsByOpenAi(
            searchValue,
            availableBreedsCache
          );

          const getPetsWithRecommendedBreeds = await knex
            .select("*")
            .from(constants.knex.pets)
            .whereIn("breed", suggestedBreeds);

          return res.status(200).json({
            message: "Recommended Pets Retrieved Successfully",
            results: getPetsWithRecommendedBreeds,
          });
        } catch (error) {
          // Handle any errors that occur during the process
          console.error("Error fetching recommended pets:", error);
          return res.status(500).json({
            message: "Error fetching recommended pets",
            error: error.message,
          });
        }
      } else {
        // If no breeds are available from the cache, return an error
        return res.status(500).json({
          message: "No available breeds to generate recommendations",
        });
      }
    }
  } catch (error) {
    console.error("Error fetching recommended pets:", error);
    return res.status(500).json({
      message: "Error fetching recommended pets",
      error: error.message,
    });
  }
};

module.exports = {
  getRecommendedPets,
};
