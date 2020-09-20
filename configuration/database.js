const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://user:Jq9n4Sdm3oqe7JQq@cluster0.scemc.mongodb.net/boostrap-themer?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("database is successfully connected...");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDatabase;
