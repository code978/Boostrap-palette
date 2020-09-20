const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Theme = require("../models/Theme");

const isAuth = require("../middlewares/isAuth");

const User = require("../models/User");

router.get("/", isAuth, async (req, res) => {
  const themes = await Theme.find({});
  res.render("dashboard/home", {
    themes: themes,
  });
});

router.get("/login", (req, res) => {
  res.render("dashboard/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/dashboard/login",
  })
);

router.get("/register", async (req, res) => {
  const user = await User.findOne({});
  if (user) {
    return res.redirect("/dashboard/login");
  }
  res.render("dashboard/register");
});

router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  const new_user = new User({
    fullname,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  new_user.password = await bcrypt.hash(new_user.password, salt);

  await new_user.save();
  res.redirect("/dashboard");
});

// logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
