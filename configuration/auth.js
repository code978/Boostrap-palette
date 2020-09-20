const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/User");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    console.log(email, password);

    // check if account is exist or not
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }

    // if account exist thne match the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return done(null, false, { message: "Incorrect password." });
    }
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
        done(err, user);
      });
    });

    return done(null, user);
  })
);
