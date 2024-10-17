const axios = require("axios");
require("dotenv").config();

// Function to generate dog breeds using OpenAI based on user search preferences
async function generatePetBreedsByOpenAi(searchValue, availableBreeds) {
  const message = [
    {
      role: "system",
      content:
        "You are an assistant that helps recommend pets for adoption based on the user search preferences and available breeds in the database.",
    },
    {
      role: "user",
      content: `Please provide an array of 3 or minimum of 1 breeds based on the user's preferences: "${searchValue}" and these available breeds: ${JSON.stringify(
        availableBreeds
      )}. The output should be a strictly proper JSON array with breed names like this: ["Breed1", "Breed2", "Breed3"] , no explanation and nothing else.`,
    },
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

    // Parse OpenAI response and handle non-JSON response gracefully
    let suggestedBreeds;
    try {
      suggestedBreeds = JSON.parse(
        response.data.choices[0].message.content.trim()
      );
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      throw new Error("OpenAI did not return a valid JSON response");
    }

    return suggestedBreeds;
  } catch (error) {
    console.error(
      "Error generating Dog breed:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

module.exports = generatePetBreedsByOpenAi;
