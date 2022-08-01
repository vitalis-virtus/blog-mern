const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
require("dotenv").config();

const { authServices } = require("../services");

const { SECRET_KEY } = process.env;
const setting = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

const jwtStrategy = new Strategy(setting, async (payload, done) => {
  try {
    const user = await authServices.getUserById(payload.id);

    if (!user) {
      throw new Error("Not found");
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use("jwt", jwtStrategy);
