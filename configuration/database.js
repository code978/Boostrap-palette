const mongoose = require("mongoose");

const DB_URL;

const connectDatabase = async () => {
  try {
    await mongoose.connect("DB_URL", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("database is successfully connected...");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDatabase;
