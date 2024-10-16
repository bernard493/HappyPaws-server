const knex = require("knex")(require("../../knexfile"));
const constants = require("../../const/constants");

// Get User profile
const getUserProfile = async (req, res) => {
  const pets = await knex(constants.knex.pets);
  console.log('pets',pets);
  res.send(pets);
};

const updateUserProfile = async (req, res) => {
  // const {username , email , password}
  const pets = await knex(constants.knex.pets);
  res.send(pets);
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
