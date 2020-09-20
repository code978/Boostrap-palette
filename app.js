const express = require("express");
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const passport = require("passport");
const session = require("express-session");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const path = require("path");
const connectDatabase = require("./configuration/database");
const methodOverride = require("method-override");
const app = express();

const port = process.env.PORT || 5000;
const Theme = require("./models/Theme");

// passport setup
app.use(session({ secret: "keyboard cat" }));
app.use(passport.initialize());
app.use(passport.session());
require("./configuration/auth");

// set data for view
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.currentTheme = null;
  if (res.app.locals.mytheme) {
    res.locals.currentTheme = res.app.locals.mytheme;
  }
  next();
});

// connect database
connectDatabase();

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// set public access for application
app.use(express.static(path.join(__dirname, "public")));

// express-handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.set("view engine", "handlebars");

// middleware
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const themes = await Theme.find({});
  res.render("home", {
    themes: themes,
  });
});

app.get("/about", (req, res) => {
  res.render("pages/about");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

// load our all routes here
app.use("/dashboard", require("./routes/dashboard"));
app.use("/themes", require("./routes/themes"));

app.listen(port, () => console.log("server started at: 5000"));
