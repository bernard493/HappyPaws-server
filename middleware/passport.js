// passport.js
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const dotenv = require("dotenv");
const constants = require("../const/constants");
const knex = require("knex")(require("../knexfile"));

dotenv.config(); // For environment variables (like your JWT secret)

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract the token from authorization header
  // eslint-disable-next-line no-undef
  secretOrKey: process.env.ACCESS_TOKEN_SECRET, // Use your secret key from environment variables
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      // Find the user using the payload info (e.g., ID)
      const user = await knex(constants.knex.users)
        .where("id", jwt_payload.id)
        .first();

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
