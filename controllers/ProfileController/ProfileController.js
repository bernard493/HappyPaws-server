const knex = require("knex")(require("../../knexfile"));
const constants = require("../../const/constants");

// Get User profile
const getUserProfile = async (req, res) => {
  try {
    const user_Id = req.user.id;
    const user = await knex(constants.knex.users)
      .select( "email", "avatar", "role", "username")
      .where("id", user_Id)
      .first();
    res.json(user);
  } catch (error) {
    console.error(error);
  }
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
