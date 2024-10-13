const Joi = require("joi");
const generateDogBreedsByOpenAi = require("../../Open_AI-Assis/open-ai_api_assistant");
const getAllBreedsFromDB = require("../../Open_AI-Assis/getAllBreedsFromDB");
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
      // get all themes from DB
      const availableBreedsCache = await getAllBreedsFromDB();

      // GET RECOMMENDATION FROM OPENAI
      const suggestedBreeds = await generateDogBreedsByOpenAi(
        searchValue,
        availableBreedsCache
      );
      console.log("suggestedBreeds", suggestedBreeds);
      //   MAKE DB CALL TO GET ALL DOGS OF THIS BREED
      const getPetsWithRecommendedBreeds = knex
        .select("*")
        .from(constants.knex.pets)
        // suggestedBreeds is going be an array or 2 or more values
        .whereIn("breed", suggestedBreeds);
      // RES WITH REDIRECT TO GET PRODUCTS
      return res.status(200).json({
        message: "Recommended Pets Retrieved Successfully",
        suggested_Breeds: getPetsWithRecommendedBreeds,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getRecommendedPets,
};
