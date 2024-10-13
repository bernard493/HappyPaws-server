// Get User profile
const getUserProfile = async (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user, // The authenticated user is available in req.user
  });
};

const updateUserProfile = async (req, res) => {
  // const {username , email , password}
  res.send("update user profile");
};



module.exports = {
  getUserProfile,
  updateUserProfile
};
