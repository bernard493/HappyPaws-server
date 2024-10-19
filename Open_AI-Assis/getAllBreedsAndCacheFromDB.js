const constants = require("../const/constants");
const knex = require("knex")(require("../knexfile")); 
require("dotenv").config();
let breedCache = []; // In-memory cache to store breeds by species
let cacheExpiry;

const CACHE_TTL = 3600000; // Time-to-live for the cache in milliseconds (1 hour)

async function getAllBreedsAndCacheFromDB() {
  const currentTime = Date.now();

  // Returning cached breeds
  if (breedCache.length > 0 && cacheExpiry > currentTime) {
    return breedCache;
  }

  try {
    // If breeds are not cached, fetch from the database
    const breeds = await knex.select("breed").from(constants.knex.pets);
    const breedList = breeds.map((eachBreed) => eachBreed.breed);
    breedCache = breedList;
    cacheExpiry = currentTime + CACHE_TTL;

    return breedList;
  } catch (error) {
    console.error(`Error fetching breeds for species breeds:`, error);
    return [];
  }
}

module.exports = getAllBreedsAndCacheFromDB;
