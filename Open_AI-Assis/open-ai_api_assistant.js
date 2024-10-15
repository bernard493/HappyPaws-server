const axios = require("axios");
require("dotenv").config();

// Function to generate dog breeds using OpenAI based on user search preferences
async function generateDogBreedsByOpenAi(searchValue, availableBreeds) {
  const message = [
    {
      role: "system",
      content:
        "You are an assistant that helps recommend pets for adoption based on the user search preferences and available breeds in the database.",
    },
    {
      role: "user",
      content: `Please provide an array of 3 or minimum of 1 dog breed based on the user's preferences: "${searchValue}" and these available breeds: ${JSON.stringify(
        availableBreeds
      )}. The output should be a strictly proper JSON array with breed names like this: ["Breed1", "Breed2", "Breed3"] and nothing else.`,
    }
  ];

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: message,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Parse OpenAI response and return the breed array
    const suggestedBreeds = JSON.parse(response.data.choices[0].message.content.trim());
    return suggestedBreeds; // This will be an array of breeds, e.g., ["Breed1", "Breed2"]
  } catch (error) {
    console.error(
      "Error generating Dog breed:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

module.exports = generateDogBreedsByOpenAi;
